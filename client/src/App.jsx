import { useState } from 'react'
import ImageInput from './components/ImageInput';
import RecipeList from './components/RecipeList';

const App = () => {
  const [recipes, setRecipes] = useState([]);

  return (
    <div className="app">
      <h1>Pic2Plate 🍽️</h1>
      <div className="image-input-container">
        <ImageInput setRecipes={setRecipes} />
      </div>
      <div className="recipe-list-container">
        <RecipeList recipes={recipes} />
      </div>
    </div>
  );
};


export default App
