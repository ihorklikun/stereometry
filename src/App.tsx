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

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const DEG45 = Math.PI / 4;

export default function App() {
  const cameraControls = useRef<CameraControls | null>(null);
  //const { camera, gl } = useThree();

  return (
    <>
      {/* <Canvas>
        <CameraControls ref={cameraControls} />
        <pointLight position={[10, 10, 10]}></pointLight>
        <pointLight position={[-10, -10, -10]}></pointLight>
        <primitive object={new THREE.AxesHelper(100)} />

        <Sphere args={[1,30,30]} color={"yellow"} isTransparent = {true} position={[1,0,0]}></Sphere>

        <Cube args={[1,1,1]} color={"blue"} isTransparent = {true}></Cube>

      </Canvas> */}

      {/* <MainScene></MainScene>

      <div style={{ position: "absolute", top: "0" }}>
        <button
          type="button"
          onClick={() => {
            cameraControls.current?.rotate(DEG45, 0, true);
          }}
        >
          rotate theta 45deg
        </button>
        <button
          type="button"
          onClick={() => {
            cameraControls.current?.reset(true);
          }}
        >
          reset
        </button>
      </div> */}
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/learning" element={<Learning></Learning>}></Route>
          <Route path="/home" element={<Home></Home>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
