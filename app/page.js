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
      `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=12&apiKey=${process.env.NEXT_PUBLIC_RECIPE_API_KEY}`
    )
    const data = await res.json()
    setRecipes(data.results || [])
    setLoading(false)
  }

  return (
    <main>
      <form onSubmit={searchRecipes}>
        <input
          type="text"
          placeholder="Search recipes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="search-btn">Search</button>
      </form>

      {loading && <p>Loading recipes...</p>}

      <div className="grid">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="card"
            onClick={() => router.push(`/recipe/${recipe.id}`)}
          >
            <img src={recipe.image} alt={recipe.title} />
            <div className="card-content">
              <h2>{recipe.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
