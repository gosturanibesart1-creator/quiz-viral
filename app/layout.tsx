import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sfida e Miqësisë",
  description: "Krijo quizin tënd dhe shiko sa mirë të njohin miqtë.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sq">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
