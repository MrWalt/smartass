import { useQuestions } from "../contexts/QuestionsContext";
import Button from "../components/Button";
import NavBar from "../components/NavBar";
import Quiz from "../components/Quiz";
import StartQuiz from "../components/StartQuiz";
import QuizResults from "../components/QuizResults";
import Error from "../components/Error";
import Loader from "../components/Loader";

export default function Trivia() {
  const { status, dispatch } = useQuestions();

  return (
    <>
      <NavBar />
      {status === "ready" && <StartQuiz />}
      {status === "active" && (
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
      {status === "finished" && <QuizResults />}
      {status === "loading" && <Loader />}
      {status === "error" && <Error />}
    </>
  );
}
