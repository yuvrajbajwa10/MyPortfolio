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
