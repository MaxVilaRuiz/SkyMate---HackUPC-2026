import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Travel AI Assistant",
  description: "Asistente de viajes con IA local, RAG y SkyScanner",
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