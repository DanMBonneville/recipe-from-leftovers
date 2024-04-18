import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  lOGIN_INVALID_EMAIL,
  lOGIN_MISSING_PASSWORD,
} from '../../common/constants';
import {
  createLoginErrorClassObject,
  createLoginErrorMessage,
} from '../../common/util';
import Loader from '../../components/Loader';
import { AppState, store } from '../../store';
import {
  getIngredientOptions,
  getSavedSelectedIngredients,
  loginUser,
} from '../../store/actions/actions';
import { resetErrorState } from '../../store/reducers/errorReducer';
import { resetIngredientState } from '../../store/reducers/ingredientReducer';
import { resetRecipesState } from '../../store/reducers/recipeReducer';
import { resetUserState } from '../../store/reducers/userReducer';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    } else {
      dispatch(resetUserState());
      dispatch(resetIngredientState());
      dispatch(resetRecipesState());
      dispatch(resetErrorState());
    }
  }, [dispatch, isLoggedIn, navigate]);

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

  const isEmailAndPasswordValid = () => {
    if (!email || !email.includes('@')) {
      setErrorMessage(createLoginErrorMessage(lOGIN_INVALID_EMAIL));
      setCredentialClassNames(createLoginErrorClassObject(lOGIN_INVALID_EMAIL));
    } else if (!password) {
      setErrorMessage(createLoginErrorMessage(lOGIN_MISSING_PASSWORD));
      setCredentialClassNames(
        createLoginErrorClassObject(lOGIN_MISSING_PASSWORD)
      );
    } else {
      return true;
    }
    return false;
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLogin(e);
    }
  };

  const handleLogin = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    if (isEmailAndPasswordValid()) {
      setCredentialClassNames({ emailClass: '', passwordClass: '' });
      store.dispatch(getIngredientOptions());
      store.dispatch(getSavedSelectedIngredients(email));
      store.dispatch(loginUser({ email, password }));
    }
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
          onKeyDown={handleKeyPress}
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
