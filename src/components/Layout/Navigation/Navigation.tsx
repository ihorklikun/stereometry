import React, { useRef, useState, FC, useEffect } from "react";
import {
  Navbar,
  Container,
  Nav,
  Modal,
  Button,
  Form,
  DropdownButton,
  Dropdown,
  Anchor,
} from "react-bootstrap";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

//@ts-ignore

const Navigation: FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confimPassword, setConfimPassword] = useState("");

  const [role, setRole] = useState("");

  const [show, setShow] = useState(false);
  const [showSingUp, setshowSingUp] = useState(false);

  const [isPasswordsEqual, setIsPasswordsEqual] = useState(true);

  const handleShowSignUp = () => setshowSingUp(!showSingUp);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleSignOut() {
    localStorage.clear();
    setFirstName("");
    setLastName("");
    setRole("");
    setEmail("");
    setPassword("");
    setConfimPassword("");
  }

  function handleSignUp() {
    const signUpInJson = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    };
    console.log("1");
    axios
      .post(
        "https://localhost:44334/api/Authentication/RegisterRegularUser",
        signUpInJson
      )
      .then((responce) => {
        console.log(responce.data);
        localStorage.setItem("token", responce.data.token);
      })
      .finally(function () {
        handleLogIn();
        setshowSingUp(false);
      })
      .catch((e) => {
        console.log(e);
        alert(e.message);
      });
  }

  const myInfo = () => {
    axios
      .get("https://localhost:44334/api/Profile/getMyInfo", {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((responce) => {
        var data = responce.data;
        localStorage.setItem("UserName", data.firstName);
        localStorage.setItem("UserLastname", data.lastName);
        localStorage.setItem("UserRole", data.role);
        localStorage.setItem("UserEmail", data.email);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setRole(data.role);
        setEmail(data.email);
        console.log(data);
      })
      .finally(function () {
        setShow(false);
      })
      .catch((e) => {
        console.log(e);
        alert(e);
        return false;
      });
  };

  function isPasswordValid() {
    if (confimPassword == password && confimPassword != "" && password != "") {
      return true;
    }
    return false;
  }

  function handleLogIn() {
    const logInJson = {
      email: email,
      password: password,
    };

    console.log(logInJson);

    axios
      .post("https://localhost:44334/api/Authentication/Login", logInJson)
      .then((responce) => {
        var data = responce.data;
        localStorage.setItem("token", data.token);
      })
      .finally(function () {
        myInfo();
      })
      .catch((e) => {
        console.log(e);
        alert(e);
      });
  }

  const getDropdown = () => {
    return (
      <>
        <Nav>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {`${localStorage.getItem("UserName")} ${localStorage.getItem(
                "UserLastname"
              )}`}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Anchor} href="/user-profile">
                My Profile
              </Dropdown.Item>
              <Dropdown.Item
                as={Anchor}
                onClick={() => {
                  handleSignOut();
                }}
              >
                Sign Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </>
    );
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/home">Shapes 3D</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/learning">Learning</Nav.Link>
            <Nav.Link href="/drawing">Drawing</Nav.Link>
            <Nav.Link href="/galery">Galery</Nav.Link>
          </Nav>

          {localStorage.getItem("UserRole") == undefined ? (
            <>
              <Button
                onClick={handleShow}
                variant="outline-success"
                style={{ marginRight: "20px" }}
              >
                Log In
              </Button>
              <Button onClick={handleShowSignUp} variant="outline-success">
                Sign Up
              </Button>
            </>
          ) : (
            <>{getDropdown()}</>
          )}

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Log in</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="fromBasicEmail">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <Form.Text className="text-muted">
                    We`ll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="fromBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group controlId="fromBasicCheckbox">
                  <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                    <Form.Check type="checkbox" label="Remember me" />
                  </div>
                </Form.Group>
                <Form.Group controlId="fromSignInButton">
                  <Button variant="primary" onClick={handleLogIn}>
                    Sign in
                  </Button>
                </Form.Group>
              </Form>
            </Modal.Body>
          </Modal>

          <Modal show={showSingUp} onHide={handleShowSignUp}>
            <Modal.Header closeButton>
              <Modal.Title>Sign Up</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group
                  controlId="fromBasicEmail"
                  style={{ marginBottom: "20px" }}
                >
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <Form.Text className="text-muted">
                    We`ll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                <Form.Group style={{ marginBottom: "20px" }}>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    required
                    placeholder="Elone"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                  <Form.Text className="text-muted">
                    It`ll be displayed for users.
                  </Form.Text>
                </Form.Group>
                <Form.Group style={{ marginBottom: "20px" }}>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    required
                    placeholder="Mask"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                  <Form.Text className="text-muted">
                    It`ll be displayed for users.
                  </Form.Text>
                </Form.Group>
                <Form.Group
                  controlId="fromBasicPassword"
                  style={{ marginBottom: "20px" }}
                >
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    isInvalid={
                      password != confimPassword &&
                      confimPassword != "" &&
                      password != ""
                        ? true
                        : false
                    }
                    isValid={isPasswordValid()}
                    required
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    color={"red"}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group
                  controlId="fromBasicPassword"
                  style={{ marginBottom: "20px" }}
                >
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    isValid={isPasswordValid()}
                    required
                    type="password"
                    placeholder="Enter password"
                    value={confimPassword}
                    onChange={(e) => {
                      setConfimPassword(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group
                  controlId="fromBasicCheckbox"
                  style={{ marginBottom: "20px" }}
                >
                  <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                    <Form.Check type="checkbox" label="Remember me" />
                  </div>
                </Form.Group>
                <Form.Group controlId="fromSignInButton">
                  <Button
                    variant="primary"
                    onClick={handleSignUp}
                    disabled={!isPasswordValid()}
                  >
                    Confirm
                  </Button>
                </Form.Group>
              </Form>
            </Modal.Body>
          </Modal>
        </Container>
      </Navbar>
    </div>
  );
};
export default Navigation;
