import React from "react";
import "./App.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UserList from "./features/user-list/UserList";
import EditUser from "./features/edit-user/EditUser";
import CreateUser from "./features/create-user/CreateUser"
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <h1 className={"mt-5"}>Dashboard</h1>
          </Col>
        </Row>
        <Routes>
          <Route path={"/"} element={<UserList />} />
          <Route path={"create"} element={<CreateUser />} />
          <Route path={"edit/:id"} element={<EditUser />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
