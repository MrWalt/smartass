import { useQuestions } from "../contexts/QuestionsContext";
import Button from "../components/Button";
import NavBar from "../components/NavBar";
import Quiz from "../components/Quiz";
import StartQuiz from "../components/StartQuiz";

export default function Trivia() {
  const { status, dispatch } = useQuestions();

  return (
    <>
      <NavBar />
      {status !== "active" ? (
        <StartQuiz />
      ) : (
        <>
          <Quiz />
          <Button
            className="btnQuit"
            onClick={() => dispatch({ type: "exitGame" })}
          >
            Exit
          </Button>
        </>
      )}
    </>
  );
}
