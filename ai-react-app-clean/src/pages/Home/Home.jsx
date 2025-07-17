import styles from './Home.module.css';

export default function Home() {
  return (
    <div className={styles.home}>
      <h2 className={styles.title}>Ласкаво просимо до AI React App!</h2>
      <p className={styles.subtitle}>Оберіть потрібний інструмент у верхньому меню</p>
      <div className={styles.features}>
        <div className={styles.featureCard}>
          <h3>Переклад тексту</h3>
          <p>Швидкий та якісний переклад за допомогою AI</p>
        </div>
      </div>
    </div>
  );
}