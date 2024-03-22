import { NavLink } from "react-router-dom";
import styles from "../styles/NavBar.module.scss";
import Logo from "./Logo";
import { useEffect, useRef, useState } from "react";

export default function NavBar() {
  const [activeNav, setActiveNav] = useState(false);
  const navBar = useRef(null);
  const phoneNavContainer = useRef(null);
  const phoneNavSlash = useRef(null);
  const phoneNavLinks = useRef(null);

  function handleActiveNav() {
    setActiveNav(() => !activeNav);
  }

  useEffect(
    function () {
      if (activeNav) {
        navBar.current.classList.add("navActive");
        phoneNavContainer.current.classList.add("navActive");
        phoneNavSlash.current.classList.add("navActive");
        phoneNavLinks.current.classList.add("navActive");
        return;
      }
      navBar.current.classList.remove("navActive");
      phoneNavContainer.current.classList.remove("navActive");
      phoneNavSlash.current.classList.remove("navActive");
      phoneNavLinks.current.classList.remove("navActive");
    },
    [activeNav]
  );

  return (
    <nav className={styles.navbar} ref={navBar}>
      <Logo />
      <ul className={styles.navbarLinks}>
        <li>
          <NavLink to="/trivia">Trivia</NavLink>
        </li>
        <li>
          <NavLink to="/jokes">Jokes</NavLink>
        </li>
        <li>
          <NavLink to="/advice">Advice</NavLink>
        </li>
      </ul>

      <div
        className={styles.navSlash}
        ref={phoneNavSlash}
        onClick={() => handleActiveNav()}
      ></div>
      <div
        className={styles.phoneNavContainer}
        onClick={() => handleActiveNav()}
        ref={phoneNavContainer}
      ></div>
      <ul className={styles.phoneNavLinks} ref={phoneNavLinks}>
        <li>
          <NavLink to="/trivia">Trivia</NavLink>
        </li>
        <li>
          <NavLink to="/jokes">Jokes</NavLink>
        </li>
        <li>
          <NavLink to="/advice">Advice</NavLink>
        </li>
      </ul>
    </nav>
  );
}
