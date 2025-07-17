import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.logo}>AI React App</h1>
        <nav>
  <Link to="/">Головна</Link>
  <Link to="/translate">Переклад</Link>
  <Link to="/image-generation">Генерація зображень</Link>
  <Link to="/sentiment-analysis">Аналіз настрою</Link>
  <Link to="/text-to-speech">Текст в мову</Link>
</nav>
      </div>
    </header>
  );
}