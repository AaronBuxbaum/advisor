import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Expert Advisory Board",
  description: "Get personalized advice from industry experts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}
