import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import { AppState, store } from '../../store';
import { loginUser } from '../../store/actions/actions';

const LoginPage = () => {
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state: AppState) => state.user.isLoggedIn);
  const isLoggingIn = useSelector((state: AppState) => state.user.isLoggingIn);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = () => {
    // Implement your login logic here
    store.dispatch(loginUser({ email, password }));
  };

  const onSignUpClick = () => {
    navigate('/sign-up');
  };

  if (isLoggingIn) {
    return <Loader />;
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <input
          data-testid="email-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          data-testid="password-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button data-testid="login-button" onClick={handleLogin}>
          Login
        </button>
        {error && <p className="error-message">{error}</p>}
        <p>
          Don't have an account? <span onClick={onSignUpClick}>Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
