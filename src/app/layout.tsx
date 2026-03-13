import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Sai Srinivas Pedhapolla | Data Engineer & Data Science Graduate",
  description:
    "Portfolio of Sai Srinivas Pedhapolla, a data engineer and data science graduate focused on scalable data pipelines, ETL systems, and machine learning workflows.",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Sai Srinivas Pedhapolla | Data Engineer & Data Science Graduate",
    description:
      "Explore Sai's experience building scalable data pipelines, ETL/ELT workflows, and machine learning data services.",
    url: SITE_URL,
    siteName: "Sai Srinivas Portfolio",
    type: "website",
  },
  keywords: [
    "Sai Srinivas Pedhapolla",
    "data engineer",
    "data engineering",
    "data pipelines",
    "ETL",
    "ELT",
    "machine learning",
    "data science",
    "New Jersey Institute of Technology",
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
      </body>
    </html>
  );
}
