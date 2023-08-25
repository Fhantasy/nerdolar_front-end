import styles from "./styles.module.scss";
import { WatchItemType } from "@/src/services/wacthItemService";
import Image from "next/image";
import Link from "next/link";

interface props {
  watchItem: WatchItemType;
}
const ListItemNotEditable = ({ watchItem }: props) => {
  return (
    <div className={styles.itemDiv}>
      <Link href={`/media-product/${watchItem.mediaProduct.id}`}>
        <div className={styles.mediaImgDiv}>
          <Image
            src={`${process.env.NEXT_PUBLIC_URL}/public/${watchItem.mediaProduct.thumbnailImg}`}
            alt="mediaImg"
            className={styles.mediaImg}
            fill={true}
            sizes="default"
          />
        </div>
      </Link>

      <div className={styles.row}>
        <p>{watchItem.mediaProduct.title}</p>
        <div className={styles.episode}>
          {watchItem.mediaProduct.isEpisodic
            ? `${watchItem.currentEpisode}/${watchItem.mediaProduct.currentEpisode}`
            : 1}
        </div>
      </div>
    </div>
  );
};

export default ListItemNotEditable;
