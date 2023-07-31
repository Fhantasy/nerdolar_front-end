import { PostType, postService } from "@/src/services/postService";
import { useEffect, useState } from "react";
import PostCard from "../../commons/PostCard";

const FeedComponent = () => {
  const [posts, setPosts] = useState<PostType[]>();
  const [currentPage, setCurrentPage] = useState(0);
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
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        if (postsEnded === false) {
          setCurrentPage((prevState) => prevState + 1);
        }
      }
    });

    intersectionObserver.observe(document.querySelector("#pageBottom")!);
    return () => intersectionObserver.disconnect();
  }, []);

  return (
    <div style={{ width: "40%" }}>
      {posts?.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}
      <div id="pageBottom">
        {postsEnded ? (
          <p>Não tem mais postagens por enquanto :(</p>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default FeedComponent;
