import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RecoilRootProvider from "@/component/RecoilRootProvider";
import GoogleProvider from "@/component/GoogleProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "옷늘날씨",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RecoilRootProvider>
        {/* <GoogleProvider>   */}
          {children}
        {/* </GoogleProvider> */}
        </RecoilRootProvider>
      </body>
    </html>
  );
}
