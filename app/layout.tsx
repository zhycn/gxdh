import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { OrganizationJsonLd } from "@/components/json-ld";
import { siteUrl } from "@/lib/config";
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
  title: {
    default: "国信导航 - 你的专属导航站",
    template: "%s | 国信导航",
  },
  description:
    "国信导航是一个精选网址导航站，提供AI工具、开发资源、设计工具、影音娱乐等多分类快捷入口，助你快速访问常用网站。",
  keywords: [
    "导航站",
    "网址导航",
    "AI工具",
    "开发资源",
    "设计工具",
    "快捷入口",
  ],
  authors: [{ name: "国信导航" }],
  creator: "国信导航",
  publisher: "国信导航",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: siteUrl,
    siteName: "国信导航",
    title: "国信导航 - 你的专属导航站",
    description: "精选网址导航站，提供多分类快捷入口",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "国信导航",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "国信导航 - 你的专属导航站",
    description: "精选网址导航站，提供多分类快捷入口",
    images: [`${siteUrl}/og-image.png`],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <OrganizationJsonLd />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
