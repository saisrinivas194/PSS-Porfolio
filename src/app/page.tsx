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
            Data Engineer · ETL/ELT & Cloud Pipelines · AI-Enabled Data Systems
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
            Data engineer with 2+ years of experience building and optimizing
            ETL pipelines, scalable architectures, and analytics-ready data
            systems using Python, SQL, PySpark, Databricks, and AWS. I ingest
            and transform structured, semi-structured, and API-driven data
            from multiple sources, automate manual processes, and improve
            data quality, reliability, and downstream usability &mdash; with
            growing hands-on alignment to AI-enabled data workflows, agentic
            concepts, and LLM-powered systems.
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
              <li>— 2+ years building ETL/ELT pipelines and analytics-ready data systems</li>
              <li>— PySpark, Databricks, schema-aware modeling, REST API integration, and growing AI-enabled workflows</li>
              <li>— Python · SQL · PySpark · Databricks · AWS · Snowflake · RAG/LLM-powered pipelines</li>
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
              "PySpark / Spark SQL",
              "Databricks",
              "Distributed & batch processing",
              "Data modeling & schema design",
              "Data warehousing",
              "Query optimization",
              "Data validation & quality",
              "dbt",
              "Apache Airflow",
            ]}
          />
          <SkillGroup
            title="APIs & Workflow Automation"
            items={[
              "REST APIs & API integration",
              "API-driven data pipelines",
              "JSON / XML / Parquet",
              "Multi-source data ingestion",
              "Workflow automation",
              "External system integration",
            ]}
          />
          <SkillGroup
            title="AI-Enabled Data Systems"
            items={[
              "Agentic workflow concepts",
              "LLM-powered workflows",
              "RAG (Retrieval-Augmented Generation)",
              "Prompt design",
              "Tool / API integration",
              "Semantic retrieval",
              "LangChain / LlamaIndex",
              "Hugging Face Transformers",
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
            items={[
              "AWS",
              "Amazon S3",
              "AWS Glue",
              "AWS Lambda",
              "AWS Redshift",
              "Databricks",
              "GCP",
              "Snowflake",
              "BigQuery",
              "Azure",
            ]}
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

      <section id="resume" className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-400">
              Resume
            </p>
            <h2 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
              Download my resume.
            </h2>
          </div>
          <a
            href="https://drive.google.com/uc?export=download&id=16HRDdQg2DTPfSheI9KZx58lDZqmPflAS"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-zinc-700 px-4 py-2 text-xs font-medium text-zinc-100 transition hover:border-blue-400 hover:text-blue-200"
          >
            Download PDF →
          </a>
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 text-sm text-zinc-300">
          <p className="font-semibold text-zinc-100">Sai Srinivas Pedhapolla</p>
          <p className="mt-1 text-xs text-blue-400">Data Engineer · ETL/ELT & Cloud Pipelines · AI-Enabled Data Systems</p>
          <p className="mt-3 text-xs leading-relaxed">
            Internship experience building Python and SQL data pipelines, ETL/ELT workflows,
            BI dashboards, LLM-backed features, RAG pipelines, and ML model evaluation systems.
            Proficient in Python, SQL, TensorFlow, PyTorch, LangChain, Power BI, Tableau, AWS, GCP, and Snowflake.
          </p>
          <a
            href="https://drive.google.com/uc?export=download&id=16HRDdQg2DTPfSheI9KZx58lDZqmPflAS"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block text-xs font-medium text-blue-300 hover:text-blue-200"
          >
            Download full resume (PDF) →
          </a>
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


