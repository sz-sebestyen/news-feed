import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async () => {
    const response = await fetch(
      "https://mindtech-feed-task.herokuapp.com/comments",
    );
    return response.json();
  },
);

type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

const commentsAdapter = createEntityAdapter<Comment>({
  selectId: (comment) => comment.id,
  sortComparer: (a, b) => a.id - b.id,
});

type HasStatus = {
  status: "idle" | "failed" | "success" | "loading";
};

const AdditionalState: HasStatus = {
  status: "idle",
};

const initialState = commentsAdapter.getInitialState(AdditionalState);

const commentsSlice = createSlice({
  name: "comments",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = "success";
        commentsAdapter.setAll(state, action);
      })
      .addCase(fetchComments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchComments.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const {
  selectAll: selectAllComments,
  selectById: selectCommentById,
  selectIds: selectCommentIds,
} = commentsAdapter.getSelectors<RootState>((state) => state.comments);

export const selectCommentsStatus = (state: RootState) => state.comments.status;

export default commentsSlice.reducer;
