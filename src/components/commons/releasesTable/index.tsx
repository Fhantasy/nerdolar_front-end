import styles from "./styles.module.scss";
import {
  WatchItemType,
  watchItemService,
} from "@/src/services/wacthItemService";
import { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import ReactTimeAgo from "react-time-ago";
import Link from "next/link";

const ReleasesTable = () => {
  const [releases, setReleases] = useState<{
    [key: string]: WatchItemType[];
  }>();

  const toogleItens = (index: number) => {
    const rows = document.getElementsByClassName(
      `rows${index}`
    ) as HTMLCollectionOf<HTMLTableElement>;

    Array.from(rows).forEach((row) => {
      if (row.style.display === "none") {
        row.style.display = "table-row";
      } else {
        row.style.display = "none";
      }
    });
  };

  useEffect(() => {
    watchItemService.getReleases().then((data) => {
      if (data.status === 200) {
        setReleases(data.data);
      } else {
        console.log("Erro a pegar os lançamentos");
      }
    });
  }, []);

  return (
    <table className={styles.releasesTable}>
      {releases
        ? Object.entries(releases).map((row, index) => (
            <tbody key={index}>
              <tr onClick={() => toogleItens(index)}>
                <th colSpan={3}>
                  <p>
                    {row[0]} <FaAngleDown className={styles.arrow} />
                  </p>
                </th>
              </tr>

              {row[1].map((watchIten) => (
                <tr
                  key={watchIten.id}
                  className={`rows${index}`}
                  style={{ display: "none" }}
                >
                  <td>
                    <Link href={`/media-product/${watchIten.mediaProduct.id}`}>
                      {watchIten.mediaProduct.title}
                    </Link>
                  </td>
                  <td style={{ whiteSpace: "nowrap", fontWeight: "bold" }}>
                    Ep. {watchIten.mediaProduct.currentEpisode + 1}
                  </td>
                  <td style={{ whiteSpace: "nowrap", color: "green" }}>
                    Lança{" "}
                    <ReactTimeAgo
                      style={{ fontSize: "12px" }}
                      future
                      date={new Date(
                        watchIten.mediaProduct.releaseDates[0]
                      ).getTime()}
                      locale="pt-BR"
                      timeStyle="long"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          ))
        : null}
    </table>
  );
};

export default ReleasesTable;
