"use client";
import './globals.css'
import type { Metadata } from 'next'
import Navbar from './components/navbar.jsx'
import SearchOverlay from './components/searchoverlay.jsx'
import React from 'react'

export const metadata: Metadata = {
  title: 'Keynotes',
  description: 'Notes lololol',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [isSearch, setIsSearch] = React.useState(false)

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />

        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Playfair+Display:ital,wght@1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-white">
        {isSearch ? <SearchOverlay setIsSearch={setIsSearch} /> : ''}
        <Navbar setIsSearch={setIsSearch}/>
        {children}
      </body>
    </html>
  )
}
