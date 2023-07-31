import styles from "../styles/home.module.scss";
import NavMenu from "@/src/components/commons/navMenu";
import FeedComponent from "@/src/components/home/feedComponent";
import { authService } from "@/src/services/authService";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    authService.isAuthorizated().then((authorization) => {
      console.log(authorization);
      if (authorization) {
        setIsAuthorized(authorization);
      } else {
        router.push("/login");
      }
    });
  }, []);

  if (!isAuthorized) {
    return <></>;
  }
  return (
    <>
      <Head>
        <title>Nerdolar - Home</title>
      </Head>
      <main className={styles.main}>
        <NavMenu />
        <FeedComponent />
      </main>
    </>
  );
}
