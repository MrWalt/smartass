import styles from "../styles/StartQuiz.module.scss";
import { useQuestions } from "../contexts/QuestionsContext";
import Loader from "./Loader";

export default function StartQuiz() {
  const { status, category, numQuestions, dispatch } = useQuestions();

  return (
    <>
      <div className={styles.settings}>
        <div className={styles.categoryContainer}>
          <span className={styles.setting}>Category</span>
          <select
            className={styles.category}
            value={category}
            onChange={(e) =>
              dispatch({ type: "setCategory", payload: e.target.value })
            }
          >
            <option value="25">Art</option>
            <option value="27">Animals</option>
            <option value="11">Film</option>
            <option value="12">Music</option>
            <option value="15">Video Games</option>
          </select>
        </div>

        <div className={styles.questionsContainer}>
          <span className={styles.setting}>Questions</span>
          <input
            type="number"
            className={styles.questions}
            onChange={(e) =>
              dispatch({ type: "setNumQuestions", payload: e.target.value })
            }
            value={numQuestions}
          />
        </div>
        <button
          className={styles.btn}
          onClick={() => dispatch({ type: "startGame" })}
        >
          Start
        </button>
      </div>
      {status === "loading" && <Loader />}
    </>
  );
}
