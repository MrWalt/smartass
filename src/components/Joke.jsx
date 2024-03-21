import { useJoke } from "../contexts/JokesContext";
import styles from "../styles/Joke.module.scss";

export default function Joke() {
  const { joke, dispatch } = useJoke();

  return (
    <>
      {joke.type === "twopart" ? (
        <>
          <h1 className={styles.joke}>{joke.setup}</h1>
          <button
            className={styles.btnDelivery}
            onClick={() => dispatch({ type: "showDelivery" })}
          >
            ?
          </button>
        </>
      ) : (
        <h1 className={styles.joke}>{joke.joke}</h1>
      )}
      {joke.type === undefined && <h1 className={styles.joke}>{joke}</h1>}
    </>
  );
}
