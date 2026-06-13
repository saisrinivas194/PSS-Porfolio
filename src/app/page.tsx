import React from "react";
import Link from "next/link";
import {
  CONTACT_LINKS,
  TECH_BADGES,
  PROJECT_CATEGORIES,
  COMPANIES,
  EDUCATION,
  LOCATION,
  WORK_AUTHORIZATION,
} from "@/data/portfolio";
import { CompanyLogo } from "./sections/company-logo";
import { GithubActivity } from "./sections/github";
import { ChatAssistant } from "./sections/chat-assistant";
import { ContactForm } from "./sections/contact-form";
import { ContactIconsBar, ContactIconsList } from "./sections/contact-icons";
import { PrintButton } from "./sections/print-button";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-24 px-4 pb-24 pt-16 sm:px-6 lg:px-8 lg:pt-20">
      <header className="flex flex-wrap items-center justify-between gap-6">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-400">
            Portfolio
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
            Sai Srinivas Pedhapolla
          </h1>
          <p className="mt-1 text-sm text-zinc-400 sm:text-base">
            Data Analyst · Data Engineer · AI Engineer · BI Professional
          </p>
          <ContactIconsBar links={CONTACT_LINKS} className="mt-3 sm:hidden" />
        </div>
        <div className="flex items-center gap-4">
          <ContactIconsBar links={CONTACT_LINKS} className="hidden sm:flex" />
          <nav className="hidden gap-4 text-sm text-zinc-300 sm:flex">
            <a href="#projects" className="hover:text-white">
              Projects
            </a>
            <a href="#experience" className="hover:text-white">
              Experience
            </a>
            <a href="#skills" className="hover:text-white">
              Skills
            </a>
            <a href="#contact" className="hover:text-white">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <section
        id="hero"
        className="grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)] md:items-center"
      >
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
            Overview
          </p>
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Delivering analytics pipelines, AI systems, and business insights.
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-zinc-300 sm:text-base">
            Data analyst, data engineer, and AI engineer with hands-on experience in
            SQL, Python, ETL/ELT, BI reporting, LLM APIs, RAG pipelines, and ML model
            deployment. I build scalable data workflows, data models, and AI-powered
            solutions that help product, analytics, and operations teams act on
            trusted data and intelligent automation.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="#projects"
              className="rounded-full bg-blue-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-400"
            >
              View Projects
            </Link>
            <a
              href="https://drive.google.com/uc?export=download&id=16HRDdQg2DTPfSheI9KZx58lDZqmPflAS"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-zinc-700 px-5 py-2.5 text-sm font-medium text-zinc-100 transition hover:border-blue-400 hover:text-blue-200"
              aria-label="Download resume"
            >
              Download Resume
            </a>
            <a
              href="https://github.com/saisrinivas194"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-100 transition hover:border-blue-400 hover:text-blue-200"
            >
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/sai-srinivas-52035319b/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-100 transition hover:border-blue-400 hover:text-blue-200"
            >
              <span>LinkedIn</span>
            </a>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {TECH_BADGES.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-zinc-700 bg-zinc-900/60 px-3 py-1 text-xs font-medium text-zinc-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="pointer-events-none absolute -inset-6 rounded-3xl bg-blue-500/20 blur-3xl" />
          <div className="relative rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900/60 to-black/80 p-6 shadow-xl shadow-black/50">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-400">
              Snapshot
            </p>
            <p className="mt-3 text-sm text-zinc-300">
              Within 30 seconds, recruiters can see:
            </p>
            <ul className="mt-3 space-y-2 text-sm text-zinc-200">
              <li>— 3 internships across data analytics, engineering, and AI</li>
              <li>— ETL/ELT, data modeling, dashboards, LLM APIs, RAG, and ML deployment</li>
              <li>— Python · SQL · TensorFlow · PyTorch · LangChain · Power BI · Tableau · AWS · GCP · Snowflake</li>
              <li>— Based in {LOCATION} · {WORK_AUTHORIZATION}</li>
            </ul>
            <p className="mt-4 text-xs text-zinc-400">
              Ask the AI assistant anything about my experience, projects, or
              skills — it is grounded in my resume and GitHub profile.
            </p>
          </div>
        </div>
      </section>

      <section id="projects" className="space-y-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-400">
              Projects
            </p>
            <h2 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
              Pipelines, apps, and tools — by category.
            </h2>
          </div>
          <Link
            href="https://github.com/saisrinivas194"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-medium text-blue-300 hover:text-blue-200"
          >
            View all on GitHub →
          </Link>
        </div>

        {PROJECT_CATEGORIES.map((category) => (
          <div key={category.title} className="space-y-4">
            <div>
              <h3 className="text-base font-semibold text-white sm:text-lg">
                {category.title}
              </h3>
              {category.description && (
                <p className="mt-1 text-sm text-zinc-400">
                  {category.description}
                </p>
              )}
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {category.projects.map((project) => (
                <article
                  key={project.name}
                  className="flex flex-col gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 transition hover:border-zinc-700"
                >
                  <h4 className="text-sm font-semibold text-white">
                    {project.name}
                  </h4>
                  <ul className="flex-1 space-y-1.5 text-xs text-zinc-300">
                    {project.highlights.map((point, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-blue-400/80">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-zinc-800 px-2.5 py-0.5 text-xs text-zinc-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex shrink-0 flex-wrap items-center gap-3">
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-medium text-blue-300 hover:text-blue-200"
                        >
                          Live demo →
                        </a>
                      )}
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-medium text-zinc-400 hover:text-zinc-300"
                      >
                        View repo →
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}

      </section>

      <section id="github-activity" className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-400">
              GitHub Activity
            </p>
            <h2 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
              Monthly contributions and top languages.
            </h2>
          </div>
        </div>
        <GithubActivity />
      </section>

      <section id="skills" className="space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-400">
            Skills
          </p>
          <h2 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
            Technical skill set at a glance.
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <SkillGroup
            title="Data Engineering"
            items={[
              "ETL / ELT pipelines",
              "Data ingestion & orchestration",
              "Data modeling & schema design",
              "Data warehousing",
              "Batch & stream processing",
              "Data validation & quality",
              "dbt",
              "Apache Airflow",
            ]}
          />
          <SkillGroup
            title="AI Engineering"
            items={[
              "LLM APIs (OpenAI, Gemini, Claude)",
              "RAG (Retrieval-Augmented Generation)",
              "LangChain / LlamaIndex",
              "Hugging Face Transformers",
              "LLM Fine-tuning",
              "Prompt engineering & optimization",
              "AI assistant / agent design",
              "Vector databases (Pinecone, Chroma)",
              "Model evaluation & benchmarking",
              "FastAPI AI microservices",
            ]}
          />
          <SkillGroup
            title="Machine Learning & Analytics"
            items={[
              "TensorFlow",
              "PyTorch",
              "scikit-learn",
              "EDA & statistical analysis",
              "Feature engineering",
              "Regression & forecasting",
              "Hypothesis testing",
              "Data storytelling",
              "Anomaly detection",
              "Model deployment (Docker, FastAPI)",
            ]}
          />
          <SkillGroup
            title="Analytics Apps & Reporting"
            items={[
              "Python analytics apps",
              "BI dashboards and reporting",
              "Power BI",
              "Tableau",
              "Looker / Looker Studio",
              "Google Data Studio",
              "Self-serve analytics",
              "Dashboard design",
            ]}
          />
          <SkillGroup
            title="Programming & Query"
            items={["Python", "SQL", "PostgreSQL", "MySQL", "T-SQL", "PL/SQL", "Bash"]}
          />
          <SkillGroup
            title="Git, Workflow & Automation"
            items={[
              "Git / GitHub",
              "CI/CD",
              "Test automation",
              "Jira / Agile",
              "Pair programming",
              "Documentation",
            ]}
          />
          <SkillGroup
            title="Cloud, Data & Warehousing"
            items={["AWS", "GCP", "Snowflake", "BigQuery", "Redshift", "Azure"]}
          />
          <SkillGroup
            title="Databases & Data Modeling"
            items={["PostgreSQL", "MySQL", "SQL Server", "Snowflake", "MongoDB", "NoSQL"]}
          />
          <SkillGroup
            title="Tools & Productivity"
            items={[
              "Excel",
              "Advanced Excel",
              "Pivot Tables",
              "VLOOKUP / XLOOKUP",
              "Google Sheets",
              "Jupyter Notebook",
              "Power BI",
              "Tableau",
            ]}
          />
        </div>
      </section>

      <section id="experience" className="space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-400">
            Experience
          </p>
          <h2 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
            Timeline of data-focused roles.
          </h2>
        </div>
        <ol className="space-y-6 border-l border-zinc-800 pl-4">
          {COMPANIES.map((company) => (
            <ExperienceItem
              key={company.name}
              company={company.name}
              role={company.role}
              location={company.location}
              period={company.period}
              bullets={company.bullets}
              website={company.website}
              logoDomain={company.logoDomain}
              logoUrl={company.logoUrl}
            />
          ))}
        </ol>
      </section>

      <section id="education" className="space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-400">
            Education
          </p>
          <h2 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
            Academic background.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {EDUCATION.map((school) => (
            <div
              key={school.name}
              className="flex gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4"
            >
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-zinc-800 bg-zinc-900">
                <CompanyLogo name={school.name} logoDomain={school.logoDomain} logoUrl={school.logoUrl} />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-white">
                  {school.name}
                </h3>
                <p className="mt-1 text-xs text-zinc-300">{school.degree}</p>
                <p className="mt-1 text-xs text-zinc-400">
                  {school.period} · {school.location}
                </p>
                {school.gpa && (
                  <p className="mt-1 text-xs text-zinc-400">
                    GPA: {school.gpa}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="resume" className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-400">
              Resume
            </p>
            <h2 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
              Full resume — inline.
            </h2>
          </div>
          <div className="flex gap-3">
            <PrintButton />
            <a
              href="https://drive.google.com/uc?export=download&id=16HRDdQg2DTPfSheI9KZx58lDZqmPflAS"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-zinc-700 px-4 py-2 text-xs font-medium text-zinc-100 transition hover:border-blue-400 hover:text-blue-200"
            >
              Download PDF →
            </a>
          </div>
        </div>

        <div id="resume-print" className="rounded-2xl border border-zinc-700 bg-white text-zinc-900 shadow-2xl overflow-hidden">
          {/* Header — full width */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-500 px-8 py-6 text-white">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Sai Srinivas Pedhapolla
            </h2>
            <p className="mt-1 text-sm font-medium text-blue-100">
              Data Analyst · Data Engineer · AI Engineer · BI Professional
            </p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-blue-100">
              <span>{CONTACT_LINKS.email}</span>
              <span>{LOCATION}</span>
              <a href={CONTACT_LINKS.linkedin} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-white">
                linkedin.com/in/saisrinivas-194-ssr
              </a>
              <a href={CONTACT_LINKS.github} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-white">
                github.com/saisrinivas194
              </a>
              <span className="text-blue-200">{WORK_AUTHORIZATION}</span>
            </div>
          </div>

          {/* Body — two-column */}
          <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
            {/* LEFT SIDEBAR */}
            <div className="space-y-6 border-r border-zinc-100 bg-zinc-50 px-6 py-6">

              <ResumeBlock title="Summary">
                <p className="text-xs leading-relaxed text-zinc-600">
                  Data Analyst, Data Engineer, and AI Engineer with internship experience
                  building Python/SQL pipelines, ETL/ELT workflows, BI dashboards,
                  LLM-backed features, RAG pipelines, and ML model evaluation systems.
                </p>
              </ResumeBlock>

              <ResumeBlock title="Languages & Query">
                <ResumeChips items={["Python", "SQL", "PostgreSQL", "MySQL", "T-SQL", "PL/SQL", "Bash"]} />
              </ResumeBlock>

              <ResumeBlock title="AI & ML">
                <ResumeChips items={["TensorFlow", "PyTorch", "scikit-learn", "Hugging Face", "LangChain", "OpenAI API", "RAG", "LLM Fine-tuning", "Prompt Engineering", "Pinecone", "Chroma"]} />
              </ResumeBlock>

              <ResumeBlock title="Data Engineering">
                <ResumeChips items={["ETL/ELT", "dbt", "Apache Airflow", "Data Modeling", "Schema Design", "Data Validation", "Batch Processing"]} />
              </ResumeBlock>

              <ResumeBlock title="BI & Visualization">
                <ResumeChips items={["Power BI", "Tableau", "Looker", "Looker Studio", "Google Data Studio", "Dashboard Design"]} />
              </ResumeBlock>

              <ResumeBlock title="Cloud & Warehousing">
                <ResumeChips items={["AWS", "GCP", "Azure", "Snowflake", "BigQuery", "Redshift"]} />
              </ResumeBlock>

              <ResumeBlock title="Tools & DevOps">
                <ResumeChips items={["FastAPI", "Django", "Docker", "Git", "CI/CD", "Jupyter Notebook", "Excel", "Google Sheets"]} />
              </ResumeBlock>

              <ResumeBlock title="Education">
                {EDUCATION.map((e) => (
                  <div key={e.name} className="mt-2 first:mt-0">
                    <p className="text-xs font-semibold text-zinc-800">{e.name}</p>
                    <p className="text-xs text-zinc-600">{e.degree}</p>
                    <p className="text-xs text-zinc-400">{e.period} · GPA {e.gpa}</p>
                  </div>
                ))}
              </ResumeBlock>
            </div>

            {/* RIGHT MAIN */}
            <div className="space-y-6 px-6 py-6">

              <ResumeBlock title="Experience">
                <div className="space-y-5">
                  {COMPANIES.map((c) => (
                    <div key={c.name} className="border-l-2 border-blue-200 pl-3">
                      <div className="flex flex-wrap items-baseline justify-between gap-1">
                        <a href={c.website} target="_blank" rel="noreferrer" className="text-sm font-bold text-zinc-900 hover:text-blue-600">
                          {c.name}
                        </a>
                        <span className="text-xs text-zinc-400">{c.period}</span>
                      </div>
                      <p className="text-xs font-semibold text-blue-600">{c.role}</p>
                      <p className="text-xs text-zinc-400">{c.location}</p>
                      <ul className="mt-1.5 space-y-1">
                        {c.bullets.map((b) => (
                          <li key={b} className="flex gap-2 text-xs text-zinc-700">
                            <span className="mt-0.5 shrink-0 text-blue-400">▸</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </ResumeBlock>

              <ResumeBlock title="Selected Projects">
                <div className="space-y-4">
                  {[
                    {
                      name: "Tasknex",
                      url: "https://github.com/saisrinivas194/Tasknex",
                      demo: "https://tasknex-production.up.railway.app/dashboard",
                      stack: "Next.js · FastAPI · PostgreSQL · OpenAI",
                      desc: "AI-powered task and workflow app — describe a goal, get structured phases and tasks. Kanban board with drag-and-drop, JWT auth, and optional LLM generation.",
                    },
                    {
                      name: "Unified Pipeline Suite",
                      url: "https://github.com/saisrinivas194/unified_pipeline",
                      stack: "Python · Snowflake · Firebase",
                      desc: "Unified CLI for Executive, PAC, and Issues data pipelines with shared connectors, fuzzy matching, and manual review exports.",
                    },
                    {
                      name: "Python Web Terminal / Compiler",
                      url: "https://github.com/saisrinivas194/compiler",
                      stack: "Python · Flask · JavaScript",
                      desc: "Run Python in the browser with smart suggestions, syntax highlighting, debug mode, and code history.",
                    },
                    {
                      name: "GA4 Analytics",
                      url: "https://github.com/saisrinivas194/GA4_analytics",
                      stack: "Python · Google Analytics 4",
                      desc: "GA4 data integration pipeline and analytics reporting workflow.",
                    },
                  ].map((p) => (
                    <div key={p.name} className="border-l-2 border-zinc-200 pl-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <a href={p.url} target="_blank" rel="noreferrer" className="text-xs font-bold text-zinc-900 hover:text-blue-600">
                          {p.name}
                        </a>
                        {p.demo && (
                          <a href={p.demo} target="_blank" rel="noreferrer" className="text-xs text-blue-500 hover:underline">
                            Live demo →
                          </a>
                        )}
                        <a href={p.url} target="_blank" rel="noreferrer" className="text-xs text-zinc-400 hover:underline">
                          GitHub →
                        </a>
                      </div>
                      <p className="text-xs text-blue-500">{p.stack}</p>
                      <p className="mt-0.5 text-xs text-zinc-600">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </ResumeBlock>

            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-400">
            Contact
          </p>
          <h2 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
            Let&apos;s talk about data analyst, data engineer, AI engineer, and BI roles.
          </h2>
        </div>
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <ContactForm />
          <div className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 text-sm text-zinc-300">
            <p className="font-semibold text-zinc-100">Direct contact</p>
            <ContactIconsList links={CONTACT_LINKS} />
          </div>
        </div>
      </section>

      <ChatAssistant />
    </main>
  );
}

type SkillGroupProps = {
  title: string;
  items: string[];
};

function SkillGroup({ title, items }: SkillGroupProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4">
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <ul className="mt-3 flex flex-wrap gap-2 text-xs text-zinc-300">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-100"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

type ExperienceItemProps = {
  company: string;
  role: string;
  location: string;
  period: string;
  bullets: string[];
  website?: string;
  logoDomain?: string;
  logoUrl?: string;
};

function ExperienceItem({
  company,
  role,
  location,
  period,
  bullets,
  website,
  logoDomain,
  logoUrl,
}: ExperienceItemProps) {
  const header = (
    <div className="flex flex-wrap items-baseline justify-between gap-2">
      <div className="flex items-center gap-3">
        {logoDomain != null && (
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-zinc-800 bg-zinc-900">
            <CompanyLogo name={company} logoDomain={logoDomain} logoUrl={logoUrl} />
          </div>
        )}
        <div>
          <p className="text-sm font-semibold text-zinc-50">{company}</p>
          <p className="text-xs text-zinc-400">
            {role} · {location}
          </p>
        </div>
      </div>
      <p className="text-xs text-zinc-500">{period}</p>
    </div>
  );

  return (
    <li className="relative space-y-2 pl-4">
      <span className="absolute left-[-0.65rem] top-1.5 h-3 w-3 rounded-full border border-blue-400 bg-blue-500/80" />
      {website ? (
        <a href={website} target="_blank" rel="noreferrer" className="block hover:opacity-90">
          {header}
          <span className="mt-0.5 inline-block text-xs text-blue-300">View company →</span>
        </a>
      ) : (
        header
      )}
      <ul className="mt-2 space-y-1.5 text-xs text-zinc-300">
        {bullets.map((bullet) => (
          <li key={bullet}>• {bullet}</li>
        ))}
      </ul>
    </li>
  );
}

function ResumeBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-2 border-b border-zinc-200 pb-1 text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400">
        {title}
      </h4>
      {children}
    </div>
  );
}

function ResumeChips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <span key={item} className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-medium text-blue-700 ring-1 ring-blue-100">
          {item}
        </span>
      ))}
    </div>
  );
}

