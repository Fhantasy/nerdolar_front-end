import Link from "next/link";
import styles from "./styles.module.scss";
import Image from "next/image";

interface props {
  profileImgUrl: string;
  username: string;
  nickname: string;
  size?: string;
}

const UserThumb = ({ profileImgUrl, username, nickname, size }: props) => {
  if (profileImgUrl) {
    return (
      <Link href={`/${nickname}`}>
        <div
          className={styles.thumbWithImage}
          style={
            size
              ? { width: size, height: size }
              : { width: "40px", height: "40px" }
          }
        >
          <Image
            className={styles.userImg}
            src={`${process.env.NEXT_PUBLIC_URL}/public/${profileImgUrl}`}
            fill={true}
            sizes="default"
            alt="userImg"
          />
        </div>
      </Link>
    );
  } else {
    return (
      <Link href={`/${nickname}`}>
        <div
          className={styles.thumbWithoutImage}
          style={
            size
              ? { width: size, height: size }
              : { width: "40px", height: "40px" }
          }
        >
          <p>{username[0].toUpperCase()}</p>
        </div>
      </Link>
    );
  }
};

export default UserThumb;
