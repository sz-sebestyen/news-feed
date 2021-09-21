import React from "react";

import { useAppSelector } from "../../app/hooks";
import { selectAllPosts } from "./postsSlice";

export function Posts() {
  const posts = useAppSelector(selectAllPosts);

  return (
    <div>
      {posts && posts.map((post) => <div key={post.id}>{post.title}</div>)}
    </div>
  );
}
