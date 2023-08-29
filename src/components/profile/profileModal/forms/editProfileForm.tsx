import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import styles from "./styles.module.scss";
import { UserType, userService } from "@/src/services/userService";

interface props {
  toggleModal: () => void;
  openToast: (message: string, status: "success" | "fail") => void;
  user: UserType;
  refreshUser: () => void;
}

const EditProfileForm = ({
  toggleModal,
  openToast,
  user,
  refreshUser,
}: props) => {
  const [previewProfileImg, setPreviewProfileImg] = useState("");
  const [previewBannerImg, setPreviewBannerImg] = useState("");
  const [previewProfileError, setPreviewProfileError] = useState("");
  const [previewBannerError, setPreviewBannerError] = useState("");

  const previewImg = (
    ev: ChangeEvent<HTMLInputElement>,
    type: "profile" | "banner"
  ) => {
    let setPreviewImg: Dispatch<SetStateAction<string>>;
    let setPreviewError: Dispatch<SetStateAction<string>>;

    if (type === "profile") {
      setPreviewProfileImg("");
      setPreviewImg = setPreviewProfileImg;
      setPreviewError = setPreviewProfileError;
    } else if (type === "banner") {
      setPreviewBannerImg("");
      setPreviewImg = setPreviewBannerImg;
      setPreviewError = setPreviewBannerError;
    } else {
      return;
    }

    const files = ev.currentTarget.files;

    if (!files || files.length === 0) return;

    if (files[0].size > 2 * 1048576) {
      setPreviewError("Tamanho da imagem deve ser até 5mb!");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = (ev) => {
      const readerTarget = ev.target;
      if (!readerTarget) return;

      setPreviewImg(readerTarget.result as string);
      setPreviewError("");
    };
  };

  const formSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const formData = new FormData(ev.currentTarget);

    const res = await userService.updateProfile(formData);

    if (res.status === 204) {
      openToast("Perfil Alterado!", "success");
      refreshUser();
      toggleModal();
    } else {
      openToast("Erro ao Atualizar perfil!", "fail");
    }
  };

  return (
    <form className={styles.form} onSubmit={formSubmit}>
      <div className={styles.inputDiv}>
        <label htmlFor="name">Nome:</label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={user.name}
          maxLength={30}
          required
        />
      </div>

      <div className={styles.inputDiv}>
        <label htmlFor="bio">Bio:</label>
        <textarea id="bio" name="bio" defaultValue={user.bio} maxLength={200} />
      </div>

      <div className={styles.inputDiv}>
        <label htmlFor="birth">Data de Nascimento:</label>
        <input
          type="date"
          id="birth"
          name="birth"
          defaultValue={
            user.birth
              ? new Date(user.birth).toISOString().split("T")[0]
              : undefined
          }
        />
      </div>

      <div className={styles.inputDiv}>
        <label htmlFor="locale">Localização:</label>
        <input
          type="text"
          id="locale"
          name="locale"
          defaultValue={user.locale}
        />
      </div>

      <div className={styles.imgChooseDiv}>
        <div className={styles.imgInputDiv}>
          <label htmlFor="profileImg">Imagem de Perfil:</label>
          <label className={styles.chooseImgLabel} htmlFor="profileImg">
            Enviar Imagem (JPG, JPEG, PNG)
          </label>
          <input
            style={{ display: "none" }}
            type="file"
            id="profileImg"
            name="profileImg"
            onChange={(ev) => previewImg(ev, "profile")}
          />
        </div>

        <p className={styles.imgErrorMessage}>{previewProfileError}</p>

        {previewProfileImg !== "" ? (
          <div className={styles.imgDiv}>
            <img src={previewProfileImg} alt="previewImg" />
            <p>&times;</p>
          </div>
        ) : null}
      </div>

      <div className={styles.imgChooseDiv}>
        <div className={styles.imgInputDiv}>
          <label htmlFor="bannerImg">Imagem do Banner:</label>
          <label className={styles.chooseImgLabel} htmlFor="bannerImg">
            Enviar Imagem (JPG, JPEG, PNG)
          </label>
          <input
            style={{ display: "none" }}
            type="file"
            id="bannerImg"
            name="profileBannerImg"
            onChange={(ev) => previewImg(ev, "banner")}
          />
        </div>

        <p className={styles.imgErrorMessage}>{previewBannerError}</p>

        {previewBannerImg !== "" ? (
          <div className={styles.imgDiv}>
            <img src={previewBannerImg} alt="previewImg" />
            <p>&times;</p>
          </div>
        ) : null}
      </div>

      <button className={styles.saveBtn}>Salvar</button>
    </form>
  );
};

export default EditProfileForm;
