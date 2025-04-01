import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

//interavtive
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

// Set up scene, camera, renderer, light
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x77c6af);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0,0,5);
const initialCameraPosition = new THREE.Vector3();
initialCameraPosition.copy(camera.position);
console.log(initialCameraPosition);


const light1 = new THREE.DirectionalLight(0xffffff, 1);
light1.position.set(3, 3, 3);
scene.add(light1);
const light2 = new THREE.DirectionalLight(0xffffff, 1);
light2.position.set(-3, -3, -3);
scene.add(light2);

// Load models
const Loader = new GLTFLoader();

const resistorLoad = await Loader.loadAsync('Models/resistor.glb');
const resistor = resistorLoad.scene;
scene.add(resistor);
const resistorSbLoad = await Loader.loadAsync('Models/resistorSb.glb');
const resistorSb = resistorSbLoad.scene;
scene.add(resistorSb);
const diodeLoad = await Loader.loadAsync('Models/diode.glb');
const diode = diodeLoad.scene;
scene.add(diode);
const diodeSbLoad = await Loader.loadAsync('Models/diodeSb.glb');
const diodeSb = diodeSbLoad.scene;
scene.add(diodeSb);
const capacitorLoad = await Loader.loadAsync('Models/capacitorElectrolyzte.glb');
const cElectrolyzte = capacitorLoad.scene;
scene.add(cElectrolyzte);
const capacitorSbLoad = await Loader.loadAsync('Models/capacitorElectrolyzteSb.glb');
const cElectrolyzteSb = capacitorSbLoad.scene;
scene.add(cElectrolyzteSb);
const transistorLoad = await Loader.loadAsync('Models/transistor.glb')
const transistor = transistorLoad.scene;
scene.add(transistor);
const transistorSbNPNLoad = await Loader.loadAsync('Models/transistorSbNPN.glb')
const transistorSbNPN = transistorSbNPNLoad.scene;
scene.add(transistorSbNPN);
const transistorSbPNPLoad = await Loader.loadAsync('Models/transistorSbPNP.glb')
const transistorSbPNP = transistorSbPNPLoad.scene;
scene.add(transistorSbPNP);

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
const divR4B = document.createElement('div');
divR4B.className = 'label';
divR4B.textContent = 'ตัวต้านทาน 4 แถบ';
const divR5B = document.createElement('div');
divR5B.className = 'label';
divR5B.textContent = 'ตัวต้านทาน 5 แถบ';
const divDiode = document.createElement('div');
divDiode.className = 'label';
divDiode.textContent = 'ไดโอด';
const divCapElec = document.createElement('div');
divCapElec.className = 'label';
divCapElec.textContent = 'ตัวเก็บประจุ';

const divTstNPN = document.createElement('div');
divTstNPN.className = 'label';
divTstNPN.textContent = 'ทรานซิสเตอร์NPN';
const divTstPNP = document.createElement('div');
divTstPNP.className = 'label';
divTstPNP.textContent = 'ทรานซิสเตอร์PNP';

// ใส่ Event ให้ label
divR4B.addEventListener('click', () => {
    window.open('./equipmentR4B.html' ,'_blank');
});
divR5B.addEventListener('click', () => {
    window.open('./equipmentR5B.html' ,'_blank');
});

// นำ div ไปใช้ใน Three.js
const labelR4B = new CSS2DObject(divR4B);
labelR4B.position.y = 1.7;
scene.add(labelR4B);
const labelR5B = new CSS2DObject(divR5B);
labelR5B.position.y = 1.4;
scene.add(labelR5B);

const labelDiode = new CSS2DObject(divDiode);
labelDiode.position.y = .5;
scene.add(labelDiode);

const labelCapElec = new CSS2DObject(divCapElec);
labelCapElec.position.y = -.5;
scene.add(labelCapElec);

const labelTstNPN = new CSS2DObject(divTstNPN);
labelTstNPN.position.y = -1.5;
scene.add(labelTstNPN);
const labelTstPNP = new CSS2DObject(divTstPNP);
labelTstPNP.position.y = -2.1;
scene.add(labelTstPNP);

//home button
const homeButton = document.createElement('button');
homeButton.innerHTML = 'เริ่มต้น';
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

//console.log(initialCameraPosition);
// เพิ่ม effect เวลากด
homeButton.addEventListener('mousedown', () => {
    homeButton.style.transform = 'translateX(-50%) scale(0.95)'; // กดแล้วหดนิดนึง
    camera.position.set(0,0,5);
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
        console.log(clickObj.object.name);
        switch (clickObj.object.name) {
            case "rstBody":
                moveObjectToCamera(resistor);
                break;
            case "DiodeNm":
                moveObjectToCamera(diode);
                break;
            case "CElectrolyzte":
                moveObjectToCamera(cElectrolyzte);
                break;
            case "Transistor":
                moveObjectToCamera(transistor);
                break;
            default:
                console.log('No action assigned for this object.');
        } 
	}
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene,camera);
    labelRenderer.render(scene, camera);
}

animate();