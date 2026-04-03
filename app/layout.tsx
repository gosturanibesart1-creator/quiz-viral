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
      <body>{children}</body>
    </html>
  );
}
