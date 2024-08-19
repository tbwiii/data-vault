import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import "./globals.css";
import { ColorSchemeScript } from '@mantine/core';


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
      <body style={
        {
          backgroundColor: 'rgba(36,36,36)'
        }
      }>
        <MantineProvider forceColorScheme="dark" defaultColorScheme="dark">
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
