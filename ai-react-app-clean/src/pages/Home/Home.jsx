import styles from './Home.module.css';

export default function Home() {
  return (
    <div className={styles.home}>
      <h2 className={styles.title}>Welcome to AI React App!</h2>
      <p className={styles.subtitle}>Select the desired tool from the menu above</p>
    </div>
  );
}