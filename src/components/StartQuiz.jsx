import styles from "../styles/StartQuiz.module.scss";
import { useQuestions } from "../contexts/QuestionsContext";
import Loader from "./Loader";
import Error from "./Error";
import Button from "./Button";

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
            <option value="26">Celebrities</option>
            <option value="17">Science and Nature</option>
            <option value="11">Film</option>
            <option value="22">Geography</option>
            <option value="12">Music</option>
            <option value="20">Mythology</option>
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
        <Button
          className="btnStart"
          onClick={() => dispatch({ type: "setStatus", payload: "starting" })}
        >
          Start
        </Button>
      </div>
      {status === "loading" && <Loader />}
      {status === "error" && <Error />}
    </>
  );
}
