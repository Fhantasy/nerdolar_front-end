import { useEffect, useState } from "react";
import styles from "../styles.module.scss";
import { UserType } from "@/src/services/userService";
import { followService } from "@/src/services/followService";
import { currentPageSetter } from "@/src/services/currentPageSetter";
import UserThumb from "../../commons/userThumb";
import PageBottom from "../../commons/pageBottom";
import DataNotFound from "../../commons/dataNotFound";

interface props {
  type: "followers" | "followings";
}

const UserFollows = ({ type }: props) => {
  const [follows, setFollows] = useState<{ [key: string]: UserType }[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [followsEnded, setFollowsEnded] = useState(false);

  const getFollows = async () => {
    if (followsEnded) return;

    if (type === "followers") {
      const data = await followService.getFollowers(currentPage);
      if (data.status === 200) {
        setFollows([...follows, ...data.data.followers]);

        if (data.data.followers.length < 10) {
          setFollowsEnded(true);
        }
      } else {
        console.log("Erro ao pegar seguidores");
      }
    }

    if (type === "followings") {
      const data = await followService.getFollowings(currentPage);
      if (data.status === 200) {
        setFollows([...follows, ...data.data.followings]);

        if (data.data.followings.length < 10) {
          setFollowsEnded(true);
        }
      } else {
        console.log("Erro ao pegar usuários seguidos");
      }
    }
  };

  useEffect(() => {
    getFollows();
  }, [currentPage]);

  useEffect(() => {
    getFollows().then(() => {
      currentPageSetter(setCurrentPage);
    });
  }, []);

  if (follows.length === 0) {
    return (
      <DataNotFound
        message={
          type === "followers"
            ? "Nenhum seguidor encontrado :("
            : "Nenhum usuário seguido encontrado :("
        }
      />
    );
  }

  return (
    <>
      {follows.map((follow, index) => (
        <div className={styles.userItem} key={index}>
          <UserThumb
            nickname={
              follow[type === "followers" ? "follower" : "follow"].nickname
            }
            username={follow[type === "followers" ? "follower" : "follow"].name}
            profileImgUrl={
              follow[type === "followers" ? "follower" : "follow"].profileImg
            }
            size="50px"
          />
          <div>
            <span className={styles.username}>
              {follow[type === "followers" ? "follower" : "follow"].name}
            </span>
            <span className={styles.userNickname}>
              @{follow[type === "followers" ? "follower" : "follow"].nickname}
            </span>
          </div>
        </div>
      ))}
      <PageBottom
        dataEnded={followsEnded}
        message="Não tem mais usuários por enquanto :("
      />
    </>
  );
};

export default UserFollows;
