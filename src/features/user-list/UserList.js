import React, { useState, useEffect } from "react";
import {
  getUsersAsync,
  selectUsers,
  selectLoading,
  selectIsFirstLaunch,
  deleteUserAsync,
  selectDeletingUser,
  toggleUserEditedSuccessfullyToast,
  toggleUserCreatedSuccessfullyToast,
  selectUserUpdatedToast,
  selectUserCreatedToast,
} from "./userListSlice";
import { useSelector, useDispatch } from "react-redux";
import "./UserList.scss";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import UserListModal from "./UserListModal";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import Toast from "react-bootstrap/Toast";
import Sort from "../../assets/Sort.svg";
import ToastContainer from "react-bootstrap/ToastContainer";

const UserList = () => {
  const [shouldShowModal, changeShouldShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showDeleteToast, setShowDeleteToast] = useState(false);
  const [sortAlphabetically, setSortAlphabetically] = useState(true);
  const dispatch = useDispatch();
  let users = [...useSelector(selectUsers)];
  const loading = useSelector(selectLoading);
  const isFirstLaunch = useSelector(selectIsFirstLaunch);
  const deletingUser = useSelector(selectDeletingUser);
  const userUpdatedToast = useSelector(selectUserUpdatedToast);
  const userCreatedToast = useSelector(selectUserCreatedToast);
  useEffect(() => {
    if (isFirstLaunch) {
      dispatch(getUsersAsync());
    }
  }, []);
  const navigate = useNavigate();
  const toggleSort = (td) => {
    if (td === "Username") {
      setSortAlphabetically((sA) => !sA);
    }
  };

  const tableHeaders = [
    "Id",
    "Name",
    "Username",
    "Email",
    "City",
    "Edit",
    "Delete",
  ].map((td, index) => (
    <th onClick={() => toggleSort(td)} key={`index__${index}`}>
      {td} {td === "Username" && <img src={Sort} />}
    </th>
  ));

  const showModal = () => changeShouldShowModal(true);
  const closeModal = () => changeShouldShowModal(false);
  const getReadyToDelete = (user) => {
    setUserToDelete(user);
    showModal();
  };
  const deleteUser = async (id) => {
    await dispatch(deleteUserAsync(userToDelete.id));
    closeModal();
    setShowDeleteToast(true);
    setUserToDelete(null);
  };

  if (users.length) {
    users.sort(function (a, b) {
      console.log(a);
      if (sortAlphabetically) {
        if (a.username > b.username) return 1;
        if (a.username < b.username) return -1;
        return 0;
      } else {
        if (a.username < b.username) return 1;
        if (a.username > b.username) return -1;
        return 0;
      }
    });
  }
  const tableUsers = users.map((user) => (
    <tr key={user.id}>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{user.address?.city}</td>
      <td>
        <Button
          onClick={() => navigate(`/edit/${user.id}`)}
          variant={"warning"}
        >
          edit
        </Button>
      </td>
      <td>
        <Button onClick={() => getReadyToDelete(user)} variant={"danger"}>
          delete
        </Button>
      </td>
    </tr>
  ));

  return (
    <div className={"card__container"}>
      <div className={"card__header"}>
        <h4>User list</h4>
        <Button onClick={() => navigate("/create")}>Add new</Button>
      </div>
      <div className={"card__body"}>
        {loading ? (
          <div className={"spinner__container"}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : tableUsers.length ? (
          <Table className={"users__table"}>
            <thead>
              <tr>{tableHeaders}</tr>
            </thead>
            <tbody>{tableUsers}</tbody>
          </Table>
        ) : (
          <p className={"text-center"}>There are no users to display</p>
        )}
      </div>

      <UserListModal
        user={userToDelete}
        show={shouldShowModal}
        closeModal={closeModal}
        handleDelete={deleteUser}
        deleting={deletingUser}
      />
      <ToastContainer className={"p-3"} position={"top-end"}>
        <Toast
          position={"bottom-end"}
          onClose={() => setShowDeleteToast(false)}
          show={showDeleteToast}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">User Lists</strong>
          </Toast.Header>
          <Toast.Body>You deleted a user successfully!</Toast.Body>
        </Toast>
      </ToastContainer>
      <ToastContainer className={"p-3"} position={"top-end"}>
        <Toast
          position={"bottom-end"}
          onClose={() => dispatch(toggleUserEditedSuccessfullyToast(false))}
          show={userUpdatedToast}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">User Lists</strong>
          </Toast.Header>
          <Toast.Body>You updated a user successfully!</Toast.Body>
        </Toast>
      </ToastContainer>
      <ToastContainer className={"p-3"} position={"top-end"}>
        <Toast
          position={"bottom-end"}
          onClose={() => dispatch(toggleUserCreatedSuccessfullyToast(false))}
          show={userCreatedToast}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">User Lists</strong>
          </Toast.Header>
          <Toast.Body>You created a new user successfully!</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default UserList;
