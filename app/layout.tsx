import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

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
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
