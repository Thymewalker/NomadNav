'use client';

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { AuthProvider } from "@/contexts/AuthContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import TopNav from '@/components/TopNav';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NomadNav - Your Digital Nomad Companion",
  description: "Discover cost-effective destinations, track local prices, and connect with fellow nomads.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-full bg-gray-50 dark:bg-gray-900`}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <TopNav />
            <div className="min-h-screen flex flex-col">
              <Navigation />
              <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
              </main>
              <footer className="bg-white dark:bg-gray-800 shadow-inner">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    © {new Date().getFullYear()} NomadNav. All rights reserved.
                  </p>
                </div>
              </footer>
            </div>
          </AuthProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </body>
    </html>
  );
}
