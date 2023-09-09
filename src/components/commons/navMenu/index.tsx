import Link from "next/link";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import { Offcanvas, OffcanvasHeader } from "reactstrap";
import ReleasesTable from "../releasesTable";
import { useEffect, useState } from "react";
import {
  FaPlus,
  FaFilm,
  FaHouseChimney,
  FaMagnifyingGlass,
  FaUser,
  FaX,
} from "react-icons/fa6";
import { setTimeout } from "timers/promises";

interface props {
  nickname: string;
}

const NavMenu = ({ nickname }: props) => {
  const router = useRouter();
  const [releasesOffCanvasIsOpen, setReleasesOffCanvasIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  const toggleReleasesOfCavas = () => {
    setReleasesOffCanvasIsOpen(!releasesOffCanvasIsOpen);
  };

  useEffect(() => {
    setWindowWidth(innerWidth);
    window.addEventListener("resize", () => setWindowWidth(innerWidth));
  }, []);

  return (
    <div className={styles.navDiv}>
      <div className={styles.menu}>
        <h3 className={styles.logo}>N</h3>
        <Link href="/home">
          {windowWidth > 884 ? (
            <h4 className={styles.menuItem}>Pagina&nbsp;Inicial</h4>
          ) : (
            <FaHouseChimney className={styles.menuItem} />
          )}
        </Link>

        <Link href={`/${nickname}`}>
          {windowWidth > 884 ? (
            <h4 className={styles.menuItem}>Perfil</h4>
          ) : (
            <FaUser className={styles.menuItem} />
          )}
        </Link>

        <Link href={"/search"}>
          {windowWidth > 884 ? (
            <h4 className={styles.menuItem}>Pesquisar</h4>
          ) : (
            <FaMagnifyingGlass className={styles.menuItem} />
          )}
        </Link>

        {windowWidth < 1219 ? (
          <>
            {windowWidth > 884 ? (
              <h4 className={styles.menuItem} onClick={toggleReleasesOfCavas}>
                Lançamentos
              </h4>
            ) : (
              <FaFilm
                className={styles.menuItem}
                onClick={toggleReleasesOfCavas}
              />
            )}

            <Offcanvas
              toggle={toggleReleasesOfCavas}
              isOpen={releasesOffCanvasIsOpen}
              direction="end"
              scrollable={true}
              style={{ width: "fit-content" }}
            >
              <OffcanvasHeader toggle={toggleReleasesOfCavas}></OffcanvasHeader>
              <ReleasesTable />
            </Offcanvas>
          </>
        ) : null}

        {windowWidth > 884 ? (
          <h4
            className={styles.logout}
            onClick={() => {
              if (confirm("Deseja mesmo Sair?")) {
                sessionStorage.clear();
                router.push("/");
              }
            }}
          >
            Sair
          </h4>
        ) : (
          <FaX
            className={styles.logout}
            onClick={() => {
              if (confirm("Deseja mesmo Sair?")) {
                sessionStorage.clear();
                router.push("/");
              }
            }}
          />
        )}

        <Link href="/new-post">
          <button>{windowWidth > 884 ? "Nova Postagem" : <FaPlus />}</button>
        </Link>
      </div>
    </div>
  );
};

export default NavMenu;
