import Link from "next/link";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";

interface props {
  nickname: string;
}

const NavMenu = ({ nickname }: props) => {
  const router = useRouter();

  return (
    <div className={styles.navDiv}>
      <div className={styles.menu}>
        <h3 className={styles.logo}>N</h3>
        <Link href="/home">
          <h4 className={styles.menuItem}>Pagina&nbsp;Inicial</h4>
        </Link>

        <Link href={`/${nickname}`}>
          <h4 className={styles.menuItem}>Perfil</h4>
        </Link>

        <Link href={"/search"}>
          <h4 className={styles.menuItem}>Pesquisar</h4>
        </Link>

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

        <Link href="/new-post">
          <button>Nova Postagem</button>
        </Link>
      </div>
    </div>
  );
};

export default NavMenu;
