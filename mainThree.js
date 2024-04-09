import "./style.css";
import * as THREE from "three";

import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

const scene = new THREE.Scene();

const randomColor = (brightness) => {
  if (brightness === undefined) brightness = "70%";
  return `hsl(${Math.floor(Math.random() * 220)}, 100%, ${brightness})`;
}
const randomSize = (scale) => {
  if (scale === undefined) scale = 1;
  return Math.min(0.4, Math.max(Math.random(), 0.25)) * scale;
}
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
  color: randomColor("50%"),
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

async function addStar() {
  const geometry = new THREE.SphereGeometry(randomSize(), 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: randomColor() });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(400));

  star.position.set(x, y, z);
  scene.add(star);
  while (true) {
    await new Promise(r => setTimeout(r, Math.random() * 30000));
    star.material.color.set(randomColor("50%"));
  }
}

const stars = Array(3200).fill().forEach(addStar);

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

//moon
const moonTexture = new THREE.TextureLoader().load("moon.jpg");
const normalTexture = new THREE.TextureLoader().load("normal.jpg");
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(1.5, 32, 32),
  new THREE.MeshStandardMaterial({ map: moonTexture, normalMap: normalTexture })
);

scene.add(moon);
moon.position.z = 30;
moon.position.setX(-10);

yuvraj.position.z = -3;
yuvraj.position.x = 1;

// pirate Ship
var pShip;

function loadShip() {
  const loader = new FBXLoader();
  loader.load("/tz-pirate-ship/source/12.fbx", (obj) => {
    scene.add(obj);
    obj.scale.set(0.001, 0.001, 0.001);
    obj.position.set(-80, -45, -50);
    obj.rotation.set(90 * 0.0174533 * 0.5, 0 * 0.0174533 * 0.8, -130 * 0.0174533 * 0.8);
    pShip = obj;
  });
}
loadShip();

const userScrolls = [];
const averages = [];

const calculateDirection = (userScroll, scale) => {
  if (userScrolls.length > 5) {
    userScrolls.shift();
  }
  userScrolls.push(userScroll);
  let total = 0;
  userScrolls.forEach((scroll) => {
    total += scroll;
  });
  let average = total / userScrolls.length;
  if (averages.length > 5) {
    averages.shift();
  }
  averages.push(average);
  // check if the last 5 averages are increasing or decreasing
  let direction = 0;
  let last = averages[0];
  let increasing = 0;
  let decreasing = 0;
  averages.forEach((avg) => {
    if (avg > last) {
      increasing++;
    } else if (avg < last) {
      decreasing++;
    }
    last = avg;
  });
  if (increasing > decreasing) {
    direction = -1;
  } else if (decreasing > increasing) {
    direction = 1;
  }
  if (scale < 0 && direction === -1) {
    direction = 0;
  }
  return direction;
}
// camera move on Scroll
function moveCamera() {
  let scroll = window.scrollY;
  let documentHeight = document.documentElement.scrollHeight;
  let userScroll = scroll / documentHeight;
  if (isNaN(userScroll)) {
    userScroll = 0;
  }
  torus.position.x = -scroll * 0.01;
  torus.position.y = -scroll * 0.001;

  torus.scale.x += 0.0029 * calculateDirection(userScroll, torus.scale.x);
  torus.scale.y += 0.0029 * calculateDirection(userScroll, torus.scale.y);
  torus.scale.z += 0.0029 * calculateDirection(userScroll, torus.scale.z);
  if (torus.scale.x <= 0.1) {
    torus.visible = false;
    torus.material.color.set(randomColor("50%"));
  } else {
    torus.visible = true;
  }

  if (scroll < 100) {
    torus.scale.x = 1;
    torus.scale.y = 1;
    torus.scale.z = 1;
    torus.visible = true;
    torus.position.x = 0;
    yuvraj.position.x = 0;
    yuvraj.rotation.y = 0;
    yuvraj.rotation.z = 0;
  }

  yuvraj.rotation.y += 0.01;
  yuvraj.rotation.z += 0.01;
  camera.position.z = -scroll * -0.0002;
  camera.position.x = -scroll * -0.0002;
  camera.rotation.y = -scroll * -0.0002;

  if (pShip) {
    pShip.rotation.z = -scroll * -0.002;
    pShip.position.y += -0.0001;
    if (pShip.scale.x < 0.05) {
      pShip.scale.x += 0.00009;
      pShip.scale.y += 0.00009;
      pShip.scale.z += 0.00009;
    }
  }
}

document.body.onscroll = moveCamera;
moveCamera();

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  renderer.render(scene, camera);
}



animate();

// View Resize on Browser Window Resize
window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}