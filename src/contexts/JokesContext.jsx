import { createContext, useContext, useEffect, useReducer } from "react";

const JokesContext = createContext();
const BASE_URL = "https://v2.jokeapi.dev/joke/";
const CHUCK_BASE_URL = "https://api.chucknorris.io/jokes/random";

const initialState = {
  joke: "",
  requestJoke: false,
  jokeParams: "Any",
  status: "ready",
  showDelivery: false,
  type: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "setJoke":
      return { ...state, joke: action.payload };

    case "requestJoke":
      return { ...state, requestJoke: action.payload, showDelivery: false };

    case "setJokeParams":
      return { ...state, jokeParams: action.payload };

    case "setStatus":
      return { ...state, status: action.payload };

    case "showDelivery":
      return { ...state, showDelivery: true };
  }
}

function JokesProvider({ children }) {
  const [{ joke, status, requestJoke, showDelivery, jokeParams }, dispatch] =
    useReducer(reducer, initialState);

  useEffect(
    function () {
      async function fetchJoke() {
        dispatch({ type: "setStatus", payload: "loading" });
        const res = await fetch(`${BASE_URL}${jokeParams}`);
        const data = await res.json();
        dispatch({ type: "setJoke", payload: data });
        dispatch({ type: "requestJoke", payload: false });
        dispatch({ type: "setStatus", payload: "ready" });
      }

      async function fetchChuckNorrisJoke() {
        dispatch({ type: "setStatus", payload: "loading" });
        const res = await fetch(CHUCK_BASE_URL);
        const data = await res.json();
        dispatch({ type: "setJoke", payload: data.value });
        dispatch({ type: "requestJoke", payload: false });
        dispatch({ type: "setStatus", payload: "ready" });
      }
      if (requestJoke && jokeParams !== "ChuckNorris") fetchJoke();
      if (jokeParams === "ChuckNorris") fetchChuckNorrisJoke();
    },
    [requestJoke]
  );

  return (
    <JokesContext.Provider value={{ joke, status, showDelivery, dispatch }}>
      {children}
    </JokesContext.Provider>
  );
}

function useJoke() {
  const context = useContext(JokesContext);
  if (!context) throw new Erorr("useJoke was used outside of JokesProvider");
  return context;
}

export { JokesProvider, useJoke };
