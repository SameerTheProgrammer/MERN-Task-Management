// userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface UserState {
  email: string;
  name: string;
}

const initialState: UserState = {
  email: "",
  name: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.email = action.payload.email;
      state.name = action.payload.name;
    },
    clearUser(state) {
      state.email = "";
      state.name = "";
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
