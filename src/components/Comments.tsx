import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../app/hooks";
import {
  fetchCommentsByPostId,
  selectCommentIds,
} from "../features/comments/commentsSlice";
import Comment from "./Comment";

function Comments({ postId }: { postId: number | string }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCommentsByPostId(postId));
  }, [postId]); // eslint-disable-line

  const commentIds = useAppSelector(selectCommentIds);

  return (
    <div>
      <h4 className="mb-3 mt-5">Comments:</h4>
      {commentIds.map((commentId) => (
        <Comment commentId={commentId} key={commentId} />
      ))}
    </div>
  );
}

export default Comments;
