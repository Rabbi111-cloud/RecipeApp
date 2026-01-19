import './globals.css'
import HeaderClient from './HeaderClient'

export const metadata = {
  title: 'Recipe Explorer',
  description: 'Find delicious recipes fast',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <HeaderClient />
        {children}
      </body>
    </html>
  )
}
