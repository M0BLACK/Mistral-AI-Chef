
import {useEffect, useState} from 'react';
import { useRef } from 'react';
import IngredientsList from './IngredientsList';
import ClaudeRecipe from './ClaudeRecipe';
import {getRecipeFromMistral} from '../ia'
import Loader from './Loader';

export default function Main() {
    const [ingredients, setIngredients] = useState(["tomato", "onion", "garlic", "oregano"]);
    const [recipe, setRecipe] = useState("")
    const [loading, setLoading] = useState(false)
    const ref = useRef(null);

    function addIngredient(event) {
        event.preventDefault()
        const formData = new FormData(event.target)
        const newIngredient = formData.get("ingredient")
        setIngredients([...ingredients, newIngredient])
    }

    async function getRecipe() {
        setLoading(true)
        const recipe = await getRecipeFromMistral(ingredients)
        setRecipe(recipe);
        setLoading(false)
    }
    useEffect(() => {
        if (ref != null  && recipe) {
            ref.current.scrollIntoView({behavior: "smooth"})
        }
    }, [recipe])

    return (
        <main>
            <form onSubmit={addIngredient} className="add-ingredient-form">
                <input type="text" placeholder="e.g. oregano" name="ingredient"  aria-label="add ingredient"/>
                <button className='add-ingredients' type="submit">Add ingredient</button>
            </form>
            {
                ingredients.length > 0 &&
                <IngredientsList ingredients={ingredients} recipe={getRecipe} btnRef={ref} />
            }
            {
                recipe && 
                <ClaudeRecipe recipe={recipe} />
            }
            {
                loading && <Loader />
            }
        </main>
    )
}