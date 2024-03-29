import styles from "../styles/index.module.scss";
import LeftSideComponent from "@/src/components/commons/logoLeftSide";
import Head from "next/head";
import Link from "next/link";

export default function HomeNoAuth() {
  return (
    <>
      <Head>
        <title>Nerdolar</title>
      </Head>
      <main className={styles.main}>
        <LeftSideComponent />
        <div className={styles.rightSide}>
          <div className={styles.content}>
            <h1>Nerdolar</h1>
            <h4>A rede social dos nerdolas</h4>
            <div className={styles.buttons}>
              <Link href="/login">
                <button>Login</button>
              </Link>
              <Link href="/register">
                <button>Inscreva-se</button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
