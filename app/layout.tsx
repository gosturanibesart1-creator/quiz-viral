import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sfida e Miqësisë",
  description: "Krijo quizin tënd dhe shiko sa mirë të njohin miqtë.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sq">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5314074910030090"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
