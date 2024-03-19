import { createContext, useContext, useEffect, useReducer } from "react";

const QuestionsContext = createContext();
// const BASE_URL = `https://opentdb.com/api.php?amount=10&category=15&type=multiple`;
const BASE_URL = `https://opentdb.com/api.php`;

const initialState = {
  questions: [],
  category: "25",
  numQuestions: 15,
  status: "standby",
  active: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "setQuestions":
      return { ...state, questions: action.payload };

    case "setCategory":
      return { ...state, category: action.payload };

    case "setNumQuestions":
      return {
        ...state,
        numQuestions: action.payload > 50 ? state.numQuestions : action.payload,
      };

    case "startGame":
      return { ...state, status: "starting" };
  }
}

function QuestionsProvider({ children }) {
  const [{ questions, category, numQuestions, status }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(
    function () {
      async function fetchTrivia() {
        try {
          const res = await fetch(
            `${BASE_URL}?amount=${numQuestions}&category=${category}&type=multiple`
          );
          if (!res.ok) throw new Error("There was an error fetching");

          const data = await res.json();
          const { results } = data;
          dispatch({ type: "setQuestions", payload: results });
        } catch {}
      }
      if (status === "starting") fetchTrivia();
    },
    [status]
  );

  console.log(category, numQuestions, status, questions);
  return (
    <QuestionsContext.Provider
      value={{ questions, category, numQuestions, status, dispatch }}
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
