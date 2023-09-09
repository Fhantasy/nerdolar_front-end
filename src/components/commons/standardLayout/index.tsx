import styles from "./styles.module.scss";
import { authService } from "@/src/services/authService";
import { UserType } from "@/src/services/userService";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NavMenu from "../navMenu";
import ReleasesTable from "../releasesTable";
import { Offcanvas, OffcanvasHeader } from "reactstrap";

interface props {
  pageTitle: string;
  mainContent: JSX.Element;
  cbUserNickname?: (nickname: string) => void;
}

const StandardLayout = ({ pageTitle, mainContent, cbUserNickname }: props) => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserType>();
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    authService.isAuthorizated().then((authorization) => {
      if (authorization) {
        setIsAuthorized(true);
        setCurrentUser(authorization.data);
        if (cbUserNickname) cbUserNickname(authorization.data.nickname);
      } else {
        router.push("/login");
      }
    });
    setWindowWidth(innerWidth);
    window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
  }, []);

  if (!isAuthorized) {
    return <></>;
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <main className={styles.main}>
        <NavMenu nickname={currentUser!.nickname} />
        <div className={styles.mainContent}>{mainContent}</div>
        {windowWidth > 1219 ? <ReleasesTable /> : null}
      </main>
    </>
  );
};

export default StandardLayout;
