import React, { useRef, useState, FC, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface ShapeItemProps {
  json: string;
}

const ShapeItem: FC<ShapeItemProps> = (props) => {
  const scene = useThree((state) => state.scene);
  const loader = new THREE.ObjectLoader();

  useEffect(() => {
    var obj = JSON.parse(props.json);
    console.log(obj);

    const object = loader.parse(obj);
    scene.updateMatrixWorld();
    scene.add(object);
  }, []);

  return (
    <>
      <mesh></mesh>
    </>
  );
};
export default ShapeItem;
