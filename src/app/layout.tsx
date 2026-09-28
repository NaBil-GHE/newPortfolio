import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { LiveChat } from "@/components/live-chat/live-chat";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nabill.tech";
// TODO: Replace NEXT_PUBLIC_SITE_URL with your real production domain.

const SITE_TITLE = "Nabil Ghenissa | Software Developer";
const SITE_DESCRIPTION =
  "Nabil Ghenissa is a Software Developer and Computer Science graduate from Algeria, focused on web, mobile, backend development, and distributed systems.";

const ogImageExists = false;

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "Nabil Ghenissa",
    "Nabil Ghenissa Algeria",
    "Software Developer",
    "Full Stack Developer",
    "Web Developer",
    "Mobile Developer",
    "Flutter Developer",
    "Node.js Developer",
    "TypeScript Developer",
    "React Developer",
    "Next.js Developer",
    "PostgreSQL",
    "Prisma",
    "REST API",
    "Computer Science",
    "Distributed Systems",
    "Reseaux et Systemes Distribues",
    "USTO-MB",
  ],
  alternates: {
    canonical: "/",
  },
  authors: [{ name: "Nabil Ghenissa", url: "https://github.com/NaBil-GHE" }],
  creator: "Nabil Ghenissa",
  publisher: "Nabil Ghenissa",
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "Nabil Ghenissa",
    locale: "en_US",
    type: "website",
    ...(ogImageExists ? { images: ["/og-image.png"] } : {}),
  },
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
  twitter: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    card: "summary_large_image",
    ...(ogImageExists ? { images: ["/og-image.png"] } : {}),
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased relative",
          geist.variable,
          geistMono.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <TooltipProvider delayDuration={0}>
            <div className="absolute inset-0 top-0 left-0 right-0 h-[100px] overflow-hidden z-0">
              <FlickeringGrid
                className="h-full w-full"
                squareSize={2}
                gridGap={2}
                style={{
                  maskImage: "linear-gradient(to bottom, black, transparent)",
                  WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
                }}
              />
            </div>
            <div className="relative z-10 max-w-2xl mx-auto py-12 pb-24 sm:py-24 px-6">
              {children}
            </div>
            <Navbar />
            <LiveChat />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
