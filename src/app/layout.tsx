import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { TRPCProvider } from '@/trpc/client'
import { MainLayout } from '@/components/layout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'نظام التعليم العالي الذكي',
  description: 'نظام إدارة التعليم العالي المتطور مع الذكاء الاصطناعي',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl"
    suppressHydrationWarning
    >
      <body className={inter.className}>
        <TRPCProvider>
          <MainLayout>

          
         

         
          {children}
          </MainLayout>
          
        </TRPCProvider>
      </body>
    </html>
  )
}
