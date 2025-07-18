import styles from './Home.module.css';

export default function Home() {
  return (
    <div className={styles.home}>
      <h2 className={styles.title}>Ласкаво просимо до AI React App!</h2>
      <p className={styles.subtitle}>Оберіть потрібний інструмент у верхньому меню</p>
    
    </div>
  );
}