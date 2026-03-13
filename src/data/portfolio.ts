/**
 * Single source of truth for portfolio content.
 * Used by the site UI and by the AI assistant (JAD) for context.
 */

export const CONTACT_LINKS = {
  email: "saisrinivaspedhapolla@gmail.com",
  phone: undefined as string | undefined,
  linkedin: "https://www.linkedin.com/in/sai-srinivas-52035319b/",
  github: "https://github.com/saisrinivas194",
  profileImage: "/images/IMG_9630.png",
  profileName: "Sai Srinivas",
};

/** Current location for recruiters. */
export const LOCATION = "Harrison, New Jersey, USA";

/** Work authorization: F1 OPT EAD with 2-year STEM OPT extension. */
export const WORK_AUTHORIZATION = "F1 OPT EAD (2-year STEM OPT extension)";

export const TECH_BADGES = [
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

export type ProjectCard = {
  name: string;
  repoUrl: string;
  demoUrl?: string;
  highlights: string[];
  tags: string[];
};

export const PROJECT_CATEGORIES: { title: string; description?: string; projects: ProjectCard[] }[] = [
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

export const COMPANIES = [
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

export const EDUCATION = [
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

const HERO_SUMMARY =
  "Data engineer and data science graduate student focused on building scalable data pipelines, ETL/ELT systems, and machine learning workflows using Python, SQL, and cloud platforms. Design production-grade ingestion, transformation, and validation workflows that keep analytics and ML teams unblocked.";

/**
 * Builds the full portfolio context string for the AI assistant (JAD).
 * Includes experience, education, all projects with highlights/tags, skills, and contact.
 */
export function buildPortfolioContext(): string {
  const sections: string[] = [];

  sections.push("Candidate: Sai Srinivas Pedhapolla");
  sections.push("Title: Data Engineer | Data Science Graduate Student");
  sections.push("");
  sections.push("Professional summary:");
  sections.push(HERO_SUMMARY);
  sections.push("");

  sections.push("--- Experience ---");
  for (const c of COMPANIES) {
    sections.push(`${c.name} — ${c.role}, ${c.location} (${c.period}):`);
    c.bullets.forEach((b) => sections.push(`- ${b}`));
    sections.push("");
  }

  sections.push("--- Education ---");
  for (const e of EDUCATION) {
    sections.push(`${e.name}: ${e.degree}, ${e.location} (${e.period}), GPA: ${e.gpa}`);
  }
  sections.push("");

  sections.push("--- Projects (by category) ---");
  for (const cat of PROJECT_CATEGORIES) {
    sections.push(`${cat.title}${cat.description ? ` — ${cat.description}` : ""}`);
    for (const p of cat.projects) {
      sections.push(`- ${p.name} (${p.repoUrl})`);
      p.highlights.forEach((h) => sections.push(`  · ${h}`));
      if (p.demoUrl) sections.push(`  · Demo: ${p.demoUrl}`);
      sections.push(`  Tags: ${p.tags.join(", ")}`);
    }
    sections.push("");
  }

  sections.push("--- Skills & technologies ---");
  sections.push(TECH_BADGES.join(", "));
  sections.push("");

  sections.push("--- Location & work authorization ---");
  sections.push(`Location: ${LOCATION}`);
  sections.push(`Work authorization: ${WORK_AUTHORIZATION}`);
  sections.push("");

  sections.push("--- Contact ---");
  sections.push(`Email: ${CONTACT_LINKS.email}`);
  sections.push(`LinkedIn: ${CONTACT_LINKS.linkedin}`);
  sections.push(`GitHub: ${CONTACT_LINKS.github}`);

  return sections.join("\n");
}
