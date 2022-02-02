import React, { useState } from "react";
import "./EditUserForm.scss";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";

const EditUserForm = ({ create, ...props }) => {
  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);
    props.submitForm();
  };
  return (
    <div className={"card__container"}>
      <div className={"card__header"}>
        <h4>{create ? "Create User" : "Edit User"} Form</h4>
      </div>
      <div className={"card__body"}>
        <Container>
          <Row>
            <Col md={{ span: 10, offset: 2 }}>
              <Form
                className={"edit-user__form"}
                validated={validated}
                onSubmit={handleSubmit}
              >
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextPassword"
                >
                  <Form.Label column sm="2">
                    Name
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      value={props.user.name}
                      required
                      type="text"
                      placeholder="Name"
                      onChange={props.handleNameChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide your name.
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextPasswor2d"
                >
                  <Form.Label column sm="2">
                    Email
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      value={props.user.email}
                      required
                      type="email"
                      placeholder="Email"
                      onChange={props.handleEmailChange}
                    />
                  </Col>
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid email.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlai2ntextPassword"
                >
                  <Form.Label column sm="2">
                    Username
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      value={props.user.username}
                      type="text"
                      placeholder="Username"
                      onChange={props.handleUsernameChange}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="form4PlaintextPassword"
                >
                  <Form.Label column sm="2">
                    City
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      value={props.user.city}
                      type="text"
                      placeholder="City"
                      onChange={props.handleCityChange}
                    />
                  </Col>
                </Form.Group>
                <Row>
                  <div className={"btn__container"}>
                    <div className={"btns"}>
                      <Button
                        onClick={props.handleCancellation}
                        variant={"outline-danger"}
                      >
                        Cancel
                      </Button>
                      <Button disabled={props.loading} type={"submit"} variant={"success"}>
                        {props.loading ? (
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                        ) : (
                          <span>Submit</span>
                        )}
                      </Button>
                    </div>
                  </div>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default EditUserForm;
