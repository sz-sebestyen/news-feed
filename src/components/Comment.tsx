import React from "react";
import { useAppSelector } from "../app/hooks";
import { selectCommentById } from "../features/comments/commentsSlice";

function Comment({ commentId }: { commentId: number | string }) {
  const comment = useAppSelector((state) =>
    selectCommentById(state, commentId),
  );

  return (
    <div>
      {comment && (
        <>
          {comment?.name}: {comment.body}
        </>
      )}
    </div>
  );
}

export default Comment;
