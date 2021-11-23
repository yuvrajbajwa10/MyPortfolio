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

async function loadShip() {
  const loader = new FBXLoader();
  await loader.load("/tz-pirate-ship/source/12.fbx", (obj) => {
    scene.add(obj);
    pShip = scene.getObjectById(218);

    obj.scale.set(0.1, 0.1, 0.1);
    obj.position.set(-80, -45, -50);
    // the rotation must be in radians so I have multiplied degrees by the Rad conversion Multiplier
    obj.rotation.set(90 * 0.0174533, 0 * 0.0174533, -130 * 0.0174533);
    pShip = obj;
  });
}
loadShip();

// camera move on Scroll
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  /*   moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05; */

  yuvraj.rotation.y += 0.01;
  yuvraj.rotation.z += 0.01;

  //  ship.position.y = t * -0.0002;ship.position.y = t * -0.01]
  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
  if (pShip) {
    pShip.rotation.z = t * -0.002;
    pShip.position.y += -0.0001;
  }
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  // moon.rotation.x += 0.005;

  renderer.render(scene, camera);
}

animate();

// View Resize on Browser Window Resize
window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  //render();
}
