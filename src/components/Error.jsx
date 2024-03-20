import { useQuestions } from "../contexts/QuestionsContext";
import styles from "../styles/Error.module.scss";
import Button from "./Button";

export default function Error() {
  const { error, dispatch } = useQuestions();
  return (
    <div className={styles.errorContainer}>
      <span className={styles.error}>{error}</span>
      <Button className="btn" onClick={() => dispatch({ type: "exitGame" })}>
        Try Again
      </Button>
    </div>
  );
}
