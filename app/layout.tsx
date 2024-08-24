import type { Metadata } from "next";
import Link from "next/link";
import fonts from "@util/fonts"
import { IconCode } from '@tabler/icons-react';
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
          <div className="flex min-h-screen">
            <div className="px-8 py-3 bg-stone-900 relative z-10 min-w-64 w-[20%]">
              <Link href="/" className=" flex items-center gap-2 text-azure-100">
                <IconCode size={32} />
                <span className={`text-xl ${fonts.cutive}`}>Data Vault</span>
              </Link>
            </div>
            <main id="main" className="grow">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
