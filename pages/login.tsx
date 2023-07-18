import styles from "../styles/loginRegister.module.scss";
import LeftSideComponent from "@/src/components/commons/logoLeftSide";
import Head from "next/head";

export default function Login() {
  return (
    <>
      <Head>
        <title>Nerdolar - Login</title>
      </Head>
      <main className={styles.main}>
        <LeftSideComponent />
        <div className={styles.rightSide}></div>
      </main>
    </>
  );
}
