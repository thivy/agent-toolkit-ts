import { ThemeProvider } from "@/components/blocks/theme/theme-provider";
import type { Metadata } from "next";
import "./globals.css";

const inter = { variable: "--font-sans" };

export const metadata: Metadata = {
  title: "Agent Toolkit TS",
  description: "An opinionated starter template for building with GitHub Copilot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
