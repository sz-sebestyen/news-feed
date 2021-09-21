import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export const fetchUsers = createAsyncThunk("posts/fetchUsers", async () => {
  const response = await fetch(
    "https://mindtech-feed-task.herokuapp.com/users",
  );
  return response.json();
});

type UserAddressGeo = {
  lat: string;
  lng: string;
};

type UserAddress = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: UserAddressGeo;
};

type UserCompany = {
  name: string;
  catchPhrase: string;
  bs: string;
};

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: UserAddress;
  phone: string;
  website: string;
  company: UserCompany;
};

const usersAdapter = createEntityAdapter<User>({
  selectId: (user) => user.id,
  sortComparer: (a, b) => a.id - b.id,
});

type HasStatus = {
  status: "idle" | "failed" | "success" | "loading";
};

const AdditionalState: HasStatus = {
  status: "idle",
};

const initialState = usersAdapter.getInitialState(AdditionalState);

const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "success";
        usersAdapter.setAll(state, action);
      })
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = usersAdapter.getSelectors<RootState>((state) => state.users);

export const selectUsersStatus = (state: RootState) => state.users.status;

export default usersSlice.reducer;