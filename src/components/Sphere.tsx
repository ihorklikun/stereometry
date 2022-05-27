import React, { useRef, useState, FC } from "react";
import * as THREE from "three";
import Cylinder from "./Cylinder";
import Torus from "./Torus";

interface SphereProps {
  isTransparent?: boolean;
  args: any;
  color: any;
  position: any;
  isWireframe?: boolean;
  isCenterEnabled?: boolean;
  isBorderVisible?: boolean;
  isTopsVisible?: boolean;
}

const Sphere: FC<SphereProps> = (props) => {
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  return (
    <>
      {props.isBorderVisible && (
        <>
          <Torus
            args={[3, 0.02, 30, 100]}
            position={[0, 0, 0]}
            color={"red"}
            rotationX={Math.PI / 2}
          ></Torus>
          <Torus
            args={[3, 0.02, 30, 100]}
            position={[0, 0, 0]}
            color={"red"}
            rotationX={0}
          ></Torus>
        </>
      )}
      {props.isTopsVisible && (
        <>
          <mesh>
            <sphereGeometry args={[0.1, 32]} />
            <meshPhongMaterial color={"red"} side={THREE.DoubleSide} />
          </mesh>
          <Cylinder
            color={"red"}
            args={[0.04, 0.04, 3, 32]}
            position={[3 / 2, 0, 0]}
            rotationZ={Math.PI / 2}
          ></Cylinder>
          <mesh position={[3, 0, 0]}>
            <sphereGeometry args={[0.1, 32]} />
            <meshPhongMaterial color={"red"} side={THREE.DoubleSide} />
          </mesh>
        </>
      )}

      <mesh
        position={props.position}
        scale={clicked ? 1.5 : 1}
        onClick={(event) => click(!clicked)}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}
      >
        <sphereGeometry args={props.args} />
        <meshPhongMaterial
          wireframe={props.isWireframe}
          color={hovered ? "red" : props.color}
          transparent={props.isTransparent}
          opacity={props.isTransparent ? 0.5 : 1}
          //depthTest={props.isTransparent ? false : true}
          depthWrite={props.isTransparent ? false : true}
          side={THREE.DoubleSide}
          //alphaTest = {0.5}
        />
      </mesh>
    </>
  );
};
export default Sphere;
