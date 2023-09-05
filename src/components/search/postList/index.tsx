import { currentPageSetter } from "@/src/services/currentPageSetter";
import { PostType, postService } from "@/src/services/postService";
import { useEffect, useState } from "react";
import PostCard from "../../commons/postCard";
import PageBottom from "../../commons/pageBottom";

interface props {
  termToSearch: string;
}

const PostList = ({ termToSearch }: props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [postsEnded, setPostsEnded] = useState(false);

  const getPosts = async () => {
    const data = await postService.search(termToSearch, currentPage);

    if (data.status === 200) {
      setPosts([...posts, ...data.data.posts]);
      if (data.data.posts.length < 10) {
        setPostsEnded(true);
      }
    } else {
      console.log("Erro ao pegar posts");
    }
  };

  useEffect(() => {
    getPosts();
  }, [currentPage]);

  useEffect(() => {
    getPosts().then(() => {
      currentPageSetter(setCurrentPage);
    });
  }, []);

  return (
    <>
      {posts.map((post, index) => (
        <PostCard key={index} post={post} />
      ))}
      <PageBottom dataEnded={postsEnded} />
    </>
  );
};

export default PostList;
