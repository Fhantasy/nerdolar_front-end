import { emoteList } from "@/src/services/emotesList";
import styles from "./styles.module.scss";
import {
  MediaProductType,
  mediaProductService,
} from "@/src/services/mediaProductService";
import { postService } from "@/src/services/postService";
import { ChangeEvent, FormEvent, createRef, useEffect, useState } from "react";
import {
  FaRegLaughBeam,
  FaFileImage,
  FaAngleDown,
  FaSearch,
} from "react-icons/fa";
import MediaProductPostCard from "../commons/mediaProductPostCard";
import { useRouter } from "next/router";
import ToastComponent from "../commons/toastComponent";
import EmotesTab from "../commons/emotesTab";

const PostForm = () => {
  const router = useRouter();
  const mediaProductInput = createRef<HTMLInputElement>();
  const mediaProductSelector = createRef<HTMLInputElement>();
  const [toastMessage, setToastMessage] = useState("");
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [aboutInput, setAboutInput] = useState<string>("");
  const [sendBtnDisable, setSendBtnDisable] = useState(false);
  const [mediaProducts, setMediaProducts] = useState<MediaProductType[]>([]);
  const [previewImageUrls, setPreviewImageUrls] = useState<string[]>([]);
  const [previewErrorMessage, setPreviewErrorMessage] = useState("");
  const [emoteTabIsOpen, setEmoteTabIsOpen] = useState(false);
  const [mediaProductSelectorIsOpen, setMediaProductSelectorIsOpen] =
    useState(false);
  const [currentMediaProduct, setCurrentMediaProduct] =
    useState<MediaProductType>();

  const imagesPreview = (ev: ChangeEvent<HTMLInputElement>) => {
    setPreviewImageUrls([]);
    const files = ev.currentTarget.files;
    let isTooLarge = false;

    if (!files) return;

    if (files.length > 4) {
      setPreviewErrorMessage("Maximo de imagens é 4!");
      ev.currentTarget.value = "";
      return;
    }

    for (let index = 0; index < files.length; index++) {
      const reader = new FileReader();
      reader.readAsDataURL(files[index]);

      reader.onload = (ev) => {
        const readerTarget = ev.target;
        if (!readerTarget || isTooLarge) return;

        setPreviewImageUrls((prevState) => [
          ...prevState,
          readerTarget.result as string,
        ]);
      };

      if (files[index].size > 5 * 1048576) {
        index = files.length;
        isTooLarge = true;
      }
    }

    if (isTooLarge) {
      setPreviewImageUrls([]);
      setPreviewErrorMessage("Cada imagem pode ter no maximo 5mb!");
      ev.currentTarget.value = "";
    } else {
      setPreviewErrorMessage("");
    }
  };

  const removeImages = () => {
    const imagesInput = document.getElementById("images") as HTMLInputElement;

    imagesInput.value = "";
    setPreviewImageUrls([]);

    console.log(imagesInput.files);
  };

  const formSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    setSendBtnDisable(true);

    const formData = new FormData(ev.currentTarget);

    const res = await postService.post(formData);

    if (res.status === 201) {
      router.push("/home");
    } else {
      setToastIsOpen(true);
      setToastMessage("Ocorreu um erro ao postar! Tente mais tarde");

      setSendBtnDisable(false);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 3000);
    }

    mediaProductSelector.current?.blur();
  };

  const addEmoteToMessage = (emote: string) => {
    const message = document.getElementById("message") as HTMLInputElement;

    if (!message) return;

    message.value += emote;
  };

  const mediaProductSelection = (mediaProduct: MediaProductType) => {
    mediaProductSelector.current!.value = mediaProduct.title;
    mediaProductInput.current!.value = mediaProduct.id.toString();
    setCurrentMediaProduct(mediaProduct);
    setMediaProductSelectorIsOpen(false);
  };

  useEffect(() => {
    if (!aboutInput) {
      setMediaProducts([]);
      return;
    }

    mediaProductService.search(aboutInput).then((data) => {
      if (data.status === 200) {
        setMediaProducts(data.data.mediaProducts);
      } else {
        console.log(data.message);
      }
    });
  }, [aboutInput]);

  return (
    <form onSubmit={formSubmit} className={styles.form}>
      <input
        className={styles.messageInput}
        type="text"
        name="message"
        id="message"
        placeholder="O que você está pensando..."
        required
      />

      {previewImageUrls.length > 0 ? (
        <>
          <div className={styles.removeBtnDiv}>
            <button
              type="button"
              onClick={removeImages}
              className={styles.removeImgBtn}
            >
              &times;
            </button>
          </div>
          <div className={styles.imagesPreviewDiv}>
            {previewImageUrls?.map((imageUrl, index) => (
              <img key={index} src={imageUrl} />
            ))}
          </div>
        </>
      ) : null}
      {previewErrorMessage ? (
        <p className={styles.errorMessage}>{previewErrorMessage}</p>
      ) : null}

      <div className={styles.insertDiv}>
        <FaRegLaughBeam
          onClick={() => setEmoteTabIsOpen((prevState) => !prevState)}
          className={styles.insertIcon}
        />
        <label htmlFor="images">
          <FaFileImage className={styles.insertIcon} />
        </label>
      </div>

      <EmotesTab
        isOpen={emoteTabIsOpen}
        setIsOpen={setEmoteTabIsOpen}
        addEmoteToMessage={addEmoteToMessage}
      />

      <input
        type="file"
        name="images"
        id="images"
        accept="image/jpg, image/jpeg, image/png"
        max={4}
        multiple
        style={{ display: "none" }}
        onChange={imagesPreview}
      />

      <div className={styles.mediaProductDiv}>
        <div className={styles.mediaProductSelector}>
          <div
            className={styles.selector}
            onClick={() =>
              setMediaProductSelectorIsOpen(!mediaProductSelectorIsOpen)
            }
          >
            <input
              ref={mediaProductSelector}
              placeholder="Estou falando sobre..."
              data-readonly
              onFocus={(ev) => ev.currentTarget.blur()}
              required
            />
            <FaAngleDown />
          </div>
          {mediaProductSelectorIsOpen ? (
            <div className={styles.content}>
              <div className={styles.searchDiv}>
                <FaSearch />
                <input
                  type="text"
                  value={aboutInput}
                  onChange={(ev) => setAboutInput(ev.currentTarget.value)}
                />
              </div>
              <div className={styles.options}>
                {mediaProducts?.map((mediaProduct) => (
                  <option
                    key={mediaProduct.id}
                    value={mediaProduct.id}
                    onClick={() => mediaProductSelection(mediaProduct)}
                  >
                    {mediaProduct.title}
                  </option>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        {currentMediaProduct ? (
          <MediaProductPostCard mediaProduct={currentMediaProduct} />
        ) : null}
      </div>

      <input type="text" name="mediaProductId" ref={mediaProductInput} hidden />
      <div className={styles.sendBtnDiv}>
        <button disabled={sendBtnDisable}>Enviar</button>
      </div>

      <ToastComponent
        color="bg-danger"
        isOpen={toastIsOpen}
        message={toastMessage}
      />
    </form>
  );
};

export default PostForm;
