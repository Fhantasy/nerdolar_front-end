import { MediaProductType } from "@/src/services/mediaProductService";
import styles from "./styles.module.scss";
import { categoryColor } from "@/src/services/categoryColor";
import Link from "next/link";

interface props {
  mediaProduct: MediaProductType;
}
const MediaProductPostCard = ({ mediaProduct }: props) => {
  return (
    <Link href={`/media-product/${mediaProduct.id}`}>
      <div className={styles.card}>
        <div>
          <p className={styles.title}>Sobre: </p>
          <p>{mediaProduct.title}</p>
        </div>

        <div>
          <img
            src={`${process.env.NEXT_PUBLIC_URL}/public/${mediaProduct.thumbnailImg}`}
            alt="mediaImg"
            className={styles.mediaImg}
          />

          <p
            className={styles.mediaCategory}
            style={{ color: categoryColor(mediaProduct.category.name) }}
          >
            {mediaProduct.category.name}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MediaProductPostCard;
