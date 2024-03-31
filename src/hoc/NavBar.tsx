import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className="nav-bar">
      <Button
        data-testid="home-button"
        className="home-button"
        size="large"
        variant="contained"
        onClick={() => navigate('/searchPage')}
      >
        <Icon>home</Icon>
      </Button>
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
