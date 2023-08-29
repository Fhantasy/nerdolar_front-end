import styles from "./styles.module.scss";
import { Modal } from "reactstrap";
import EditProfileForm from "./forms/editProfileForm";
import ToastComponent from "../../commons/toastComponent";
import { useEffect, useState } from "react";
import { UserType } from "@/src/services/userService";
import EditPasswordForm from "./forms/editPasswordForm";
import EditAccountForm from "./forms/editAccountForm";
import { authService } from "@/src/services/authService";
import SpinnerComponent from "../../commons/spinner";

interface props {
  toggle: () => void;
  isOpen: boolean;
  refreshUser: () => void;
}

const ProfileModal = ({ toggle, isOpen, refreshUser }: props) => {
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState("");
  const [formName, setFormName] = useState("profile");
  const [currentUser, setCurrentUser] = useState<UserType>();

  const openToast = (message: string, status: "success" | "fail") => {
    setToastMessage(message);
    setToastColor(status === "success" ? "bg-success" : "bg-danger");
    setToastIsOpen(true);

    setTimeout(() => {
      setToastIsOpen(false);
    }, 3000);
  };

  const form = () => {
    switch (formName) {
      case "profile":
        return (
          <EditProfileForm
            openToast={openToast}
            toggleModal={toggle}
            user={currentUser!}
            refreshUser={refreshUser}
          />
        );
      case "account":
        return <EditAccountForm user={currentUser!} />;
      case "password":
        return <EditPasswordForm />;
    }
  };

  const changeForm = (formNameToChange: string) => {
    const prevBtn = document.getElementById(formName);
    if (prevBtn) {
      prevBtn.className = styles.menuBtn;
    }

    const currentBtn = document.getElementById(formNameToChange);
    if (currentBtn) {
      currentBtn.className = styles.menuBtnActive;
    }

    setFormName(formNameToChange);
  };

  useEffect(() => {
    if (!isOpen) return;

    authService.isAuthorizated().then((data) => setCurrentUser(data?.data));

    setFormName("profile");
  }, [isOpen]);

  if (!currentUser) return <SpinnerComponent />;

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle} centered size="lg">
        <div className={styles.closeIconDiv}>
          <p onClick={() => toggle()}>&times;</p>
        </div>

        <div className={styles.modalContent}>
          <div className={styles.menu}>
            <button
              className={styles.menuBtnActive}
              id="profile"
              onClick={() => changeForm("profile")}
            >
              Perfil
            </button>
            <button
              className={styles.menuBtn}
              id="account"
              onClick={() => changeForm("account")}
            >
              Conta
            </button>
            <button
              className={styles.menuBtn}
              id="password"
              onClick={() => changeForm("password")}
            >
              Senha
            </button>
          </div>
          {form()}
        </div>
      </Modal>
      <ToastComponent
        isOpen={toastIsOpen}
        message={toastMessage}
        color={toastColor}
      />
    </>
  );
};

export default ProfileModal;
