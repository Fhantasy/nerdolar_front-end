import styles from "./styles.module.scss";

const NavMenu = () => {
  return (
    <div className={styles.navDiv}>
      <div className={styles.menu}>
        <h3 className={styles.logo}>N</h3>
        <h4>Pagina&nbsp;Inicial</h4>
        <h4>Perfil</h4>
        <h4>Pesquisar</h4>
        <button>Nova Postagem</button>
      </div>
    </div>
  );
};

export default NavMenu;
