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

export const metadata: Metadata = {
  title: "AI compass MUN | Регистрация",
  description: "Модель ООН с фокусом на искусственный интеллект и национальные интересы Кыргызстана",
  openGraph: {
    title: "AI compass MUN",
    description: "Присоединяйся к AI compass MUN 22 марта 2026",
    images: ["/og-image.jpg"], // позже добавишь картинку
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}