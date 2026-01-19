'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [query, setQuery] = useState('')
  const [cuisine, setCuisine] = useState('')
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const cuisines = ['African', 'Chinese', 'Italian', 'Mexican', 'Indian', 'American']

  async function searchRecipes(e) {
    e.preventDefault()
    if (!query && !cuisine) return

    setLoading(true)

    let url = `https://api.spoonacular.com/recipes/complexSearch?number=12&apiKey=${process.env.NEXT_PUBLIC_RECIPE_API_KEY}`
    if (query) url += `&query=${query}`
    if (cuisine) url += `&cuisine=${cuisine}`

    const res = await fetch(url)
    const data = await res.json()
    setRecipes(data.results || [])
    setLoading(false)
  }

  return (
    <main>
      {/* Cuisine buttons */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
        {cuisines.map((c) => (
          <button
            key={c}
            onClick={() => setCuisine(c)}
            style={{
              padding: '6px 12px',
              borderRadius: '5px',
              border: cuisine === c ? '2px solid #111' : '1px solid #ccc',
              cursor: 'pointer',
              background: cuisine === c ? '#111' : '#eee',
              color: cuisine === c ? '#fff' : '#111',
            }}
          >
            {c}
          </button>
        ))}
        <button
          onClick={() => setCuisine('')}
          style={{
            padding: '6px 12px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            cursor: 'pointer',
            background: '#eee',
          }}
        >
          All
        </button>
      </div>

      {/* Search form */}
      <form onSubmit={searchRecipes} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search recipes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '10px 20px', borderRadius: '5px', background: '#111', color: '#fff', border: 'none', cursor: 'pointer' }}>
          Search
        </button>
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
