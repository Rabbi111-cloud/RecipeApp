'use client'

import './globals.css'
import { useState, useEffect } from 'react'

export const metadata = {
  title: 'Recipe Explorer',
  description: 'Find delicious recipes fast'
}

export default function RootLayout({ children }) {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('dark', dark)
  }, [dark])

  return (
    <html lang="en">
      <body className="bg-[#fafafa] dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
        <header className="border-b bg-white dark:bg-gray-800">
          <div className="max-w-6xl mx-auto p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">🍲 Recipe Explorer</h1>
            <button
              onClick={() => setDark(!dark)}
              className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded"
            >
              {dark ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </header>
        {children}
      </body>
    </html>
  )
}
