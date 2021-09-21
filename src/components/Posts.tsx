import React from "react";

import { useAppSelector } from "../app/hooks";
import { selectPostIds, selectPostsStatus } from "../features/posts/postsSlice";

import Post from "./Post";

export function Posts() {
  const postIds = useAppSelector(selectPostIds);
  const postsStatus = useAppSelector(selectPostsStatus);

  return (
    <div>
      {postsStatus}
      {postIds &&
        postIds.map((postId) => <Post key={postId} postId={postId} />)}
    </div>
  );
}
