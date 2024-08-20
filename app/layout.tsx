import type { Metadata } from "next";
import Link from "next/link";
import fonts from "@helpers/fonts"
import { IconBox } from '@tabler/icons-react';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import "./globals.css";


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
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <title>Data Valut</title>

        <ColorSchemeScript />
      </head>
      <body>
        <div className="px-8 py-3 bg-sky-950">
          <Link href="/" className=" flex items-center gap-4">
            <IconBox size={24} />
            <span className={`text-lg ${fonts.squada}`}>Data Vault</span>
          </Link>
        </div>
        <ColorSchemeScript defaultColorScheme="dark" />
        <MantineProvider defaultColorScheme="dark">
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
