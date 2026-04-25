import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SkyMate",
  description: "A context-aware AI travel assistant powered by local models, RAG, and real-time SkyScanner data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}