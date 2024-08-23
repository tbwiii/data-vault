import type { Metadata } from "next";
import Link from "next/link";
import fonts from "@util/fonts"
import { IconBox } from '@tabler/icons-react';
import "./globals.css";
import { ThemeProvider } from "@components/theme-provider"


export const metadata: Metadata = {
  title: "Data Vault",
  description: "stuff I want to remember",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{colorScheme: 'dark'}}>
      <body>
        <ThemeProvider 
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
        <div className="px-8 py-3 bg-cyan-950 bg-opacity-50 rounded-lg m-4">
          <Link href="/" className=" flex items-center gap-4">
            <IconBox size={24} />
            <span className={`text-lg ${fonts.squada}`}>Data Vault</span>
          </Link>
        </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
