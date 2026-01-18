import { useEffect } from 'react';
import RecipeCard from './RecipeCard';
import { generateRecipes } from '../services/api';

function RecipeList({ ingredients, recipes, onRecipesGenerated, setLoading, loading, onReset }) {
  useEffect(() => {
    if (recipes.length === 0 && ingredients.length > 0) {
      fetchRecipes();
    }
  }, []);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const result = await generateRecipes(ingredients);
      onRecipesGenerated(result.recipes);
    } catch (error) {
      console.error('Error generating recipes:', error);
      alert('Failed to generate recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return null;
  }

  return (
    <div className="recipes-container">
      <div className="recipes-header">
        <h2>Your Personalized Recipes</h2>
        <p style={{ color: '#666', marginTop: '0.5rem' }}>
          Here are some delicious recipes you can make with your ingredients!
        </p>
      </div>

      <div className="recipes-grid">
        {recipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}
      </div>

      <div className="button-group">
        <button onClick={onReset} className="btn btn-primary">
          Start Over
        </button>
      </div>
    </div>
  );
}

export default RecipeList;
