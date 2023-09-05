import { PostType } from "@/src/services/postService";
import styles from "./styles.module.scss";
import { Carousel, CarouselControl, CarouselItem, Modal } from "reactstrap";
import { FormEvent, createRef, useState } from "react";
import UserThumb from "../userThumb";
import Link from "next/link";
import EmotesTab from "../emotesTab";
import { FaRegLaughBeam } from "react-icons/fa";
import { commentService } from "@/src/services/commentService";
import ToastComponent from "../toastComponent";
import CommentsSection from "./commentsSection";

interface props {
  isOpen: boolean;
  toggle: () => void;
  post: PostType;
}

const PostModal = ({ isOpen, toggle, post }: props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [emoteTabIsOpen, setEmoteTabIsOpen] = useState(false);
  const [commentMessage, setCommentMessage] = useState("");
  const [toastColor, setToastColor] = useState("");
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [refreshComments, setRefreshComments] = useState(0);

  const addEmoteToMessage = (emote: string) => {
    const message = document.getElementById("comment") as HTMLInputElement;

    if (!message) return;

    message.value += emote;
  };

  const commentSubmit = async () => {
    const params = {
      message: commentMessage,
      postId: post.id,
    };

    setCommentMessage("");

    const res = await commentService.create(params);

    if (res.status === 201) {
      setRefreshComments((prevState) => prevState + 1);
      setCommentMessage("");
      setToastMessage("Comentario publicado!");
      setToastColor("bg-success");
      setToastIsOpen(true);

      setTimeout(() => {
        setToastIsOpen(false);
      }, 3000);
    } else {
      setToastMessage("Erro ao publicar o comentario!");
      setToastColor("bg-danger");
      setToastIsOpen(true);

      setTimeout(() => {
        setToastIsOpen(false);
      }, 3000);
    }
  };

  const next = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === post.imageUrls.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === 0 ? post.imageUrls.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const autoHeight = (ev: FormEvent<HTMLTextAreaElement>) => {
    ev.currentTarget.style.height = "20px";
    ev.currentTarget.style.height = ev.currentTarget.scrollHeight + "px";
  };

  const closeBtn = (
    <button
      key={post.id + 1}
      type="button"
      className={styles.closeBtn}
      style={{ position: "absolute", top: "10px", left: "10px" }}
      onClick={toggle}
    >
      &times;
    </button>
  );

  const carousel = (
    <Carousel
      key={post.id}
      className={styles.carousel}
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      interval={false}
    >
      {post.imageUrls?.map((imgUrl, index) => (
        <CarouselItem
          key={index}
          onExiting={() => setAnimating(true)}
          onExited={() => setAnimating(false)}
        >
          <div className={styles.carouselItem}>
            <img
              src={`${process.env.NEXT_PUBLIC_URL}/${imgUrl}`}
              alt=""
              className={styles.postImage}
            />
          </div>
        </CarouselItem>
      ))}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
  );

  return (
    <Modal
      className={
        post.imageUrls.length > 0 ? styles.modalWithCarousel : styles.modal
      }
      external={[closeBtn, post.imageUrls.length > 0 ? carousel : null]}
      isOpen={isOpen}
      toggle={toggle}
      modalClassName={styles.overlayModal}
    >
      <div className={styles.modalContent}>
        <div className={styles.userDiv}>
          <UserThumb
            profileImgUrl={post.User.profileImg}
            username={post.User.name}
            nickname={post.User.nickname}
          />
          <Link href={post.User.nickname}>
            <p className={styles.userNickname}>
              {post.User.name} <span>@{post.User.nickname}</span>
            </p>
          </Link>
        </div>
        <p className={styles.postMessage}>{post.message}</p>
        <p className={styles.likes}>&#x2764; {post.likes}</p>

        <div className={styles.submitCommentDiv}>
          <textarea
            placeholder="Escreva um comentario..."
            className={styles.commentInput}
            id="comment"
            onInput={autoHeight}
            value={commentMessage}
            onChange={(ev) => setCommentMessage(ev.currentTarget.value)}
          ></textarea>
          <div className={styles.commentOptionsDiv}>
            <FaRegLaughBeam
              onClick={() => setEmoteTabIsOpen((prevState) => !prevState)}
              className={styles.insertIcon}
            />
            <button
              onClick={() => commentSubmit()}
              disabled={commentMessage === "" ? true : false}
            >
              Comentar
            </button>
          </div>
          <EmotesTab
            isOpen={emoteTabIsOpen}
            setIsOpen={setEmoteTabIsOpen}
            addEmoteToMessage={addEmoteToMessage}
          />
        </div>
        <CommentsSection key={refreshComments} postId={post.id} />
      </div>
      <ToastComponent
        color={toastColor}
        isOpen={toastIsOpen}
        message={toastMessage}
      />
    </Modal>
  );
};

export default PostModal;
