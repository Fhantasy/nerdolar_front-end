import styles from "./styles.module.scss";
import { FormEvent, useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import PostList from "./postList";
import UserList from "./userList";
import MediaList from "./mediaList";
import Link from "next/link";
import { useRouter } from "next/router";

const SearchComponent = () => {
  const router = useRouter();
  const [inputSearchValue, setInputSearchValue] = useState<string>(
    (router.query.term as string) || ""
  );
  const [listComponent, setListComponent] = useState<JSX.Element>();
  const [btnActive, setBtnActive] = useState(
    (router.query.type as string) || "posts"
  );

  const formSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    router.push(
      `/search${
        router.query.type ? `?type=${router.query.type}&` : "?"
      }term=${inputSearchValue}`
    );
  };

  useEffect(() => {
    if (!router.query.term) return;

    if (!router.query.type) {
      setListComponent(
        <PostList
          key={router.query.term as string}
          termToSearch={router.query.term as string}
        />
      );
    }
    if (router.query.type === "users") {
      setListComponent(
        <UserList key={inputSearchValue} termToSearch={inputSearchValue} />
      );
    }
    if (router.query.type === "medias") {
      setListComponent(
        <MediaList key={inputSearchValue} termToSearch={inputSearchValue} />
      );
    }
  }, [router.query]);

  return (
    <div>
      <form className={styles.searchForm} onSubmit={formSubmit}>
        <input
          type="text"
          value={inputSearchValue}
          onChange={(ev) => setInputSearchValue(ev.currentTarget.value)}
          placeholder="Pesquisar..."
        />
        <button>
          <FaMagnifyingGlass />
        </button>
      </form>
      <div className={styles.chooseContentDiv}>
        <Link href={`/search?term=${inputSearchValue}`}>
          <button
            id="posts"
            className={
              btnActive === "posts"
                ? styles.chooseContentBtnActive
                : styles.chooseContentBtn
            }
            onClick={(ev) => setBtnActive(ev.currentTarget.id)}
          >
            Postagens
          </button>
        </Link>
        <Link href={`/search?type=users&term=${inputSearchValue}`}>
          <button
            id="users"
            className={
              btnActive === "users"
                ? styles.chooseContentBtnActive
                : styles.chooseContentBtn
            }
            onClick={(ev) => setBtnActive(ev.currentTarget.id)}
          >
            Usuários
          </button>
        </Link>
        <Link href={`/search?type=medias&term=${inputSearchValue}`}>
          <button
            id="medias"
            className={
              btnActive === "medias"
                ? styles.chooseContentBtnActive
                : styles.chooseContentBtn
            }
            onClick={(ev) => setBtnActive(ev.currentTarget.id)}
          >
            Mídias
          </button>
        </Link>
      </div>
      {listComponent}
    </div>
  );
};

export default SearchComponent;
