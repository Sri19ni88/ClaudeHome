function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card">
      <div className="recipe-header">
        <h3>{recipe.name}</h3>
        <div className="recipe-meta">
          <span>⏱️ {recipe.cookingTime}</span>
          <span>🍽️ Servings: {recipe.servings}</span>
        </div>
      </div>

      {recipe.description && (
        <p className="recipe-description">{recipe.description}</p>
      )}

      <div className="recipe-section">
        <h4>📝 Ingredients</h4>
        <ul className="ingredients-list">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      <div className="recipe-section">
        <h4>👨‍🍳 Instructions</h4>
        <ol className="instructions-list">
          {recipe.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </div>

      <div className="recipe-section">
        <h4>🥗 Nutrition (per serving)</h4>
        <div className="nutrition-grid">
          <div className="nutrition-item">
            <div className="nutrition-label">Calories</div>
            <div className="nutrition-value">{recipe.nutrition.calories}</div>
          </div>
          <div className="nutrition-item">
            <div className="nutrition-label">Protein</div>
            <div className="nutrition-value">{recipe.nutrition.protein}</div>
          </div>
          <div className="nutrition-item">
            <div className="nutrition-label">Carbs</div>
            <div className="nutrition-value">{recipe.nutrition.carbs}</div>
          </div>
          <div className="nutrition-item">
            <div className="nutrition-label">Fat</div>
            <div className="nutrition-value">{recipe.nutrition.fat}</div>
          </div>
          <div className="nutrition-item">
            <div className="nutrition-label">Fiber</div>
            <div className="nutrition-value">{recipe.nutrition.fiber}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
