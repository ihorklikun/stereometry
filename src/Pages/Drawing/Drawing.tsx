import "./Drawing.css";
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
  ButtonGroup,
  ToggleButton,
  Modal,
} from "react-bootstrap";
import axios from "axios";
import { slide as Menu } from "react-burger-menu";

import cubeImg from "../../../src/assets/cube-img.png";
import sphereImg from "../../../src/assets/sphere-img.png";
import coneImg from "../../../src/assets/cone.png";
import torusImg from "../../../src/assets/torus.png";
import cylinderImg from "../../../src/assets/cylinder.png";
import pyramidImg from "../../../src/assets/pyramid-img.png";

import Cube from "./components/Cube";
import Pyramid from "./components/Piramid";

import Sphere from "../../components/Sphere";
import Torus from "../../components/Torus";
import Cylinder from "../../components/Cylinder";
import Cone from "../../components/Cone";

import * as THREE from "three";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { CameraControls } from "../../camera-controls";

interface DrawingProps {}

interface CanShowAlert {
  showAlert(title: string, availableInGallary: boolean): void;
}

const Drawing: FC<DrawingProps> = (props) => {
  const [selectId, setSelecId] = useState(1);
  const cameraControls = useRef<CameraControls | null>(null);
  const myRef = useRef<HTMLCanvasElement | null>(null);
  const [radioValue, setRadioValue] = useState("1");
  const [showSaveModal, setSaveModal] = useState(false);

  const [shapeTitle, setShapeTitle] = useState("");
  const [shapeAvailableInGallary, setShapeAvailableInGallary] = useState(false);

  const radios = [
    { name: "Point", value: "1" },
    { name: "Segment", value: "2" },
    { name: "Area", value: "3" },
  ];

  function saveShape() {
    cubeRef.current?.showAlert(shapeTitle, shapeAvailableInGallary);
    setSaveModal(false);
  }

  const cubeRef = useRef<CanShowAlert>(null);

  return (
    <>
      {localStorage.getItem("token") ? (
        <>
          <Menu>
            <div className="menu">
              <Card
                style={{ width: "18rem", maxWidth: "200px" }}
                className="card-container"
              >
                <Card.Img variant="top" src={cubeImg} />
                <Card.Body>
                  <Card.Title>Cube</Card.Title>
                  <Button
                    onClick={() => {
                      setSelecId(1);
                    }}
                    variant="primary"
                  >
                    Select
                  </Button>
                </Card.Body>
              </Card>

              <Card
                style={{ width: "18rem", maxWidth: "200px" }}
                className="card-container"
              >
                <Card.Img variant="top" src={pyramidImg} />
                <Card.Body>
                  <Card.Title>Pyramid</Card.Title>
                  <Button
                    onClick={() => {
                      setSelecId(6);
                    }}
                    variant="primary"
                  >
                    Select
                  </Button>
                </Card.Body>
              </Card>

              <Card
                style={{ width: "18rem", maxWidth: "200px" }}
                className="card-container"
              >
                <Card.Img variant="top" src={sphereImg} />
                <Card.Body>
                  <Card.Title>Sphere</Card.Title>
                  <Button
                    onClick={() => {
                      setSelecId(2);
                    }}
                    variant="primary"
                  >
                    Select
                  </Button>
                </Card.Body>
              </Card>

              <Card
                style={{ width: "18rem", maxWidth: "200px" }}
                className="card-container"
              >
                <Card.Img variant="top" src={cylinderImg} />
                <Card.Body>
                  <Card.Title>Cylinder</Card.Title>
                  <Button
                    onClick={() => {
                      setSelecId(3);
                    }}
                    variant="primary"
                  >
                    Select
                  </Button>
                </Card.Body>
              </Card>

              <Card
                style={{ width: "18rem", maxWidth: "200px" }}
                className="card-container"
              >
                <Card.Img variant="top" src={coneImg} />
                <Card.Body>
                  <Card.Title>Cone</Card.Title>
                  <Button
                    onClick={() => {
                      setSelecId(4);
                    }}
                    variant="primary"
                  >
                    Select
                  </Button>
                </Card.Body>
              </Card>

              <Card
                style={{
                  width: "18rem",
                  maxWidth: "200px",
                  marginBottom: "100px",
                }}
                className="card-container"
              >
                <Card.Img variant="top" src={torusImg} />
                <Card.Body>
                  <Card.Title>Torus</Card.Title>
                  <Button
                    onClick={() => {
                      setSelecId(5);
                    }}
                    variant="primary"
                  >
                    Select
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </Menu>
          <Row className="row-container">
            <Col lg={12}>
              <Row className="row-canvas-container">
                <Canvas ref={myRef}>
                  <CameraControls ref={cameraControls} />
                  <pointLight position={[10, 10, 10]}></pointLight>
                  <pointLight position={[-10, -10, -10]}></pointLight>
                  {selectId == 1 ? (
                    <Cube
                      ref={cubeRef}
                      isRVisible={true}
                      isTopsVisible={true}
                      isWireframe={false}
                      args={[3, 3, 3]}
                      color={"blue"}
                      position={[0, 0, 0]}
                      isTransparent={true}
                      eventNumber={radioValue}
                    ></Cube>
                  ) : (
                    <></>
                  )}
                  {selectId == 6 ? (
                    <Pyramid
                      ref={cubeRef}
                      isRVisible={true}
                      isTopsVisible={true}
                      isWireframe={false}
                      args={[3, 3, 3]}
                      color={"blue"}
                      position={[0, 0, 0]}
                      isTransparent={true}
                      eventNumber={radioValue}
                    ></Pyramid>
                  ) : (
                    <></>
                  )}
                  {selectId == 2 ? (
                    <Sphere
                      isBorderVisible={true}
                      isTopsVisible={true}
                      isCenterEnabled
                      isWireframe={false}
                      args={[3, 62]}
                      color={"blue"}
                      position={[0, 0, 0]}
                      isTransparent={true}
                    ></Sphere>
                  ) : (
                    <></>
                  )}
                  {selectId == 3 ? (
                    <Cylinder
                      isTopsVisible={true}
                      isWireframe={false}
                      args={[2, 2, 3, 32]}
                      color={"blue"}
                      position={[0, 0, 0]}
                      isTransparent={true}
                      isInner={false}
                      isBorderVisible={true}
                    ></Cylinder>
                  ) : (
                    <></>
                  )}
                  {selectId == 4 ? (
                    <Cone
                      isBorderVisible={true}
                      isTopsVisible={true}
                      isWireframe={false}
                      args={[2, 4, 32]}
                      color={"blue"}
                      rotationX={Math.PI / 2}
                      //position={[0, 0, 0]}
                      isTransparent={true}
                    ></Cone>
                  ) : (
                    <></>
                  )}
                  {selectId == 5 ? (
                    <Torus
                      //isTopsVisible={isTopVisible}
                      //isWireframe={isWireframe}
                      args={[3, 0.5, 30, 100]}
                      color={"blue"}
                      rotationX={Math.PI / 2}
                      //position={[0, 0, 0]}
                      //true={true}
                    ></Torus>
                  ) : (
                    <></>
                  )}
                  {/* <gridHelper /> */}
                </Canvas>
              </Row>
              <Row>
                <Button
                  onClick={() => {
                    setSaveModal(true);
                  }}
                >
                  Save
                </Button>
                <ButtonGroup>
                  {radios.map((radio, idx) => (
                    <ToggleButton
                      key={idx}
                      id={`radio-${idx}`}
                      type="radio"
                      variant={"outline-success"}
                      name="radio"
                      value={radio.value}
                      checked={radioValue === radio.value}
                      onChange={(e) => setRadioValue(e.currentTarget.value)}
                    >
                      {radio.name}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
              </Row>
            </Col>
          </Row>

          <Modal
            show={showSaveModal}
            onHide={() => {
              setSaveModal(false);
            }}
          >
            <Modal.Header closeButton>
              <Modal.Title>Save shape to gallary</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="shapeTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    required
                    placeholder="My shape"
                    value={shapeTitle}
                    onChange={(e) => {
                      setShapeTitle(e.target.value);
                    }}
                  />
                  <Form.Text className="text-muted">
                    It can be seen by other users
                  </Form.Text>
                </Form.Group>
                <Form.Group
                  controlId="shapeCheckbox"
                  style={{ marginBottom: "20px" }}
                >
                  <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                    <Form.Check
                      type="checkbox"
                      label="Publish to gallary"
                      checked={shapeAvailableInGallary}
                      onChange={(e) => {
                        setShapeAvailableInGallary(e.target.checked);
                      }}
                    />
                  </div>
                </Form.Group>
                <Form.Group controlId="fromSubmitButton">
                  <Button variant="primary" onClick={saveShape}>
                    Submit
                  </Button>
                </Form.Group>
              </Form>
            </Modal.Body>
          </Modal>
        </>
      ) : (
        <>
          <>
            <h1>To drawing, please Log In</h1>
          </>
        </>
      )}
    </>
  );
};
export default Drawing;
