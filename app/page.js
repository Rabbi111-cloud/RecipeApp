'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [query, setQuery] = useState('')
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function searchRecipes(e) {
    e.preventDefault()
    if (!query) return

    setLoading(true)

    const res = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=12&apiKey=f0ce27ad278f467d9ede9c55df37e66c`
    )

    const data = await res.json()
    setRecipes(data.results || [])
    setLoading(false)
  }

  return (
    <main className="max-w-6xl mx-auto p-6">
      <form onSubmit={searchRecipes} className="flex gap-2 mb-8">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search recipes..."
          className="flex-1 p-3 border rounded-lg"
        />
        <button className="bg-black text-white px-6 rounded-lg">
          Search
        </button>
      </form>

      {loading && <p>Loading recipes...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-xl shadow cursor-pointer hover:shadow-lg transition"
            onClick={() => router.push(`/recipe/${recipe.id}`)}
          >
            <img src={recipe.image} alt={recipe.title} className="rounded-t-xl" />
            <div className="p-4">
              <h2 className="font-semibold text-lg">{recipe.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
