import { FormEvent, useState } from "react";
import styles from "./styles.module.scss";
import { userService } from "@/src/services/userService";
import { useRouter } from "next/router";

const EditPasswordForm = () => {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const formSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorMessage("A nova senha e confimação são diferentes!");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return;
    }

    const params = {
      currentPassword: currentPassword,
      newPassword: newPassword,
    };

    const res = await userService.updatePassword(params);

    if (res.status === 204) {
      sessionStorage.clear();
      router.push("/login?passwordUpdated=true");
    } else {
      setErrorMessage(
        res.data?.message || "Ocorreu um erro ao atualizar senha!"
      );
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  return (
    <form className={styles.form} onSubmit={formSubmit}>
      <div className={styles.inputDiv}>
        <label htmlFor="currentPassword">Senha Atual:</label>
        <input
          type="password"
          id="currentPassword"
          name="currentPassword"
          required
          value={currentPassword}
          maxLength={40}
          onChange={(ev) => setCurrentPassword(ev.currentTarget.value)}
        />
      </div>

      <div className={styles.inputDiv}>
        <label htmlFor="newPassword">Nova Senha:</label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          required
          maxLength={40}
          value={newPassword}
          onChange={(ev) => setNewPassword(ev.currentTarget.value)}
        />
      </div>

      <div className={styles.inputDiv}>
        <label htmlFor="confirmPassword">Confirme a nova senha:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          required
          maxLength={40}
          value={confirmPassword}
          onChange={(ev) => setConfirmPassword(ev.currentTarget.value)}
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

export default EditPasswordForm;
