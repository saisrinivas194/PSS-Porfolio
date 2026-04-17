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

const SITE_URL = "https://pedhapollasaisrinivas.site";

export const metadata: Metadata = {
  title: "Sai Srinivas Pedhapolla — Data Analyst | SQL, Python, Power BI, Tableau",
  description:
    "Data Analyst with internship experience in SQL-driven analytics, ETL workflows, and dashboards. Skilled in SQL, Python (Pandas, NumPy), Power BI, Tableau, and cloud platforms (AWS, GCP, Snowflake). MS Data Science, NJIT.",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Sai Srinivas Pedhapolla — Data Analyst",
    description: "SQL · Python · Power BI · Tableau · ETL · EDA · Dashboards",
    url: SITE_URL,
    siteName: "Sai Srinivas Portfolio",
    type: "website",
  },
  keywords: [
    "Data Analyst",
    "Business Analyst",
    "Analytics Engineer",
    "BI Analyst",
    "SQL",
    "Python",
    "Power BI",
    "Tableau",
    "ETL",
    "ELT",
    "Data Visualization",
    "Data Modeling",
    "Snowflake",
    "AWS",
    "GCP",
    "PostgreSQL",
    "MySQL",
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
