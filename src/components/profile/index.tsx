import styles from "./styles.module.scss";
import { FaCakeCandles, FaHouseChimney } from "react-icons/fa6";
import { UserType, userService } from "@/src/services/userService";
import Image from "next/image";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import UserThumb from "../commons/userThumb";
import { followService } from "@/src/services/followService";
import UserPosts from "./userPosts";
import UserWatchList from "./userWatchList";

interface props {
  cbNickname: Dispatch<SetStateAction<string>>;
  isMyProfile: boolean;
}

const ProfileComponent = ({ cbNickname, isMyProfile }: props) => {
  const router = useRouter();
  const nickname = router.query.nickname;
  const [user, setUser] = useState<UserType>();
  const [userFound, setUserFound] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [currentContent, setCurrentContent] = useState("posts");

  const handleFollow = () => {
    if (!isFollowing) {
      followService.follow(user!.id);
      setIsFollowing(true);
    } else {
      followService.unfollow(user!.id);
      setIsFollowing(false);
    }
  };

  const content = () => {
    switch (currentContent) {
      case "posts":
        return <UserPosts userId={user!.id} />;
      case "watchList":
        return <UserWatchList userId={user!.id} isMyProfile={isMyProfile} />;
      default:
        return <UserPosts userId={user!.id} />;
    }
  };

  const contentChoose = (content: string) => {
    const previousBtn = document.getElementById(currentContent);
    if (previousBtn) {
      previousBtn.className = styles.chooseContentBtn;
    }
    const currentBtn = document.getElementById(content);
    if (currentBtn) {
      currentBtn.className = styles.chooseContentBtnActive;
    }
    setCurrentContent(content);
  };

  useEffect(() => {
    if (typeof nickname === "string") {
      userService.getOne(nickname).then((data) => {
        if (data.status === 200) {
          setUser(data.data);
          setIsFollowing(data.data.isFollowing);
          cbNickname(data.data.nickname);
          contentChoose("posts");
        } else {
          setUserFound(false);
          cbNickname("Not Found");
        }
      });
    }
  }, [nickname]);

  if (!userFound) {
    return <p>Usuario não encontrado</p>;
  }

  if (!user) return <p>Loading...</p>;

  return (
    <div className={styles.profile}>
      <div className={styles.header}>
        {user.profileBannerImg ? (
          <Image
            alt="bannerImg"
            src={`${process.env.NEXT_PUBLIC_URL}/public/${user.profileBannerImg}`}
            fill={true}
            sizes="default"
            className={styles.bannerImg}
          />
        ) : null}

        <UserThumb
          profileImgUrl={user.profileImg}
          username={user.name}
          nickname={user.nickname}
          size="60px"
        />
        <div className={styles.nameDiv}>
          <p className={styles.username}>{user.name}</p>
          <p className={styles.nickname}>@{user.nickname}</p>
        </div>
        {isMyProfile ? (
          <button>Editar Perfil</button>
        ) : (
          <button onClick={handleFollow}>
            {isFollowing ? "Deixar de Seguir" : "Seguir"}
          </button>
        )}
      </div>
      <div className={styles.descriptionDiv}>
        <p className={styles.bio}>{user.bio}</p>
        <div className={styles.infos}>
          {user.birth ? (
            <div className={styles.userInfoDiv}>
              <FaCakeCandles />
              <span>{new Date(user.birth).toLocaleDateString()}</span>
            </div>
          ) : null}
          {user.locale ? (
            <div className={styles.userInfoDiv}>
              <FaHouseChimney />
              <span>{user.locale}</span>
            </div>
          ) : null}
        </div>
        <div className={styles.follows}>
          <span>
            Seguidores{" "}
            <span className={styles.followCount}>{user.followers.length}</span>
          </span>
          <span>
            Seguindo{" "}
            <span className={styles.followCount}>{user.following.length}</span>
          </span>
        </div>
      </div>
      <div className={styles.toggleContentDiv}>
        <button
          className={styles.chooseContentBtnActive}
          id="posts"
          onClick={() => contentChoose("posts")}
        >
          Postagens
        </button>
        <button
          className={styles.chooseContentBtn}
          id="watchList"
          onClick={() => contentChoose("watchList")}
        >
          Nerd Lista
        </button>
      </div>
      <div className={styles.mainContentDiv}>{content()}</div>
    </div>
  );
};

export default ProfileComponent;
