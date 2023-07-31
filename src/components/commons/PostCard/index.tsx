import { categoryColor } from "@/src/services/categoryColor";
import styles from "./styles.module.scss";
import { PostType, postService } from "@/src/services/postService";
import ReactTimeAgo from "react-time-ago";
import Image from "next/image";
import PostModal from "../postModal";
import { useEffect, useState } from "react";
import UserThumb from "../userThumb";

interface props {
  post: PostType;
}

const PostCard = ({ post }: props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [completePost, setCompletePost] = useState<PostType>(post);

  const toggleModal = () => setModalIsOpen(!modalIsOpen);

  useEffect(() => {
    if (modalIsOpen) {
      postService.getPost(post.id).then((data) => {
        setCompletePost(data.data);
      });
    }
  }, [modalIsOpen]);

  return (
    <div className={styles.post}>
      <div className={styles.authorAboutDiv}>
        <div className={styles.authorDiv}>
          <div className={styles.userImgTimeAgoDiv}>
            <UserThumb
              profileImgUrl={post.User.profileImg}
              username={post.User.name}
            />
            <p className={styles.timeAgo}>
              <ReactTimeAgo
                date={new Date(post.createdAt).getTime()}
                locale="pt-BR"
                timeStyle="mini"
              />
            </p>
          </div>

          <div className={styles.aboutDiv}>
            <p className={styles.aboutTitle}>Sobre: </p>
            <p className={styles.mediaTitle}>{post.MediaProduct.title}</p>

            <img
              src={`${process.env.NEXT_PUBLIC_URL}/public/${post.MediaProduct.thumbnailImg}`}
              alt="mediaImg"
              className={styles.mediaImg}
            />

            <p
              className={styles.mediaCategory}
              style={{ color: categoryColor(post.MediaProduct.category.name) }}
            >
              {post.MediaProduct.category.name}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.messageImagesDiv}>
        <div className={styles.messageDiv}>
          <p className={styles.userNickname}>
            <span className={styles.userName}>{post.User.name}</span> @
            {post.User.nickname}
          </p>
          <p className={styles.message} onClick={toggleModal}>
            {post.message}
          </p>
        </div>

        <div className={styles.postImages} onClick={toggleModal}>
          <div
            className={
              post.PostImages.length === 1
                ? styles.singleImage
                : styles.imagesGrid
            }
          >
            {post.PostImages.map((img) => (
              <div className={styles.imageDiv} key={img.id}>
                <Image
                  className={styles.postImage}
                  src={`${process.env.NEXT_PUBLIC_URL}/${img.imgUrl}`}
                  alt="postImage"
                  fill={post.PostImages.length === 1 ? false : true}
                  width={post.PostImages.length === 1 ? 0 : undefined}
                  height={post.PostImages.length === 1 ? 0 : undefined}
                  objectFit="cover"
                  sizes="100vw"
                  style={post.PostImages.length === 1 ? { width: "100%" } : {}}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <PostModal
        isOpen={modalIsOpen}
        toggle={toggleModal}
        post={completePost}
      />
    </div>
  );
};

export default PostCard;
