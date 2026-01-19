'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [query, setQuery] = useState('')
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const [favorites, setFavorites] = useState([])
  const router = useRouter()

  // Load favorites from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('favorites')
    if (stored) setFavorites(JSON.parse(stored))
  }, [])

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  function toggleFavorite(recipe) {
    const exists = favorites.find((r) => r.id === recipe.id)
    if (exists) {
      setFavorites(favorites.filter((r) => r.id !== recipe.id))
    } else {
      setFavorites([...favorites, recipe])
    }
  }

  async function searchRecipes(e) {
    e.preventDefault()
    if (!query) return

    setLoading(true)

    const res = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=12&apiKey=${process.env.NEXT_PUBLIC_RECIPE_API_KEY}`
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
        {recipes.map((recipe) => {
          const isFav = favorites.find((r) => r.id === recipe.id)
          return (
            <div
              key={recipe.id}
              className="bg-white rounded-xl shadow cursor-pointer hover:shadow-lg transition relative"
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="rounded-t-xl"
                onClick={() => router.push(`/recipe/${recipe.id}`)}
              />
              <div className="p-4 flex justify-between items-center">
                <h2 className="font-semibold text-lg">{recipe.title}</h2>
                <button
                  onClick={() => toggleFavorite(recipe)}
                  className={`text-xl ${isFav ? 'text-red-500' : 'text-gray-400'}`}
                >
                  ♥
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {favorites.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Favorites</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {favorites.map((recipe) => (
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
        </section>
      )}
    </main>
  )
}
