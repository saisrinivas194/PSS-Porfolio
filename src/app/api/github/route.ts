import { NextResponse } from "next/server";

const GITHUB_USER = "saisrinivas194";
const REPOS_PER_PAGE = 100;
const MAX_REPOS_RETURN = 100;

type RepoItem = {
  id?: number;
  name?: string;
  description?: string | null;
  html_url?: string;
  stargazers_count?: number;
  language?: string | null;
  fork?: boolean;
};

function isRepoItem(r: unknown): r is RepoItem {
  return r !== null && typeof r === "object" && "name" in r;
}

export async function GET() {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USER}`, {
        next: { revalidate: 3600 },
        headers: { Accept: "application/vnd.github.v3+json" },
      }),
      fetch(
        `https://api.github.com/users/${GITHUB_USER}/repos?per_page=${REPOS_PER_PAGE}&sort=updated`,
        { next: { revalidate: 900 }, headers: { Accept: "application/vnd.github.v3+json" } }
      ),
    ]);

    if (!userRes.ok || !reposRes.ok) {
      const status = userRes.status === 404 || reposRes.status === 404 ? 404 : 502;
      return NextResponse.json(
        { error: "Failed to fetch GitHub data" },
        { status }
      );
    }

    let user: { public_repos?: number } = {};
    let repos: unknown[] = [];
    try {
      user = await userRes.json();
      const raw = await reposRes.json();
      repos = Array.isArray(raw) ? raw : [];
    } catch {
      return NextResponse.json(
        { error: "Invalid response from GitHub" },
        { status: 502 }
      );
    }

    const sortedRepos = (repos as RepoItem[])
      .filter((r) => isRepoItem(r) && !r.fork && r.name != null && r.html_url != null)
      .sort((a, b) => (b.stargazers_count ?? 0) - (a.stargazers_count ?? 0))
      .slice(0, MAX_REPOS_RETURN)
      .map((r) => ({
        id: r.id ?? 0,
        name: String(r.name),
        description: r.description ?? null,
        html_url: String(r.html_url),
        stargazers_count: typeof r.stargazers_count === "number" ? r.stargazers_count : 0,
        language: r.language ?? null,
      }));

    const languageCounts: Record<string, number> = {};
    for (const repo of repos as RepoItem[]) {
      if (isRepoItem(repo) && repo.language && typeof repo.language === "string") {
        languageCounts[repo.language] = (languageCounts[repo.language] ?? 0) + 1;
      }
    }

    const topLanguages = Object.entries(languageCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));

    return NextResponse.json({
      publicRepos: typeof user.public_repos === "number" ? user.public_repos : 0,
      repos: sortedRepos,
      topLanguages,
    });
  } catch {
    return NextResponse.json(
      { error: "Unexpected error talking to GitHub" },
      { status: 500 }
    );
  }
}

