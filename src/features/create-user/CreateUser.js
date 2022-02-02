import React, { useState } from "react";
import EditUserForm from "../../components/edit-user-form/EditUserForm";
import {
  selectUser,
  updateEmail,
  updateName,
  updateUsername,
  updateCity,
  selectCreating,
  initializeState,
  createUserAsync,
} from "./createUserSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateUser = (props) => {
  const selectedUser = useSelector(selectUser);
  const creating = useSelector(selectCreating);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleCancellation = () => {
    dispatch(initializeState());
    navigate("/");
  };
  const submitForm = async () => {
    await dispatch(createUserAsync());
    dispatch(initializeState());
    navigate("/")
  };
  return (
    <EditUserForm
      handleNameChange={(e) => dispatch(updateName(e.target.value))}
      handleEmailChange={(e) => dispatch(updateEmail(e.target.value))}
      handleUsernameChange={(e) => dispatch(updateUsername(e.target.value))}
      handleCityChange={(e) => dispatch(updateCity(e.target.value))}
      handleCancellation={handleCancellation}
      user={selectedUser}
      loading={creating}
      submitForm={submitForm}
      create
    />
  );
};

export default CreateUser;
