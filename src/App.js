import './App.css';
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Modal from "react-modal";
import Recipe from "./components/Recipe";

Modal.setAppElement("#root");

const App = () => {
  
  const APP_ID = "44ad7bf6";
  const APP_KEY = "f08f9361714c6de24654ffaa27ba52fc";
  
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
    
  useEffect( () => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
  }

  const updateSearch = (e) => {
    setSearch(e.target.value);
  }

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  }

  return (
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input 
          className="search-bar" 
          type="text" 
          placeholder="Try searching for recipes or ingredients!"
          value={search} 
          onChange={updateSearch} 
        />
        <button 
          className="search-button" 
          type="submit" 
        >
          Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map(recipe => (
          <Recipe 
            key={uuidv4()}
            title={recipe.recipe.label} 
            calories={recipe.recipe.calories} 
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
            cautions={recipe.recipe.cautions}
          />    
        ))}     
      </div>
    </div>
  );
}

export default App;
