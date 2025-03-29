import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Line2 } from 'three/addons/lines/Line2.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';

//interavtive
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

// Set up scene, camera, renderer, light
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x8866dd);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0,0,5);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(200, 1000, 50);
scene.add(light);
const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
hemiLight.position.set( 0, 0, 0 );
scene.add( hemiLight );

const bodyRMaterial = new THREE.MeshStandardMaterial({
    color:0x5d8eb5,
    roughness:.2,
});
const row1Material = new THREE.MeshStandardMaterial({color:0x000000});
const row2Material = new THREE.MeshStandardMaterial({color:0xff0000});
const row3Material = new THREE.MeshStandardMaterial({color:0x00ff00});
const row4Material = new THREE.MeshStandardMaterial({color:0x0000ff});
const row5Material = new THREE.MeshStandardMaterial({color:0xffd700});
const silverMaterial = new THREE.MeshStandardMaterial({color:0xC0C0C0});

// Load models
const loader = new GLTFLoader();
const resistorLoader = await loader.loadAsync('Models/resistor.glb');
const resistor = resistorLoader.scene;
resistor.position.y = -1;
//console.log(resistor);
resistor.children[0].traverse((child) => {
    if (child.isMesh) {
        child.material = bodyRMaterial;
    }
});
resistor.children[1].traverse((child) => {
    if (child.isMesh) {
        child.material = row1Material;
    }
});
resistor.children[2].traverse((child) => {
    if (child.isMesh) {
        child.material = row2Material;
    }
});
resistor.children[3].traverse((child) => {
    if (child.isMesh) {
        child.material = row3Material;
    }
});
resistor.children[4].traverse((child) => {
    if (child.isMesh) {
        child.material = row4Material;
    }
});
resistor.children[5].traverse((child) => {
    if (child.isMesh) {
        child.material = row5Material;
    }
});
resistor.children[6].traverse((child) => {
    if (child.isMesh) {
        child.material = silverMaterial;
    }
});
scene.add(resistor);

const fatLine1 = createFatLine(
    new THREE.Vector3(-.5, 0, 0),
    new THREE.Vector3(2.75, 0, 0),
    0x000000,3,-.9,.5
);
resistor.children[1].add(fatLine1);
const r1c0 = createBoxFromLine(.2,.2,.2,0xFFFFFF,.5,0,"r1c0")
fatLine1.add(r1c0)
const r1c1 = createBoxFromLine(.2,.2,.2,0x808080,.75,0,"r1c1")
fatLine1.add(r1c1)
const r1c2 = createBoxFromLine(.2,.2,.2,0x800080,1,0,"r1c2")
fatLine1.add(r1c2)
const r1c3 = createBoxFromLine(.2,.2,.2,0x0000FF,1.25,0,"r1c3")
fatLine1.add(r1c3)
const r1c4 = createBoxFromLine(.2,.2,.2,0x00FF00,1.5,0,"r1c4")
fatLine1.add(r1c4)
const r1c5 = createBoxFromLine(.2,.2,.2,0xFFFF00,1.75,0,"r1c5")
fatLine1.add(r1c5)
const r1c6 = createBoxFromLine(.2,.2,.2,0xFFA500,2,0,"r1c6")
fatLine1.add(r1c6)
const r1c7 = createBoxFromLine(.2,.2,.2,0xFF0000,2.25,0,"r1c7")
fatLine1.add(r1c7)
const r1c8 = createBoxFromLine(.2,.2,.2,0x8B4513,2.5,0,"r1c8")
fatLine1.add(r1c8)
const r1c9 = createBoxFromLine(.2,.2,.2,0x0,2.75,0,"r1c9")
fatLine1.add(r1c9)

const fatLine2 = createFatLine(
    new THREE.Vector3(-0.5, 0, 0),
    new THREE.Vector3(2.75, 0, 0), 
    0x000000,3.0,-.5,.5
);
resistor.children[2].add(fatLine2);
const r2c0 = createBoxFromLine(.2,.2,.2,0xFFFFFF,.5,0,"r2c0")
fatLine2.add(r2c0)
const r2c1 = createBoxFromLine(.2,.2,.2,0x808080,.75,0,"r2c1")
fatLine2.add(r2c1)
const r2c2 = createBoxFromLine(.2,.2,.2,0x800080,1,0,"r2c2")
fatLine2.add(r2c2)
const r2c3 = createBoxFromLine(.2,.2,.2,0x0000FF,1.25,0,"r2c3")
fatLine2.add(r2c3)
const r2c4 = createBoxFromLine(.2,.2,.2,0x00FF00,1.5,0,"r2c4")
fatLine2.add(r2c4)
const r2c5 = createBoxFromLine(.2,.2,.2,0xFFFF00,1.75,0,"r2c5")
fatLine2.add(r2c5)
const r2c6 = createBoxFromLine(.2,.2,.2,0xFFA500,2,0,"r2c6")
fatLine2.add(r2c6)
const r2c7 = createBoxFromLine(.2,.2,.2,0xFF0000,2.25,0,"r2c7")
fatLine2.add(r2c7)
const r2c8 = createBoxFromLine(.2,.2,.2,0x8B4513,2.5,0,"r2c8")
fatLine2.add(r2c8)
const r2c9 = createBoxFromLine(.2,.2,.2,0x0,2.75,0,"r2c9")
fatLine2.add(r2c9)

const fatLine3 = createFatLine(
    new THREE.Vector3(-0.5, 0, 0),
    new THREE.Vector3(2.75, 0, 0),
    0x000000,3.0,-0.23,0.5       
);
resistor.children[3].add(fatLine3);
const r3c0 = createBoxFromLine(.2,.2,.2,0xFFFFFF,.5,0,"r3c0")
fatLine3.add(r3c0)
const r3c1 = createBoxFromLine(.2,.2,.2,0x808080,.75,0,"r3c1")
fatLine3.add(r3c1)
const r3c2 = createBoxFromLine(.2,.2,.2,0x800080,1,0,"r3c2")
fatLine3.add(r3c2)
const r3c3 = createBoxFromLine(.2,.2,.2,0x0000FF,1.25,0,"r3c3")
fatLine3.add(r3c3)
const r3c4 = createBoxFromLine(.2,.2,.2,0x00FF00,1.5,0,"r3c4")
fatLine3.add(r3c4)
const r3c5 = createBoxFromLine(.2,.2,.2,0xFFFF00,1.75,0,"r3c5")
fatLine3.add(r3c5)
const r3c6 = createBoxFromLine(.2,.2,.2,0xFFA500,2,0,"r3c6")
fatLine3.add(r3c6)
const r3c7 = createBoxFromLine(.2,.2,.2,0xFF0000,2.25,0,"r3c7")
fatLine3.add(r3c7)
const r3c8 = createBoxFromLine(.2,.2,.2,0x8B4513,2.5,0,"r3c8")
fatLine3.add(r3c8)
const r3c9 = createBoxFromLine(.2,.2,.2,0x000,2.75,0,"r3c9")
fatLine3.add(r3c9)

const fatLine4 = createFatLine(
    new THREE.Vector3(-0.5, 0, 0),
    new THREE.Vector3(2.75, 0, 0),
    0x000000,3.0,0,0.5
);
resistor.children[4].add(fatLine4);
const r4c0 = createBoxFromLine(.2,.2,.2,0xFFFFFF,.5,0,"r4c0")
fatLine4.add(r4c0)
const r4c1 = createBoxFromLine(.2,.2,.2,0x808080,.75,0,"r4c1")
fatLine4.add(r4c1)
const r4c2 = createBoxFromLine(.2,.2,.2,0x800080,1,0,"r4c2")
fatLine4.add(r4c2)
const r4c3 = createBoxFromLine(.2,.2,.2,0x0000FF,1.25,0,"r4c3")
fatLine4.add(r4c3)
const r4c4 = createBoxFromLine(.2,.2,.2,0x00FF00,1.5,0,"r4c4")
fatLine4.add(r4c4)
const r4c5 = createBoxFromLine(.2,.2,.2,0xFFFF00,1.75,0,"r4c5")
fatLine4.add(r4c5)
const r4c6 = createBoxFromLine(.2,.2,.2,0xFFA500,2,0,"r4c6")
fatLine4.add(r4c6)
const r4c7 = createBoxFromLine(.2,.2,.2,0xFF0000,2.25,0,"r4c7")
fatLine4.add(r4c7)
const r4c8 = createBoxFromLine(.2,.2,.2,0x8B4513,2.5,0,"r4c8")
fatLine4.add(r4c8)
const r4c9 = createBoxFromLine(.2,.2,.2,0x000,2.75,0,"r4c9")
fatLine4.add(r4c9)
const r4cA = createBoxFromLine(.15,.15,.15,0xFFD700,.3,0,"r4cA")
fatLine4.add(r4cA)
const r4cB = createBoxFromLine(.15,.15,.15,0xC0C0C0,.1,0,"r4cB")
fatLine4.add(r4cB)

const fatLine5 = createFatLine(
    new THREE.Vector3(-0.5, 0, 0),
    new THREE.Vector3(2.5, 0, 0),
    0xff0000,3.0,0.9,0.5
);
resistor.children[5].add(fatLine5);
const r5c0 = createBoxFromLine(.2,.2,.2,0xC0C0C0,.5,0,"r5c0")
fatLine5.add(r5c0)
const r5c1 = createBoxFromLine(.2,.2,.2,0xFFD700,.8,0,"r5c1")
fatLine5.add(r5c1)
const r5c2 = createBoxFromLine(.2,.2,.2,0x808080,1.1,0,"r5c2")
fatLine5.add(r5c2)
const r5c3 = createBoxFromLine(.2,.2,.2,0x800080,1.4,0,"r5c3")
fatLine5.add(r5c3)
const r5c4 = createBoxFromLine(.2,.2,.2,0x0000FF,1.7,0,"r5c4")
fatLine5.add(r5c4)
const r5c5 = createBoxFromLine(.2,.2,.2,0x00FF00,2,0,"r5c5")
fatLine5.add(r5c5)
const r5c6 = createBoxFromLine(.2,.2,.2,0xFF0000,2.3,0,"r5c6")
fatLine5.add(r5c6)
const r5c7 = createBoxFromLine(.2,.2,.2,0x8B4513,2.6,0,"r5c7")
fatLine5.add(r5c7)

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Set up OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 3;
controls.maxDistance = 100;

//txt
const resistor5b = document.createElement('div');
resistor5b.innerHTML = 'ตัวต้านทาน 5 แถบ';
resistor5b.style.position = 'absolute';
resistor5b.style.fontSize = '22px';
resistor5b.style.color = 'yellow';
resistor5b.style.background = 'rgba(0, 0, 0, 0.5)';
resistor5b.style.borderRadius = '5px';
resistor5b.style.top = '54px';
resistor5b.style.left = '20px';
document.body.appendChild(resistor5b);

const formula1 = document.createElement('span');
formula1.innerHTML = '0';
formula1.style.position = 'absolute';
formula1.style.fontSize = '30px';
formula1.style.color = 'black';
formula1.style.textShadow = '2px 2px 4px black';
formula1.style.padding = '10px';
formula1.style.borderRadius = '5px';
formula1.style.bottom = '20vh';
formula1.style.left = '45vw';
formula1.style.textAlign = 'center';
document.body.appendChild(formula1);

const formula2 = document.createElement('span');
formula2.innerHTML = '2';
formula2.style.position = 'absolute';
formula2.style.fontSize = '30px';
formula2.style.color = 'red';
formula2.style.textShadow = '2px 2px 4px black';
formula2.style.padding = '10px';
formula2.style.bottom = '20vh';
formula2.style.left = '50vw';
formula2.style.textAlign = 'center';
document.body.appendChild(formula2);

const formula3 = document.createElement('span');
formula3.innerHTML = '5';
formula3.style.position = 'absolute';
formula3.style.fontSize = '30px';
formula3.style.color = 'green';
formula3.style.textShadow = '2px 2px 4px black';
formula3.style.padding = '10px';
formula3.style.bottom = '20vh';
formula3.style.left = '55vw';
formula3.style.textAlign = 'center';
document.body.appendChild(formula3);

const formula4 = document.createElement('span');
formula4.innerHTML = 'x10&#8310;';
formula4.style.position = 'absolute';
formula4.style.fontSize = '30px';
formula4.style.color = 'blue';
formula4.style.textShadow = '2px 2px 4px black';
formula4.style.padding = '10px';
formula4.style.bottom = '15vh';
formula4.style.left = '50vw';
formula4.style.textAlign = 'center';
document.body.appendChild(formula4);

const formula5 = document.createElement('span');
formula5.innerHTML = '&#177;5%';
formula5.style.position = 'absolute';
formula5.style.fontSize = '30px';
formula5.style.color = 'gold';
formula5.style.textShadow = '2px 2px 4px black';
formula5.style.padding = '10px';
formula5.style.borderRadius = '5px';
formula5.style.bottom = '10vh';
formula5.style.left = '50vw';
formula5.style.textAlign = 'center';
document.body.appendChild(formula5);

const totalLb = document.createElement('div');
totalLb.innerHTML = '25M&#937;';
totalLb.style.position = 'absolute';
totalLb.style.fontSize = '30px';
totalLb.style.color = 'red';
totalLb.style.background = 'rgba(0,0,0,0.5)';
totalLb.style.padding = '10px';
totalLb.style.borderRadius = '5px';
totalLb.style.bottom = '20px';
totalLb.style.left = '50vw';
totalLb.style.textAlign = 'center';
document.body.appendChild(totalLb);

//Calculate resitor value
let f1=0,f2=20,f3=5,f4=1000000;

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
    const intersects = raycaster.intersectObjects( resistor.children, true );
    
    if ( intersects.length > 0 ) {
        const clickObj = intersects[ 0 ];
        //console.log(clickObj.object);
        
        switch (clickObj.object.name) {
            //reverse every row
            case "r1c0":
                resistor.children[1].material.color.set(0xFFFFFF);
                formula1.innerHTML = '9';
                formula1.style.color = 'white';
                f1=900;
                updateTotal();
                break;
            case "r1c1":
                resistor.children[1].material.color.set(0x808080);
                formula1.innerHTML = '8';
                formula1.style.color = 'grey';
                f1=800;
                updateTotal();
                break;
            case "r1c2":
                resistor.children[1].material.color.set(0x800080);
                formula1.innerHTML = '7';
                formula1.style.color = 'violet';
                f1=700;
                updateTotal();
                break;
            case "r1c3":
                resistor.children[1].material.color.set(0x0000FF);
                formula1.innerHTML = '6';
                formula1.style.color = 'blue';
                f1=600;
                updateTotal();
                break;
            case "r1c4":
                resistor.children[1].material.color.set(0x00FF00);
                formula1.innerHTML = '5';
                formula1.style.color = 'green';
                f1=500;
                updateTotal();
                break;
            case "r1c5":
                resistor.children[1].material.color.set(0xFFFF00);
                formula1.innerHTML = '4';
                formula1.style.color = 'yellow';
                f1=400;
                updateTotal();
                break;
            case "r1c6":
                resistor.children[1].material.color.set(0xFFA500);
                formula1.innerHTML = '3';
                formula1.style.color = 'orange';
                f1=300;
                updateTotal();
                break;
            case "r1c7":
                resistor.children[1].material.color.set(0xFF0000);
                formula1.innerHTML = '2';
                formula1.style.color = 'red';
                f1=200;
                updateTotal();
                break;
            case "r1c8":
                resistor.children[1].material.color.set(0x8B4513);
                formula1.innerHTML = '1';
                formula1.style.color = 'brown';
                f1=100;
                updateTotal();
                break;
            case "r1c9":
                resistor.children[1].material.color.set(0x0);
                formula1.innerHTML = '0';
                formula1.style.color = 'black';
                f1=0;
                updateTotal();
                break;
            // 
            case "r2c0":
                resistor.children[2].material.color.set(0xFFFFFF);
                formula2.innerHTML = '9';
                formula2.style.color = 'white';
                f2=90;
                updateTotal();
                break;
            case "r2c1":
                resistor.children[2].material.color.set(0x808080);
                formula2.innerHTML = '8';
                formula2.style.color = 'grey';
                f2=80;
                updateTotal();
                break;
            case "r2c2":
                resistor.children[2].material.color.set(0x800080);
                formula2.innerHTML = '7';
                formula2.style.color = 'violet';
                f2=70;
                updateTotal();
                break;
            case "r2c3":
                resistor.children[2].material.color.set(0x0000FF);
                formula2.innerHTML = '6';
                formula2.style.color = 'blue';
                f2=60;
                updateTotal();
                break;
            case "r2c4":
                resistor.children[2].material.color.set(0x00FF00);
                formula2.innerHTML = '5';
                formula2.style.color = 'green';
                f2=50;
                updateTotal();
                break;
            case "r2c5":
                resistor.children[2].material.color.set(0xFFFF00);
                formula2.innerHTML = '4';
                formula2.style.color = 'yellow';
                f2=40;
                updateTotal();
                break;
            case "r2c6":
                resistor.children[2].material.color.set(0xFFA500);
                formula2.innerHTML = '3';
                formula2.style.color = 'orange';
                f2=30;
                updateTotal();
                break;
            case "r2c7":
                resistor.children[2].material.color.set(0xFF0000);
                formula2.innerHTML = '2';
                formula2.style.color = 'red';
                f2=20;
                updateTotal();
                break;
            case "r2c8":
                resistor.children[2].material.color.set(0x8B4513);
                formula2.innerHTML = '1';
                formula2.style.color = 'brown';
                f2=10;
                updateTotal();
                break;
            case "r2c9":
                resistor.children[2].material.color.set(0x0);
                formula2.innerHTML = '0';
                formula2.style.color = 'black';
                f2=0;
                updateTotal();
                break;
            //
            case "r3c0":
                resistor.children[3].material.color.set(0xFFFFFF);
                formula3.innerHTML = '9';
                formula3.style.color = 'white';
                f3=9;
                updateTotal();
                break;
            case "r3c1":
                resistor.children[3].material.color.set(0x808080);
                formula3.innerHTML = '8';
                formula3.style.color = 'grey';
                f3=8;
                updateTotal();
                break;
            case "r3c2":
                resistor.children[3].material.color.set(0x800080);
                formula3.innerHTML = '7';
                formula3.style.color = 'violet';
                f3=7;
                updateTotal(); 
                break;
            case "r3c3":
                resistor.children[3].material.color.set(0x0000FF);
                formula3.innerHTML = '6';
                formula3.style.color = 'blue';
                f3=6;
                updateTotal(); 
                break;
            case "r3c4":
                resistor.children[3].material.color.set(0x00FF00);
                formula3.innerHTML = '5';
                formula3.style.color = 'green';
                f3=5;
                updateTotal(); 
                break;
            case "r3c5":
                resistor.children[3].material.color.set(0xFFFF00);
                formula3.innerHTML = '4';
                formula3.style.color = 'yellow';
                f3=4;
                updateTotal();
                break;
            case "r3c6":
                resistor.children[3].material.color.set(0xFFA500);
                formula3.innerHTML = '3';
                formula3.style.color = 'orange';
                f3=3;
                updateTotal(); 
                break;
            case "r3c7":
                resistor.children[3].material.color.set(0xFF0000);
                formula3.innerHTML = '2';
                formula3.style.color = 'red';
                f3=2;
                updateTotal(); 
                break;
            case "r3c8":
                resistor.children[3].material.color.set(0x8B4513);
                formula3.innerHTML = '1';
                formula3.style.color = 'brown';
                f3=1;
                updateTotal();
                break;
            case "r3c9":
                resistor.children[3].material.color.set(0x0);
                formula3.innerHTML = '0';
                formula3.style.color = 'black';
                f3=0;
                updateTotal();
                break;
            //
            case "r4c0":
                resistor.children[4].material.color.set(0xFFFFFF);
                formula4.innerHTML = 'x10&#8313;';
                formula4.style.color = 'white';
                f4=1000000000;
                updateTotal();
                break;
            case "r4c1":
                resistor.children[4].material.color.set(0x808080);
                formula4.innerHTML = 'x10&#8312;';
                formula4.style.color = 'grey';
                f4=100000000;
                updateTotal();
                break;
            case "r4c2":
                resistor.children[4].material.color.set(0x800080);
                formula4.innerHTML = 'x10&#8311;';
                formula4.style.color = 'violet';
                f4=10000000;
                updateTotal();
                break;
            case "r4c3":
                resistor.children[4].material.color.set(0x0000FF);
                formula4.innerHTML = 'x10&#8310;';
                formula4.style.color = 'blue';
                f4=1000000;
                updateTotal();
                break;
            case "r4c4":
                resistor.children[4].material.color.set(0x00FF00);
                formula4.innerHTML = 'x10&#8309;';
                formula4.style.color = 'green';
                f4=100000;
                updateTotal();
                break;
            case "r4c5":
                resistor.children[4].material.color.set(0xFFFF00);
                formula4.innerHTML = 'x10&#8308;';
                formula4.style.color = 'yellow';
                f4=10000;
                updateTotal();
                break;
            case "r4c6":
                resistor.children[4].material.color.set(0xFFA500);
                formula4.innerHTML = 'x10&#179;';
                formula4.style.color = 'orange';
                f4=1000;
                updateTotal();
                break;
            case "r4c7":
                resistor.children[4].material.color.set(0xFF0000);
                formula4.innerHTML = 'x10&#178;';
                formula4.style.color = 'red';
                f4=100;
                updateTotal();
                break;
            case "r4c8":
                resistor.children[4].material.color.set(0x8B4513);
                formula4.innerHTML = 'x10&#185;';
                formula4.style.color = 'brown';
                f4=10;
                updateTotal();
                break;
            case "r4c9":
                resistor.children[4].material.color.set(0x0);
                formula4.innerHTML = 'x1';
                formula4.style.color = 'black';
                f4=1;
                updateTotal();
                break;
            case "r4cA":
                resistor.children[4].material.color.set(0xFFD700);
                formula4.innerHTML = 'x0.1';
                formula4.style.color = 'gold';
                f4=0.1;
                updateTotal();
                break;
            case "r4cB":
                resistor.children[4].material.color.set(0xC0C0C0);
                formula4.innerHTML = 'x0.01';
                formula4.style.color = 'silver';
                f4=0.01;
                updateTotal();
                break;
            // 
            case "r5c0":
                resistor.children[5].material.color.set(0xC0C0C0);
                formula5.innerHTML = '&#177;10%';
                formula5.style.color = 'silver';
                break;
            case "r5c1":
                resistor.children[5].material.color.set(0xFFD700);
                formula5.innerHTML = '&#177;5%';
                formula5.style.color = 'gold';
                break;
            case "r5c2":
                resistor.children[5].material.color.set(0x808080);
                formula5.innerHTML = '&#177;0.05%';
                formula5.style.color = 'grey';
                break;
            case "r5c3":
                resistor.children[5].material.color.set(0x800080);
                formula5.innerHTML = '&#177;0.1%';
                formula5.style.color = 'violet';
                break;
            case "r5c4":
                resistor.children[5].material.color.set(0x0000FF);
                formula5.innerHTML = '&#177;0.25%';
                formula5.style.color = 'blue';
                break;
            case "r5c5":
                resistor.children[5].material.color.set(0x00FF00);
                formula5.innerHTML = '&#177;0.5%';
                formula5.style.color = 'green';
                break;
            case "r5c6":
                resistor.children[5].material.color.set(0xFF0000);
                formula5.innerHTML = '&#177;2%';
                formula5.style.color = 'red';
                break;
            case "r5c7":
                resistor.children[5].material.color.set(0x8B4513);
                formula5.innerHTML = '&#177;1%';
                formula5.style.color = 'brown';
                break;
            default:
                console.log('No action assigned for this object.');
        }
    }
}

// console.log(resistor.children);
// resistor.children.forEach(child => console.log(child.name, child));

//UpdateTotal
function updateTotal() {
    let totalResitor = (f1 + f2 + f3) * f4; ;
    totalLb.innerHTML = formatNumber(totalResitor) + "&#937;";
}

function formatNumber(value) {
    if (value >= 1000000000) {
        return (value / 1000000000) + "G"; // พันล้าน
    } else if (value >= 1000000) {
        return (value / 1000000) + "M"; // ล้าน
    } else if (value >= 1000) {
        return (value / 1000) + "K"; // พัน
    }
    return value; // ถ้าน้อยกว่า 1000 แสดงค่าปกติ
}

function createFatLine(start, end, color, width,PosX,PosY) {
    const geometry = new LineGeometry();
    geometry.setPositions([
        start.x, start.y, start.z,
        end.x, end.y, end.z
    ]);

    const material = new LineMaterial({
        color: color,
        linewidth: width,
        resolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
        dashed: false,
    });

    const fatLine = new Line2(geometry, material);
    fatLine.computeLineDistances(); 
    fatLine.position.set(PosX,PosY,0);    
    fatLine.rotation.set(0,0,Math.PI/2)
    fatLine.scale.set(1, 1, 1); 
    fatLine.updateMatrixWorld(true);

    return fatLine;
}

function createBoxFromLine(width, height, depth, color, posX, posY, name) {
    let emissive=0x0;
    if (color === 0xFFD700){
        emissive=0xFFDd00;
    }
    if(color === 0xC0C0C0){
        emissive=0xc0c0c0;
    }
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshStandardMaterial({ 
        color:color,
        emissive:emissive,
    });
    const boxColor = new THREE.Mesh(geometry, material);
    boxColor.name = name;
    boxColor.position.set(posX,posY,0);

    return boxColor;
}

function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene,camera);
}

animate();