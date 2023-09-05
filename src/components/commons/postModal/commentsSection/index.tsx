import Link from "next/link";
import PageBottom from "../../pageBottom";
import styles from "../styles.module.scss";
import UserThumb from "../../userThumb";
import { useEffect, useState } from "react";
import { CommentType, commentService } from "@/src/services/commentService";
import { currentPageSetter } from "@/src/services/currentPageSetter";
import ReactTimeAgo from "react-time-ago";

interface props {
  postId: number;
}

const CommentsSection = ({ postId }: props) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [commentsEnded, setCommentsEnded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const getComments = async () => {
    if (commentsEnded) return;
    const data = await commentService.getAllFromPost(postId, currentPage);

    if (data.status === 200) {
      setComments([...comments, ...data.data.comments]);

      if (data.data.comments.length < 4) {
        setCommentsEnded(true);
      }
    } else {
      console.log("ocorreu um erro ao pegar os comentarios");
    }
  };

  useEffect(() => {
    getComments();
  }, [currentPage]);

  useEffect(() => {
    getComments().then(() => {
      currentPageSetter(setCurrentPage, "#commentsPageBottom");
    });
  }, []);

  return (
    <div className={styles.commentsDiv}>
      {comments?.map((comment) => (
        <div key={comment.id} className={styles.comment}>
          <div className={styles.userDiv}>
            <UserThumb
              profileImgUrl={comment.user.profileImg}
              username={comment.user.name}
              nickname={comment.user.nickname}
            />
            <Link href={comment.user.nickname}>
              <p>
                {comment.user.name} <span>@{comment.user.nickname}</span>
              </p>
            </Link>
            <ReactTimeAgo
              date={new Date(new Date(comment.createdAt)).getTime()}
              locale="pt-BR"
              timeStyle="mini"
            />
          </div>
          <p>{comment.message}</p>
        </div>
      ))}
      <PageBottom dataEnded={commentsEnded} id="commentsPageBottom" />
    </div>
  );
};

export default CommentsSection;
