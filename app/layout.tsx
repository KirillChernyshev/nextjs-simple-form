// These styles apply to every route in the application
import "@/styles/globals.css";

import AuthStatus from "@/components/auth-status";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const appTitle = "Next.js Server Actions";
const description =
  "This is a Next.js starter kit that uses Next-Auth for simple email + password login and a Postgres database to persist the data.";

export const metadata: Metadata = {
  title: appTitle,
  description,
  twitter: {
    card: "summary_large_image",
    title: appTitle,
    description,
  },
  metadataBase: new URL("https://nextjs-postgres-auth.vercel.app"),
  themeColor: "#FFF",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col gap-10">
        <Toaster />
        <Suspense fallback="Loading...">
          <AuthStatus />
        </Suspense>
        <header>
          <h1 className="flex h-16 items-center justify-center text-4xl">
            {appTitle}
          </h1>
        </header>
        <main>
          <div className="flex">
            <div className="w-screen flex flex-col justify-center items-center">
              {children}
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
