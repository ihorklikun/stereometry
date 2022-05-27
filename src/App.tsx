import React, { useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { CameraControls } from "./camera-controls";
import Cube from "../src/components/Cube";
import Sphere from "../src/components/Sphere";
import { Color } from "three";
import * as THREE from "three";

import MainScene from "../src/components/MainScene";
import Header from "../src/components/Header";
import Home from "../src/Pages/Home/Home";
import Learning from "../src/Pages/Learning/Learning";
import UserProfile from "./Pages/UserProfile/UserProfile";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const DEG45 = Math.PI / 4;

export default function App() {
  const cameraControls = useRef<CameraControls | null>(null);

  return (
    <>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/learning" element={<Learning></Learning>}></Route>
          <Route path="/home" element={<Home></Home>}></Route>
          <Route
            path="/user-profile"
            element={<UserProfile></UserProfile>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
