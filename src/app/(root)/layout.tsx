import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/app/globals.css";
import NextUIProvider from "@/providers/NextUIProvider";
import Sidebar from "@/components/Sidebar";
import Suggestions from "@/components/Suggestions";
import NextAuthProvider from "@/providers/NextAuthProvider";
import QueryProvider from "@/providers/QueryProvider";
import BottomBar from "@/components/BottomBar";
import ToastProvider from "@/providers/ToastProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Twitter Clone",
  description:
    "Discover a new social experience on our Twitter clone website! Share your thoughts, connect with friends, and stay up-to-date with trending topics in real-time. Join our vibrant online community today.",
  keywords: [
    "social media",
    "microblogging",
    "tweets",
    "followers",
    "trending topics",
    "online community",
    "tweet sharing",
    "Twitter clone",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <QueryProvider>
            <NextUIProvider>
              <ToastProvider />
              <div className="flex lg:px-40 h-screen">
                <Sidebar />
                <main className="w-full lg:w-[55%] border-gray-300 dark:border-gray-700 border-r border-l overflow-hidden overflow-y-auto">
                  {children}
                </main>
                <Suggestions />
                <BottomBar />
              </div>
            </NextUIProvider>
          </QueryProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
