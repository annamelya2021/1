import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Header.module.css';

export default function Header() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          AI App
        </Link>
        <nav className={styles.nav}>
          <Link to="/translate" className={styles.link}>Translation</Link>
          <Link to="/image-generation" className={styles.link}>Meme Generator</Link>
          <Link to="/sentiment-analysis" className={styles.link}>Sentiment Analysis</Link>
          <Link to="/text-to-speech" className={styles.link}>Text to Speech</Link>
          
          {currentUser ? (
            <div className={styles.authSection}>
              <span className={styles.userEmail}>
                {currentUser.email}
              </span>
              <button 
                onClick={handleLogout}
                className={styles.logoutButton}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className={styles.authSection}>
              <Link to="/login" className={styles.loginButton}>
                Login
              </Link>
              <Link to="/register" className={styles.registerButton}>
                Sign Up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}