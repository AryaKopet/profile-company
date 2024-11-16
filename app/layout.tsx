import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "PT. Sugi Harti Indonesia",
  description: "Perusahaan Produksi Packaging, Fabrikasi & General Supplier.",
  icons : {
    icon : [
      '/favicon.ico?v=4',
    ],
    apple : [
      '/apple-touch-icon.png?v=4',
    ],
    shortcut : [
      '/apple-touch-icon.png'
    ]
  },
  manifest : '/site.webmanifest'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
