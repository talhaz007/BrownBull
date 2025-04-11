import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BrownBullPvtLtd',
  description: 'Unlock the power of smart trading strategies with Brown Bull! We help you make informed decisions, manage risks, and grow your investments in the dynamic world.',
  generator: 'ConceptSol',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
