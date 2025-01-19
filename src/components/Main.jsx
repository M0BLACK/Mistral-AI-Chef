
import {useEffect, useState} from 'react';
import { useRef } from 'react';
import IngredientsList from './IngredientsList';
import {getRecipeFromMistral} from '../ia'

export default function Main() {
    const [ingredients, setIngredients] = useState(["tomato", "onion", "garlic", "oregano"]);
    const [recipe, setRecipe] = useState("")
    const ref = useRef(null);

    console.log("Main: ", ref);

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients([...ingredients, newIngredient])
    }

    async function getRecipe() {
        const recipe = await getRecipeFromMistral(ingredients)
        setRecipe(recipe);
    }
    useEffect(() => {
        if (ref != null  && recipe) {
            ref.current.scrollIntoView({behavior: "smooth"})
        }
    }, [recipe])

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input type="text" placeholder="e.g. oregano" name="ingredient"  aria-label="add ingredient"/>
                <button className='add-ingredients' type="submit">Add ingredient</button>
            </form>
            {
                ingredients.length > 0 &&
                <IngredientsList ingredients={ingredients} recipe={getRecipe} ref={ref} />
            }
            {/* {
                recipe &&
                <ClaudeRecipe recipe={recipe} />
            } */}
        </main>
    )
}