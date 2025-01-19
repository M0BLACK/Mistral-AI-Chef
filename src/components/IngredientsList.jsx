

export default function IngredientsList(props) {
    const IngredientsListItems = props.ingredients.map((ingredient) => <li className="ingredient-item" key={ingredient}>{ingredient}</li>)
    return (
        <section className="ingredients-list-section">
        <h2 className="Ingredients-title">Ingredients on hand:</h2>
        <ul className="ingredients-list" aria-live="polite">
            {IngredientsListItems}
        </ul>
        {
            props.ingredients.length > 3 &&
            <div className="get-recipe-container">
                <div>
                <h3>Ready for a recipe?</h3>
                <p>Generate a recipe from your list of ingredients.</p>
                </div>
                <button onClick={props.recipe} ref={props.ref}  className="get-recipe-button">Get Recipe</button>
            </div>
        }
        </section>
    )
}