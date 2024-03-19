import { NavLink } from "react-router-dom";
import styles from "../styles/NavBar.module.scss";
import Logo from "./Logo";

export default function NavBar() {
  return (
    <nav className={styles.navbar}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/trivia">Trivia</NavLink>
        </li>
        <li>
          <NavLink to="/jokes">Jokes</NavLink>
        </li>
        <li>
          <NavLink to="/facts">Facts</NavLink>
        </li>
      </ul>
    </nav>
  );
}
