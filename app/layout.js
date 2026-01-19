import './globals.css'
import HeaderClient from './HeaderClient'

export const metadata = {
  title: 'Recipe Explorer',
  description: 'Find delicious recipes fast',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#fafafa] dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
        <HeaderClient />
        {children}
      </body>
    </html>
  )
}
