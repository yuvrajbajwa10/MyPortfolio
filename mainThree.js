import "./style.css";
import * as THREE from "three";

import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {
  FileLoader,
  Loader,
  MaterialLoader,
  Object3D,
  ObjectLoader,
  ShapeUtils,
  Vector3,
} from "three";

const scene = new THREE.Scene();

// Camera construction
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Renderer Construction
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

// render View Construction
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Donut shape
const geometry = new THREE.TorusGeometry(5, 3, 30, 100);
const material = new THREE.MeshBasicMaterial({
  color: 0xff6347,
  wireframe: false,
});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);
torus.position.z += -2;

// Lights construction
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// 200 stars spheres
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Space Background
const spaceTexture = new THREE.TextureLoader().load("space.jpg");
scene.background = spaceTexture;

// me cube
const yuvrajTexture = new THREE.TextureLoader().load("yuvraj-4.png");
const yuvraj = new THREE.Mesh(
  new THREE.BoxGeometry(1.5, 1.5, 1.5),
  new THREE.MeshBasicMaterial({ map: yuvrajTexture })
);

scene.add(yuvraj);

/* //moon
const moonTexture = new THREE.TextureLoader().load("moon.jpg");
const normalTexture = new THREE.TextureLoader().load("normal.jpg");
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(1.5, 32, 32),
  new THREE.MeshStandardMaterial({ map: moonTexture, normalMap: normalTexture })
);

scene.add(moon);
moon.position.z = 30;
moon.position.setX(-10); */

yuvraj.position.z = -3;
yuvraj.position.x = 1;

// pirate Ship

var pShip;
