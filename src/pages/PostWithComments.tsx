import React from "react";
import { useParams } from "react-router-dom";
import Post from "../components/Post";
import Comments from "../components/Comments";

interface PostParams {
  postId: string;
}

function PostWithComments() {
  const { postId } = useParams<PostParams>();

  return (
    <div>
      <Post postId={postId} />
      <Comments postId={postId} />
    </div>
  );
}

export default PostWithComments;
