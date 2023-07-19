import { FormEvent, useState } from "react";
import styles from "../../../../styles/loginRegister.module.scss";
import Link from "next/link";
import ToastComponent from "../../commons/toastComponent";
import { authService } from "@/src/services/authService";
import { useRouter } from "next/router";

const RegisterForm = () => {
  const router = useRouter();
  const [toastMessage, setToastMessage] = useState("");
  const [toastIsOpen, setToastIsOpen] = useState(false);

  const register = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const formData = new FormData(ev.currentTarget);

    const nickname = formData.get("nickname")!.toString();
    const email = formData.get("email")!.toString();
    const password = formData.get("password")!.toString();
    const passwordConfirm = formData.get("passwordConfirm")!.toString();

    const params = { nickname, email, password };

    if (password !== passwordConfirm) {
      setToastMessage("A senha e confirmação são diferentes!");
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 3000);
      return;
    }

    const data = await authService.register(params);

    if (data.status === 200) {
      router.push("/login?registred=true");
    } else {
      setToastMessage(
        data.data ? data.data.message : "Erro ao registrar usuario!"
      );
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 3000);
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={register}>
        <Link href="/">
          <h1 className={styles.logo}>N</h1>
        </Link>

        <h1>Crie sua conta</h1>

        <div className={styles.inputGroup}>
          <label htmlFor="nickname">Escolha um apelido unico: </label>
          <input type="text" id="nickname" name="nickname" required />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email">Email: </label>
          <input type="email" id="email" name="email" required />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password">Senha: </label>
          <input type="password" id="password" name="password" required />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="passwordConfirm">Confirme sua senha: </label>
          <input
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            required
          />
        </div>

        <button>Registrar-se</button>

        <Link href="/login">
          <h5>Já tem conta? Faça login</h5>
        </Link>
      </form>
      <ToastComponent
        color="bg-danger"
        isOpen={toastIsOpen}
        message={toastMessage}
      />
    </>
  );
};

export default RegisterForm;
