import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addUser, updateNextID } from "../user-list/userListSlice";

const initialState = {
  email: "",
  name: "",
  username: "",
  city: "",
  creating: false,
};

export const createUserAsync = createAsyncThunk(
  "createUser/createUser",
  async (action, { dispatch, getState }) => {
    const state = getState();
    const response = await new Promise((resolve) =>
      setTimeout(() => {
        resolve({
          data: {
            ...state.createUser,
            address: {
              city: state.createUser.city,
            },
          },
        });
      }, 3000)
    );
    const { creating, city, ...user } = response.data;
    user.id = state.usersList.nextID;
    dispatch(updateNextID(state.usersList.nextID + 1));
    dispatch(addUser(user));
    return user;
  }
);

export const createUserSlice = createSlice({
  name: "createUser",
  initialState,
  reducers: {
    updateEmail: (state, action) => {
      state.email = action.payload;
    },
    updateName: (state, action) => {
      state.name = action.payload;
    },
    updateUsername: (state, action) => {
      state.username = action.payload;
    },
    updateCity: (state, action) => {
      state.city = action.payload;
    },
    initializeState: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.creating = true;
      })
      .addCase(createUserAsync.fulfilled, (state) => {
        state.creating = false;
      });
  },
});

export const {
  updateEmail,
  updateName,
  updateUsername,
  updateCity,
  initializeState,
} = createUserSlice.actions;

export const selectCreating = (state) => state.createUser.creating;
export const selectUser = (state) => ({
  email: state.createUser.email,
  name: state.createUser.name,
  city: state.createUser.city,
  username: state.createUser.username,
});

export default createUserSlice.reducer;
