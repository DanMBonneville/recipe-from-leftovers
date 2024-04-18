import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppState } from '../store';
import { logout } from '../store/reducers/userReducer';

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: AppState) => state.user.isLoggedIn);

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <div className="nav-bar">
      <Button
        data-testid="home-button"
        className="home-button"
        size="large"
        variant="contained"
        onClick={() => navigate('/search-for-recipes')}
      >
        <Icon>home</Icon>
      </Button>
      {isLoggedIn && (
        <Button
          data-testid="logout-btn"
          className="logout-button"
          variant="contained"
          onClick={(e) => handleLogout(e)}
        >
          Logout
        </Button>
      )}
      <Button
        data-testid="back-page-btn"
        className="back-page-btn"
        size="large"
        variant="contained"
        onClick={() => navigate(-1)}
      >
        <span className="material-symbols-outlined">arrow_back</span>
      </Button>
      <Button
        data-testid="forward-page-btn"
        className="forward-page-btn"
        onClick={() => navigate(+1)}
        variant="contained"
      >
        <span className="material-symbols-outlined">arrow_forward</span>
      </Button>
    </div>
  );
};

export default NavBar;
