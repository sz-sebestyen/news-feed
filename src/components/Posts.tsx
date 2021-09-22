import React from "react";
import { useAppSelector } from "../app/hooks";
import { selectPostIds, selectPostsStatus } from "../features/posts/postsSlice";
import Post from "./Post";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";

function Posts() {
  const postIds = useAppSelector(selectPostIds);
  const postsStatus = useAppSelector(selectPostsStatus);

  const isLoading = postsStatus === "loading" || !postIds;

  return (
    <Container>
      <Row xs={1} md={2} xl={4} className="g-4">
        {isLoading ? (
          <Spinner animation="grow" className="mx-auto" />
        ) : (
          <>
            {postIds.map((postId) => (
              <Col key={postId}>
                <Post postId={postId} />
              </Col>
            ))}
          </>
        )}
      </Row>
    </Container>
  );
}

export default Posts;
