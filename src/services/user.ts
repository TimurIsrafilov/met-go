import { createSlice } from "@reduxjs/toolkit";
import { TypeUserForm } from "@/types/types";
import { RootState } from "@/services/store";

type TypeUserState = {
  user: TypeUserForm | null;
};

const initialState: TypeUserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    deleteUser: (state) => {
      state.user = null;
    },
  },
});

export const { addUser, deleteUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.user;

export const reducer = userSlice.reducer;
export default reducer;
