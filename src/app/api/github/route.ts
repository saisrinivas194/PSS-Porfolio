import { NextResponse } from "next/server";

const GITHUB_USER = "saisrinivas194";
const REPOS_PER_PAGE = 100;
const MAX_REPOS_RETURN = 20;

type RepoItem = {
  id?: number;
  name?: string;
  description?: string | null;
  html_url?: string;
  stargazers_count?: number;
  language?: string | null;
  fork?: boolean;
  updated_at?: string;
};

type EventItem = {
  created_at?: string;
};

function isRepoItem(r: unknown): r is RepoItem {
  return r !== null && typeof r === "object" && "name" in r;
}

export async function GET() {
  try {
    const [userRes, reposRes, eventsRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USER}`, {
        cache: "no-store",
        headers: { Accept: "application/vnd.github.v3+json" },
      }),
      fetch(
        `https://api.github.com/users/${GITHUB_USER}/repos?per_page=${REPOS_PER_PAGE}&sort=updated&direction=desc`,
        { cache: "no-store", headers: { Accept: "application/vnd.github.v3+json" } }
      ),
      fetch(`https://api.github.com/users/${GITHUB_USER}/events/public?per_page=100`, {
        cache: "no-store",
        headers: { Accept: "application/vnd.github.v3+json" },
      }),
    ]);

    if (!userRes.ok || !reposRes.ok || !eventsRes.ok) {
      const status =
        userRes.status === 404 || reposRes.status === 404 || eventsRes.status === 404
          ? 404
          : 502;
      return NextResponse.json(
        { error: "Failed to fetch GitHub data" },
        { status }
      );
    }

    let user: { public_repos?: number } = {};
    let repos: unknown[] = [];
    let events: unknown[] = [];
    try {
      user = await userRes.json();
      const raw = await reposRes.json();
      const eventsRaw = await eventsRes.json();
      repos = Array.isArray(raw) ? raw : [];
      events = Array.isArray(eventsRaw) ? eventsRaw : [];
    } catch {
      return NextResponse.json(
        { error: "Invalid response from GitHub" },
        { status: 502 }
      );
    }

    const sortedRepos = (repos as RepoItem[])
      .filter((r) => isRepoItem(r) && !r.fork && r.name != null && r.html_url != null)
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

    const now = new Date();
    const eventCountsByDay = new Map<string, number>();
    for (const event of events as EventItem[]) {
      if (!event || typeof event !== "object" || typeof event.created_at !== "string") {
        continue;
      }
      const date = event.created_at.slice(0, 10);
      const created = new Date(event.created_at);
      const diffMs = now.getTime() - created.getTime();
      if (diffMs > 365 * 24 * 60 * 60 * 1000) continue;
      eventCountsByDay.set(date, (eventCountsByDay.get(date) ?? 0) + 1);
    }

    const dailyCounts = [...eventCountsByDay.keys()]
      .sort()
      .map((date) => ({ date, count: eventCountsByDay.get(date) ?? 0 }));

    const recentThirty = dailyCounts.slice(-30);
    const lastDayCount = recentThirty.length > 0 ? recentThirty[recentThirty.length - 1].count : 0;
    const lastMonthCount = recentThirty.reduce((sum, entry) => sum + entry.count, 0);
    const lastYearCount = dailyCounts.reduce((sum, entry) => sum + entry.count, 0);

    const topLanguages = Object.entries(languageCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));

    return NextResponse.json({
      publicRepos: typeof user.public_repos === "number" ? user.public_repos : 0,
      repos: sortedRepos,
      topLanguages,
      contributionEvents: {
        lastDayCount,
        lastMonthCount,
        lastYearCount,
        dailyCounts,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Unexpected error talking to GitHub" },
      { status: 500 }
    );
  }
}

