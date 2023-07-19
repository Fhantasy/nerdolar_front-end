import styles from "../styles/home.module.scss";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Nerdolar</title>
      </Head>
      <main className={styles.main}></main>
    </>
  );
}
