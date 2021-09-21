import React from "react";
import { useAppSelector } from "../app/hooks";
import { selectPostById } from "../features/posts/postsSlice";
import { selectUserById } from "../features/users/usersSlice";

function Post({ postId }: { postId: number | string }) {
  const post = useAppSelector((state) => selectPostById(state, postId));
  const user = useAppSelector((state) =>
    selectUserById(state, post?.userId || "anon"),
  );

  return (
    <div>
      {user?.username}: {post?.title}
    </div>
  );
}

export default Post;
