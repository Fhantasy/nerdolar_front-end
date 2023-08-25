import WatchItemModal from "@/src/components/commons/watchItemModal";
import styles from "./styles.module.scss";
import {
  WatchItemType,
  watchItemService,
} from "@/src/services/wacthItemService";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

interface props {
  watchItem: WatchItemType;
  resetList: () => void;
}
const ListItem = ({ watchItem, resetList }: props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentEpisode, setCurrentEpisode] = useState(
    watchItem.currentEpisode
  );

  const toggleModal = () => setModalIsOpen(!modalIsOpen);

  const updateCurrentEpisode = async (method: "increment" | "decrement") => {
    let params: {
      watchItemId: number;
      status?: "ongoing" | "complete";
      currentEpisode?: number;
    } = { watchItemId: watchItem.id };

    if (method === "increment") {
      if (currentEpisode + 1 >= watchItem.mediaProduct.totalEpisodes) {
        params = {
          watchItemId: watchItem.id,
          currentEpisode: currentEpisode + 1,
          status: "complete",
        };
      } else {
        params = {
          watchItemId: watchItem.id,
          currentEpisode: currentEpisode + 1,
        };
      }
    } else if (method === "decrement") {
      params = {
        watchItemId: watchItem.id,
        currentEpisode: currentEpisode - 1,
        status: "ongoing",
      };
    }
    setCurrentEpisode((prevState) =>
      method === "increment" ? prevState + 1 : prevState - 1
    );

    await watchItemService.update(params);
  };

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

      <div className={styles.row} onClick={toggleModal}>
        <p>{watchItem.mediaProduct.title}</p>
        <div className={styles.episode}>
          {watchItem.mediaProduct.isEpisodic
            ? `${currentEpisode}/${watchItem.mediaProduct.currentEpisode}`
            : 1}

          {watchItem.status === "ongoing" ? (
            <div>
              {currentEpisode !== watchItem.mediaProduct.currentEpisode ? (
                <button
                  onClick={(ev) => {
                    ev.stopPropagation();
                    updateCurrentEpisode("increment");
                  }}
                  className={styles.increment}
                >
                  +
                </button>
              ) : null}

              {currentEpisode !== 0 ? (
                <button
                  onClick={(ev) => {
                    ev.stopPropagation();
                    updateCurrentEpisode("decrement");
                  }}
                  className={styles.decrement}
                >
                  -
                </button>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
      <WatchItemModal
        watchItemId={watchItem.id}
        isOpen={modalIsOpen}
        toggle={toggleModal}
        setCurrentEpisodeCallback={setCurrentEpisode}
        deleteCallback={resetList}
      />
    </div>
  );
};

export default ListItem;
