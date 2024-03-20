import { useQuestions } from "../contexts/QuestionsContext";
import styles from "../styles/Error.module.scss";

export default function Error() {
  const { error } = useQuestions();
  return (
    <div className={styles.errorContainer}>
      <span className={styles.error}>{error}</span>
    </div>
  );
}
