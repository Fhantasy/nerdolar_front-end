import styles from "./styles.module.scss";
import Image from "next/image";

interface props {
  profileImgUrl: string;
  username: string;
}

const UserThumb = ({ profileImgUrl, username }: props) => {
  return (
    <>
      {profileImgUrl ? (
        <div className={styles.thumbWithImage}>
          <Image
            className={styles.userImg}
            src={`${process.env.NEXT_PUBLIC_URL}/public/${profileImgUrl}`}
            fill={true}
            objectFit="cover"
            alt="userImg"
          />
        </div>
      ) : (
        <div className={styles.thumbWithoutImage}>
          <p>{username[0].toUpperCase()}</p>
        </div>
      )}
    </>
  );
};

export default UserThumb;
