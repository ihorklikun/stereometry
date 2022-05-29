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
import { ConvexGeometry } from "three/examples/jsm/geometries/ConvexGeometry";

export interface CanShowAlert {
  showAlert(title: string, availableInGallary: boolean): void;
  clearAdded(): void;
}

interface PramidProps {
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

const Pramid = forwardRef<CanShowAlert, PramidProps>((props, ref) => {
  const [clicked, click] = useState(false);
  const piramid = useRef<THREE.Mesh>(null);
  const scene = useThree((state) => state.scene);
  const renderer = useThree((state) => state.gl);

  const [firstPointMas, setFirstPointMas] = useState<
    Array<ThreeEvent<PointerEvent>>
  >([]);
  const [secondPointMas, setSecondPointMas] = useState<
    Array<ThreeEvent<PointerEvent>>
  >([]);

  const [onePointMas, setOnePointMas] = useState<
    Array<ThreeEvent<PointerEvent>>
  >([]);

  const [planePointMas, setPlanePointMas] = useState<
    Array<ThreeEvent<PointerEvent>>
  >([]);

  const [planeTempPointMas, setPlaneTempPointMas] = useState<
    Array<ThreeEvent<PointerEvent>>
  >([]);

  useImperativeHandle(ref, () => ({
    showAlert(title: string, availableInGallary: boolean) {
      scene.updateMatrixWorld();
      const json = {
        title: title,
        json: JSON.stringify(scene.toJSON()),
        isAvailableInGallary: availableInGallary,
      };
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
    clearAdded() {
      while (true) {
        var o = scene.getObjectByName("new");
        if (o != undefined) {
          scene.remove(o);
        } else {
          break;
        }
      }
    },
  }));

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
    if (props.eventNumber == "3") {
      if (planeTempPointMas.length == 0) {
        planeTempPointMas.push(event);
      } else {
        planeTempPointMas.pop();
        planeTempPointMas.push(event);
      }
    }
  }

  function pointUp(event: ThreeEvent<PointerEvent>) {
    if (props.eventNumber == "1" && onePointMas.length == 1) {
      var geometry = new THREE.SphereGeometry(0.1, 32);
      var material = new THREE.MeshBasicMaterial({
        color: 0xff0000,
      });
      var point = new THREE.Mesh(geometry, material);
      point.position.x = onePointMas[0].point.x;
      point.position.y = onePointMas[0].point.y;
      point.position.z = onePointMas[0].point.z;
      point.name = "new";
      scene.add(point);
      onePointMas.pop();
      console.log(point);
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
        point.name = "new";
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
        point.name = "new";
        scene.add(point);

        var pointMas = new Array<THREE.Vector3>();
        pointMas.push(firstPointMas[0].point);
        pointMas.push(secondPointMas[0].point);
        var geometry2 = new THREE.BufferGeometry().setFromPoints(pointMas);
        var material2 = new THREE.LineBasicMaterial({
          color: 0xff0000,
          linewidth: 10,
        });
        const line = new THREE.Line(geometry2, material2);
        line.name = "new";
        scene.add(line);

        firstPointMas.pop();
        secondPointMas.pop();
      }
    }
    if (props.eventNumber == "3" && planeTempPointMas.length == 1) {
      planePointMas.push(planeTempPointMas[0]);
      planeTempPointMas.pop();
      console.log(planePointMas);

      var geometry = new THREE.SphereBufferGeometry(0.1, 32);
      var material = new THREE.MeshBasicMaterial({
        color: 0xff0000,
      });
      var point = new THREE.Mesh(geometry, material);
      point.position.x = planePointMas[planePointMas.length - 1].point.x;
      point.position.y = planePointMas[planePointMas.length - 1].point.y;
      point.position.z = planePointMas[planePointMas.length - 1].point.z;
      point.name = "new";
      scene.add(point);

      if (planePointMas.length > 1) {
        var pointMas = new Array<THREE.Vector3>();
        pointMas.push(planePointMas[planePointMas.length - 1].point);
        pointMas.push(planePointMas[planePointMas.length - 2].point);
        var geometry2 = new THREE.BufferGeometry().setFromPoints(pointMas);
        var material2 = new THREE.LineBasicMaterial({
          color: 0xff0000,
          linewidth: 10,
        });
        const line = new THREE.Line(geometry2, material2);
        line.name = "new";
        scene.add(line);

        var firstPlanePoint = planePointMas[0];
        var lastPlanePoint = planePointMas[planePointMas.length - 1];

        console.log(firstPlanePoint.point);
        console.log(lastPlanePoint.point);
        if (
          firstPlanePoint.point.x.toFixed(1) ==
            lastPlanePoint.point.x.toFixed(1) &&
          firstPlanePoint.point.y.toFixed(1) ==
            lastPlanePoint.point.y.toFixed(1) &&
          firstPlanePoint.point.z.toFixed(1) ==
            lastPlanePoint.point.z.toFixed(1)
        ) {
          alert("last point");
          const points = new Array<THREE.Vector3>();
          planePointMas.forEach((e) => {
            points.push(e.point);
          });

          const geometry = new ConvexGeometry(points);
          var material = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            opacity: 0.5,
            transparent: true,
            side: THREE.DoubleSide,
          });

          var plane = new THREE.Mesh(geometry, material);

          plane.renderOrder = -1;
          plane.updateMatrixWorld();
          plane.name = "plane";
          plane.name = "new";
          scene.add(plane);

          setPlanePointMas([]);
        }
      }
    }
  }

  return (
    <>
      <mesh
        onPointerUp={(e) => {
          pointUp(e);
        }}
        onPointerDown={(e) => {
          pointDown(e);
        }}
        ref={piramid}
        position={props.position}
        scale={1}
        onClick={(event) => click(!clicked)}
      >
        <coneBufferGeometry args={[2, 3, 4]}></coneBufferGeometry>
        <meshPhongMaterial
          wireframe={props.isWireframe}
          color={props.color}
          transparent={props.isTransparent}
          opacity={props.isTransparent ? 0.4 : 1}
          side={THREE.DoubleSide}
        />

        <Cylinder
          color={"red"}
          args={[0.04, 0.04, 2.8, 32]}
          position={[0, 0, 0]}
          //rotationX={Math.PI / 2}
        ></Cylinder>
        <Cylinder
          color={"red"}
          args={[0.04, 0.04, 2.8, 32]}
          position={[1, -1.5, 1]}
          rotationX={Math.PI / 2}
          rotationZ={Math.PI / 4}
        ></Cylinder>
        <Cylinder
          color={"red"}
          args={[0.04, 0.04, 2.8, 32]}
          position={[-1, -1.5, -1]}
          rotationX={Math.PI / 2}
          rotationZ={Math.PI / 4}
        ></Cylinder>

        <Cylinder
          color={"red"}
          args={[0.04, 0.04, 2.8, 32]}
          position={[-1, -1.5, 1]}
          rotationX={Math.PI / 2}
          rotationZ={2.36}
        ></Cylinder>

        <Cylinder
          color={"red"}
          args={[0.04, 0.04, 2.8, 32]}
          position={[1, -1.5, -1]}
          rotationX={Math.PI / 2}
          rotationZ={2.36}
        ></Cylinder>

        <Cylinder
          color={"red"}
          args={[0.04, 0.04, Math.sqrt(12), 32]}
          position={[0, 0, -1]}
          rotationX={Math.PI / 5 - 0.05}
          rotationZ={0}
        ></Cylinder>

        <Cylinder
          color={"red"}
          args={[0.04, 0.04, Math.sqrt(12), 32]}
          position={[0, 0, 1]}
          rotationX={(Math.PI / 5 - 0.05) * -1}
          rotationZ={0}
        ></Cylinder>

        <Cylinder
          color={"red"}
          args={[0.04, 0.04, Math.sqrt(12), 32]}
          position={[-1, 0, 0]}
          rotationX={0}
          rotationZ={(Math.PI / 5 - 0.05) * -1}
        ></Cylinder>

        <Cylinder
          color={"red"}
          args={[0.04, 0.04, Math.sqrt(12), 32]}
          position={[1, 0, 0]}
          rotationX={0}
          rotationZ={Math.PI / 5 - 0.05}
        ></Cylinder>

        <Sphere
          args={[0.1, 30, 30]}
          position={[2, -1.5, 0]}
          color={"red"}
        ></Sphere>
        <Sphere
          args={[0.1, 30, 30]}
          position={[-2, -1.5, 0]}
          color={"red"}
        ></Sphere>
        <Sphere
          args={[0.1, 30, 30]}
          position={[0, -1.5, -2]}
          color={"red"}
        ></Sphere>
        <Sphere
          args={[0.1, 30, 30]}
          position={[0, -1.5, 2]}
          color={"red"}
        ></Sphere>
        <Sphere
          args={[0.1, 30, 30]}
          position={[0, -1.5, 0]}
          color={"red"}
        ></Sphere>
        <Sphere
          args={[0.1, 30, 30]}
          position={[0, 1.5, 0]}
          color={"red"}
        ></Sphere>
      </mesh>
    </>
  );
});
export default Pramid;
