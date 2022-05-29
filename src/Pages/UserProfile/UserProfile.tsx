import "./UserProfile.css";
import React, { useRef, useState, FC, useEffect } from "react";
import {
  Tabs,
  Tab,
  Row,
  Col,
  Button,
  Form,
  Spinner,
  Card,
} from "react-bootstrap";
import axios from "axios";

class userShapesProps {
  id: string = "";
  addedDateTime: string = "";
  updatedDateTime: string = "";
  json: string = "";
  isAvailableInGallary: boolean = true;
  shapeTypeId: string = "";
  shapeTypeName: string = "";
  regularUserId: string = "";
  title: string = "";
}

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
  const [userShapes, setUserShapes] = useState<Array<userShapesProps>>([]);

  useEffect(() => {
    axios
      .get("https://localhost:44334/api/Shape/GetUserShapes", {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((responce) => {
        var d = new Array<userShapesProps>();

        var o = responce.data;
        o.map((obj: any) => {
          d.push(obj);
        });
        console.log(d);
        setUserShapes(d);
      })
      .finally(() => {})
      .catch((e) => {
        console.log(e);
        alert(e.message);
      });
  }, []);

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

  function formatDateTime(dateTime: string) {
    const dateMas = dateTime.split("T");
    const time = dateMas[1].slice(0, 5);
    const date = dateMas[0];

    const dateSplited = date.split("-");
    return `${time} ${dateSplited[2]}-${dateSplited[1]}-${dateSplited[0]} `;
  }

  function changeAvailableInGallary(id: string, currentState: boolean) {
    //alert(id + `${currentState}`);
    var isConfirmed = false;

    if (currentState == true) {
      window.confirm("Are you sure you wish to remove from gallary this item?")
        ? (isConfirmed = true)
        : (isConfirmed = false);
    } else {
      window.confirm(
        "Are you sure you wish to add to public gallary this item?"
      )
        ? (isConfirmed = true)
        : (isConfirmed = false);
    }

    if (isConfirmed) {
      axios
        .put("https://localhost:44334/api/Shape/RemoveFromGallary?id=" + id, {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((responce) => {
          console.log(responce.data);
        })
        .finally(function () {
          axios
            .get("https://localhost:44334/api/Shape/GetUserShapes", {
              headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((responce) => {
              var d = new Array<userShapesProps>();

              var o = responce.data;
              o.map((obj: any) => {
                d.push(obj);
              });
              console.log(d);
              setUserShapes(d);
            })
            .finally(() => {})
            .catch((e) => {
              console.log(e);
              alert(e.message);
            });
        })
        .catch((e) => {
          console.log(e);
          alert(e.message);
        });
    }
  }

  function deleteShapeFromUserGallary(id: string) {
    var isConfirmed = false;
    window.confirm(
      "Are you sure you wish to delete from your gallary this item?"
    )
      ? (isConfirmed = true)
      : (isConfirmed = false);

    if (isConfirmed == true) {
      axios
        .delete("https://localhost:44334/api/Shape/Delete?id=" + id, {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((responce) => {
          console.log(responce.data);
        })
        .finally(function () {
          axios
            .get("https://localhost:44334/api/Shape/GetUserShapes", {
              headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((responce) => {
              var d = new Array<userShapesProps>();

              var o = responce.data;
              o.map((obj: any) => {
                d.push(obj);
              });
              console.log(d);
              setUserShapes(d);
            })
            .finally(() => {})
            .catch((e) => {
              console.log(e);
              alert(e.message);
            });
        })
        .catch((e) => {
          console.log(e);
          alert(e.message);
        });
    }
  }

  function displayShape(shape: userShapesProps) {
    window.open("http://localhost:3000/shape-display?id=" + shape.id);
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
            <Tab eventKey="profile" title="Gallary">
              {userShapes.length < 1 ? (
                <>
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                  <p>Loading...</p>
                </>
              ) : (
                <>
                  <Row>
                    {userShapes.map((shape: userShapesProps) => (
                      <Col key={shape.id} lg="3">
                        <Card
                          style={{
                            width: "18rem",
                            maxWidth: "350px",
                            marginBottom: "20px",
                          }}
                        >
                          <Card.Body>
                            <Card.Title>{shape.title}</Card.Title>
                            <p>
                              {"Added at " +
                                formatDateTime(shape.addedDateTime)}
                            </p>
                            <p>
                              {shape.isAvailableInGallary ? (
                                <>Avaible in public gallery</>
                              ) : (
                                <>Avaible only in your gallery</>
                              )}
                            </p>

                            <Button
                              style={{
                                marginRight: "10px",
                                marginTop: "10px",
                                width: "250px",
                              }}
                              onClick={() => {
                                displayShape(shape);
                              }}
                              variant="success"
                            >
                              Display
                            </Button>
                            <Button
                              style={{ marginTop: "10px", width: "250px" }}
                              variant="danger"
                              onClick={() => {
                                deleteShapeFromUserGallary(shape.id);
                              }}
                            >
                              Delete
                            </Button>
                            <Button
                              style={{ marginTop: "10px", width: "250px" }}
                              variant="outline-primary"
                              onClick={() => {
                                changeAvailableInGallary(
                                  shape.id,
                                  shape.isAvailableInGallary
                                );
                              }}
                            >
                              {shape.isAvailableInGallary ? (
                                <>Remove from Public Gallery</>
                              ) : (
                                <>Add to Public Gallery</>
                              )}
                            </Button>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </>
              )}
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </>
  );
};
export default UserProfile;
