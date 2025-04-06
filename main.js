import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

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
transparentOpacity(diode);
scene.add(diode);
const diodeSbLoad = await Loader.loadAsync('Models/diodeSb.glb');
const diodeSb = diodeSbLoad.scene;
transparentOpacity(diodeSb);
scene.add(diodeSb);
const capacitorLoad = await Loader.loadAsync('Models/capacitorElectrolyzte.glb');
const cElectrolyzte = capacitorLoad.scene;
transparentOpacity(cElectrolyzte);
scene.add(cElectrolyzte);
const capacitorSbLoad = await Loader.loadAsync('Models/capacitorElectrolyzteSb.glb');
const cElectrolyzteSb = capacitorSbLoad.scene;
transparentOpacity(cElectrolyzteSb);
scene.add(cElectrolyzteSb);
const transistorLoad = await Loader.loadAsync('Models/transistor.glb')
const transistor = transistorLoad.scene;
transparentOpacity(transistor);
scene.add(transistor);
const transistorSbNPNLoad = await Loader.loadAsync('Models/transistorSbNPN.glb')
const transistorSbNPN = transistorSbNPNLoad.scene;
transparentOpacity(transistorSbNPN);
scene.add(transistorSbNPN);
const transistorSbPNPLoad = await Loader.loadAsync('Models/transistorSbPNP.glb')
const transistorSbPNP = transistorSbPNPLoad.scene;
transparentOpacity(transistorSbPNP);
scene.add(transistorSbPNP);

//transrent function
function transparentOpacity(object){
    object.traverse((child) => {
        if (child.isMesh) {  // ตรวจสอบว่าเป็น mesh
            child.material.transparent = true;  // เปิดใช้งาน transparency
            child.material.opacity = 0.3;      // ตั้งค่า opacity เป็น 0.3
        }
    });
}

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
const divResistor = document.createElement('div');
divResistor.className = 'label';
divResistor.textContent = 'ตัวต้านทาน';
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

// นำ div ไปใช้ใน Three.js
const labelResistor = new CSS2DObject(divResistor);
labelResistor.position.y = 1.55;
scene.add(labelResistor);
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

//sound
let listener = new THREE.AudioListener();
let bgm = new THREE.Audio( listener );
let audioLoader = new THREE.AudioLoader();
audioLoader.load('./sounds/basicElectronic.mp3', function( buffer ) {
        bgm.setBuffer( buffer );
        bgm.setLoop( true );
        bgm.setVolume( 0.1 );
        bgm.play();
});

//gui
const params = {
    bgm: 0.1,
    r4b: function() {
        window.open("./equipmentR4B.html", "_blank");
    },
    r5b: function() {
        window.open("./equipmentR5B.html", "_blank");
    }
};

const gui = new GUI();
const volumeFolder = gui.title('เสียงประกอบ');
volumeFolder.add( params, 'bgm' ).min( 0.0 ).max( 1.0 ).step( 0.01 ).onChange( function () {
    bgm.setVolume( params.bgm );
} );
const linkFolder = gui.addFolder("ลิงก์");
linkFolder.add(params,"r4b").name("ตัวต้าน่ทาน4แถบสี");
linkFolder.add(params,"r5b").name("ตัวต้าน่ทาน5แถบสี");

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