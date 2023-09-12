import { Inter } from "next/font/google";
import { metadata } from "@/src/services/metadata";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <metadata />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
