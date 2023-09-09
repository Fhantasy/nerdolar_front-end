import styles from "./styles.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { PostType, postService } from "@/src/services/postService";
import PostCard from "../commons/postCard";
import { currentPageSetter } from "@/src/services/currentPageSetter";
import {
  MediaProductType,
  mediaProductService,
} from "@/src/services/mediaProductService";
import { categoryColor } from "@/src/services/categoryColor";
import PageBottom from "../commons/pageBottom";
import { watchItemService } from "@/src/services/wacthItemService";
import WatchItemModal from "../commons/watchItemModal";
import SpinnerComponent from "../commons/spinner";
import DataNotFound from "../commons/dataNotFound";

interface props {
  cbTitle: Dispatch<SetStateAction<string>>;
}

const MediaProductComponent = ({ cbTitle }: props) => {
  const router = useRouter();
  const id = router.query.id;
  const [mediaProduct, setMediaProduct] = useState<MediaProductType>();
  const [posts, setPosts] = useState<PostType[]>();
  const [postsEnded, setPostsEnded] = useState(false);
  const [mediaFound, setMediaFound] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [watchItemId, setWatchItemId] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleModal = () => setModalIsOpen(!modalIsOpen);

  const getPosts = async (id: number) => {
    const data = await postService.getAllFromMedia(id, currentPage);

    if (data.status === 200) {
      if (data.data.posts.length === 0) {
        setPostsEnded(true);
      } else {
        setPosts(posts ? [...posts, ...data.data.posts] : data.data.posts);
      }
    } else {
      console.log("Erro ao pegar posts");
    }
  };

  const createWatchItem = async (ev: MouseEvent<HTMLButtonElement>) => {
    ev.currentTarget.disabled = true;

    const params = {
      mediaProductId: mediaProduct!.id,
      categoryId: mediaProduct!.category.id,
    };
    const data = await watchItemService.create(params);
    setWatchItemId(data.data.id);
  };

  useEffect(() => {
    if (typeof id === "string") {
      mediaProductService.getOne(Number(id)).then((data) => {
        if (data.status === 200) {
          setMediaProduct(data.data);
          cbTitle(data.data.title);
          getPosts(data.data.id).then(() => {
            currentPageSetter(setCurrentPage);
          });
          if (data.data.watchItens.length > 0) {
            setWatchItemId(data.data.watchItens[0].id);
          }
        } else {
          cbTitle("Not Found");
          setMediaFound(false);
        }
      });
    }
  }, [id]);

  useEffect(() => {
    if (!mediaProduct || postsEnded || !posts) return;

    getPosts(mediaProduct.id);
  }, [currentPage]);

  if (!mediaFound) {
    return <DataNotFound message="Mídia não encontrada!" />;
  }

  if (!mediaProduct) return <SpinnerComponent />;

  return (
    <div className={styles.profile}>
      <div className={styles.header}>
        <Image
          alt="bannerImg"
          src={`${process.env.NEXT_PUBLIC_URL}/public/${mediaProduct?.pageBannerImg}`}
          fill={true}
          sizes="default"
          className={styles.bannerImg}
        />
        <div className={styles.titleDiv}>
          <p
            className={styles.category}
            style={{ color: `${categoryColor(mediaProduct?.category.name)}` }}
          >
            {mediaProduct?.category.name}
          </p>
          <p className={styles.title}>{mediaProduct?.title}</p>
        </div>
        {watchItemId ? (
          <button
            className={styles.editBtn}
            onClick={toggleModal}
            onMouseOver={(ev) => (ev.currentTarget.innerText = "Editar")}
            onMouseOut={(ev) => (ev.currentTarget.innerText = "Nerdlistado")}
          >
            Nerdlistado
          </button>
        ) : (
          <button
            className={styles.addBtn}
            onClick={(ev) => {
              createWatchItem(ev);
              ev.currentTarget.disabled = false;
            }}
          >
            Adicionar
          </button>
        )}
      </div>

      {mediaProduct.isEpisodic ? (
        <div className={styles.descriptionDiv}>
          <p className={styles.sinopsys}>{mediaProduct?.sinopsys}</p>
          <div className={styles.infos}>
            <div className={styles.mediaInfoDiv}>
              <span>Status: </span>
              <span className={styles.infoValue}>
                {mediaProduct.status === "complete"
                  ? "Completo"
                  : "Em andamento"}
              </span>
            </div>
            <div className={styles.mediaInfoDiv}>
              <span>Lançamento: </span>
              <span className={styles.infoValue}>
                {new Date(mediaProduct?.launchDate || "").toLocaleDateString()}
              </span>
            </div>
            {mediaProduct.status === "complete" ? (
              <div className={styles.mediaInfoDiv}>
                <span>Término: </span>
                <span className={styles.infoValue}>
                  {new Date(mediaProduct?.endDate || "").toLocaleDateString()}
                </span>
              </div>
            ) : (
              <div className={styles.mediaInfoDiv}>
                <span>Episódio atual: </span>
                <span className={styles.infoValue}>
                  {mediaProduct.currentEpisode}
                </span>
              </div>
            )}
            <div className={styles.mediaInfoDiv}>
              <span>Total de episódios: </span>
              <span className={styles.infoValue}>
                {mediaProduct.totalEpisodes}
              </span>
            </div>
            <div className={styles.genres}>
              {mediaProduct?.genres?.map((genre, index) => (
                <span key={index} className={styles.genre}>
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.descriptionDiv}>
          <p className={styles.sinopsys}>{mediaProduct?.sinopsys}</p>
          <div className={styles.infos}>
            <div className={styles.mediaInfoDiv}>
              <span>Status: </span>
              <span className={styles.infoValue}>
                {mediaProduct.status === "complete"
                  ? "Completo"
                  : "Em andamento"}
              </span>
            </div>
            <div className={styles.mediaInfoDiv}>
              <span>Lançamento: </span>
              <span className={styles.infoValue}>
                {new Date(mediaProduct?.launchDate || "").toLocaleDateString()}
              </span>
            </div>
            <div className={styles.genres}>
              {mediaProduct?.genres?.map((genre, index) => (
                <span key={index} className={styles.genre}>
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className={styles.postsDiv}>
        {posts?.map((post, index) => (
          <PostCard key={index} post={post} />
        ))}
        <PageBottom dataEnded={postsEnded} />
      </div>
      {watchItemId ? (
        <WatchItemModal
          isOpen={modalIsOpen}
          toggle={toggleModal}
          watchItemId={watchItemId}
          deleteCallback={() => setWatchItemId(undefined)}
        />
      ) : null}
    </div>
  );
};

export default MediaProductComponent;
