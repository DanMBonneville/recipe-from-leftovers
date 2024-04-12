// SignUpPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { store } from '../../store';
import { createUser } from '../../store/actions/actions';

const SignUpPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    // TODO: implement checks
    console.log('The object passed in.. ', { email, password });
    store.dispatch(createUser({ email, password }));
  };

  const onLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="sign-up-container">
      <div className="sign-up-form">
        <h2>Sign Up</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSignUp}>Sign Up</button>
        <p>
          Already have an account? <span onClick={onLoginClick}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
