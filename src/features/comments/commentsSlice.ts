import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { api } from "../../app/api";

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async () => {
    const response = await api("/comments");
    return response.json();
  },
);

export const fetchCommentsByPostId = createAsyncThunk(
  "comments/fetchCommentsByPostId",
  async (postId: number | string) => {
    const response = await api(`/posts/${postId}/comments`);
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
  status: "idle" | "failed" | "loading";
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
      .addCase(fetchCommentsByPostId.fulfilled, (state, action) => {
        state.status = "idle";
        commentsAdapter.addMany(state, action);
      })
      .addCase(fetchCommentsByPostId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCommentsByPostId.rejected, (state) => {
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
