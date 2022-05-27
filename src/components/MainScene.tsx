/* eslint-disable */
import React, { useRef, useState, FC, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
// make a wrapper component of the original camera-controls
// see "./camera-controls.tsx"
// don't import the original directly.
import { CameraControls } from "../camera-controls";
import Cube from "..//components/Cube";
import Sphere from "..//components/Sphere";
import Cylinder from "..//components/Cylinder";
import { Color } from "three";
import * as THREE from "three";

const DEG45 = Math.PI / 4;

interface MainSceneProps {}

const MainScene: FC<MainSceneProps> = (props) => {
  const cameraControls = useRef<CameraControls | null>(null);
  const myRef = useRef<HTMLCanvasElement | null>(null);

  return (
    <>
      <Canvas ref={myRef}>
        <CameraControls ref={cameraControls} />
        <pointLight position={[10, 10, 10]}></pointLight>
        <pointLight position={[-10, -10, -10]}></pointLight>
        <primitive object={new THREE.AxesHelper(100)} />

        <Cube
          args={[1, 1, 1]}
          color={"blue"}
          position={[1, 0, 0]}
          isTransparent={true}
        ></Cube>
      </Canvas>

      <div>
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
      </div>
    </>
  );
};
export default MainScene;
