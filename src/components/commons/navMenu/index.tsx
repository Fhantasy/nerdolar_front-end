import Link from "next/link";
import styles from "./styles.module.scss";

interface props {
  nickname: string;
}

const NavMenu = ({ nickname }: props) => {
  return (
    <div className={styles.navDiv}>
      <div className={styles.menu}>
        <h3 className={styles.logo}>N</h3>
        <Link href="/home">
          <h4>Pagina&nbsp;Inicial</h4>
        </Link>
        <Link href={`/${nickname}`}>
          <h4>Perfil</h4>
        </Link>
        <h4>Pesquisar</h4>
        <Link href="/new-post">
          <button>Nova Postagem</button>
        </Link>
      </div>
    </div>
  );
};

export default NavMenu;
