import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import dummy from "./dummy";
const initialState = {
  users: [],
  loading: true,
  is_first_launch: true,
  deletingUser: false,
  nextID: 11,
  show_user_updated_successfully_toast: false,
  show_user_created_successfully_toast: false,
};

export const getUsersAsync = createAsyncThunk("userList/getUsers", async () => {
  const response = await new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        data: {
          users: dummy,
        },
      });
    }, 3000)
  );
  return response.data.users;
});

export const deleteUserAsync = createAsyncThunk(
  "userList/deleteUser",
  async (id, { dispatch }) => {
    const response = await new Promise((resolve) =>
      setTimeout(() => {
        resolve({
          data: {
            message: "Deleted successfully",
          },
        });
      }, 3000)
    );
    dispatch(removeUser({ id }));
    return response.data;
  }
);

export const userListSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    removeUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload.id);
    },
    editUser: (state, action) => {
      let index = 0;
      state.users.map((user, usersIndex) => {
        if (user.id === action.payload.user.id) {
          index = usersIndex;
        }
      });
      state.users[index] = action.payload.user;
    },
    updateNextID: (state, action) => {
      state.nextID = action.payload;
    },
    toggleUserEditedSuccessfullyToast: (state, action) => {
      state.show_user_updated_successfully_toast = action.payload;
    },
    toggleUserCreatedSuccessfullyToast: (state, action) => {
      state.show_user_created_successfully_toast = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.is_first_launch = false;
        state.users = action.payload;
        state.nextID = action.payload.length + 1;
      })
      .addCase(deleteUserAsync.pending, (state) => {
        state.deletingUser = true;
      })
      .addCase(deleteUserAsync.fulfilled, (state) => {
        state.deletingUser = false;
      });
  },
});

export const {
  addUser,
  removeUser,
  editUser,
  toggleUserEditedSuccessfullyToast,
  toggleUserCreatedSuccessfullyToast,
  updateNextID,
} = userListSlice.actions;

export const selectUsers = (state) => state.usersList.users;
export const selectLoading = (state) => state.usersList.loading;
export const selectIsFirstLaunch = (state) => state.usersList.is_first_launch;
export const selectDeletingUser = (state) => state.usersList.deletingUser;
export const selectUserUpdatedToast = (state) =>
  state.usersList.show_user_updated_successfully_toast;
export const selectUserCreatedToast = (state) =>
    state.usersList.show_user_created_successfully_toast;

export default userListSlice.reducer;
