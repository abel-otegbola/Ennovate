import { Mona_Sans } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import ArticleProvider from "@/context/articleContext";
import AuthProvider from "@/context/useAuth";

const mona_sans = Mona_Sans({subsets:['latin'],variable:'--font-sans'})

export const metadata: Metadata = {
  title: "Ennovate",
  description: "The engineering knowledge and opportunity platform.",
    keywords: ["engineering", "knowledge", "opportunity", "platform"],
    authors: [{name: "Ennovate"}],
    openGraph: {
      title: 'Ennovate - The engineering knowledge and opportunity platform.',
      description: 'Ennovate is a global engineering platform that lets you connect with experts, access knowledge resources, and explore opportunities in the engineering field—all from one secure app.',
      url: 'https://Ennovate.vercel.app',
      siteName: 'Ennovate',
      images: [
        {
          url: 'https://Ennovate.vercel.app/preview.webp',
          width: 1200,
          height: 630,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Ennovate - The engineering knowledge and opportunity platform.',
      description: 'Ennovate is a global engineering platform that lets you connect with experts, access knowledge resources, and explore opportunities in the engineering field—all from one secure app.',
      images: ['https://Ennovate.vercel.app/preview.webp'],
      creator: '@Ennovate',
      site: '@Ennovate',
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", mona_sans.variable) }
    >
      <body className="text-[14px]">
        <AuthProvider>
        <ArticleProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </ArticleProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
