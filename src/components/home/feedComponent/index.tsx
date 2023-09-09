import { PostType, postService } from "@/src/services/postService";
import { useEffect, useState } from "react";
import PostCard from "../../commons/postCard";
import { currentPageSetter } from "@/src/services/currentPageSetter";
import PageBottom from "../../commons/pageBottom";

const FeedComponent = () => {
  const [posts, setPosts] = useState<PostType[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsEnded, setPostsEnded] = useState(false);

  const getPosts = async () => {
    const data = await postService.feed(currentPage);

    if (data.status === 200) {
      if (data.data.length === 0) {
        setPostsEnded(true);
        return;
      }
      if (posts) {
        setPosts([...posts, ...data.data]);
      } else {
        setPosts(data.data);
      }
    } else {
      console.log("Erro ao pegar postagens!");
    }
  };

  useEffect(() => {
    if (postsEnded) return;

    getPosts();
  }, [currentPage]);

  useEffect(() => {
    getPosts().then(() => {
      currentPageSetter(setCurrentPage);
    });
  }, []);

  return (
    <div>
      {posts?.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}
      <PageBottom dataEnded={postsEnded} />
    </div>
  );
};

export default FeedComponent;
