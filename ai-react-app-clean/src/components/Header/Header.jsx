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
       {/* <Link to="/" className={styles.link}>Головна</Link> */}
          <Link to="/translate" className={styles.link}>Переклад</Link>
          <Link to="/image-generation" className={styles.link}>Генерація зображень</Link>
          <Link to="/sentiment-analysis" className={styles.link}>Аналіз настрою</Link>
          <Link to="/text-to-speech" className={styles.link}>Текст в мову</Link>
          
          {currentUser ? (
            <Button 
              variant="contained" 
              color="secondary" 
              onClick={handleLogout}
              className={styles.authButton}
            >
              Вийти
            </Button>
          ) : (
            <Button 
              component={Link} 
              to="/login" 
              variant="contained" 
              color="primary"
              className={styles.authButton}
            >
              Увійти
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}