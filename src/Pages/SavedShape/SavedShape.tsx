import React, { useRef, useState, FC, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
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

import Cube from "../../components/Cube";
import Sphere from "../../components/Sphere";
import Torus from "../../components/Torus";
import Cylinder from "../../components/Cylinder";
import Cone from "../../components/Cone";

import * as THREE from "three";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { CameraControls } from "../../camera-controls";

import ShapeItem from "./components/ShapeItem";

interface SavedShapeProps {
  shapeJson?: string;
  title?: string;
}

//const scene = useThree((state) => state.scene);

const SavedShape: FC<SavedShapeProps> = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [json, setJson] = useState("");

  useEffect(() => {
    //searchParams.get("id");
    //alert(searchParams.get("id"));

    axios
      .get(
        "https://localhost:44334/api/Shape/GetShapeById?id=" +
          searchParams.get("id"),
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((responce) => {
        var data = responce.data;
        setJson(data.json);
        console.log(data);
      })
      .finally(function () {})
      .catch((e) => {
        alert(e);
        return false;
      });
  }, []);

  return (
    <>
      <Canvas>
        <CameraControls />
        <pointLight position={[10, 10, 10]}></pointLight>
        <pointLight position={[-10, -10, -10]}></pointLight>

        <ShapeItem json={json}></ShapeItem>
      </Canvas>
    </>
  );
};
export default SavedShape;
