import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { editUser } from "../user-list/userListSlice";

const initialState = {
  email: "",
  name: "",
  username: "",
  city: "",
  currentUserId: null,
  editing: false,
};

export const editUserAsync = createAsyncThunk(
  "editUserAsync/editUserAsync",
  async (action, { dispatch, getState }) => {
    const state = getState();
    const response = await new Promise((resolve) =>
      setTimeout(() => {
        resolve({
          data: {
            ...state.editUser,
            address: {
              city: state.editUser.city,
            },
          },
        });
      }, 3000)
    );
    const { currentUserId, deleting, ...user } = response.data;
    user.id = currentUserId;
    dispatch(editUser({ user }));
  }
);

export const editUserSlice = createSlice({
  name: "editUser",
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
    updateCurrentUserId: (state, action) => {
      state.currentUserId = action.payload;
    },
    updateUser: (state, action) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.username = action.payload.username;
      state.city = action.payload.address.city;
      state.currentUserId = action.payload.id;
    },
    initializeState: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(editUserAsync.pending, (state) => {
        state.editing = true;
      })
      .addCase(editUserAsync.fulfilled, (state) => {
        state.editing = true;
      });
  },
});

export const {
  updateEmail,
  updateName,
  updateUsername,
  updateCity,
  updateCurrentUserId,
  updateUser,
  initializeState,
} = editUserSlice.actions;

export const selectEditing = (state) => state.editUser.editing;
export const selectUser = (state) => ({
  email: state.editUser.email,
  name: state.editUser.name,
  city: state.editUser.city,
  username: state.editUser.username,
});

export default editUserSlice.reducer;
