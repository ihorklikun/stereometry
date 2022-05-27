import React, { useRef, useState, FC } from "react";
import * as THREE from "three";
import { Material } from "three";
import Sphere from "./Sphere";
import Cylinder from "./Cylinder";
import { useFrame } from "@react-three/fiber";

interface TorusProps {
  isTransparent?: boolean;
  args: any;
  color: any;
  position?: any;
  rotationX?: any;
  rotationZ?: any;
  isWireframe?: boolean;
  isTopsVisible?: boolean;
  isRVisible?: boolean;
}

const Torus: FC<TorusProps> = (props) => {
  const torus = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (props.rotationX) {
      torus.current!.rotation.x = props.rotationX;
    } else {
      torus.current!.rotation.x = 0;
    }
    if (props.rotationZ) {
      torus.current!.rotation.z = props.rotationZ;
    } else {
      torus.current!.rotation.z = 0;
    }
    //cylinder.current!.rotation.z = Math.PI / 2;
  });

  return (
    <>
      <mesh ref = {torus} position = {props.position}>
        <torusGeometry args={props.args} />
        <meshPhongMaterial color={props.color} side={THREE.DoubleSide} />
      </mesh>
    </>
  );
};
export default Torus;
