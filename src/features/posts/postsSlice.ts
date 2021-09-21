import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetch(
    "https://mindtech-feed-task.herokuapp.com/posts",
  );
  return response.json();
});

type Post = { userId: number; id: number; title: string; body: string };

const postsAdapter = createEntityAdapter<Post>({
  selectId: (post) => post.id,
  sortComparer: (a, b) => a.id - b.id,
});

type HasStatus = {
  status: "idle" | "failed" | "success" | "loading";
};

const AdditionalState: HasStatus = {
  status: "idle",
};

const initialState = postsAdapter.getInitialState(AdditionalState);

const postsSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "success";
        postsAdapter.setAll(state, action);
      })
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors<RootState>((state) => state.posts);

export const selectPostsStatus = (state: RootState) => state.posts.status;

export default postsSlice.reducer;
