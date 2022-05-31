import React, { useRef, useState, FC, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { CameraControls } from "../../camera-controls";
import Cube from "../../components/Cube";
import Sphere from "../../components/Sphere";
import Torus from "../../components/Torus";
import Cylinder from "../../components/Cylinder";
import Cone from "../../components/Cone";
import { Color } from "three";
import * as THREE from "three";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import "./Learning.css";
import ScrollArea from "react-scrollbar";
import img from "../../assets/test.png";
import { CirclePicker } from "react-color";
import { slide as Menu } from "react-burger-menu";

import cubeImg from "../../../src/assets/cube-img.png";
import sphereImg from "../../../src/assets/sphere-img.png";
import coneImg from "../../../src/assets/cone.png";
import torusImg from "../../../src/assets/torus.png";
import cylinderImg from "../../../src/assets/cylinder.png";

const DEG45 = Math.PI / 4;

interface LearningProps {}

const Learning: FC<LearningProps> = (props) => {
  const cameraControls = useRef<CameraControls | null>(null);
  const myRef = useRef<HTMLCanvasElement | null>(null);
  const [selectId, setSelecId] = useState(1);
  const [isWireframe, setWireframe] = useState(false);
  const [isTransparent, setTransparent] = useState(false);
  const [isTopVisible, setTopVisible] = useState(false);
  const [isRVisible, setRVisible] = useState(false);
  const [selectedColor, setColor] = useState("blue");
  const [selectedDotsColor, setDotsColor] = useState("red");
  const [selectedBorderColor, setBorderColor] = useState("red");
  const [radioValue, setRadioValue] = useState("1");
  const radios = [
    { name: "Shape", value: "1" },
    { name: "Borders", value: "2" },
    { name: "Dots", value: "3" },
  ];
  return (
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
            style={{ width: "18rem", maxWidth: "200px", marginBottom: "100px" }}
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
                  bordersColor={selectedBorderColor}
                  dotsColor={selectedDotsColor}
                  refCanvas={myRef}
                  isRVisible={isRVisible}
                  isTopsVisible={isTopVisible}
                  isWireframe={isWireframe}
                  args={[3, 3, 3]}
                  color={selectedColor}
                  position={[0, 0, 0]}
                  isTransparent={isTransparent}
                ></Cube>
              ) : (
                <></>
              )}
              {selectId == 2 ? (
                <Sphere
                  bordersColor={selectedBorderColor}
                  dotsColor={selectedDotsColor}
                  isBorderVisible={isRVisible}
                  isTopsVisible={isTopVisible}
                  isCenterEnabled
                  isWireframe={isWireframe}
                  args={[3, 62]}
                  color={selectedColor}
                  position={[0, 0, 0]}
                  isTransparent={isTransparent}
                ></Sphere>
              ) : (
                <></>
              )}
              {selectId == 3 ? (
                <Cylinder
                  bordersColor={selectedBorderColor}
                  dotsColor={selectedDotsColor}
                  isTopsVisible={isTopVisible}
                  isWireframe={isWireframe}
                  args={[2, 2, 3, 32]}
                  color={selectedColor}
                  position={[0, 0, 0]}
                  isTransparent={isTransparent}
                  isInner={false}
                  isBorderVisible={isRVisible}
                ></Cylinder>
              ) : (
                <></>
              )}
              {selectId == 4 ? (
                <Cone
                  bordersColor={selectedBorderColor}
                  dotsColor={selectedDotsColor}
                  isBorderVisible={isRVisible}
                  isTopsVisible={isTopVisible}
                  isWireframe={isWireframe}
                  args={[2, 4, 32]}
                  color={selectedColor}
                  rotationX={Math.PI / 2}
                  //position={[0, 0, 0]}
                  isTransparent={isTransparent}
                ></Cone>
              ) : (
                <></>
              )}
              {selectId == 5 ? (
                <Torus
                  //isTopsVisible={isTopVisible}
                  //isWireframe={isWireframe}
                  args={[3, 0.5, 30, 100]}
                  color={selectedColor}
                  rotationX={Math.PI / 2}
                  //position={[0, 0, 0]}
                  //isTransparent={isTransparent}
                ></Torus>
              ) : (
                <></>
              )}
              {/* <gridHelper /> */}
            </Canvas>
          </Row>
          <Row>
            <div>
              <div className="align-container">
                <Button
                  className="button-wrapper"
                  onClick={() => {
                    cameraControls.current?.rotate(DEG45, 0, true);
                  }}
                >
                  Rotate on 45 Deg
                </Button>
                <Button
                  className="button-wrapper"
                  onClick={() => {
                    cameraControls.current?.reset(true);
                  }}
                >
                  Reset camera
                </Button>
                <Button
                  className="button-wrapper"
                  onClick={() => {
                    setWireframe(!isWireframe);
                  }}
                >
                  Change Wireframe
                </Button>
                <Button
                  className="button-wrapper"
                  onClick={() => {
                    setTransparent(!isTransparent);
                  }}
                >
                  Set Transparent
                </Button>
                <Button
                  className="button-wrapper"
                  onClick={() => {
                    setTopVisible(!isTopVisible);
                  }}
                >
                  Set Tops
                </Button>

                <Button
                  className="button-wrapper"
                  onClick={() => {
                    setRVisible(!isRVisible);
                  }}
                >
                  Set Borders
                </Button>
              </div>
              <ButtonGroup className="radio-buttons-container">
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
              <CirclePicker
                className="picker-wrapper"
                onChangeComplete={(color) => {
                  if (radioValue == "1") {
                    setColor(color.hex);
                  }
                  if (radioValue == "2") {
                    setBorderColor(color.hex);
                  }
                  if (radioValue == "3") {
                    setDotsColor(color.hex);
                  }
                }}
                width="800px"
              />
            </div>
          </Row>
        </Col>
      </Row>
    </>
  );
};
export default Learning;
