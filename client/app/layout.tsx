"use client";
import './globals.css'
import type { Metadata } from 'next'
import Navbar from './components/navbar';

export const metadata: Metadata = {
  title: 'HTN 2023',
  description: 'Notes lololol',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />

        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Playfair+Display:ital,wght@1,700&display=swap" rel="stylesheet" />
      </head>
      <body>{<Navbar/>}{children}</body>
    </html>
  )
}
