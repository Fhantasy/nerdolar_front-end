import { FormEvent, useState } from "react";
import styles from "./styles.module.scss";
import { UserType, userService } from "@/src/services/userService";
import { useRouter } from "next/router";

interface props {
  user: UserType;
}

const EditAccountForm = ({ user }: props) => {
  const router = useRouter();
  const [email, setEmail] = useState(user.email);
  const [nickname, setNickname] = useState(user.nickname);
  const [errorMessage, setErrorMessage] = useState("");

  const formSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const params = { nickname: nickname, email: email };

    const res = await userService.updateAccount(params);

    if (res.status === 204) {
      sessionStorage.clear();
      router.push("/login?accountUpdated=true");
    } else {
      setErrorMessage("Error ao atualizar conta!");
    }
  };

  return (
    <form className={styles.form} onSubmit={formSubmit}>
      <div className={styles.inputDiv}>
        <label htmlFor="nickname">Apelido:</label>
        <input
          type="text"
          id="nickname"
          name="nickname"
          value={nickname}
          onChange={(ev) => setNickname(ev.currentTarget.value)}
          maxLength={20}
          required
        />
      </div>

      <div className={styles.inputDiv}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={email}
          maxLength={50}
          onChange={(ev) => setEmail(ev.currentTarget.value)}
        />
      </div>

      <p>
        Aviso: Com a alteração dessas informações sua conta{" "}
        <strong>será deslogada</strong> e terá que ser feito o login novamente
      </p>

      <button className={styles.saveBtn}>Salvar</button>

      {errorMessage !== "" ? (
        <p style={{ color: "red" }}>{errorMessage}</p>
      ) : null}
    </form>
  );
};

export default EditAccountForm;
