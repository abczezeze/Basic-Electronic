import * as THREE from 'three';
import { OrbitControls } from 'three/addons/OrbitControls.js';
import { GLTFLoader } from 'three/addons/GLTFLoader.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/CSS2DRenderer.js';

const targetPosition = new THREE.Vector3();
let moving = false;
//interavtive
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

// Set up scene, camera, renderer, light
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x77c6af);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0,0,5);
const initialCameraPosition = new THREE.Vector3();
initialCameraPosition.copy(camera.position); // เก็บตำแหน่งเริ่มต้นของกล้อง
console.log(camera);

const light1 = new THREE.DirectionalLight(0xffffff, 1);
light1.position.set(3, 3, 3);
scene.add(light1);
const light2 = new THREE.DirectionalLight(0xffffff, 1);
light2.position.set(-3, -3, -3);
scene.add(light2);

// Load models
const Loader = new GLTFLoader();
const [resistorLoad, diodeLoad, capacitorLoad, transistorLoad] = await Promise.all([
    Loader.loadAsync('Models/resistorMain.glb'),
    Loader.loadAsync('Models/diode.glb'),
    Loader.loadAsync('Models/capacitorElectrolyzte.glb'),
    Loader.loadAsync('Models/transistor.glb')
]);
const resistor = resistorLoad.scene;
//console.log(resistor);
const diodeNm = diodeLoad.scene;
const capacitorElectrolyzte = capacitorLoad.scene;
const transistor = transistorLoad.scene;
diodeNm.position.y = -0.7;
capacitorElectrolyzte.position.y = -1.5;
transistor.position.y = -2.2;
scene.add(resistor, diodeNm, capacitorElectrolyzte, transistor);

//rederer
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Set up OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 3;
controls.maxDistance = 20;

//css2d
const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0px';
labelRenderer.domElement.style.pointerEvents = 'none';
document.body.appendChild(labelRenderer.domElement);

// สร้าง HTML Element
const divr4b = document.createElement('div');
divr4b.className = 'label';
divr4b.textContent = 'ตัวต้านทาน4แถบ';
const divr5b = document.createElement('div');
divr5b.className = 'label';
divr5b.textContent = 'ตัวต้านทาน5แถบ';

// ใส่ Event ให้ label
divr4b.addEventListener('click', () => {
    window.open('./equipmentR4B.html' ,'_blank');
});
divr5b.addEventListener('click', () => {
    window.open('./equipmentR5B.html' ,'_blank');
});

// นำ div ไปใช้ใน Three.js
const label4b = new CSS2DObject(divr4b);
label4b.position.copy(resistor.position);
label4b.position.y += .5;
scene.add(label4b);
const label5b = new CSS2DObject(divr5b);
label5b.position.copy(resistor.position);
label5b.position.y += .3;
scene.add(label5b);

//const helper = new THREE.AxesHelper(1); // เส้นแกนช่วยดูตำแหน่ง
//label.add(helper);

//home button
const homeButton = document.createElement('button');
homeButton.innerHTML = 'Home';
homeButton.style.position = 'absolute';
homeButton.style.top = '20px'; // ห่างจากขอบบน
homeButton.style.left = '50%'; // กึ่งกลางแนวนอน
homeButton.style.transform = 'translateX(-50%)'; // จัดให้อยู่ตรงกลางจริง ๆ
homeButton.style.fontSize = '20px';
homeButton.style.color = 'white';
homeButton.style.background = 'rgba(0, 0, 0, 0.7)';
homeButton.style.padding = '10px 20px'; // ทำให้ดูเป็นปุ่ม
homeButton.style.border = 'none'; // เอาขอบออก
homeButton.style.borderRadius = '10px'; // ทำให้โค้งมน
homeButton.style.cursor = 'pointer'; // ทำให้รู้ว่าคลิกได้
homeButton.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)'; // เพิ่มเงาให้ดูมีมิติ

console.log(initialCameraPosition);
// เพิ่ม effect เวลากด
homeButton.addEventListener('mousedown', () => {
    homeButton.style.transform = 'translateX(-50%) scale(0.95)'; // กดแล้วหดนิดนึง
    moveToObject(initialCameraPosition);
    
});
homeButton.addEventListener('mouseup', () => {
    homeButton.style.transform = 'translateX(-50%) scale(1)'; // ปล่อยแล้วกลับมาเท่าเดิม
});

document.body.appendChild(homeButton);


// Resize handler
window.addEventListener('resize', onWindowResize);
window.addEventListener('pointerdown', onPointerDown, { passive: false });

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onPointerDown( event ) {
    pointer.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
    );
    raycaster.setFromCamera( pointer, camera );
    const intersects = raycaster.intersectObjects( scene.children, true );
    
    if ( intersects.length > 0 ) {
        const clickObj = intersects[ 0 ];
        console.log(clickObj.object);
        switch (clickObj.object.name) {
            case "fourMesh":
                window.open('./equipmentR4B.html' ,'_blank');
            case "fiveMesh":
                window.open('./equipmentR5B.html' ,'_blank');
            case "resistor":
                moveToObject(resistor.position);
            default:
                console.log('No action assigned for this object.');
        } 
	}
}

function moveToObject(position) {
    targetPosition.copy(position);
    //targetPosition.z += 3;
    moving = true;
}

function animate() {
    requestAnimationFrame(animate);
    if (moving) {
        camera.position.lerp(targetPosition, 0.01);
        if (camera.position.distanceTo(targetPosition) < 0.1) { 
            moving = false;
        }
    }

    controls.update();
    renderer.render(scene,camera);
    labelRenderer.render(scene, camera);
}

animate();