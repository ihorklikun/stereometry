import { extend } from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import myFont from "../../src/assets/Roboto_Regular.json";
import React, { useRef, useState, FC, useEffect } from "react";

import * as THREE from "three";
import { Color, Material, MeshPhongMaterial } from "three";

setTimeout(() => extend({ TextGeometry }), 0);

interface TextProps {
  text: string;
  position: any;
}

const Text: FC<TextProps> = (props) => {
  const font = new FontLoader().parse(myFont);
  return (
    <mesh position={props.position}>
      {/* <textGeometry args={[props.text, { font, size: 0.1, height: 0.01 }]} /> */}
      <meshLambertMaterial attach="material" color={"gold"} />
    </mesh>
  );
};
export default Text;
