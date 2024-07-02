import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import AppProvider from "@/components/AppProvider";

const inter = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SVNet - TodoAI App",
  description: "A simple todo app with AI features",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          inter.className
        )}
      >
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
