import { PostType, postService } from "@/src/services/postService";
import { useEffect, useState } from "react";
import PostCard from "../../commons/postCard";
import { currentPageSetter } from "@/src/services/currentPageSetter";
import PageBottom from "../../commons/pageBottom";

const FeedComponent = () => {
  const [posts, setPosts] = useState<PostType[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsEnded, setPostsEnded] = useState(false);

  useEffect(() => {
    if (postsEnded) return;
    postService.feed(currentPage).then((data) => {
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
        console.log("erro");
      }
    });
  }, [currentPage]);

  useEffect(() => {
    currentPageSetter(setCurrentPage);
  }, []);

  return (
    <div style={{ width: "700px" }}>
      {posts?.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}
      <PageBottom dataEnded={postsEnded} />
    </div>
  );
};

export default FeedComponent;
