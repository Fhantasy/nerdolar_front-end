import styles from "./styles.module.scss";
import { FaHeart } from "react-icons/fa6";
import { PostType, postService } from "@/src/services/postService";
import ReactTimeAgo from "react-time-ago";
import Image from "next/image";
import PostModal from "../postModal";
import { useEffect, useState } from "react";
import UserThumb from "../userThumb";
import MediaProductPostCard from "../mediaProductPostCard";
import Link from "next/link";
import { likeService } from "@/src/services/likeService";

interface props {
  post: PostType;
}

const PostCard = ({ post }: props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [completePost, setCompletePost] = useState<PostType>(post);
  const [liked, setLiked] = useState<boolean>(
    post.liked.length > 0 ? true : false
  );

  const toggleModal = () => setModalIsOpen(!modalIsOpen);

  const handleLike = () => {
    if (!liked) {
      likeService.like(post.id);
      setLiked(true);
    } else {
      likeService.dislike(post.id);
      setLiked(false);
    }
  };

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
              nickname={post.User.nickname}
            />
            <p className={styles.timeAgo}>
              <ReactTimeAgo
                date={new Date(post.createdAt).getTime()}
                locale="pt-BR"
                timeStyle="mini"
              />
            </p>
          </div>

          <MediaProductPostCard mediaProduct={post.MediaProduct} />
        </div>
      </div>

      <div className={styles.messageImagesDiv}>
        <div className={styles.messageDiv}>
          <div className={styles.nickLikeDiv}>
            <Link href={`/${post.User.nickname}`}>
              <p className={styles.userNickname}>
                <span className={styles.userName}>{post.User.name}</span> @
                {post.User.nickname}
              </p>
            </Link>
            <FaHeart
              className={styles.likeHeart}
              onClick={handleLike}
              style={{ color: liked ? "red" : "inherit" }}
            />
          </div>
          <p className={styles.message} onClick={toggleModal}>
            {post.message}
          </p>
        </div>

        <div className={styles.postImages} onClick={toggleModal}>
          <div
            className={
              post.imageUrls?.length === 1
                ? styles.singleImage
                : styles.imagesGrid
            }
          >
            {post.imageUrls?.map((img, index) => (
              <div className={styles.imageDiv} key={index}>
                <Image
                  className={styles.postImage}
                  src={`${process.env.NEXT_PUBLIC_URL}/${img}`}
                  alt="postImage"
                  fill={post.imageUrls.length === 1 ? false : true}
                  width={post.imageUrls.length === 1 ? 0 : undefined}
                  height={post.imageUrls.length === 1 ? 0 : undefined}
                  sizes="default"
                  style={post.imageUrls.length === 1 ? { width: "100%" } : {}}
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
