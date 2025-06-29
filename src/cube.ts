import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import * as THREE from 'three';

const cameraParams = {
  fov: 75,
  aspect: window.innerWidth / window.innerHeight,
  near: 0.1,
  far: 1000,
  position: {
    x: 0,
    y: 0,
    z: 5,
  }
}

const rendererParams = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const gui = new GUI();



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(cameraParams.fov, cameraParams.aspect, cameraParams.near, cameraParams.far);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const light = new THREE.DirectionalLight(0xffffff, 1);
const material = new THREE.MeshLambertMaterial({ color: 0x555555 });
const cube = new THREE.Mesh(geometry, material);
light.position.set(0, 0, 10);
light.castShadow = true;
light.target = cube;
scene.add(cube);
scene.add(light);


camera.position.z = cameraParams.position.z;
camera.lookAt(cube.position);
console.log(cube.position.distanceTo(camera.position))

const renderer = new THREE.WebGLRenderer();

renderer.setSize(rendererParams.width, rendererParams.height);
document.body.appendChild(renderer.domElement);

let time = 0;

function animate() {
  const currentTime = performance.now();
  const deltaTime = currentTime - time;
  time = currentTime;


  cube.rotation.x += 0.001 * deltaTime;
  cube.rotation.y += 0.001 * deltaTime;
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);


gui.add(cameraParams, 'fov', 30, 120).onChange((value) => {
  camera.fov = value;
  camera.updateProjectionMatrix();
});
gui.add(cameraParams.position, 'z', 0, 10).onChange((value) => {
  camera.position.z = value;
});
gui.add(cameraParams.position, 'x', -10, 10).onChange((value) => {
  camera.position.x = value;
});
gui.add(cameraParams.position, 'y', -10, 10).onChange((value) => {
  camera.position.y = value;
});