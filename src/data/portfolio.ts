/**
 * Single source of truth for portfolio content.
 * Used by the site UI and by the AI assistant (JAD) for context.
 */

export const CONTACT_LINKS = {
  email: "saisrinivaspedhapolla@gmail.com",
  phone: "201-705-9891" as string | undefined,
  linkedin: "https://www.linkedin.com/in/saisrinivas-194-ssr/",
  github: "https://github.com/saisrinivas194",
  portfolio: "https://saisrinivaspedhapolla.vercel.app/",
  profileImage: "/images/image.png",
  profileName: "Sai Srinivas",
};

/** Current location for recruiters. */
export const LOCATION = "New Jersey, United States";

/** Work authorization: F1 OPT EAD with 2-year STEM OPT extension. */
export const WORK_AUTHORIZATION = "F1 OPT EAD (2-year STEM OPT extension)";

export const TECH_BADGES = [
  "Python",
  "SQL",
  "PL/SQL",
  "Spark SQL",
  "PySpark",
  "Pandas",
  "DuckDB",
  "Parquet",
  "ETL/ELT",
  "Databricks",
  "Snowflake",
  "Firebase",
  "AWS",
  "Amazon S3",
  "AWS Glue",
  "AWS Lambda",
  "AWS Redshift",
  "AWS ECR",
  "AWS ECS Fargate",
  "AWS EventBridge",
  "AWS CloudWatch",
  "AWS IAM",
  "GCP",
  "GCP Cloud Functions",
  "GCP Cloud Scheduler",
  "GCP Pub/Sub",
  "GCP Cloud Monitoring",
  "BigQuery",
  "Power BI",
  "Tableau",
  "Looker",
  "dbt",
  "Git",
  "GitHub Actions",
  "CI/CD",
  "Docker",
  "Jupyter Notebook",
  "Data Modeling",
  "Dashboarding",
  "Streamlit",
  "Plotly",
  "Google Analytics 4 (GA4) API",
  "Excel",
  "Angular",
  "TypeScript",
  "JavaScript",
  "HTML5",
  "CSS3",
  "REST API Integration",
  "TensorFlow",
  "PyTorch",
  "scikit-learn",
  "Hugging Face",
  "LangChain",
  "OpenAI API",
  "FastAPI",
  "LLM Fine-tuning",
  "RAG",
  "Prompt Engineering",
  "Apache Airflow",
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
    description: "ETL, data ingestion, and analytics-ready pipeline systems.",
    projects: [
      {
        name: "Unified Pipeline Suite",
        repoUrl: "https://github.com/saisrinivas194/unified_pipeline",
        highlights: [
          "Executive, Company PAC, Company Issues, Politician Issues pipelines in one CLI",
          "Shared Firebase, IndexAlign, Snowflake connectors; unified fuzzy matching",
          "Edge-case flagging and manual review exports",
        ],
        tags: ["Python", "Firebase", "Snowflake", "Analytics"],
      },
      {
        name: "Executive (Execuitive)",
        repoUrl: "https://github.com/saisrinivas194/Executive",
        highlights: [
          "Parses company executive donation data from spreadsheets",
          "Aggregates by election cycle and party (Republican/Democratic)",
          "Uploads to Firebase Realtime Database; optional contributor–company crosswalk",
        ],
        tags: ["Python", "Firebase", "SQL", "Analytics"],
      },
      {
        name: "PAC Data Pipelines",
        repoUrl: "https://github.com/saisrinivas194/pac_data_pipeline",
        highlights: [
          "Company PAC donation data pipelines and processing",
          "Structured for analytics and reporting",
        ],
        tags: ["Python", "SQL", "Analytics"],
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
      {
        name: "NLP Pipelines for Corporate & Policy Data",
        repoUrl: "https://github.com/saisrinivas194/NLP-Pipelines-for-Corporate-and-Policy-Data",
        highlights: [
          "End-to-end pipeline unifying SEC filings, FEC political data, Gmail logs, and Snowflake datasets into structured corporate-political intelligence",
          "NLP-based executive extraction from 10-K/8-K filings; parent–subsidiary mapping from SEC Exhibit 21 (~74K subsidiaries)",
          "Entity resolution linking companies, tickers, executives, and donation records",
        ],
        tags: ["Python", "NLP", "Snowflake", "Firebase", "Entity Resolution"],
      },
      {
        name: "Politician Issues Pipeline",
        repoUrl: "https://github.com/saisrinivas194/politician_issues",
        highlights: [
          "Extracts politician stance data from Snowflake and loads it into Firebase Realtime Database",
        ],
        tags: ["Python", "Snowflake", "Firebase"],
      },
      {
        name: "Executive Crosswalk",
        repoUrl: "https://github.com/saisrinivas194/exec_crosswalk",
        highlights: [
          "Aggregates per-company executive donation spreadsheets by executive, election cycle, and party",
          "Human-in-the-loop review step (matched/low-confidence/unmatched CSV exports) required before upload",
        ],
        tags: ["Python", "Firebase", "Data Quality"],
      },
      {
        name: "Inauguration Data Uploader",
        repoUrl: "https://github.com/saisrinivas194/inaguration_uploader",
        highlights: [
          "Uploads company inauguration-contribution data to Firebase with company-name matching",
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
        repoUrl: "https://github.com/saisrinivas194/ocr-doc-read",
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
        repoUrl: "https://github.com/saisrinivas194/Traffic-analysis-tool-",
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
        repoUrl: "https://github.com/saisrinivas194/Recipe_Health_Dashboard",
        highlights: [
          "Dashboards for recipe and health-related metrics",
        ],
        tags: ["Python", "Dashboard"],
      },
      {
        name: "GA4 Analytics",
        repoUrl: "https://github.com/saisrinivas194/GA4_analytics",
        highlights: [
          "Built a Streamlit dashboard using the Google Analytics Data API, Plotly, and Pandas for real-time GA4 metrics without navigating the GA4 UI",
          "Resolved revenue reconciliation discrepancies across purchases, renewals, and refunds",
          "Modeled API responses into analysis-ready tables and built interactive visualizations for traffic, engagement, and revenue trends",
        ],
        tags: ["Analytics", "GA4", "Streamlit", "Plotly"],
      },
    ],
  },
  {
    title: "Machine Learning & Analytics",
    description: "Applied ML and exploratory data analysis.",
    projects: [
      {
        name: "Customer Personality Analysis",
        repoUrl: "https://github.com/saisrinivas194/Customer_Personality_Analysis_Python_Machine_Learning",
        highlights: [
          "Segments a company's customer base to inform product and targeting decisions",
          "Feature engineering and clustering on marketing-campaign data; deployed as an app for interactive exploration",
        ],
        tags: ["Python", "scikit-learn", "Machine Learning"],
      },
    ],
  },
];

export const COMPANIES = [
  {
    name: "Goods Unite Us",
    role: "Data Engineering / Analyst",
    location: "Wisconsin, United States",
    website: "https://goodsuniteus.com",
    logoDomain: "goodsuniteus.com",
    period: "Sep 2025 – Present",
    bullets: [
      "Built and maintained Python, PySpark, SQL, ETL workflows to ingest, transform, and validate structured and semi-structured data from multiple sources for analytics and downstream applications.",
      "Led schema-aware data modeling for a Snowflake-to-Firebase migration, redesigning relational structures into document collections to improve query performance and reduce infrastructure cost.",
      "Configured GCP monitoring and alerting (log-based metrics, notification channels) to surface pipeline failures and data-freshness breaches, cutting time-to-detection on production issues.",
      "Automated recurring jobs with GCP Cloud Scheduler, Cloud Functions, and Pub/Sub, replacing manual runs with scheduled, event-driven execution and automated failure alerts.",
      "Containerized ETL jobs with Docker and deployed to AWS ECS Fargate with EventBridge scheduling, IAM-scoped access, CloudWatch logging, and GitHub Actions CI/CD for repeatable releases.",
      "Built and maintained Angular and TypeScript front-end components that consumed internal REST APIs, giving stakeholders self-serve access to pipeline outputs and reducing ad-hoc data requests.",
      "Implemented source-to-target validation, schema checks, logging, and exception handling across ingestion workflows to improve data quality, traceability, and operational support for production pipelines.",
      "Collaborated with analysts, developers, and business stakeholders to translate reporting and application requirements into reusable data models, documented workflows, and maintainable engineering solutions.",
      "Supported deployment readiness through code reviews, environment configuration, operational documentation, and post-release monitoring of cloud-based data services.",
    ],
  },
  {
    name: "Webdaddy",
    role: "Python Developer & R&D Data Intern",
    location: "United States",
    website: "https://webdaddy.sg/",
    logoDomain: "webdaddy.sg",
    logoUrl: "/images/webdaddy-logo.png",
    period: "Aug 2024 – Feb 2025",
    bullets: [
      "Developed Python, SQL, and Pandas-based ETL workflows to ingest and transform REST API and multi-source data for analytics and reporting platforms.",
      "Integrated XML, JSON, and CSV inputs into a unified transformation layer, improving pipeline flexibility for semi-structured and unstructured data.",
      "Investigated pipeline and performance issues through root cause analysis, implementing fixes that improved execution stability and reduced recurring failures.",
      "Partnered with stakeholders in an Agile environment to align technical delivery with evolving business requirements.",
      "Created reusable transformation modules, technical documentation, and testable data-processing components to support consistent releases, code reviews, and future pipeline enhancements.",
      "Applied data profiling and transformation checks to identify malformed records, schema inconsistencies, and missing values before datasets reached analytics users.",
    ],
  },
  {
    name: "Findem",
    role: "R&D Data Analyst Intern",
    location: "India",
    website: "https://findem.ai",
    logoDomain: "findem.ai",
    period: "May 2022 – Dec 2023",
    bullets: [
      "Performed business data analysis on large datasets using SQL to surface trends and recommendations supporting KPI tracking and decision-making.",
      "Prepared and validated datasets to improve data quality and downstream usability for reporting and analytics workflows.",
      "Built dashboard-ready outputs using SQL, Excel, and Power BI, improving business visibility into key metrics.",
      "Resolved data and reporting issues through validation checks and root cause analysis, strengthening data accuracy and stakeholder trust.",
      "Documented data definitions, transformation logic, and reporting assumptions to improve metric consistency and support communication between technical and non-technical stakeholders.",
      "Translated business questions into SQL analyses, repeatable reporting logic, and clearly communicated findings for operational and product decision-making.",
    ],
  },
];

const MONTH_INDEX: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};

function parsePeriodDate(str: string, now: Date): Date {
  const trimmed = str.trim();
  if (/present/i.test(trimmed)) return now;
  const [mon, year] = trimmed.split(" ");
  return new Date(Number(year), MONTH_INDEX[mon] ?? 0, 1);
}

/**
 * Sums the duration of each role in COMPANIES (handling "Present") to derive
 * total years of experience, so the figure shown across the site stays
 * accurate as roles/dates change instead of being hand-typed in multiple places.
 */
function computeTotalExperienceYears(): number {
  const now = new Date();
  const totalMonths = COMPANIES.reduce((sum, c) => {
    const [startStr, endStr] = c.period.split("–");
    const start = parsePeriodDate(startStr, now);
    const end = parsePeriodDate(endStr, now);
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    return sum + Math.max(0, months);
  }, 0);
  return Math.floor(totalMonths / 12);
}

/** Total years of professional experience, derived from COMPANIES periods. */
export const TOTAL_EXPERIENCE_YEARS = computeTotalExperienceYears();
export const EXPERIENCE_LABEL = `${TOTAL_EXPERIENCE_YEARS}+ years`;

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
    degree: "Bachelor of Technology, Computer Science and Engineering",
    location: "Kanchipuram, Tamil Nadu, India",
    period: "2019 – 2023",
    gpa: "9.44/10",
    logoDomain: "scsvmv.ac.in",
    logoUrl: "/images/scsvmv-logo.png",
  },
];

const HERO_SUMMARY =
  `Data Engineer with ${EXPERIENCE_LABEL} of experience designing, building, and supporting scalable ETL/ELT pipelines, cloud data platforms, and analytics-ready datasets across AWS and GCP. Proficient in Python, SQL, PySpark, Databricks, Snowflake, data warehousing, multi-source ingestion, schema design, transformation, validation, orchestration, monitoring, and CI/CD. Experienced in platform migrations, workflow automation, production troubleshooting, data quality controls, and delivery of reliable datasets for reports, dashboards, APIs, and downstream applications. Combines data engineering expertise with Angular and TypeScript front-end development to deliver end-to-end solutions from ingestion and storage through REST APIs and user-facing interfaces. Growing hands-on alignment to AI-enabled data workflows, including agentic workflow concepts, LLM-powered systems, and API integrations, with a detail-oriented and problem-solving approach.`;

/**
 * Builds the full portfolio context string for the AI assistant (JAD).
 * Includes experience, education, all projects with highlights/tags, skills, and contact.
 */
export function buildPortfolioContext(): string {
  const sections: string[] = [];

  sections.push("Candidate: Sai Srinivas Pedhapolla");
  sections.push("Title: Data Engineer | ETL/ELT & Cloud Pipelines | AI-Enabled Data Systems | Data Science Graduate Student");
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

/**
 * Compact context for the AI assistant: same facts as buildPortfolioContext,
 * trimmed to the highest-signal bullets/lines so it costs far fewer tokens
 * per request (this is re-sent as the system prompt on every chat turn).
 */
export function buildAssistantContext(): string {
  const sections: string[] = [];

  sections.push("Candidate: Sai Srinivas Pedhapolla — Data Engineer | ETL/ELT & Cloud Pipelines | Data Science Graduate Student");
  sections.push(HERO_SUMMARY);
  sections.push("");

  sections.push("Experience:");
  for (const c of COMPANIES) {
    sections.push(`${c.name} — ${c.role}, ${c.location} (${c.period})`);
    c.bullets.slice(0, 4).forEach((b) => sections.push(`- ${b}`));
  }
  sections.push("");

  sections.push("Education:");
  for (const e of EDUCATION) {
    sections.push(`- ${e.name}: ${e.degree}, ${e.location} (${e.period}), GPA ${e.gpa}`);
  }
  sections.push("");

  sections.push("Projects:");
  for (const cat of PROJECT_CATEGORIES) {
    for (const p of cat.projects) {
      sections.push(`- ${p.name} (${cat.title}): ${p.highlights[0]} [${p.tags.join(", ")}] ${p.repoUrl}`);
    }
  }
  sections.push("");

  sections.push(`Skills: ${TECH_BADGES.join(", ")}`);
  sections.push(`Location: ${LOCATION} | Work authorization: ${WORK_AUTHORIZATION}`);
  sections.push(`Contact: ${CONTACT_LINKS.email} | ${CONTACT_LINKS.linkedin} | ${CONTACT_LINKS.github}`);

  return sections.join("\n");
}
