import React from "react";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectPostById } from "../features/posts/postsSlice";
import { selectUserById } from "../features/users/usersSlice";
import Card from "react-bootstrap/Card";

function Post({ postId }: { postId: number | string }) {
  const post = usePost(postId);
  const history = useHistory();

  const goToPostPage = () => history.push(`post/${postId}`);

  return (
    <>
      {post && (
        <Card className="h-100">
          <Card.Header>{post.user?.name}</Card.Header>
          <Card.Body onClick={goToPostPage} role="button">
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>{post.body}</Card.Text>
          </Card.Body>
        </Card>
      )}
    </>
  );
}

function usePost(postId: number | string) {
  const post = useAppSelector((state) => selectPostById(state, postId));
  const user = useAppSelector((state) =>
    selectUserById(state, post?.userId || "anon"),
  );

  if (post && user) return { ...post, user };
  else return null;
}

export default Post;
