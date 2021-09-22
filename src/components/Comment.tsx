import React from "react";
import { useAppSelector } from "../app/hooks";
import { selectCommentById } from "../features/comments/commentsSlice";
import Card from "react-bootstrap/Card";

function Comment({ commentId }: { commentId: number | string }) {
  const comment = useAppSelector((state) =>
    selectCommentById(state, commentId),
  );

  return (
    <>
      {comment && (
        <Card className="my-3">
          <Card.Body>
            <Card.Title as="h6">{comment?.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {comment?.email}
            </Card.Subtitle>
            <Card.Text>{comment.body}</Card.Text>
          </Card.Body>
        </Card>
      )}
    </>
  );
}

export default Comment;
