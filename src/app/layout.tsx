import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://saisrinivaspedhapolla.vercel.app";

export const metadata: Metadata = {
  title: "Sai Srinivas Pedhapolla — Data Engineer | ETL/ELT & Cloud Pipelines",
  description:
    "Data Engineer with 3+ years of experience building ETL/ELT pipelines, cloud data platforms, and analytics-ready datasets. Skilled in Python, SQL, PySpark, Databricks, Snowflake, AWS, and GCP. MS Data Science, NJIT.",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Sai Srinivas Pedhapolla — Data Engineer",
    description: "Python · SQL · PySpark · Databricks · Snowflake · AWS · GCP · ETL/ELT · Cloud Pipelines",
    url: SITE_URL,
    siteName: "Sai Srinivas Portfolio",
    type: "website",
  },
  keywords: [
    "Data Engineer",
    "Analytics Engineer",
    "Data Analyst",
    "BI Analyst",
    "Python",
    "SQL",
    "PySpark",
    "Databricks",
    "ETL",
    "ELT",
    "Data Modeling",
    "Data Pipelines",
    "Snowflake",
    "Firebase",
    "AWS",
    "GCP",
    "Power BI",
    "Tableau",
    "Angular",
    "TypeScript",
    "Google Analytics",
    "GA4",
    "Git",
    "CI/CD",
    "NJIT",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-neutral-950 text-zinc-100 antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
