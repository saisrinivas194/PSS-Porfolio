/* GitHub sections: rotating repo carousel, grid fallback, and activity summary */
"use client";

import { useCallback, useEffect, useState } from "react";

type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
};

type GithubSummary = {
  publicRepos: number;
  topLanguages: { name: string; count: number }[];
};

const ROTATE_INTERVAL_MS = 4500;

/** Normalize to repo name: "repo", "owner/repo", or "https://github.com/owner/repo" -> "repo" */
function toRepoName(entry: string): string {
  const trimmed = entry.trim();
  if (trimmed.startsWith("http")) {
    try {
      const path = new URL(trimmed).pathname;
      const parts = path.split("/").filter(Boolean);
      return parts[parts.length - 1] ?? trimmed;
    } catch {
      return trimmed;
    }
  }
  if (trimmed.includes("/")) {
    return trimmed.split("/").filter(Boolean).pop() ?? trimmed;
  }
  return trimmed;
}

function safeFeaturedReposKey(featuredRepos: string[] | undefined): string {
  if (featuredRepos == null || !Array.isArray(featuredRepos)) return "";
  return featuredRepos.map((e) => (typeof e === "string" ? e : "")).join(",");
}

export function GithubProjects({ featuredRepos = [] }: { featuredRepos?: string[] }) {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [index, setIndex] = useState(0);
  const reposKey = safeFeaturedReposKey(featuredRepos);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/github");
        if (cancelled) return;
        if (!res.ok) {
          throw new Error("Failed to load repositories");
        }
        const data = await res.json();
        const allRepos: Repo[] = Array.isArray(data?.repos) ? data.repos : [];
        let list = allRepos;
        const listParam = Array.isArray(featuredRepos) ? featuredRepos : [];
        if (listParam.length > 0) {
          const names = listParam.map(toRepoName).filter(Boolean);
          const byName = new Map(allRepos.map((r) => [r.name.toLowerCase(), r]));
          list = names
            .map((name) => byName.get(String(name).toLowerCase()))
            .filter((r): r is Repo => r != null);
        }
        if (!cancelled) setRepos(list);
      } catch (err) {
        if (!cancelled) setError("Unable to load GitHub repositories at the moment.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [reposKey]);

  const goTo = useCallback(
    (next: number) => {
      if (!repos.length) return;
      setIndex((i) => (i + next + repos.length) % repos.length);
    },
    [repos.length]
  );

  useEffect(() => {
    if (repos.length <= 1) return;
    const id = setInterval(() => goTo(1), ROTATE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [repos.length, goTo]);

  if (loading) {
    return (
      <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 text-center text-sm text-zinc-300">
        Loading GitHub projects…
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-4 rounded-2xl border border-red-900/60 bg-red-950/40 p-4 text-sm text-red-200">
        {error}
      </div>
    );
  }

  if (!repos.length) {
    return null;
  }

  return (
    <div className="mt-4 space-y-4">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400">
        My Repositories
      </p>
      <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/40">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {repos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="group flex min-w-full flex-col gap-3 rounded-2xl border-0 bg-zinc-900/50 p-5 text-left transition hover:bg-zinc-900/80"
            >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="truncate text-base font-semibold text-white">
                    {repo.name}
                  </h3>
                  {typeof repo.stargazers_count === "number" &&
                    repo.stargazers_count > 0 && (
                      <span className="shrink-0 rounded-full bg-zinc-800 px-2.5 py-1 text-xs text-zinc-300">
                        ★ {repo.stargazers_count}
                      </span>
                    )}
                </div>
                {repo.description && (
                  <p className="line-clamp-3 text-sm text-zinc-300">
                    {repo.description}
                  </p>
                )}
                <div className="mt-auto flex items-center justify-between text-xs text-zinc-400">
                  <span className="rounded-full bg-zinc-800 px-3 py-1 text-zinc-100">
                    {repo.language ?? "—"}
                  </span>
                  <span className="text-blue-300 group-hover:text-blue-200">
                    View on GitHub →
                  </span>
                </div>
              </a>
          ))}
        </div>
        {repos.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(-1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-zinc-700 bg-zinc-900/90 p-2 text-zinc-300 shadow-lg transition hover:border-blue-500/70 hover:bg-zinc-800 hover:text-white"
              aria-label="Previous repository"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => goTo(1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-zinc-700 bg-zinc-900/90 p-2 text-zinc-300 shadow-lg transition hover:border-blue-500/70 hover:bg-zinc-800 hover:text-white"
              aria-label="Next repository"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div className="flex justify-center gap-1.5 pb-3 pt-2">
              {repos.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === index
                      ? "w-6 bg-blue-500"
                      : "w-2 bg-zinc-600 hover:bg-zinc-500"
                  }`}
                  aria-label={`Go to repository ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export function GithubActivity() {
  const [summary, setSummary] = useState<GithubSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/github");
        if (!res.ok) {
          throw new Error("Failed to load GitHub summary");
        }
        const data = await res.json();
        setSummary({
          publicRepos: data.publicRepos ?? 0,
          topLanguages: data.topLanguages ?? [],
        });
      } catch (err) {
        setError("Unable to load GitHub stats right now.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
      <div className="space-y-3 rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400">
          Contributions
        </p>
        <div className="rounded-xl border border-zinc-800 bg-black/40 p-2">
          <img
            src="https://ghchart.rshah.org/4444ff/saisrinivas194"
            alt="GitHub contribution graph for saisrinivas194"
            className="w-full rounded-lg border border-zinc-800/60 bg-zinc-950"
            loading="lazy"
          />
        </div>
        <p className="text-xs text-zinc-400">
          Snapshot of recent GitHub contributions. Darker squares indicate more
          activity.
        </p>
      </div>
      <div className="space-y-3 rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400">
          Overview
        </p>
        {loading ? (
          <p className="text-sm text-zinc-300">Loading GitHub stats…</p>
        ) : error ? (
          <p className="text-sm text-red-200">{error}</p>
        ) : summary ? (
          <div className="space-y-3 text-sm text-zinc-300">
            <p>
              Public repositories:{" "}
              <span className="font-semibold text-zinc-100">
                {summary.publicRepos}
              </span>
            </p>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                Top languages
              </p>
              <ul className="mt-2 flex flex-wrap gap-2 text-xs">
                {summary.topLanguages.length ? (
                  summary.topLanguages.map((lang) => (
                    <li
                      key={lang.name}
                      className="rounded-full bg-zinc-800 px-3 py-1 text-zinc-100"
                    >
                      {lang.name} · {lang.count} repos
                    </li>
                  ))
                ) : (
                  <li className="text-zinc-400">
                    Languages will appear as repositories are updated.
                  </li>
                )}
              </ul>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

