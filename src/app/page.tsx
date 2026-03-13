import Link from "next/link";
import { CompanyLogo } from "./sections/company-logo";
import { GithubActivity } from "./sections/github";
import { ChatAssistant } from "./sections/chat-assistant";
import { ContactForm } from "./sections/contact-form";
import { ContactIconsBar, ContactIconsList } from "./sections/contact-icons";

const CONTACT_LINKS = {
  email: "saisrinivaspedhapolla@gmail.com",
  phone: undefined as string | undefined, // e.g. "+1234567890"
  linkedin: "https://www.linkedin.com/in/sai-srinivas-52035319b/",
  github: "https://github.com/saisrinivas194",
  profileImage: "/images/IMG_9630.png",
  profileName: "Sai Srinivas",
};

const TECH_BADGES = [
  "Python",
  "SQL",
  "ETL/ELT",
  "AWS",
  "Snowflake",
  "Firebase",
  "Git",
  "Vercel",
  "Cursor",
  "Railway",
  "TensorFlow",
  "PostgreSQL",
  "Prompt Engineering",
  "Machine Learning",
  "Full Stack",
];

/** Project with highlight points and repo link, for categorized display */
type ProjectCard = {
  name: string;
  repoUrl: string;
  /** Optional live demo / deployed app URL */
  demoUrl?: string;
  highlights: string[];
  tags: string[];
};

/** Categories: Pipelines in one section, others grouped so visitors can understand. */
const PROJECT_CATEGORIES: { title: string; description?: string; projects: ProjectCard[] }[] = [
  {
    title: "Pipelines & Data",
    description: "ETL, data uploaders, and unified pipeline systems.",
    projects: [
      {
        name: "Unified Pipeline Suite",
        repoUrl: "https://github.com/saisrinivas194/unified_pipeline",
        highlights: [
          "Executive, Company PAC, Company Issues, Politician Issues pipelines in one CLI",
          "Shared Firebase, IndexAlign, Snowflake connectors; unified fuzzy matching",
          "Edge-case flagging and manual review exports",
        ],
        tags: ["Python", "Firebase", "Snowflake", "IndexAlign"],
      },
      {
        name: "Executive (Execuitive)",
        repoUrl: "https://github.com/saisrinivas194/Executive",
        highlights: [
          "Parses company executive donation data from spreadsheets",
          "Aggregates by election cycle and party (Republican/Democratic)",
          "Uploads to Firebase Realtime Database; optional contributor–company crosswalk",
        ],
        tags: ["Python", "Firebase"],
      },
      {
        name: "PAC Data Pipelines",
        repoUrl: "https://github.com/saisrinivas194/pac_data_pipelines",
        highlights: [
          "Company PAC donation data pipelines and processing",
          "Structured for analytics and reporting",
        ],
        tags: ["Python", "Data"],
      },
      {
        name: "Contact & Subsidiary Uploader",
        repoUrl: "https://github.com/saisrinivas194/contact-subsidiary-uploader",
        highlights: [
          "Uploads company contacts and subsidiary relationships from CSV to Firebase",
          "Fuzzy matching with auto-accept and manual-review thresholds",
          "Dry-run and single-company test modes",
        ],
        tags: ["Python", "Firebase"],
      },
    ],
  },
  {
    title: "Full-stack & Web Apps",
    description: "End-to-end applications with frontend and backend.",
    projects: [
      {
        name: "Tasknex",
        repoUrl: "https://github.com/saisrinivas194/Tasknex",
        demoUrl: "https://tasknex-production.up.railway.app/dashboard",
        highlights: [
          "AI-powered workflow and task app: describe a goal → get phases and tasks",
          "Kanban board (Planned / In progress / Completed), drag-and-drop, priorities, due dates",
          "Next.js 14 + FastAPI + PostgreSQL; JWT auth; optional OpenAI for generation",
        ],
        tags: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL"],
      },
      {
        name: "Fin-GUU",
        repoUrl: "https://github.com/saisrinivas194/Fin-GUU",
        highlights: [
          "Financial or analytics tooling for Goods Unite Us context",
        ],
        tags: ["Python", "Data"],
      },
    ],
  },
  {
    title: "Tools & Utilities",
    description: "Dev tools, uploaders, and automation.",
    projects: [
      {
        name: "Python Web Terminal / Compiler",
        repoUrl: "https://github.com/saisrinivas194/compiler",
        highlights: [
          "Run Python in the browser with smart suggestions and syntax highlighting",
          "Debug mode, light/dark theme, code history",
        ],
        tags: ["Python", "Flask", "JavaScript"],
      },
      {
        name: "OCR Doc Reads",
        repoUrl: "https://github.com/saisrinivas194/ocr-doc-reads",
        highlights: [
          "Document reading and OCR-based extraction",
        ],
        tags: ["Python"],
      },
      {
        name: "CSV Analyzer",
        repoUrl: "https://github.com/saisrinivas194/csv_analyzer",
        highlights: [
          "Analyze and process CSV data",
        ],
        tags: ["Python", "Data"],
      },
      {
        name: "Traffic Analysis Tool",
        repoUrl: "https://github.com/saisrinivas194/Traffic-analysis-tool-saisrinivas194",
        highlights: [
          "Traffic or usage analysis tooling",
        ],
        tags: ["Python", "Data"],
      },
    ],
  },
  {
    title: "Dashboards & Analytics",
    description: "Visualization and reporting.",
    projects: [
      {
        name: "Recipe Health Dashboards",
        repoUrl: "https://github.com/saisrinivas194/Recipe_Health_Dashboards",
        highlights: [
          "Dashboards for recipe and health-related metrics",
        ],
        tags: ["Python", "Dashboard"],
      },
      {
        name: "GA4 Analytics",
        repoUrl: "https://github.com/saisrinivas194/GA4_analytics",
        highlights: [
          "Google Analytics 4 integration and analytics",
        ],
        tags: ["Analytics", "GA4"],
      },
    ],
  },
];

const COMPANIES = [
  {
    name: "Goods Unite Us",
    role: "Software Intern",
    location: "New Jersey, USA",
    website: "https://goodsuniteus.com",
    logoDomain: "goodsuniteus.com",
    period: "Sep 2025 – Present",
    bullets: [
      "Engineered Python-based data pipelines and backend services with robust data modeling for analytics and ML workloads.",
      "Architected modular ETL/ELT components for structured and semi-structured data using object-oriented design.",
      "Automated high-volume Linux-based ingestion and validation pipelines with strong logging and error handling.",
    ],
  },
  {
    name: "Webdaddy",
    role: "Python Developer R&D Intern",
    location: "India",
    website: "https://webdaddy.sg/",
    logoDomain: "webdaddy.sg",
    logoUrl: "/images/webdaddy-logo.png",
    period: "Aug 2024 – Feb 2025",
    bullets: [
      "Developed Python tooling to build end-to-end data pipelines integrating APIs, flat files, and relational databases.",
      "Resolved performance and reliability issues across workflows via systematic debugging and query tuning.",
      "Automated system and data workflows with Python and Bash using schedulers and cron.",
    ],
  },
  {
    name: "Findem",
    role: "R&D Data Analyst Intern",
    location: "Bangalore, India",
    website: "https://findem.ai",
    logoDomain: "findem.ai",
    period: "Jul 2023 – Dec 2023",
    bullets: [
      "Engineered backend services with FastAPI and Django to support scalable ingest and transformation.",
      "Maintained Linux-based data processing applications focusing on throughput and reliability.",
      "Prepared ML training datasets via feature engineering, cleansing, and validation checks.",
    ],
  },
];

const EDUCATION = [
  {
    name: "New Jersey Institute of Technology",
    degree: "Master of Science, Data Science",
    location: "Newark, New Jersey, USA",
    period: "2024 – 2025",
    gpa: "3.34/4",
    logoDomain: "njit.edu",
    logoUrl: "/images/njit-logo.png",
  },
  {
    name: "Sri Chandrasekharendra Saraswathi Viswa Mahavidyalaya",
    degree: "Bachelor of Science, Computer Science",
    location: "Kanchipuram, Tamil Nadu, India",
    period: "2019 – 2023",
    gpa: "9.44/10",
    logoDomain: "scsvmv.ac.in",
    logoUrl: "/images/scsvmv-logo.png",
  },
];

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
            Data Engineer | Data Science Graduate Student
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
            Building reliable data pipelines and ML-ready datasets.
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-zinc-300 sm:text-base">
            Data engineer and data science graduate student focused on building
            scalable data pipelines, ETL/ELT systems, and machine learning
            workflows using Python, SQL, and cloud platforms. I design
            production-grade ingestion, transformation, and validation workflows
            that keep analytics and ML teams unblocked.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="#projects"
              className="rounded-full bg-blue-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-400"
            >
              View Projects
            </Link>
            <a
              href="/Sai%20Srinivas%20Pedhapolla_Data%20Engineer.pdf"
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
              <li>— 3 internships across data engineering and backend systems</li>
              <li>— Hands-on ETL, data modeling, and ML data preparation</li>
              <li>— Python + SQL + cloud platforms (AWS, GCP, Snowflake)</li>
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
              Recent contributions and top languages.
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
            title="AI & Prompting"
            items={[
              "Prompt engineering",
              "LLM APIs (OpenAI, etc.)",
              "RAG (Retrieval-Augmented Generation)",
              "AI assistant design",
              "Prompt design & optimization",
              "Context window management",
            ]}
          />
          <SkillGroup
            title="Machine Learning & ML Analysis"
            items={[
              "TensorFlow",
              "PyTorch",
              "scikit-learn",
              "ML analysis & modeling",
              "Feature engineering",
              "EDA & statistical modeling",
              "Model training & evaluation",
              "NLP basics",
            ]}
          />
          <SkillGroup
            title="Full Stack & AI-Based Development"
            items={[
              "Python full stack",
              "AI-based full stack apps",
              "Next.js / React",
              "REST APIs (FastAPI, Django)",
              "Frontend + backend integration",
            ]}
          />
          <SkillGroup
            title="Programming & Query"
            items={["Python", "SQL", "Java", "JavaScript", "Bash"]}
          />
          <SkillGroup
            title="Git, Hosting & Deployment"
            items={[
              "Git / GitHub",
              "Vercel",
              "Hosting & deployment",
              "Domain management",
              "Railway",
              "CI/CD basics",
            ]}
          />
          <SkillGroup
            title="Cloud, Data & Hosting Platforms"
            items={["AWS", "Snowflake", "Firebase", "Railway", "GCP", "Vercel"]}
          />
          <SkillGroup
            title="Databases"
            items={["PostgreSQL", "MongoDB", "SQL Server", "Snowflake"]}
          />
          <SkillGroup
            title="Tools & Workflow"
            items={[
              "Cursor",
              "VS Code",
              "Git / GitHub",
              "Linux",
              "Jupyter",
              "Tableau",
              "Power BI",
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
              One-page resume snapshot.
            </h2>
          </div>
          <a
            href="/Sai%20Srinivas%20Pedhapolla_Data%20Engineer.pdf"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-medium text-blue-300 hover:text-blue-200"
          >
            Download PDF →
          </a>
        </div>
        <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 text-xs text-zinc-300 sm:text-sm">
          <p className="font-semibold text-zinc-100">
            Summary — Entry-level Data Engineer &amp; Data Science Graduate
          </p>
          <p className="mt-2">
            Internship experience designing and operating Python-based data
            pipelines, ETL/ELT workflows, and backend data services. Hands-on
            with data ingestion from APIs, files, and relational databases,
            plus ML data preparation and Linux-based automation.
          </p>
          <p className="mt-2">
            Proficient in Python, SQL, Bash, data modeling, schema management,
            big data concepts, and Git-based collaboration.
          </p>
        </div>
      </section>

      <section id="contact" className="space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-400">
            Contact
          </p>
          <h2 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
            Let&apos;s talk about data roles.
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

