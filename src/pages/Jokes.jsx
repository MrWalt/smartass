import { useJoke } from "../contexts/JokesContext";
import { useEffect, useRef } from "react";

import Button from "../components/Button";
import Joke from "../components/Joke";
import JokeSettings from "../components/JokeSettings";
import NavBar from "../components/NavBar";
import Loader from "../components/Loader";

import styles from "../styles/Jokes.module.scss";

export default function Jokes() {
  const { joke, status, showDelivery, dispatch } = useJoke();
  const deliveryContainer = useRef(null);

  useEffect(
    function () {
      if (showDelivery) deliveryContainer.current.classList.add("show");
      if (!showDelivery && deliveryContainer.current !== null)
        deliveryContainer.current.classList.remove("show");
    },
    [showDelivery]
  );

  return (
    <>
      <NavBar />
      <div className={styles.jokes}>
        <JokeSettings />
        <div className={styles.jokesContainer}>
          <Button
            className="btnGetJoke"
            onClick={() => dispatch({ type: "requestJoke", payload: true })}
          >
            Get Joke
          </Button>
          {status === "ready" && joke ? <Joke /> : ""}
          {status === "loading" && <Loader />}
          {status !== "loading" && !joke ? (
            <h1>Click the button for a funny joke</h1>
          ) : (
            ""
          )}
        </div>
        {joke.type === "twopart" && (
          <div
            className={`${styles.jokeDeliveryContainer}`}
            ref={deliveryContainer}
          >
            <h1 className={styles.jokeDelivery}>{joke.delivery}</h1>
          </div>
        )}
      </div>
    </>
  );
}
