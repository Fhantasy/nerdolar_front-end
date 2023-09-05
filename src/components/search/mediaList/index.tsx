import styles from "../styles.module.scss";
import { currentPageSetter } from "@/src/services/currentPageSetter";
import { useEffect, useState } from "react";
import PageBottom from "../../commons/pageBottom";
import {
  MediaProductType,
  mediaProductService,
} from "@/src/services/mediaProductService";
import { categoryColor } from "@/src/services/categoryColor";
import Link from "next/link";

interface props {
  termToSearch: string;
}

const MediaList = ({ termToSearch }: props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [mediaProducts, setMediaProducts] = useState<MediaProductType[]>([]);
  const [mediaProductsEnded, setMediaProductsEnded] = useState(false);

  const getMediaProducts = async () => {
    const data = await mediaProductService.search(termToSearch, currentPage);

    if (data.status === 200) {
      setMediaProducts([...mediaProducts, ...data.data.mediaProducts]);
      if (data.data.mediaProducts.length < 10) {
        setMediaProductsEnded(true);
      }
    } else {
      console.log("Erro ao pegar mediaProducts");
    }
  };

  useEffect(() => {
    getMediaProducts();
  }, [currentPage]);

  useEffect(() => {
    getMediaProducts().then(() => {
      currentPageSetter(setCurrentPage);
    });
  }, []);

  return (
    <>
      {mediaProducts.map((mediaProduct, index) => (
        <div className={styles.mediaItem} key={index}>
          <Link href={`/media-product/${mediaProduct.id}`}>
            <div>
              <img
                src={`${process.env.NEXT_PUBLIC_URL}/public/${mediaProduct.thumbnailImg}`}
                alt="mediaImg"
              />
              <p className={styles.title}>{mediaProduct.title}</p>
            </div>
          </Link>
          <p style={{ color: categoryColor(mediaProduct.category.name) }}>
            {mediaProduct.category.name}
          </p>
        </div>
      ))}
      <PageBottom
        dataEnded={mediaProductsEnded}
        message="Não tem mais mídias por enquanto :("
      />
    </>
  );
};

export default MediaList;
