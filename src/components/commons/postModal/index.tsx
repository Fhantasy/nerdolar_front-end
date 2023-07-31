import { PostType } from "@/src/services/postService";
import styles from "./styles.module.scss";
import { Carousel, CarouselControl, CarouselItem, Modal } from "reactstrap";
import { useState } from "react";
import Image from "next/image";
import UserThumb from "../userThumb";

interface props {
  isOpen: boolean;
  toggle: () => void;
  post: PostType;
}

const PostModal = ({ isOpen, toggle, post }: props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === post.PostImages.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === 0 ? post.PostImages.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
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
      {post.PostImages.map((img) => (
        <CarouselItem
          key={img.id}
          onExiting={() => setAnimating(true)}
          onExited={() => setAnimating(false)}
        >
          <div className={styles.carouselItem}>
            <img
              src={`${process.env.NEXT_PUBLIC_URL}/${img.imgUrl}`}
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
    <>
      <Modal
        className={styles.modal}
        external={[closeBtn, carousel]}
        isOpen={isOpen}
        toggle={toggle}
        modalClassName={styles.overlayModal}
      >
        <div className={styles.modalContent}>
          <div className={styles.userDiv}>
            <UserThumb
              profileImgUrl={post.User.profileImg}
              username={post.User.name}
            />
            <p className={styles.userNickname}>
              {post.User.name} <span>@{post.User.nickname}</span>
            </p>
          </div>
          <p className={styles.postMessage}>{post.message}</p>
          <p className={styles.likes}>&#x2764; {post.likes}</p>
          <div className={styles.commentsDiv}>
            {post.comments?.map((comment) => (
              <div key={comment.id} className={styles.comment}>
                <div className={styles.userDiv}>
                  <UserThumb
                    profileImgUrl={comment.user.profileImg}
                    username={comment.user.name}
                  />
                  <p>
                    {comment.user.name} <span>@{comment.user.nickname}</span>
                  </p>
                </div>
                <p>{comment.message}</p>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PostModal;
