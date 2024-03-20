import { Link } from "react-router-dom";
import { useQuestions } from "../contexts/QuestionsContext";
import styles from "../styles/QuizResults.module.scss";
import Button from "./Button";

export default function QuizResults() {
  const { points, dispatch } = useQuestions();
  return (
    <div className={styles.summaryContainer}>
      <h2 className={styles.summary}>
        You scored <span className={styles.points}>{points}</span> out of{" "}
        <span className={styles.points}>100</span> points!
      </h2>
      <div className={styles.btnContainer}>
        <Link to="/">
          <Button
            className="btn"
            onClick={() => dispatch({ type: "exitGame" })}
          >
            Exit
          </Button>
        </Link>
        <Button
          className="btnPlayAgain"
          onClick={() => dispatch({ type: "exitGame" })}
        >
          Play Again
        </Button>
      </div>
    </div>
  );
}
