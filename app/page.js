import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RecipePage({ params }) {
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

  if (loading) return <main style={{textAlign:'center', marginTop:'50px'}}>Loading recipe...</main>

  return (
    <main>
      <button className="back-btn" onClick={() => router.back()}>← Back</button>
      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} style={{maxWidth:'100%', borderRadius:'10px'}} />

      <section style={{marginTop:'20px'}}>
        <h2>Ingredients</h2>
        <ul>
          {recipe.extendedIngredients.map((ing) => (
            <li key={ing.id}>{ing.original}</li>
          ))}
        </ul>
      </section>

      <section style={{marginTop:'20px'}}>
        <h2>Instructions</h2>
        <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
      </section>
    </main>
  )
}
