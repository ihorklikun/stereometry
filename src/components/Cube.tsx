import React, { useRef, useState, FC } from "react";
import * as THREE from "three";
import { Material } from "three";
import Sphere from "./Sphere";
import Cylinder from "./Cylinder";
import { useFrame, useThree } from "@react-three/fiber";

interface CubeProps {
  isTransparent?: boolean;
  args: any;
  color: any;
  position?: any;
  isWireframe?: boolean;
  isTopsVisible?: boolean;
  isRVisible?: boolean;
  refCanvas?: React.MutableRefObject<HTMLCanvasElement | null>;
  bordersColor?: string;
  dotsColor?: string;
}

const Cube: FC<CubeProps> = (props) => {
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  const cube = useRef<THREE.Mesh>(null);
  const scene = useThree((state) => state.scene);
  const loader = new THREE.ObjectLoader();

  const c = (
    <>
      <Cylinder
        color={"red"}
        args={[0.04, 0.04, 3, 32]}
        position={[3 / 2, 3 / 2, 0]}
        rotationX={Math.PI / 2}
      ></Cylinder>
    </>
  );

  useFrame(() => {
    //cube.current!.rotation.x = 10.01;
    //cube.current!.rotation.y = 0.01;
  });

  return (
    <mesh
      // onPointerDown={(e) => {
      //   var o = new THREE.CylinderGeometry();

      //   const object = loader.parse(scene.toJSON());
      //   scene.clear();
      //   //console.log(scene.toJSON());
      //   scene.add(object);
      //   //console.log(e.point);
      // }}
      ref={cube}
      position={props.position}
      scale={1}
      onClick={(event) => click(!clicked)}
    >
      <boxGeometry args={props.args} />
      <meshPhongMaterial
        wireframe={props.isWireframe}
        color={props.color}
        transparent={props.isTransparent}
        opacity={props.isTransparent ? 0.5 : 1}
        //depthTest={props.isTransparent ? false : true}
        //depthWrite={props.isTransparent ? false : true}
        side={THREE.DoubleSide}
        //alphaTest = {0.5}
      />

      {props.isTopsVisible == true && (
        <>
          <Sphere
            args={[0.1, 30, 30]}
            isTransparent={props.isTransparent}
            position={[
              props.args[0] / 2.0,
              props.args[0] / 2.0,
              props.args[2] / 2.0,
            ]}
            color={props.dotsColor ? props.dotsColor : "red"}
          />
          <Sphere
            args={[0.1, 30, 30]}
            isTransparent={props.isTransparent}
            position={[
              props.args[0] / -2.0,
              props.args[1] / 2.0,
              props.args[2] / 2.0,
            ]}
            color={props.dotsColor ? props.dotsColor : "red"}
          />
          <Sphere
            args={[0.1, 30, 30]}
            isTransparent={props.isTransparent}
            position={[
              props.args[0] / 2.0,
              props.args[1] / -2.0,
              props.args[2] / 2.0,
            ]}
            color={props.dotsColor ? props.dotsColor : "red"}
          />
          <Sphere
            args={[0.1, 30, 30]}
            isTransparent={props.isTransparent}
            position={[
              props.args[0] / 2.0,
              props.args[1] / 2.0,
              props.args[2] / -2.0,
            ]}
            color={props.dotsColor ? props.dotsColor : "red"}
          />
          <Sphere
            args={[0.1, 30, 30]}
            isTransparent={props.isTransparent}
            position={[
              props.args[0] / -2.0,
              props.args[1] / -2.0,
              props.args[2] / 2.0,
            ]}
            color={props.dotsColor ? props.dotsColor : "red"}
          />
          <Sphere
            args={[0.1, 30, 30]}
            isTransparent={props.isTransparent}
            position={[
              props.args[0] / -2.0 + props.position[0],
              props.args[1] / -2.0,
              props.args[2] / -2.0,
            ]}
            color={props.dotsColor ? props.dotsColor : "red"}
          />
          <Sphere
            args={[0.1, 30, 30]}
            isTransparent={props.isTransparent}
            position={[
              props.args[0] / 2.0,
              props.args[1] / -2.0,
              props.args[2] / -2.0,
            ]}
            color={props.dotsColor ? props.dotsColor : "red"}
          />
          <Sphere
            args={[0.1, 30, 30]}
            isTransparent={props.isTransparent}
            position={[
              props.args[0] / -2.0,
              props.args[1] / 2.0,
              props.args[2] / -2.0,
            ]}
            color={props.dotsColor ? props.dotsColor : "red"}
          />
        </>
      )}

      {props.isRVisible == true && (
        <>
          <Cylinder
            color={props.bordersColor ? props.bordersColor : "red"}
            args={[0.04, 0.04, 3, 32]}
            position={[3 / 2, 3 / 2, 0]}
            rotationX={Math.PI / 2}
          ></Cylinder>
          <Cylinder
            color={props.bordersColor ? props.bordersColor : "red"}
            args={[0.04, 0.04, 3, 32]}
            position={[-3 / 2, 3 / 2, 0]}
            rotationX={Math.PI / 2}
          ></Cylinder>
          <Cylinder
            color={props.bordersColor ? props.bordersColor : "red"}
            args={[0.04, 0.04, 3, 32]}
            position={[3 / 2, -3 / 2, 0]}
            rotationX={Math.PI / 2}
          ></Cylinder>
          <Cylinder
            color={props.bordersColor ? props.bordersColor : "red"}
            args={[0.04, 0.04, 3, 32]}
            position={[-3 / 2, -3 / 2, 0]}
            rotationX={Math.PI / 2}
          ></Cylinder>
          <Cylinder
            color={props.bordersColor ? props.bordersColor : "red"}
            args={[0.04, 0.04, 3, 32]}
            position={[0, 3 / 2, 3 / 2]}
            rotationX={Math.PI / 2}
            rotationZ={Math.PI / 2}
          ></Cylinder>
          <Cylinder
            color={props.bordersColor ? props.bordersColor : "red"}
            args={[0.04, 0.04, 3, 32]}
            position={[0, 3 / 2, -3 / 2]}
            rotationX={Math.PI / 2}
            rotationZ={Math.PI / 2}
          ></Cylinder>
          <Cylinder
            color={props.bordersColor ? props.bordersColor : "red"}
            args={[0.04, 0.04, 3, 32]}
            position={[0, -3 / 2, -3 / 2]}
            rotationX={Math.PI / 2}
            rotationZ={Math.PI / 2}
          ></Cylinder>
          <Cylinder
            color={props.bordersColor ? props.bordersColor : "red"}
            args={[0.04, 0.04, 3, 32]}
            position={[0, -3 / 2, 3 / 2]}
            rotationX={Math.PI / 2}
            rotationZ={Math.PI / 2}
          ></Cylinder>
          <Cylinder
            color={props.bordersColor ? props.bordersColor : "red"}
            args={[0.04, 0.04, 3, 32]}
            position={[3 / 2, 0, 3 / 2]}
            rotationX={0}
            rotationZ={0}
          ></Cylinder>
          <Cylinder
            color={props.bordersColor ? props.bordersColor : "red"}
            args={[0.04, 0.04, 3, 32]}
            position={[-3 / 2, 0, 3 / 2]}
            rotationX={0}
            rotationZ={0}
          ></Cylinder>
          <Cylinder
            color={props.bordersColor ? props.bordersColor : "red"}
            args={[0.04, 0.04, 3, 32]}
            position={[3 / 2, 0, -3 / 2]}
            rotationX={0}
            rotationZ={0}
          ></Cylinder>
          <Cylinder
            color={props.bordersColor ? props.bordersColor : "red"}
            args={[0.04, 0.04, 3, 32]}
            position={[-3 / 2, 0, -3 / 2]}
            rotationX={0}
            rotationZ={0}
          ></Cylinder>
        </>
      )}
    </mesh>
  );
};
export default Cube;
