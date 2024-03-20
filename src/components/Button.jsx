import styles from "../styles/Button.module.scss";

export default function Button({ className, children, onClick }) {
  return (
    <button className={styles[className]} onClick={onClick}>
      {children}
    </button>
  );
}
