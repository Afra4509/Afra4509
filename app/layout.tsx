import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SNBT Dashboard 2026 | Tracker Belajar & Try Out",
  description: "Dashboard profesional untuk memantau progress belajar & perkembangan skor Try Out SNBT hingga 21 April 2026",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
