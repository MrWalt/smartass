import styles from "../styles/Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.footerText}>Made by</span>{" "}
      <a href="https://github.com/MrWalt" className={styles.footerLink}>
        MrWhite
      </a>
    </footer>
  );
}
