import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '@mui/material';
import styles from './Header.module.css';

export default function Header() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
      
        </Link>
        <nav className={styles.nav}>
       {/* <Link to="/" className={styles.link}>Home</Link> */}
          <Link to="/translate" className={styles.link}>Translation</Link>
          <Link to="/image-generation" className={styles.link}>Image Generation</Link>
          <Link to="/sentiment-analysis" className={styles.link}>Sentiment Analysis</Link>
          <Link to="/text-to-speech" className={styles.link}>Text to Speech</Link>
          
          {currentUser ? (
            <Button 
              variant="contained" 
              color="secondary" 
              onClick={handleLogout}
              className={styles.authButton}
            >
              Logout
            </Button>
          ) : (
            <Button 
              component={Link} 
              to="/login" 
              variant="contained" 
              color="primary"
              className={styles.authButton}
            >
              Login
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}