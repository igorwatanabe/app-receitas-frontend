import clipboardCopy from 'clipboard-copy';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FilterButtons from '../components/FilterButtons';
import Header from '../components/Header';
import blackHeart from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [showCopy, setShowCopy] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setFavoriteRecipes(favRecipes);
  }, []);

  const filterByCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleFav = (id) => {
    const newFav = favoriteRecipes.filter((recipe) => recipe.id !== id);
    setFavoriteRecipes(newFav);
    localStorage.setItem('favoriteRecipes', JSON.stringify([...newFav]));
  };

  const handleCopy = (type, id) => {
    setShowCopy(true);
    if (type === 'meals') {
      clipboardCopy(`http://localhost:3000/meals/${id}`);
    } else if (type === 'drinks') {
      clipboardCopy(`http://localhost:3000/drinks/${id}`);
    }
    const seconds = 2000;
    setTimeout(() => { setShowCopy(false); }, seconds);
  };

  return (
    <div>
      <Header title="Favorite Recipes" />
      <FilterButtons onClick={ ({ target: { name } }) => filterByCategory(name) } />
      <div className="favReceitas">
        {favoriteRecipes
          .filter((recipe) => (recipe.type.includes(selectedCategory)))
          .map((recipe, index) => (
            recipe.type === 'meal' ? (
            // ----------MEAL CARD---------------
              <div key={ index }>
                <Link
                  to={ `/meals/${recipe.id}` }
                >
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    src={ recipe.image }
                    alt="imgreceita"
                    aria-hidden="true"
                    width="100"
                    style={ { padding: '5px', display: 'flex' } }
                  />
                  <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
                </Link>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {`${recipe.nationality} - ${recipe.category}`}
                </p>
                <img
                  src={ shareIcon }
                  alt="compartilhar"
                  data-testid={ `${index}-horizontal-share-btn` }
                  onClick={ () => handleCopy('meals', recipe.id) }
                  aria-hidden="true"
                  width="50"
                  style={ { padding: '5px', display: 'flex' } }
                />
                {showCopy && <p data-testid="linkmsg">Link copied!</p>}
                <img
                  src={ blackHeart }
                  alt="compartilhar"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  onClick={ () => handleFav(recipe.id) }
                  aria-hidden="true"
                  width="50"
                  style={ { padding: '5px', display: 'flex' } }
                />
              </div>
            ) : (
            // ----------DRINK CARD---------------
              <div key={ index }>
                <Link
                  to={ `/drinks/${recipe.id}` }
                >
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    src={ recipe.image }
                    alt="imgreceita"
                    aria-hidden="true"
                    width="100"
                    style={ { padding: '5px', display: 'flex' } }
                  />
                  <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
                </Link>
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {recipe.alcoholicOrNot}
                </p>
                <img
                  src={ shareIcon }
                  alt="compartilhar"
                  data-testid={ `${index}-horizontal-share-btn` }
                  onClick={ () => handleCopy('drinks', recipe.id) }
                  aria-hidden="true"
                  width="50"
                  style={ { padding: '5px', display: 'flex' } }
                />
                {showCopy && <p>Link copied!</p>}
                <img
                  src={ blackHeart }
                  alt="compartilhar"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  onClick={ () => handleFav(recipe.id) }
                  aria-hidden="true"
                  width="50"
                  style={ { padding: '5px', display: 'flex' } }
                />
              </div>
            )
          ))}
      </div>
    </div>
  );
}

export default FavoriteRecipes;
