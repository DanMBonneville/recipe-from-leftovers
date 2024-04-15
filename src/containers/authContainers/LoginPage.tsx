import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  createLoginErrorClassObject,
  createLoginErrorMessage,
} from '../../common/util';
import Loader from '../../components/Loader';
import { AppState, store } from '../../store';
import { loginUser } from '../../store/actions/actions';

const LoginPage = () => {
  const navigate = useNavigate();

  const isLoggingIn = useSelector((state: AppState) => state.user.isLoggingIn);
  const isLoggedIn = useSelector((state: AppState) => state.user.isLoggedIn);
  const loginError = useSelector(
    (state: AppState) => state.user.loginErrorMessage
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [credentialClassNames, setCredentialClassNames] = useState({
    emailClass: '',
    passwordClass: '',
  });

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    localStorage.clear();
    sessionStorage.clear();
    if (loginError) {
      setErrorMessage(createLoginErrorMessage(loginError));
      setCredentialClassNames(createLoginErrorClassObject(loginError));
    } else {
      setCredentialClassNames({ emailClass: '', passwordClass: '' });
    }
  }, [loginError]);

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
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
          data-testid="login-email-input"
          type="email"
          placeholder="Email"
          className={credentialClassNames.emailClass}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          data-testid="login-password-input"
          type="password"
          placeholder="Password"
          className={credentialClassNames.passwordClass}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button data-testid="login-button" onClick={(e) => handleLogin(e)}>
          Login
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p>
          Don't have an account? <span onClick={onSignUpClick}>Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
