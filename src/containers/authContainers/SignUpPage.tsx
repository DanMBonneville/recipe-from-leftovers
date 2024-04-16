// SignUpPage.js
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createSignUpErrorClassObject } from '../../common/util';
import Loader from '../../components/Loader';
import { AppState, store } from '../../store';
import { createUser } from '../../store/actions/actions';

const SignUpPage = () => {
  const navigate = useNavigate();

  let isLoggedIn = useSelector((state: AppState) => state.user.isLoggedIn);
  let isSigningUp = useSelector((state: AppState) => state.user.isSigningUp);
  let signUpErrorCode = useSelector(
    (state: AppState) => state.user.signUpErrorCode
  );
  let signUpErrorMessage = useSelector(
    (state: AppState) => state.user.signUpErrorMessage
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    if (signUpErrorCode) {
      setCredentialClassNames(createSignUpErrorClassObject(signUpErrorCode));
    } else {
      setCredentialClassNames({ emailClass: '', passwordClass: '' });
    }
  }, [signUpErrorCode]);

  const handleSignUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    store.dispatch(createUser({ email, password }));
  };

  const onLoginClick = () => {
    navigate('/login');
  };

  if (isSigningUp) {
    return <Loader />;
  }

  return (
    <div className="sign-up-container">
      <div className="sign-up-form">
        <h2>Sign Up</h2>
        <input
          data-testid="sign-up-email-input"
          type="email"
          placeholder="Email"
          className={credentialClassNames.emailClass}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          data-testid="sign-up-password-input"
          type="password"
          placeholder="Password"
          className={credentialClassNames.passwordClass}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button data-testid="sign-up-button" onClick={handleSignUp}>
          Sign Up
        </button>
        {signUpErrorMessage && (
          <p className="error-message">{signUpErrorMessage}</p>
        )}
        <p>
          Already have an account? <span onClick={onLoginClick}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
