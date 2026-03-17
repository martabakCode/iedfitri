import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kartu Ucapan Idul Fitri | Eid Greeting Cards",
  description: "Buat dan bagikan kartu ucapan Idul Fitri digital untuk keluarga dan teman tercinta. Gratis, mudah, dan tanpa registrasi.",
  keywords: ["idul fitri", "kartu ucapan", "eid greeting", "selamat hari raya", "idul fitri 1447"],
  openGraph: {
    title: "Kartu Ucapan Idul Fitri",
    description: "Buat dan bagikan kartu ucapan Idul Fitri digital",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
