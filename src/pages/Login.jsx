import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import '../styles/Login.css';

function Login() {
  const [user, setUser] = useState({ email: '', password: '' });
  const [buttonStatus, setButtonStatus] = useState(true);
  const history = useHistory();

  const verifyButton = () => {
    const minLength = 6;
    const passwordCheck = user.password.length > minLength;
    const validationRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const validateEmail = validationRegex.test(user.email);
    const validateAll = passwordCheck && validateEmail;
    setButtonStatus(!validateAll);
  };

  useEffect(() => {
    verifyButton();
  }, [user]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const submitButton = () => {
    localStorage.setItem('user', JSON.stringify({ email: user.email }));
    history.push('/meals');
  };

  return (
    <main className="login">
      <h2>LOGIN</h2>
      <form className="login-form">
        <input
          type="text"
          placeholder="Email"
          data-testid="email-input"
          name="email"
          value={ user.email }
          onChange={ handleChange }
          className="login-item"
        />

        <input
          type="password"
          placeholder="Password"
          data-testid="password-input"
          name="password"
          value={ user.password }
          onChange={ handleChange }
          className="login-item"
        />

        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ buttonStatus }
          onClick={ () => submitButton() }
          className="login-item"
        >
          ENTER
        </button>
      </form>
    </main>
  );
}

export default Login;
