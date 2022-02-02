import React, { useEffect, useState } from "react";
import EditUserForm from "../../components/edit-user-form/EditUserForm";
import { useSelector, useDispatch } from "react-redux";
import {
  updateEmail,
  updateName,
  updateUsername,
  updateCity,
  updateCurrentUserId,
  selectUser,
  initializeState,
  selectEditing,
  editUserAsync,
  updateUser,
} from "./editUserSlice";
import {
  getUsersAsync,
  toggleUserEditedSuccessfullyToast,
} from "../user-list/userListSlice";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const EditUser = (props) => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let totalUsers;
  totalUsers = useSelector((state) => state.usersList.users);
  const currentUser = totalUsers.filter((user) => user.id == params.id)[0];

  const [showInvalidIDModal, setShowInvalidIDModal] = useState(false);
  const selectedUser = useSelector(selectUser);
  const editing = useSelector(selectEditing);
  useEffect(() => {
    if (totalUsers.length) {
      if (!currentUser || !currentUser.name) {
        setShowInvalidIDModal(true);
      } else {
        setShowInvalidIDModal(false);
      }
      dispatch(updateCurrentUserId(params.id));
      dispatch(updateUser(currentUser));
    }
  }, []);

  const handleCancellation = () => {
    dispatch(initializeState());
    navigate("/");
  };

  const submitForm = async () => {
    await dispatch(editUserAsync());
    dispatch(initializeState());
    dispatch(toggleUserEditedSuccessfullyToast(true));
    navigate("/");
  };

  const closeModal = () => {
    navigate("/");
  };

  return !totalUsers.length ? (
    <Modal show={true} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>No Store users</Modal.Title>
      </Modal.Header>
      <Modal.Body>There are no users stored in application state.</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Back to Home!
        </Button>
      </Modal.Footer>
    </Modal>
  ) : showInvalidIDModal ? (
    <Modal show={true} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Invalid ID</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        The user you're trying to edit does not exist and has probably been
        deleted.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Back to Home!
        </Button>
      </Modal.Footer>
    </Modal>
  ) : (
    <EditUserForm
      handleNameChange={(e) => dispatch(updateName(e.target.value))}
      handleEmailChange={(e) => dispatch(updateEmail(e.target.value))}
      handleUsernameChange={(e) => dispatch(updateUsername(e.target.value))}
      handleCityChange={(e) => dispatch(updateCity(e.target.value))}
      handleCancellation={handleCancellation}
      user={selectedUser}
      submitForm={submitForm}
      loading={editing}
    />
  );
};

export default EditUser;
