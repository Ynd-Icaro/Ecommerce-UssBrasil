import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import ConditionalNavbar from '@/components/conditional-navbar'

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UssBrasil - Produtos Apple Oficiais",
  description: "Loja oficial de produtos Apple no Brasil. iPhone, Mac, iPad, Apple Watch e AirPods com os melhores preços e entrega rápida.",
  keywords: "Apple, iPhone, Mac, iPad, Apple Watch, AirPods, Brasil, loja oficial",
  authors: [{ name: "UssBrasil" }],
  creator: "UssBrasil",
  metadataBase: new URL('https://ussbrasil.com'),
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://ussbrasil.com',
    title: 'UssBrasil - Produtos Apple Oficiais',
    description: 'Loja oficial de produtos Apple no Brasil',
    siteName: 'UssBrasil',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UssBrasil - Produtos Apple Oficiais',
    description: 'Loja oficial de produtos Apple no Brasil',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <ConditionalNavbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
