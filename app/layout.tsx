import type { Metadata } from "next";
import { IBM_Plex_Mono, Manrope, Sora } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://kovaldigital.vercel.app",
  ),
  title: "Koval | Build Real Online Income",
  description:
    "Koval is a complete online business ecosystem teaching real execution across SaaS, eCommerce, social growth, and digital products since 2019.",
  keywords: [
    "online business",
    "SaaS",
    "eCommerce",
    "social media growth",
    "digital products",
    "online income systems",
    "Koval",
  ],
  openGraph: {
    title: "Build Real Online Income | Koval",
    description:
      "Learn the exact systems behind SaaS, eCommerce, social media growth, and digital businesses.",
    url: "/",
    siteName: "Koval",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Build Real Online Income | Koval",
    description:
      "Systems, execution, and strategy for modern online businesses since 2019.",
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
      className={`${manrope.variable} ${sora.variable} ${ibmPlexMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
