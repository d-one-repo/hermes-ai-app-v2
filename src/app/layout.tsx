import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Company: HERMES (Retail, n.a. employees)
Description: HERMES is a luxury fashion brand that specializes in high-end retail of designer goods and luxury accessories.
Company Logo: Use the logo from this URL: https://logo.clearbit.com/hermes.com',
  description: 'AI-generated React application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}