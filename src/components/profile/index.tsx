import styles from "./styles.module.scss";
import {
  FaCakeCandles,
  FaHouseChimney,
  FaGear,
  FaUserPlus,
  FaUserMinus,
} from "react-icons/fa6";
import { UserType, userService } from "@/src/services/userService";
import Image from "next/image";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import UserThumb from "../commons/userThumb";
import { followService } from "@/src/services/followService";
import UserPosts from "./userPosts";
import UserWatchList from "./userWatchList";
import ProfileModal from "./profileModal";
import SpinnerComponent from "../commons/spinner";
import DataNotFound from "../commons/dataNotFound";
import UserFollows from "./userFollows";

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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  const toggleModal = () => {
    setModalIsOpen((prevstate) => !prevstate);
  };

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
        return <UserPosts key={user!.id} userId={user!.id} />;
      case "watchList":
        return <UserWatchList userId={user!.id} isMyProfile={isMyProfile} />;
      case "followers":
        return <UserFollows key="followers" type="followers" />;
      case "followings":
        return <UserFollows key="followings" type="followings" />;
      default:
        return <UserPosts key={user!.id} userId={user!.id} />;
    }
  };

  const getUser = async () => {
    if (typeof nickname === "string") {
      const data = await userService.getOne(nickname);

      if (data.status === 200) {
        setUser(data.data);
        setIsFollowing(data.data.isFollowing);
        cbNickname(data.data.nickname);
        setCurrentContent("posts");
      } else {
        setUserFound(false);
        cbNickname("Not Found");
      }
    }
  };

  useEffect(() => {
    getUser();
  }, [nickname]);

  useEffect(() => {
    setWindowWidth(innerWidth);
    window.addEventListener("resize", () => setWindowWidth(innerWidth));
  }, []);

  if (!userFound) {
    return <DataNotFound message="Usuário não encontrado!" />;
  }

  if (!user) return <SpinnerComponent />;

  return (
    <div className={styles.profile}>
      <div className={styles.header}>
        {user.profileBannerImg ? (
          <Image
            alt="bannerImg"
            src={`${process.env.NEXT_PUBLIC_URL}/${user.profileBannerImg}`}
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
          <>
            {windowWidth > 480 ? (
              <button onClick={toggleModal}>Editar Perfil</button>
            ) : (
              <FaGear className={styles.headerIcon} onClick={toggleModal} />
            )}
          </>
        ) : (
          <>
            {windowWidth > 480 ? (
              <button onClick={handleFollow}>
                {isFollowing ? "Deixar de Seguir" : "Seguir"}
              </button>
            ) : (
              <>
                {isFollowing ? (
                  <FaUserMinus
                    className={styles.headerIcon}
                    onClick={handleFollow}
                  />
                ) : (
                  <FaUserPlus
                    className={styles.headerIcon}
                    onClick={handleFollow}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
      <div className={styles.descriptionDiv}>
        <p className={styles.bio}>{user.bio}</p>
        <div className={styles.infos}>
          {user.birth ? (
            <div className={styles.userInfoDiv}>
              <FaCakeCandles />
              <span>
                {new Date(user.birth).toLocaleString("pt-BR", {
                  timeZone: "UTC",
                  dateStyle: "short",
                })}
              </span>
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
          <span onClick={() => setCurrentContent("followers")}>
            Seguidores{" "}
            <span className={styles.followCount}>{user.followers.length}</span>
          </span>
          <span onClick={() => setCurrentContent("followings")}>
            Seguindo{" "}
            <span className={styles.followCount}>{user.following.length}</span>
          </span>
        </div>
      </div>
      <div className={styles.toggleContentDiv}>
        <button
          className={
            currentContent === "posts"
              ? styles.chooseContentBtnActive
              : styles.chooseContentBtn
          }
          id="posts"
          onClick={() => setCurrentContent("posts")}
        >
          Postagens
        </button>
        <button
          className={
            currentContent === "watchList"
              ? styles.chooseContentBtnActive
              : styles.chooseContentBtn
          }
          id="watchList"
          onClick={() => setCurrentContent("watchList")}
        >
          Nerd Lista
        </button>
      </div>
      <div className={styles.mainContentDiv}>{content()}</div>
      <ProfileModal
        isOpen={modalIsOpen}
        toggle={toggleModal}
        refreshUser={getUser}
      />
    </div>
  );
};

export default ProfileComponent;
