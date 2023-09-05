import styles from "../styles.module.scss";
import { currentPageSetter } from "@/src/services/currentPageSetter";
import { useEffect, useState } from "react";
import PageBottom from "../../commons/pageBottom";
import { UserType, userService } from "@/src/services/userService";
import UserThumb from "../../commons/userThumb";

interface props {
  termToSearch: string;
}

const UserList = ({ termToSearch }: props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState<UserType[]>([]);
  const [usersEnded, setUsersEnded] = useState(false);

  const getUsers = async () => {
    const data = await userService.search(termToSearch, currentPage);

    if (data.status === 200) {
      setUsers([...users, ...data.data.users]);
      if (data.data.users.length < 10) {
        setUsersEnded(true);
      }
    } else {
      console.log("Erro ao pegar posts");
    }
  };

  useEffect(() => {
    getUsers();
  }, [currentPage]);

  useEffect(() => {
    getUsers().then(() => {
      currentPageSetter(setCurrentPage);
    });
  }, []);

  return (
    <>
      {users.map((user, index) => (
        <div className={styles.userItem} key={index}>
          <UserThumb
            nickname={user.nickname}
            username={user.name}
            profileImgUrl={user.profileImg}
            size="50px"
          />
          <div>
            <span className={styles.username}>{user.name}</span>
            <span className={styles.userNickname}>@{user.nickname}</span>
          </div>
        </div>
      ))}
      <PageBottom
        dataEnded={usersEnded}
        message="Não tem mais usuários por enquanto :("
      />
    </>
  );
};

export default UserList;
