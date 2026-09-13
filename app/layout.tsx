import React from "react"
import type { Metadata, Viewport } from 'next'
import { DM_Sans, DM_Serif_Display, Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/components/boty/cart-context'
import './globals.css'

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  variable: '--font-dm-serif-display',
  weight: ['400']
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700']
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500', '600']
});

export const metadata: Metadata = {
  title: 'Sys’y Box Events — Vos événements, notre passion',
  description: 'Découvrez Sys’y Box Events, votre partenaire pour créer des événements inoubliables.',
  generator: 'v0.app',
  keywords: ['événements', 'célébration', 'organisation', 'cadeaux', 'Sys’y Box Events'],
  icons: {
    icon: '/images/sysy-box-logo.jpeg',
    apple: '/images/sysy-box-logo.jpeg',
  },
}

export const viewport: Viewport = {
  themeColor: '#FCF8EF',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="bg-background">
      <body className={`${poppins.variable} ${dmSerifDisplay.variable} ${dmSans.variable} font-sans antialiased`}>
        <CartProvider>
          {children}
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
