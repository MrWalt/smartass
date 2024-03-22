import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import styles from "../styles/Homepage.module.scss";

export default function Homepage() {
  return (
    <>
      <div className={styles.homepage}>
        <NavBar />
        <div className={styles.ctaContainer}>
          <h1 className={styles.header}>
            Welcome to the{" "}
            <div className={styles.ctaBox}>
              <span className={styles.cta}>Nerd</span>
            </div>{" "}
            zone
          </h1>
          <p className={styles.ctaText}>
            Click on any of the links to start playing
          </p>
        </div>
        <Footer />
      </div>
    </>
  );
}
