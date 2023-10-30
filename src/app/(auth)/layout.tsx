import "@/app/globals.css";

import NextAuthProvider from "@/providers/NextAuthProvider";
import NextUIProvider from "@/providers/NextUIProvider";
import QueryProvider from "@/providers/QueryProvider";
import ToastProvider from "@/providers/ToastProvider";

export const metadata = {
  title: "Login - Twitter Clone",
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
      <body>
        <NextAuthProvider>
          <QueryProvider>
            <NextUIProvider>
              <ToastProvider />
              <div className="h-screen">{children}</div>
            </NextUIProvider>
          </QueryProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
