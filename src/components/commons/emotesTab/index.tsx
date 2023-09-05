import { Dispatch, SetStateAction } from "react";
import styles from "./styles.module.scss";
import { emoteList } from "@/src/services/emotesList";

interface props {
  isOpen: boolean,
  setIsOpen: Dispatch<SetStateAction<boolean>>
  addEmoteToMessage: (emote: string) => void
}

const EmotesTab = ({isOpen, setIsOpen, addEmoteToMessage}: props) => {
  return (
    <div className={styles.emotesDiv}>
      {isOpen ? (
        <div className={styles.emotesTab}>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={() => setIsOpen(false)}
          >
            &times;
          </button>
          {emoteList.map((emote, index) => (
            <span
              key={index}
              onClick={(ev) => addEmoteToMessage(ev.currentTarget.innerText)}
            >
              {emote}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default EmotesTab;
