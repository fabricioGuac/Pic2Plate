export default function RecipeList({ recipes }) {

    function formatIngredients(ingredients) {
        if (ingredients.length === 0) return '';
        if (ingredients.length === 1) return ingredients[0];
        if (ingredients.length === 2) return ingredients.join(' and ');
        return ingredients.slice(0, -1).join(', ') + ' and ' + ingredients[ingredients.length - 1];
    }

    return (
        <div className="recipe-list-container">
            <h2>Suggested Recipes</h2>
            {recipes.map((recipe) => (
                <div key={recipe.id} className="recipe-card">
                    <h3>{recipe.name}</h3>
                    <p><strong>Ingredients:</strong> {formatIngredients(recipe.ingredients)}</p>
                    <p><strong>Instructions:</strong> {recipe.instructions}</p>
                </div>
            ))}
        </div>
    )
}