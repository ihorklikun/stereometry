import React, { useRef, useState, FC } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import Torus from "./Torus";
import Sphere from "./Sphere";

interface CylinderProps {
  isTransparent?: boolean;
  args: any;
  color: any;
  position?: any;
  rotationX?: any;
  rotationZ?: any;
  isWireframe?: boolean;
  isInner?: boolean;
  isTopsVisible?: boolean;
  isBorderVisible?: boolean;
  bordersColor?: string;
  dotsColor?: string;
}

const Cylinder: FC<CylinderProps> = (props) => {
  const DEG90 = Math.PI / 2;
  const cylinder = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (props.rotationX) {
      cylinder.current!.rotation.x = props.rotationX;
    } else {
      cylinder.current!.rotation.x = 0;
    }
    if (props.rotationZ) {
      cylinder.current!.rotation.z = props.rotationZ;
    } else {
      cylinder.current!.rotation.z = 0;
    }
    //cylinder.current!.rotation.z = Math.PI / 2;
  });

  return (
    <>
      {props.isInner == false && (
        <>
          {props.isBorderVisible && (
            <>
              <Torus
                args={[2, 0.05, 30, 100]}
                position={[0, 3 / 2, 0]}
                color={props.bordersColor ? props.bordersColor : "red"}
                rotationX={Math.PI / 2}
              ></Torus>
              <Torus
                args={[2, 0.05, 30, 100]}
                position={[0, -3 / 2, 0]}
                color={props.bordersColor ? props.bordersColor : "red"}
                rotationX={Math.PI / 2}
              ></Torus>

              <mesh position={props.position}>
                <cylinderBufferGeometry args={[0.08, 0.08, 3, 32]} />
                <meshBasicMaterial
                  color={props.bordersColor ? props.bordersColor : "red"}
                  side={THREE.DoubleSide}
                />
              </mesh>

              <mesh position={[1, 0, 1.75]}>
                <cylinderBufferGeometry args={[0.08, 0.08, 3, 32]} />
                <meshBasicMaterial
                  color={props.bordersColor ? props.bordersColor : "red"}
                  side={THREE.DoubleSide}
                />
              </mesh>
            </>
          )}

          {props.isTopsVisible && (
            <>
              <Sphere
                args={[0.1, 62]}
                color={props.dotsColor ? props.dotsColor : "red"}
                position={[1, -3 / 2, 1.75]}
              ></Sphere>
              <Sphere
                args={[0.1, 62]}
                color={props.dotsColor ? props.dotsColor : "red"}
                position={[1, 3 / 2, 1.75]}
              ></Sphere>
              <Sphere
                args={[0.1, 62]}
                color={props.dotsColor ? props.dotsColor : "red"}
                position={[0, -3 / 2, 0]}
              ></Sphere>
              <Sphere
                args={[0.1, 62]}
                color={props.dotsColor ? props.dotsColor : "red"}
                position={[0, 3 / 2, 0]}
              ></Sphere>
            </>
          )}
        </>
      )}

      <mesh ref={cylinder} position={props.position}>
        <cylinderBufferGeometry args={props.args} />
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
export default Cylinder;
