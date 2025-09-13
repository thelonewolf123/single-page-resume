import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Resume Builder - Create Professional Resumes Instantly",
  description:
    "Craft standout resumes with AI-powered guidance, smart templates, and instant previews. Perfect for job seekers and professionals."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
