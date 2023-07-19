import styles from "../styles/loginRegister.module.scss";
import LeftSideComponent from "@/src/components/commons/logoLeftSide";
import RegisterForm from "@/src/components/register/registerForm";
import Head from "next/head";

export default function Register() {
  return (
    <>
      <Head>
        <title>Nerdolar</title>
      </Head>
      <main className={styles.main}>
        <LeftSideComponent />
        <div className={styles.rightSide}>
          <RegisterForm />
        </div>
      </main>
    </>
  );
}
