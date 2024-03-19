import { useQuestions } from "../contexts/QuestionsContext";
import styles from "../styles/Question.module.scss";
import he from "he";

export default function Question() {
  const { questions } = useQuestions();

  console.log(questions);

  return (
    <>
      {questions && (
        <>
          <h2 className={styles.question}>
            {he.decode(questions.at(0).question)}
          </h2>
          <ul>{questions.at(0).incorrect_answers}</ul>
        </>
      )}
    </>
  );
}
