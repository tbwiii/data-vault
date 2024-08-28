import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@components/theme-provider";
import Sidebar from "@/components/layout/sidebar";
import AuthButton from "@/components/auth-button";

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
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen">
            <Sidebar>
              <AuthButton />
            </Sidebar>
            <main id="main" className="grow">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
