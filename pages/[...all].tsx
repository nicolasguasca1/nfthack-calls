import Link from "next/link";
import styles from "../styles/Home.module.css";
import Page from "../components/UI/Page";

const NoMatch = () => {
  return (
    <Page>
      <div className={styles.no_match_content}>
        <h2 className={styles.h2_no_match}>
          Ups! You have reached an invalid path.
        </h2>
        <div className={styles.btn_no_match}>
          <Link passHref href="/home">
            Return to home screen
          </Link>
        </div>
      </div>
    </Page>
  );
};
export default NoMatch;
