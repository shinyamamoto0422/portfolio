import "./style.css";
import * as THREE from "three";
import * as dat from "dat.gui";

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.TorusGeometry(0.7, 0.2, 16, 100);

const particleGeometry = new THREE.BufferGeometry();
const particleCount = 8000;

const positionArray = new Float32Array(particleCount * 3);
// xyz, xyz, xyz

for (let i = 0; i < particleCount * 3; i++) {
  positionArray[i] = (Math.random() - 0.5) * (Math.random() * 5);
}

particleGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positionArray, 3)
);

// Materials
const particleMaterial = new THREE.PointsMaterial({
  size: 0.0005,
});

// Mesh
const sphere = new THREE.Points(geometry, particleMaterial);
const particleMesh = new THREE.Points(particleGeometry, particleMaterial);
scene.add(sphere, particleMesh);

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.2);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(new THREE.Color("#111"), 1);

// Mouse
document.addEventListener("mousemove", animateParticles);

let mouseX = 0;
let mouseY = 0;

function animateParticles(event) {
  mouseX = event.clientY;
  mouseY = event.clientX;
}

/**
 * Animate
 */

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  particleMesh.rotation.y = -1 * elapsedTime * 0.2;

  // Update objects
  sphere.rotation.y = 0.5 * elapsedTime;

  if (mouseX > 0) {
    particleMesh.rotation.x = mouseX * (elapsedTime * 0.0001);
    particleMesh.rotation.y = mouseY * (elapsedTime * 0.0001);
  }

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
