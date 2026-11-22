import type { Metadata } from "next";
// IBM Plex, self-hosted (latin subset) so pages never depend on a third-party font CDN.
import "@fontsource/ibm-plex-sans/latin-300.css";
import "@fontsource/ibm-plex-sans/latin-400.css";
import "@fontsource/ibm-plex-sans/latin-500.css";
import "@fontsource/ibm-plex-sans/latin-600.css";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Asakala — Product Designer",
  description: "Senior Product Designer based in London, working with startups and FTSE 100 corporations.",
  openGraph: {
    title: "Asakala — Product Designer",
    description: "Senior Product Designer based in London, working with startups and FTSE 100 corporations.",
    images: [{ url: "/Asakala_ProductDesigner.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Asakala — Product Designer",
    description: "Senior Product Designer based in London, working with startups and FTSE 100 corporations.",
    images: ["/Asakala_ProductDesigner.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body className="font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-50 focus-visible:rounded-lg focus-visible:bg-primary focus-visible:px-4 focus-visible:py-3 focus-visible:text-label focus-visible:text-primary-foreground"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
