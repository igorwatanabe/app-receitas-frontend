import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonStatus, setButtonStatus] = useState(true);
  const history = useHistory();

  const verifyButton = () => {
    const minLength = 6;
    const passwordCheck = password.length >= minLength;
    const validationRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const validateEmail = validationRegex.test(email);
    const validateAll = passwordCheck && validateEmail;
    setButtonStatus(!validateAll);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'password') {
      setPassword(value);
    }

    verifyButton();
  };

  const submitButton = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };

  return (
    <div>
      <h2>LOGIN</h2>

      <form>
        <input
          type="text"
          placeholder="Email"
          data-testid="email-input"
          name="email"
          value={ email }
          onChange={ handleChange }
        />

        <input
          type="text"
          placeholder="Password"
          data-testid="password-input"
          name="password"
          value={ password }
          onChange={ handleChange }
        />

        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ buttonStatus }
          onClick={ submitButton }
        >
          ENTER

        </button>
      </form>

    </div>

  );
}

export default Login;