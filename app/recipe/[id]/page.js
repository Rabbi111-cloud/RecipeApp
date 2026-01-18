'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RecipeDetail({ params }) {
  const { id } = params
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function fetchRecipe() {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.NEXT_PUBLIC_RECIPE_API_KEY}`
      )
      const data = await res.json()
      setRecipe(data)
      setLoading(false)
    }
    fetchRecipe()
  }, [id])

  if (loading) return <p className="p-6">Loading recipe...</p>
  if (!recipe) return <p className="p-6">Recipe not found</p>

  return (
    <main className="max-w-3xl mx-auto p-6">
      <button
        onClick={() => router.back()}
        className="mb-4 text-blue-500 underline"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
      <img
        src={recipe.image}
        alt={recipe.title}
        className="rounded-xl mb-6 w-full"
      />

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
        <ul className="list-disc list-inside">
          {recipe.extendedIngredients?.map((ing) => (
            <li key={ing.id}>{ing.original}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: recipe.instructions }}
        />
      </section>
    </main>
  )
}
