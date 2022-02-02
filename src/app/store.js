import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import usersListReducer from "../features/user-list/userListSlice";
import editUserReducer from "../features/edit-user/editUserSlice";
import createUserReducer from "../features/create-user/createUserSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    usersList: usersListReducer,
    editUser: editUserReducer,
    createUser: createUserReducer,
  },
});
