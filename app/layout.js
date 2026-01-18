import './globals.css'

export const metadata = {
  title: 'Recipe Explorer',
  description: 'Find delicious recipes fast'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#fafafa] text-gray-900">
        <header className="border-b bg-white">
          <div className="max-w-6xl mx-auto p-4">
            <h1 className="text-2xl font-bold">🍲 Recipe Explorer</h1>
          </div>
        </header>
        {children}
      </body>
    </html>
  )
}
