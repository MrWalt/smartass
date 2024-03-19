import { Link } from "react-router-dom";
import styles from "../styles/Logo.module.scss";

export default function Logo() {
  return (
    <Link to="/">
      <div className={styles.logo__container}>
        <img className={styles.logo} src="/logo.png" />
        <span className={styles.logo__header}>Smartass</span>
      </div>
    </Link>
  );
}
