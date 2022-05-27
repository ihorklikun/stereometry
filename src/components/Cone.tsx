import React, { useRef, useState, FC } from "react";
import * as THREE from "three";
import { Material } from "three";
import Sphere from "./Sphere";
import Torus from "./Torus";
import Cylinder from "./Cylinder";
import { useFrame } from "@react-three/fiber";

interface ConeProps {
  isTransparent?: boolean;
  args: any;
  color: any;
  position?: any;
  rotationX?: any;
  rotationZ?: any;
  isWireframe?: boolean;
  isTopsVisible?: boolean;
  isBorderVisible?: boolean;
}

const Cone: FC<ConeProps> = (props) => {
  return (
    <>
      {props.isBorderVisible && (
        <>
          <Torus
            args={[2, 0.03, 30, 100]}
            position={[0, -2, 0]}
            color={"red"}
            rotationX={Math.PI / 2}
          ></Torus>
          <Cylinder
            color={"red"}
            args={[0.03, 0.03, 4, 32]}
            position={[0, -2, 0]}
            rotationZ={Math.PI / 2}
          ></Cylinder>
          <Cylinder
            color={"red"}
            args={[0.03, 0.03, 4, 32]}
            position={[0, 0, 0]}
            //rotationZ={Math.PI / 2}
          ></Cylinder>
          <Cylinder
            color={"red"}
            args={[0.03, 0.03, 4.47, 32]}
            position={[1, 0, 0]}
            rotationZ={2 / Math.sqrt(20) + 0.01}
          ></Cylinder>
        </>
      )}
      {props.isTopsVisible && (
        <>
          <Sphere args={[0.1, 62]} color={"red"} position={[0, -2, 0]}></Sphere>
          <Sphere args={[0.1, 62]} color={"red"} position={[0, 2, 0]}></Sphere>
          <Sphere args={[0.1, 62]} color={"red"} position={[2, -2, 0]}></Sphere>
        </>
      )}
      <mesh position={props.position}>
        <coneGeometry args={props.args} />
        <meshBasicMaterial
          transparent={props.isTransparent}
          opacity={props.isTransparent ? 0.5 : 1}
          wireframe={props.isWireframe}
          color={props.color}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
};
export default Cone;
