import type { Metadata } from "next";
import { DM_Serif_Text } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SchemaOrg from "@/components/schema-org";

const funnelDisplay = DM_Serif_Text({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
});


const siteUrl = "https://getintentional.ai";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Intentional — Take control of your AI narrative",
    template: "%s | Intentional",
  },
  description: "Intentional monitors what AI is saying about your brand, surfaces the gaps, and gives you the strategy and content to take control. Built for comms leaders.",
  keywords: [
    "Answer Engine Optimization",
    "AEO",
    "AI brand monitoring",
    "brand narrative",
    "AI PR",
    "algorithmic consensus",
    "ChatGPT brand presence",
    "Perplexity brand monitoring",
    "AI reputation management",
    "communications strategy",
  ],
  themeColor: "#d4561d",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Intentional",
  },
  icons: {
    icon: [
      { url: "/intentional-icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  authors: [{ name: "Intentional", url: siteUrl }],
  creator: "Intentional",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Intentional",
    title: "Intentional — Take control of your AI narrative",
    description: "See what AI is saying about your brand. Surface the gaps. Then shape it. Built for communications leaders.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Intentional — AI brand narrative intelligence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Intentional — Take control of your AI narrative",
    description: "See what AI is saying about your brand. Surface the gaps. Then shape it. Built for communications leaders.",
    images: ["/og-image.png"],
    creator: "@intentional_ai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${funnelDisplay.variable} h-full antialiased`}
    >
      <head>
        <SchemaOrg />
        <link rel="alternate" type="text/plain" title="LLMs.txt" href="/llms.txt" />
        <link rel="alternate" type="text/plain" title="LLMs-full.txt" href="/llms-full.txt" />
      </head>
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-orange focus:text-white focus:rounded-full focus:font-sans focus:font-semibold focus:outline-none"
        >
          Skip to content
        </a>
        {children}
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="b38b1b4a-3ef7-449a-b434-3f8e6b95c50b"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
