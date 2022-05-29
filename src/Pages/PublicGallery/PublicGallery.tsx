import "./PublicGallery.css";
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
  regularUserFirstName: string = "";
  regularUserLastName: string = "";
}

interface PublicGalleryProps {}

const PublicGallery: FC<PublicGalleryProps> = (props) => {
  const [userShapes, setUserShapes] = useState<Array<userShapesProps>>([]);

  function formatDateTime(dateTime: string) {
    const dateMas = dateTime.split("T");
    const time = dateMas[1].slice(0, 5);
    const date = dateMas[0];

    const dateSplited = date.split("-");
    return `${dateSplited[2]}-${dateSplited[1]}-${dateSplited[0]} `;
  }

  function displayShape(shape: userShapesProps) {
    window.open("http://localhost:3000/shape-display?id=" + shape.id);
  }

  function deleteShape(shape: userShapesProps) {
    var isConfirmed = false;
    window.confirm("Are you sure you wish to delete from gallery this item?")
      ? (isConfirmed = true)
      : (isConfirmed = false);

    if (isConfirmed == true) {
      axios
        .put(
          "https://localhost:44334/api/Shape/RemoveFromGallary?id=" + shape.id,
          {
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((responce) => {
          console.log(responce.data);
        })
        .finally(function () {
          axios
            .get("https://localhost:44334/api/Shape/GetGalleryShapes", {
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

  useEffect(() => {
    axios
      .get("https://localhost:44334/api/Shape/GetGalleryShapes", {
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

  return (
    <>
      <Row className="justify-content-md-center tab-container">
        <Col lg="8">
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
                        <i>
                          {"Author: " +
                            shape.regularUserFirstName +
                            " " +
                            shape.regularUserLastName}
                        </i>
                        <br />
                        <i>
                          {"Added at: " + formatDateTime(shape.addedDateTime)}
                        </i>

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

                        {localStorage.getItem("UserRole") == "RegularUser" && (
                          <Button
                            style={{
                              marginRight: "10px",
                              marginTop: "10px",
                              width: "250px",
                            }}
                            onClick={() => {
                              deleteShape(shape);
                            }}
                            variant="danger"
                          >
                            Delete
                          </Button>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </>
          )}
        </Col>
      </Row>
    </>
  );
};
export default PublicGallery;
