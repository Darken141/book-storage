import { Montserrat } from 'next/font/google'
import { Providers } from '@/redux/provider.redux'

import '@/styles/globals.css'
import '@/styles/components.css'

const montserrat = Montserrat({
  style: ['normal'],
  weight: ['400', '600', '700'],
  subsets: ['latin-ext'],
})

export const metadata = {
  title: 'Book Storage',
  description: 'A simple book storage app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
