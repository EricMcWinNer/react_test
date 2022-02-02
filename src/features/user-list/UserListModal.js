import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

const UserListModal = ({ closeModal, ...props }) => (
  <Modal {...props} onHide={closeModal}>
    <Modal.Header closeButton>
      <Modal.Title>Delete</Modal.Title>
    </Modal.Header>
    <Modal.Body>Are you sure you want to delete {props.user?.name}?</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={closeModal}>
        Cancel
      </Button>
      <Button
        disabled={props.deleting}
        variant="danger"
        onClick={props.handleDelete}
      >
        {props.deleting ? (
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        ) : (
          <span>Delete!</span>
        )}
      </Button>
    </Modal.Footer>
  </Modal>
);

export default UserListModal;
