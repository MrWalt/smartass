import { useQuestions } from "../contexts/QuestionsContext";
import styles from "../styles/Quiz.module.scss";
import he from "he";
import Button from "./Button";

export default function Quiz() {
  const { questions, numQuestions, index, currentAnswer, points, dispatch } =
    useQuestions();

  const answers = [
    ...questions.at(index).incorrect_answers,
    questions.at(index).correct_answer,
  ].sort();

  function handleAnswer(e) {
    if (currentAnswer !== "") return;
    dispatch({ type: "setAnswer", payload: e.target.textContent });
  }

  return (
    <div className={styles.game}>
      <h1 className={styles.question}>
        {he.decode(questions.at(index).question)}
      </h1>
      <div className={styles.buttons}>
        <ul className={styles.answers}>
          {answers.map((answer) => (
            <li
              className={`${styles.answer} ${
                currentAnswer !== "" &&
                answer === questions.at(index).correct_answer
                  ? "correct"
                  : ""
              } ${currentAnswer === answer ? "selected" : ""}`}
              key={answer}
              onClick={(e) => handleAnswer(e)}
            >
              {he.decode(answer)}
            </li>
          ))}
        </ul>
        <div className={styles.progress}>
          <span className={styles.currentQuestion}>
            {index + 1} / {numQuestions}
          </span>

          <Button
            className="btn"
            onClick={() => dispatch({ type: "nextQuestion" })}
          >
            Next
          </Button>
        </div>
        <div className={styles.pointsContainer}>
          <span className={styles.pointsText}>Points</span>
          <span className={styles.points}>{Math.floor(points)}</span>
          <span className={styles.pointsMax}>100</span>
        </div>
      </div>
    </div>
  );
}
