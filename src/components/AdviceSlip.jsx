import { useEffect, useState, useRef } from "react";
import styles from "../styles/AdviceSlip.module.scss";
import Loader from "./Loader";

const BASE_URL = "https://api.adviceslip.com/advice";

export default function AdviceSlip() {
  const [advice, setAdvice] = useState(null);
  const [requestAdvice, setRequestAdvice] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const button = useRef(null);

  useEffect(
    function () {
      async function fetchAdvice() {
        setIsLoading(true);

        const res = await fetch(BASE_URL);
        const { slip: data } = await res.json();

        setIsDisabled(true);
        setAdvice(data);
        setIsLoading(false);
        setRequestAdvice(false);
      }

      if (requestAdvice) fetchAdvice();

      setTimeout(function () {
        setIsDisabled(false);
      }, 3000);
    },
    [requestAdvice]
  );

  useEffect(
    function () {
      if (isDisabled) {
        button.current.classList.add("disabled");
        return;
      }
      button.current.classList.remove("disabled");
    },
    [isDisabled]
  );

  function handleGetAdvice() {
    if (!isDisabled) setRequestAdvice(true);
  }

  return (
    <div className={styles.adviceContainer}>
      {advice && !isLoading ? (
        <h1 className={styles.advice}>{advice.advice}</h1>
      ) : (
        ""
      )}
      {isLoading && <Loader />}
      {!advice && !isLoading ? (
        <h1 className={styles.advice}>
          Click the button to get some random piece of advice
        </h1>
      ) : (
        ""
      )}
      <button
        ref={button}
        className={styles.button}
        onClick={() => handleGetAdvice()}
      >
        Get Advice
      </button>
    </div>
  );
}
