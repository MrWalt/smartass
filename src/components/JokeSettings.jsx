import { useJoke } from "../contexts/JokesContext";
import styles from "../styles/JokeSettings.module.scss";

export default function JokeSettings() {
  const { dispatch } = useJoke();
  return (
    <div className={styles.jokesContainer}>
      <select
        className={styles.jokesSettings}
        onChange={(e) =>
          dispatch({ type: "setJokeParams", payload: e.target.value })
        }
      >
        <option value="Any">Any</option>
        <option value="ChuckNorris">Chuck Norris</option>
        <option value="Dark">Dark</option>
        <option value="Programming">Programming</option>
        <option value="Pun">Pun</option>
      </select>
    </div>
  );
}
