import { FormEvent, useEffect, useState } from "react";
import styles from "../../../../styles/loginRegister.module.scss";
import Link from "next/link";
import { authService } from "@/src/services/authService";
import { useRouter } from "next/router";
import ToastComponent from "../../commons/toastComponent";

const LoginForm = () => {
  const router = useRouter();
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState("");
  const [toastIsOpen, setToastIsOpen] = useState(false);

  const login = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const formData = new FormData(ev.currentTarget);

    const email = formData.get("email")!.toString();
    const password = formData.get("password")!.toString();

    const params = { email, password };

    const data = await authService.login(params);
    console.log(data.status);
    if (data.status === 400 || data.status === 401) {
      setToastMessage("A senha ou email estão errados!");
      setToastColor("bg-danger");
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 3000);
      return;
    } else {
      router.push("/home");
    }
  };

  useEffect(() => {
    if (router.query.registred === "true") {
      setToastIsOpen(true);
      setToastColor("bg-success");
      setTimeout(() => {
        setToastIsOpen(false);
      }, 3000);
      setToastMessage("Registro realizado com sucesso!");
    }
    if (router.query.passwordUpdated === "true") {
      setToastIsOpen(true);
      setToastColor("bg-success");
      setTimeout(() => {
        setToastIsOpen(false);
      }, 3000);
      setToastMessage("Senha Alterada! Faça login novamente");
    }
    if (router.query.accountUpdated === "true") {
      setToastIsOpen(true);
      setToastColor("bg-success");
      setTimeout(() => {
        setToastIsOpen(false);
      }, 3000);
      setToastMessage("Conta Atualizada! Faça login novamente");
    }
  }, [router.query]);

  return (
    <>
      <form className={styles.form} onSubmit={login}>
        <Link href="/">
          <h1 className={styles.logo}>N</h1>
        </Link>

        <h1>Login</h1>

        <div className={styles.inputGroup}>
          <label htmlFor="email">Email: </label>
          <input type="email" id="email" name="email" required />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password">Senha: </label>
          <input type="password" id="password" name="password" required />
        </div>

        <button>Entrar</button>
        <Link href="/register">
          <h5>Não tem conta? Crie uma conta</h5>
        </Link>
      </form>
      <ToastComponent
        color={toastColor}
        isOpen={toastIsOpen}
        message={toastMessage}
      />
    </>
  );
};

export default LoginForm;
