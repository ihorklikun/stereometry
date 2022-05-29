import React, {
  useRef,
  useState,
  FC,
  forwardRef,
  useImperativeHandle,
} from "react";
import * as THREE from "three";
import { Color, Material, MeshPhongMaterial } from "three";
import Sphere from "../../../components/Sphere";
import Cylinder from "../../../components/Cylinder";
import { ThreeEvent, useFrame, useThree, Vector3 } from "@react-three/fiber";
import axios from "axios";

export interface CanShowAlert {
  showAlert(title: string, availableInGallary: boolean): void;
}

interface CubeProps {
  isTransparent?: boolean;
  args: any;
  color: any;
  position?: any;
  isWireframe?: boolean;
  isTopsVisible?: boolean;
  isRVisible?: boolean;
  refCanvas?: React.MutableRefObject<HTMLCanvasElement | null>;
  eventNumber: string;
}

const Cube = forwardRef<CanShowAlert, CubeProps>((props, ref) => {
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  const cube = useRef<THREE.Mesh>(null);
  const scene = useThree((state) => state.scene);
  const renderer = useThree((state) => state.gl);
  const [eventNumber, setEventNumber] = useState(1);

  const [firstPointMas, setFirstPointMas] = useState<
    Array<ThreeEvent<PointerEvent>>
  >([]);
  const [secondPointMas, setSecondPointMas] = useState<
    Array<ThreeEvent<PointerEvent>>
  >([]);

  const [onePointMas, setOnePointMas] = useState<
    Array<ThreeEvent<PointerEvent>>
  >([]);

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

  useImperativeHandle(ref, () => ({
    showAlert(title: string, availableInGallary: boolean) {
      const json = {
        title: title,
        json: JSON.stringify(scene.toJSON()),
        isAvailableInGallary: availableInGallary,
      };
      console.log(json);

      axios
        .post("https://localhost:44334/api/Shape/Create", json, {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((responce) => {
          console.log(responce.data);
        })
        .finally(function () {})
        .catch((e) => {
          console.log(e);
          alert(e.message);
        });
    },
  }));

  useFrame(() => {
    //cube.current!.rotation.x = 10.01;
    //cube.current!.rotation.y = 0.01;
  });

  function pointDown(event: ThreeEvent<PointerEvent>) {
    if (props.eventNumber == "1") {
      if (onePointMas.length == 0) {
        onePointMas.push(event);
      } else {
        onePointMas.pop();
        onePointMas.push(event);
      }
    }
    if (props.eventNumber == "2") {
      if (firstPointMas.length == 0) {
        firstPointMas.push(event);
      } else {
        if (
          firstPointMas[firstPointMas.length - 1].nativeEvent.clientX ==
            event.nativeEvent.clientX &&
          firstPointMas[firstPointMas.length - 1].nativeEvent.clientY ==
            event.nativeEvent.clientY
        ) {
          firstPointMas.pop();
          firstPointMas.push(event);
        } else {
          secondPointMas.pop();
          secondPointMas.push(event);
        }
      }
    }
  }

  return (
    <>
      <mesh
        onPointerUp={(e) => {
          if (props.eventNumber == "1" && onePointMas.length == 1) {
            var geometry = new THREE.SphereGeometry(0.1, 32);
            var material = new THREE.MeshBasicMaterial({
              color: 0xff0000,
            });
            var point = new THREE.Mesh(geometry, material);
            point.position.x = onePointMas[0].point.x;
            point.position.y = onePointMas[0].point.y;
            point.position.z = onePointMas[0].point.z;
            scene.add(point);
            onePointMas.pop();
          }
          if (props.eventNumber == "2") {
            if (firstPointMas.length == 1 && secondPointMas.length == 0) {
              var geometry = new THREE.SphereGeometry(0.1, 32);
              var material = new THREE.MeshBasicMaterial({
                color: 0xff0000,
              });
              var point = new THREE.Mesh(geometry, material);
              point.position.x = firstPointMas[0].point.x;
              point.position.y = firstPointMas[0].point.y;
              point.position.z = firstPointMas[0].point.z;
              scene.add(point);
            }
            if (firstPointMas.length == 1 && secondPointMas.length == 1) {
              var geometry = new THREE.SphereGeometry(0.1, 32);
              var material = new THREE.MeshBasicMaterial({
                color: 0xff0000,
              });
              var point = new THREE.Mesh(geometry, material);
              point.position.x = secondPointMas[0].point.x;
              point.position.y = secondPointMas[0].point.y;
              point.position.z = secondPointMas[0].point.z;
              scene.add(point);

              var pointMas = new Array<THREE.Vector3>();
              pointMas.push(firstPointMas[0].point);
              pointMas.push(secondPointMas[0].point);
              var geometry2 = new THREE.BufferGeometry().setFromPoints(
                pointMas
              );
              var material2 = new THREE.LineBasicMaterial({
                color: 0xff0000,
                linewidth: 10,
              });
              const line = new THREE.Line(geometry2, material2);
              scene.add(line);

              firstPointMas.pop();
              secondPointMas.pop();
            }
          }
        }}
        onPointerDown={(e) => {
          pointDown(e);
          //   var geometry = new THREE.SphereGeometry(0.1, 32);
          //   var material = new THREE.MeshBasicMaterial({
          //     color: 0xff0000,
          //   });
          //   var point = new THREE.Mesh(geometry, material);
          //   point.position.x = e.point.x;
          //   point.position.y = e.point.y;
          //   point.position.z = e.point.z;
          //   scene.add(point);
          //   pointMas.push(point.position);

          //   const points = [];
          //   points.push(new THREE.Vector3(-10, 0, 0));
          //   points.push(new THREE.Vector3(0, 10, 0));

          //   if (pointMas.length == 2) {
          //     var geometry2 = new THREE.BufferGeometry().setFromPoints(pointMas);
          //     var material2 = new THREE.LineBasicMaterial({
          //       color: 0xff0000,
          //       linewidth: 10,
          //     });
          //     const line = new THREE.Line(geometry2, material2);
          //     scene.add(line);
          //     setPointMas([]);
          //   }

          //geometry = new THREE.CylinderGeometry(0.1,0.1)

          //console.log(pointMas);
        }}
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

        {props.isRVisible == true && (
          <>
            <Cylinder
              color={"red"}
              args={[0.04, 0.04, 3, 32]}
              position={[3 / 2, 3 / 2, 0]}
              rotationX={Math.PI / 2}
            ></Cylinder>
            <Cylinder
              color={"red"}
              args={[0.04, 0.04, 3, 32]}
              position={[-3 / 2, 3 / 2, 0]}
              rotationX={Math.PI / 2}
            ></Cylinder>
            <Cylinder
              color={"red"}
              args={[0.04, 0.04, 3, 32]}
              position={[3 / 2, -3 / 2, 0]}
              rotationX={Math.PI / 2}
            ></Cylinder>
            <Cylinder
              color={"red"}
              args={[0.04, 0.04, 3, 32]}
              position={[-3 / 2, -3 / 2, 0]}
              rotationX={Math.PI / 2}
            ></Cylinder>
            <Cylinder
              color={"red"}
              args={[0.04, 0.04, 3, 32]}
              position={[0, 3 / 2, 3 / 2]}
              rotationX={Math.PI / 2}
              rotationZ={Math.PI / 2}
            ></Cylinder>
            <Cylinder
              color={"red"}
              args={[0.04, 0.04, 3, 32]}
              position={[0, 3 / 2, -3 / 2]}
              rotationX={Math.PI / 2}
              rotationZ={Math.PI / 2}
            ></Cylinder>
            <Cylinder
              color={"red"}
              args={[0.04, 0.04, 3, 32]}
              position={[0, -3 / 2, -3 / 2]}
              rotationX={Math.PI / 2}
              rotationZ={Math.PI / 2}
            ></Cylinder>
            <Cylinder
              color={"red"}
              args={[0.04, 0.04, 3, 32]}
              position={[0, -3 / 2, 3 / 2]}
              rotationX={Math.PI / 2}
              rotationZ={Math.PI / 2}
            ></Cylinder>
            <Cylinder
              color={"red"}
              args={[0.04, 0.04, 3, 32]}
              position={[3 / 2, 0, 3 / 2]}
              rotationX={0}
              rotationZ={0}
            ></Cylinder>
            <Cylinder
              color={"red"}
              args={[0.04, 0.04, 3, 32]}
              position={[-3 / 2, 0, 3 / 2]}
              rotationX={0}
              rotationZ={0}
            ></Cylinder>
            <Cylinder
              color={"red"}
              args={[0.04, 0.04, 3, 32]}
              position={[3 / 2, 0, -3 / 2]}
              rotationX={0}
              rotationZ={0}
            ></Cylinder>
            <Cylinder
              color={"red"}
              args={[0.04, 0.04, 3, 32]}
              position={[-3 / 2, 0, -3 / 2]}
              rotationX={0}
              rotationZ={0}
            ></Cylinder>
          </>
        )}
      </mesh>
    </>
  );
});
export default Cube;