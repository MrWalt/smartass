import { createContext, useContext, useEffect, useReducer } from "react";

const QuestionsContext = createContext();
// const BASE_URL = `https://opentdb.com/api.php?amount=10&category=15&type=multiple`;
const BASE_URL = `https://opentdb.com/api.php`;

const initialState = {
  questions: [],
  category: "25",
  numQuestions: 15,
  index: 0,
  // ready, active, starting, loading, error, finished
  status: "ready",
  error: "",
  currentAnswer: "",
  points: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "setQuestions":
      return { ...state, questions: action.payload, status: "ready" };

    case "setCategory":
      return { ...state, category: action.payload, status: "ready" };

    case "setNumQuestions":
      return {
        ...state,
        numQuestions: action.payload > 50 ? state.numQuestions : action.payload,
        status: "ready",
      };

    case "setAnswer":
      return {
        ...state,
        currentAnswer: action.payload,
        points:
          state.questions.at(state.index).correct_answer === action.payload
            ? state.points + 100 / state.numQuestions
            : state.points,
      };

    case "nextQuestion":
      if (state.currentAnswer === "") return { ...state };
      return {
        ...state,
        index:
          state.index !== state.numQuestions - 1
            ? state.index + 1
            : state.index,
        currentAnswer: "",
        status:
          state.index === state.numQuestions - 1 ? "finished" : state.status,
      };

    case "setError":
      return { ...state, error: action.payload, status: "error" };

    case "setStatus":
      return { ...state, status: action.payload };

    case "setPoints":
      return { ...state, points: state.points + action.payload };

    case "exitGame":
      return { ...initialState };
  }
}

function QuestionsProvider({ children }) {
  const [
    {
      questions,
      error,
      category,
      numQuestions,
      status,
      index,
      currentAnswer,
      points,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(
    function () {
      async function fetchTrivia() {
        try {
          dispatch({ type: "setStatus", payload: "loading" });
          if (numQuestions === "0") throw new Error();

          const res = await fetch(
            `${BASE_URL}?amount=${numQuestions}&category=${category}` // &type=multiple
          );
          if (!res.ok) throw new Error();
          const data = await res.json();

          const { results } = data;
          dispatch({ type: "setQuestions", payload: results });
          dispatch({ type: "setStatus", payload: "active" });
        } catch {
          dispatch({
            type: "setError",
            payload: "There was an error fetching questions",
          });
        }
      }
      if (status === "starting") fetchTrivia();
    },
    [status]
  );

  return (
    <QuestionsContext.Provider
      value={{
        questions,
        index,
        category,
        numQuestions,
        status,
        error,
        currentAnswer,
        points,
        dispatch,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
}

function useQuestions() {
  const context = useContext(QuestionsContext);
  if (context === undefined)
    throw new Error("useQuestions was used outside of QuestionsProvider");

  return context;
}

export { QuestionsProvider, useQuestions };
