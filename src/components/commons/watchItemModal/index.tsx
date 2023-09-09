import {
  WatchItemType,
  watchItemService,
} from "@/src/services/wacthItemService";
import styles from "./styles.module.scss";
import { Modal } from "reactstrap";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import SpinnerComponent from "../spinner";
import Image from "next/image";

interface props {
  isOpen: boolean;
  toggle: () => void;
  watchItemId: number;
  setCurrentEpisodeCallback?: Dispatch<SetStateAction<number>>;
  deleteCallback: () => void;
}
const WatchItemModal = ({
  isOpen,
  toggle,
  watchItemId,
  setCurrentEpisodeCallback,
  deleteCallback,
}: props) => {
  const [watchItem, setWatchItem] = useState<WatchItemType>();
  const [status, setStatus] = useState<"ongoing" | "complete">("ongoing");
  const [currentEpisode, setCurrentEpisode] = useState(1);

  const handleCurrentEpisodeChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const value = Number(ev.currentTarget.value.replace(/[^0-9]*/g, ""));
    const max = Number(ev.currentTarget.max);
    const min = Number(ev.currentTarget.min);

    if (value < min) {
      setCurrentEpisode(min);
    } else if (value > max) {
      setCurrentEpisode(max);
    } else {
      setCurrentEpisode(value);
    }
  };

  const handleSave = async () => {
    const params = {
      watchItemId: watchItem!.id,
      currentEpisode: currentEpisode,
      status: status,
    };
    await watchItemService.update(params);
    if (setCurrentEpisodeCallback) {
      setCurrentEpisodeCallback(currentEpisode);
    }
    toggle();
  };

  const handleDelete = async () => {
    await watchItemService.delete(watchItemId);
    toggle();
    if (deleteCallback) {
      deleteCallback();
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    watchItemService.getOne(watchItemId).then((data) => {
      if (data.status === 200) {
        setWatchItem(data.data);
        setCurrentEpisode(data.data.currentEpisode);
        setStatus(data.data.status);
      }
    });
  }, [isOpen]);

  useEffect(() => {
    if (!watchItem) return;

    if (currentEpisode === watchItem.mediaProduct.totalEpisodes) {
      setStatus("complete");
    } else {
      setStatus("ongoing");
    }
  }, [currentEpisode]);

  useEffect(() => {
    if (!watchItem) return;

    if (
      status === "complete" &&
      currentEpisode !== watchItem.mediaProduct.totalEpisodes
    ) {
      setCurrentEpisode(watchItem.mediaProduct.totalEpisodes);
    }
    if (
      status === "ongoing" &&
      currentEpisode === watchItem.mediaProduct.totalEpisodes
    ) {
      setCurrentEpisode(watchItem.mediaProduct.totalEpisodes - 1);
    }
  }, [status]);

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      {watchItem ? (
        <>
          <div
            className={styles.header}
            style={{
              backgroundImage: `url(${process.env.NEXT_PUBLIC_URL}/public/${watchItem.mediaProduct.pageBannerImg})`,
            }}
          >
            <div onClick={() => toggle()} className={styles.closeIconDiv}>
              <p>&times;</p>
            </div>
            <div className={styles.titleDiv}>
              <p>{watchItem.mediaProduct.title}</p>
            </div>
          </div>
          <form className={styles.form}>
            <div className={styles.optionsDiv}>
              <div className={styles.inputs}>
                <div>
                  <label htmlFor="currentEpisode">Episódio atual: </label>
                  <input
                    type="number"
                    max={watchItem.mediaProduct.currentEpisode}
                    min={0}
                    value={currentEpisode.toString()}
                    onChange={handleCurrentEpisodeChange}
                  />
                </div>

                <div>
                  <label htmlFor="status">Status: </label>
                  <select
                    value={status}
                    onChange={(ev) =>
                      setStatus(
                        ev.currentTarget.value as "ongoing" | "complete"
                      )
                    }
                  >
                    <option value="ongoing">Em andamento</option>
                    {watchItem.mediaProduct.status === "complete" ? (
                      <option value="complete">Completo</option>
                    ) : null}
                  </select>
                </div>
              </div>

              <button
                type="button"
                onClick={handleDelete}
                className={styles.deleteBtn}
                name="deleteBtn"
              >
                Deletar
              </button>
            </div>

            <button
              type="button"
              onClick={handleSave}
              className={styles.saveBtn}
              name="saveBtn"
            >
              Salvar
            </button>
          </form>
        </>
      ) : (
        <SpinnerComponent />
      )}
    </Modal>
  );
};

export default WatchItemModal;
