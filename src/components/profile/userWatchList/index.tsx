import { categoryColor } from "@/src/services/categoryColor";
import styles from "./styles.module.scss";
import { CategoryType, categoryService } from "@/src/services/categoryService";
import {
  WatchItemType,
  watchItemService,
} from "@/src/services/wacthItemService";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useEffect, useState } from "react";
import { currentPageSetter } from "@/src/services/currentPageSetter";
import PageBottom from "../../commons/pageBottom";
import ListItem from "./listItem";
import ListItemNotEditable from "./listItem/listItemNotEditable";
import SplideComponent from "./splideComponent";
import DataNotFound from "../../commons/dataNotFound";

interface props {
  userId: number;
  isMyProfile: boolean;
}

const UserWatchList = ({ userId, isMyProfile }: props) => {
  const [categories, setCategories] = useState<CategoryType[]>();
  const [watchItens, setWatchItens] = useState<WatchItemType[]>([]);
  const [currentCategory, setCurrentCategory] = useState<CategoryType>();
  const [status, setStatus] = useState<"ongoing" | "complete">("ongoing");
  const [currentPage, setCurrentPage] = useState(1);
  const [watchItensEnded, setWatchItensEnded] = useState(false);

  const getWatchItensPerCategory = async (categoryId: number) => {
    if (watchItensEnded) return;

    const data = await watchItemService.getAllPerCategory(
      categoryId,
      status,
      currentPage,
      userId
    );

    setWatchItens([...watchItens, ...data.data.watchItens]);
    if (data.data.watchItens.length < 10) {
      setWatchItensEnded(true);
    }
  };

  const resetList = () => {
    setWatchItensEnded(false);
    setWatchItens([]);
    setCurrentPage(1);
  };

  useEffect(() => {
    categoryService.getAllOfUserWatchList(userId).then((data) => {
      if (data.data.length > 0) {
        setCategories(data.data);
        setCurrentCategory(data.data[0]);
        getWatchItensPerCategory(data.data[0].id).then(() =>
          currentPageSetter(setCurrentPage)
        );
      }
    });
  }, []);

  useEffect(() => {
    if (!currentCategory) return;

    getWatchItensPerCategory(currentCategory.id);
  }, [currentPage, watchItensEnded]);

  if (!categories) {
    return (
      <DataNotFound
        message="Nenhum item na sua Nerdlista! Pesquise e adicione Mídias 
      para criar uma Nerdlista aonde você pode organizar Filmes, Series, Animes entre outras coisas
       que você está assistindo ou já assistiu"
      />
    );
  }

  return (
    <div className={styles.watchList}>
      <div className={styles.categorySlide}>
        <SplideComponent
          categories={categories}
          currentCategory={currentCategory!}
          setCurrentCategory={setCurrentCategory}
          resetList={resetList}
        />
      </div>

      <select
        className={styles.statusSelect}
        value={status}
        onChange={(ev) => {
          if (ev.currentTarget.value === status) return;
          resetList();
          setStatus(ev.currentTarget.value as "ongoing" | "complete");
        }}
      >
        <option value="ongoing">Assistindo</option>
        <option value="complete">Completos</option>
      </select>

      <div>
        {isMyProfile ? (
          <div>
            {watchItens?.map((watchItem, index) => (
              <ListItem
                key={index}
                watchItem={watchItem}
                resetList={resetList}
              />
            ))}
          </div>
        ) : (
          <div>
            {watchItens?.map((watchItem, index) => (
              <ListItemNotEditable key={index} watchItem={watchItem} />
            ))}
          </div>
        )}

        <PageBottom
          dataEnded={watchItensEnded}
          message={watchItens.length > 0 ? " " : "Lista vazia :("}
        />
      </div>
    </div>
  );
};

export default UserWatchList;
