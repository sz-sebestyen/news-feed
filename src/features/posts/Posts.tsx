import React from "react";

import { useAppSelector } from "../../app/hooks";
import { selectAllPosts, selectPostsStatus } from "./postsSlice";

export function Posts() {
  const posts = useAppSelector(selectAllPosts);
  const postsStatus = useAppSelector(selectPostsStatus);

  return (
    <div>
      {postsStatus}
      {posts && posts.map((post) => <div key={post.id}>{post.title}</div>)}
    </div>
  );
}
