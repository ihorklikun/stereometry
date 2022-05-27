import "./UserProfile.css";
import React, { useRef, useState, FC, useEffect } from "react";
import { Tabs, Tab, Row, Col, Button, Form } from "react-bootstrap";
import axios from "axios";

interface UserProfileProps {}
const UserProfile: FC<UserProfileProps> = (props) => {
  const [showInfoChange, setShowInfoChange] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  const [firstName, setFirstName] = useState(
    localStorage.getItem("UserName") || ""
  );
  const [lastName, setLastName] = useState(
    localStorage.getItem("UserLastname") || ""
  );
  const [email, setEmail] = useState(localStorage.getItem("UserEmail") || "");

  function changeUserInfo() {
    const json = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      token: localStorage.getItem("token"),
    };

    axios
      .put("https://localhost:44334/api/Profile/info/update", json, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((responce) => {
        console.log(responce.data);
      })
      .finally(function () {
        localStorage.setItem("UserName", firstName);
        localStorage.setItem("UserLastname", lastName);
        localStorage.setItem("UserEmail", email);
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
        alert(e.message);
      });
  }

  return (
    <>
      <Row className="justify-content-md-center tab-container">
        <Col lg="8">
          <Tabs
            defaultActiveKey="information"
            id="uncontrolled-tab-example"
            className="mb-3 tab-container"
          >
            <Tab eventKey="information" title="User Information">
              {!showInfoChange && !showPasswordChange ? (
                <>
                  <Row>
                    <p>First Name: {localStorage.getItem("UserName")}</p>
                  </Row>
                  <Row>
                    <p>Last Name: {localStorage.getItem("UserLastname")}</p>
                  </Row>
                  <Row>
                    <p>Email: {localStorage.getItem("UserEmail")}</p>
                  </Row>
                  <Row>
                    <Button
                      className="button-wrapper"
                      onClick={() => {
                        setShowInfoChange(true);
                      }}
                    >
                      Change information
                    </Button>
                    <Button
                      variant="outline-primary"
                      className="button-wrapper"
                    >
                      Change password
                    </Button>
                  </Row>
                </>
              ) : (
                showInfoChange && (
                  <>
                    <Form>
                      <Form.Group className="from-group">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          className="field-wrapper"
                          required
                          placeholder="Enter First Name"
                          value={firstName}
                          onChange={(e) => {
                            setFirstName(e.target.value);
                          }}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group className="from-group">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          className="field-wrapper"
                          required
                          placeholder="Enter First Name"
                          value={lastName}
                          onChange={(e) => {
                            setLastName(e.target.value);
                          }}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group className="from-group">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                          className="field-wrapper"
                          required
                          type="email"
                          placeholder="Enter email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        onClick={() => {
                          changeUserInfo();
                        }}
                        className="button-wrapper"
                      >
                        Submit
                      </Button>
                      <Button
                        variant="outline-primary"
                        className="button-wrapper"
                        onClick={() => {
                          setShowInfoChange(false);
                        }}
                      >
                        Back
                      </Button>
                    </Form>
                  </>
                )
              )}
            </Tab>
            <Tab eventKey="profile" title="Profile"></Tab>
            <Tab eventKey="contact" title="Contact"></Tab>
          </Tabs>
        </Col>
      </Row>
    </>
  );
};
export default UserProfile;
