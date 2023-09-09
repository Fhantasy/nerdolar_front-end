import { PostType, postService } from "@/src/services/postService";
import { createRef, useEffect, useState } from "react";
import PostCard from "../../commons/postCard";
import { currentPageSetter } from "@/src/services/currentPageSetter";
import PageBottom from "../../commons/pageBottom";

interface props {
  userId: number;
}

const UserPosts = ({ userId }: props) => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [postsEnded, setPostsEnded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const getPosts = async (userId: number) => {
    const data = await postService.getAllFromUser(userId, currentPage);

    if (data.status === 200) {
      setPosts([...posts, ...data.data.posts]);

      if (data.data.posts.length < 10) {
        setPostsEnded(true);
      }
    } else {
      console.log("Erro ao pegar posts do usuário");
    }
  };

  useEffect(() => {
    if (postsEnded) return;

    getPosts(userId);
  }, [currentPage, postsEnded]);

  useEffect(() => {
    getPosts(userId).then(() => currentPageSetter(setCurrentPage));
  }, []);

  return (
    <>
      {posts?.map((post, index) => (
        <PostCard key={index} post={post} />
      ))}
      <PageBottom dataEnded={postsEnded} />
    </>
  );
};

export default UserPosts;
