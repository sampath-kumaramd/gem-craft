import QueryWrapper from "@/lib/provider";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gem Caft",
  description: "Gem Caft is a platform for buying and selling gemstones.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryWrapper>
          <ClerkProvider>
            {children}
            </ClerkProvider>
        </QueryWrapper>
      </body>
    </html>
  );
}
