import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer data-testid="footer" className="footer">
      <Link to="/drinks">
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="drinkIcon"
        />
      </Link>
      <Link to="/meals">
        <img
          data-testid="meals-bottom-btn"
          src={ mealIcon }
          alt="mealIcon"
        />
      </Link>
    </footer>
  );
}

export default Footer;
