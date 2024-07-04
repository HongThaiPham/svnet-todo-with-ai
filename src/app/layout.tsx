import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import AppProvider from "@/components/AppProvider";

const inter = Outfit({ subsets: ["latin"] });

const ORIGIN_URL =
  process.env.NODE === "production"
    ? "https://todo-ai.svnet.dev"
    : "http://localhost:3000";

export const metadata: Metadata = {
  title: "SVNet - TodoAI App",
  description:
    "TodoAI seamlessly organizes your tasks and predicts what's nextusing AI",
  metadataBase: new URL(ORIGIN_URL),
  alternates: {
    canonical: ORIGIN_URL,
  },
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
