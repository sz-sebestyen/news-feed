import React from "react";
import { useParams } from "react-router-dom";
import Post from "../components/Post";
import Comments from "../components/Comments";
import Container from "react-bootstrap/Container";

interface PostParams {
  postId: string;
}

function PostWithComments() {
  const { postId } = useParams<PostParams>();

  return (
    <Container>
      <Post postId={postId} />
      <Comments postId={postId} />
    </Container>
  );
}

export default PostWithComments;
