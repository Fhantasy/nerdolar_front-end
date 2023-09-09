import { CategoryType } from "@/src/services/categoryService";
import styles from "../styles.module.scss";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { categoryColor } from "@/src/services/categoryColor";
import { Dispatch, SetStateAction } from "react";

interface props {
  categories: CategoryType[];
  currentCategory: CategoryType;
  setCurrentCategory: Dispatch<SetStateAction<CategoryType | undefined>>;
  resetList: () => void;
}
const SplideComponent = ({
  categories,
  currentCategory,
  setCurrentCategory,
  resetList,
}: props) => {
  let slideCount = 0;

  if (categories.length > 5) {
    slideCount = 5;
  } else if (categories) {
    slideCount = categories.length;
  }

  if (!categories || slideCount === 0) {
    return <></>;
  }

  return (
    <Splide
      options={{
        type: "loop",
        perPage: slideCount,
        padding: {
          left: categories.length > 5 ? "50px" : "0px",
          right: categories.length > 5 ? "50px" : "0px",
        },
        perMove: 1,
        width:
          100 * (categories.length > 5 ? slideCount! + 1 : slideCount!) +
          slideCount! * 5,
        gap: 5,
        pagination: false,
        arrows: categories.length > 5 ? true : false,
        drag: categories.length > 5 ? true : false,
        breakpoints: {
          700: {
            perPage: slideCount! >= 4 ? 4 : slideCount,
            width: categories.length > 4 ? 520 : 415,
            arrows: categories.length > 4 ? true : false,
            drag: categories.length > 4 ? true : false,
            padding: {
              left: categories.length > 4 ? "50px" : "0px",
              right: categories.length > 4 ? "50px" : "0px",
            },
          },
          600: {
            perPage: slideCount! >= 3 ? 3 : slideCount,
            width: categories.length > 3 ? 415 : 310,
            arrows: categories.length > 3 ? true : false,
            drag: categories.length > 3 ? true : false,
            padding: {
              left: categories.length > 3 ? "50px" : "0px",
              right: categories.length > 3 ? "50px" : "0px",
            },
          },
          490: {
            perPage: slideCount! >= 2 ? 2 : slideCount,
            width: categories.length > 2 ? 310 : 205,
            arrows: categories.length > 2 ? true : false,
            drag: categories.length > 2 ? true : false,
            padding: {
              left: categories.length > 2 ? "50px" : "0px",
              right: categories.length > 2 ? "50px" : "0px",
            },
          },
          330: {
            perPage: slideCount! >= 1 ? 1 : slideCount,
            width: categories.length > 1 ? 205 : 100,
            arrows: categories.length > 1 ? true : false,
            drag: categories.length > 1 ? true : false,
            padding: {
              left: categories.length > 1 ? "50px" : "0px",
              right: categories.length > 1 ? "50px" : "0px",
            },
          },
        },
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
                    ev.currentTarget.style.color = categoryColor(category.name);
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
  );
};

export default SplideComponent;
