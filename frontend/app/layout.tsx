import React, { Suspense } from "react"
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Caveat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Sidebar } from '@/components/sidebar'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from 'sonner'
import { TasksProvider } from '@/context/tasks-context'
import { GalleryProvider } from '@/context/gallery-context'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono' })
const caveat = Caveat({ subsets: ['latin'], variable: '--font-handwriting' })

export const metadata: Metadata = {
  title: 'Nexfolio - Personal Digital Dashboard',
  description: 'A comprehensive digital portfolio and dashboard system for managing your profile, projects, diary, tasks, and more.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${caveat.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TasksProvider>
            <GalleryProvider>
              <div className="flex h-screen overflow-hidden">
                <Suspense fallback={null}>
                  <Sidebar />
                </Suspense>
                <main className="flex-1 overflow-auto">
                  {children}
                </main>
              </div>
            </GalleryProvider>
            <Toaster />
          </TasksProvider>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
