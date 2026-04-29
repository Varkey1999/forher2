import './globals.css'
import { GeistSans } from 'geist/font/sans'

export const metadata = {
  title: 'You and I',
  description: 'A little space for us',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={GeistSans.className + ' bg-white text-black'}>
        {children}
      </body>
    </html>
  )
}