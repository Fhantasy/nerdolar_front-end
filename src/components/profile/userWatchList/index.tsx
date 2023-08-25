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
import { userService } from "@/src/services/userService";
import { authService } from "@/src/services/authService";
import ListItemNotEditable from "./listItem/listItemNotEditable";

interface props {
  userId: number;
  isMyProfile: boolean;
}

const UserWatchList = ({ userId, isMyProfile }: props) => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [watchItens, setWatchItens] = useState<WatchItemType[]>([]);
  const [currentCategory, setCurrentCategory] = useState<CategoryType>();
  const [status, setStatus] = useState<"ongoing" | "complete">("ongoing");
  const [slideCount, setSlideCount] = useState(0);
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
        setCurrentCategory(data.data[1]);
        if (data.data.length > 6) {
          setSlideCount(6);
        } else {
          setSlideCount(data.data.length);
        }
      }
      getWatchItensPerCategory(data.data[1].id).then(() =>
        currentPageSetter(setCurrentPage)
      );
    });
  }, []);

  useEffect(() => {
    if (!currentCategory) return;

    getWatchItensPerCategory(currentCategory.id);
  }, [currentPage, watchItensEnded]);

  return (
    <div className={styles.watchList}>
      <div className={styles.categorySlide}>
        <Splide
          options={{
            type: "loop",
            perPage: slideCount,
            perMove: 1,
            width: 100 * slideCount + (6 - 1) * 5,
            gap: 5,
            pagination: false,
            arrows: categories.length > 6 ? true : false,
            drag: categories.length > 6 ? true : false,
          }}
        >
          {categories?.map((category, index) => (
            <SplideSlide key={index}>
              <button
                className={styles.categoryBtn}
                style={
                  currentCategory?.name === category.name
                    ? {
                        backgroundColor: categoryColor(category.name),
                        color: "white",
                      }
                    : {
                        backgroundColor: "white",
                        color: categoryColor(category.name),
                      }
                }
                onMouseOver={(ev) => {
                  ev.currentTarget.style.backgroundColor = categoryColor(
                    category.name
                  );
                  ev.currentTarget.style.color = "white";
                }}
                onMouseOut={
                  currentCategory?.name !== category.name
                    ? (ev) => {
                        ev.currentTarget.style.backgroundColor = "white";
                        ev.currentTarget.style.color = categoryColor(
                          category.name
                        );
                      }
                    : undefined
                }
                onClick={() => {
                  if (currentCategory === category) return;
                  resetList();
                  setCurrentCategory(category);
                }}
              >
                {category.name}
              </button>
            </SplideSlide>
          ))}
        </Splide>
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
