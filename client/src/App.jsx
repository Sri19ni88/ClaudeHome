import { useState } from 'react';
import ImageUpload from './components/ImageUpload';
import RecipeList from './components/RecipeList';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState('upload'); // upload, items, recipes

  const handleItemsIdentified = (identifiedItems) => {
    setItems(identifiedItems);
    setStep('items');
  };

  const handleRecipesGenerated = (generatedRecipes) => {
    setRecipes(generatedRecipes);
    setStep('recipes');
  };

  const handleReset = () => {
    setItems([]);
    setRecipes([]);
    setStep('upload');
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🍳 Fridge Recipe Maker</h1>
        <p className="tagline">Take a photo of your fridge and get AI-powered recipe suggestions!</p>
      </header>

      <main className="main-content">
        {step === 'upload' && (
          <ImageUpload
            onItemsIdentified={handleItemsIdentified}
            setLoading={setLoading}
          />
        )}

        {step === 'items' && (
          <div className="items-section">
            <h2>Identified Ingredients</h2>
            <div className="items-grid">
              {items.map((item, index) => (
                <div key={index} className="item-card">
                  <span className="item-name">{item.name}</span>
                  <span className="item-quantity">{item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="button-group">
              <button onClick={handleReset} className="btn btn-secondary">
                Start Over
              </button>
              <button
                onClick={() => {
                  setLoading(true);
                  // This will be handled in RecipeList component
                  setStep('recipes');
                }}
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Generating Recipes...' : 'Generate Recipes'}
              </button>
            </div>
          </div>
        )}

        {step === 'recipes' && (
          <RecipeList
            ingredients={items}
            recipes={recipes}
            onRecipesGenerated={handleRecipesGenerated}
            setLoading={setLoading}
            loading={loading}
            onReset={handleReset}
          />
        )}

        {loading && (
          <div className="loading-overlay">
            <div className="spinner"></div>
            <p>Processing your request...</p>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>Powered by Claude AI</p>
      </footer>
    </div>
  );
}

export default App;
