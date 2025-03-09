import * as THREE from 'three';
import { OrbitControls } from 'three/addons/OrbitControls.js';
import { GLTFLoader } from 'three/addons/GLTFLoader.js';
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
    color:0xffff99,
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
const r3cA = createBoxFromLine(.15,.15,.15,0xFFD700,.3,0,"r3cA")
fatLine3.add(r3cA)
const r3cB = createBoxFromLine(.15,.15,.15,0xC0C0C0,.1,0,"r3cB")
fatLine3.add(r3cB)


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
                break;
            case "r1c1":
                resistor.children[1].material.color.set(0x808080);
                break;
            case "r1c2":
                resistor.children[1].material.color.set(0x800080);
                break;
            case "r1c3":
                resistor.children[1].material.color.set(0x0000FF);
                break;
            case "r1c4":
                resistor.children[1].material.color.set(0x00FF00);
                break;
            case "r1c5":
                resistor.children[1].material.color.set(0xFFFF00);
                break;
            case "r1c6":
                resistor.children[1].material.color.set(0xFFA500);
                break;
            case "r1c7":
                resistor.children[1].material.color.set(0xFF0000);
                break;
            case "r1c8":
                resistor.children[1].material.color.set(0x8B4513);
                break;
            case "r1c9":
                resistor.children[1].material.color.set(0x0);
                break;
            // 
            case "r2c0":
                resistor.children[2].material.color.set(0xFFFFFF);
                break;
            case "r2c1":
                resistor.children[2].material.color.set(0x808080);
                break;
            case "r2c2":
                resistor.children[2].material.color.set(0x800080);
                break;
            case "r2c3":
                resistor.children[2].material.color.set(0x0000FF);
                break;
            case "r2c4":
                resistor.children[2].material.color.set(0x00FF00);
                break;
            case "r2c5":
                resistor.children[2].material.color.set(0xFFFF00);
                break;
            case "r2c6":
                resistor.children[2].material.color.set(0xFFA500);
                break;
            case "r2c7":
                resistor.children[2].material.color.set(0xFF0000);
                break;
            case "r2c8":
                resistor.children[2].material.color.set(0x8B4513);
                break;
            case "r2c9":
                resistor.children[2].material.color.set(0x0);
                break;
            //
            case "r3c0":
                resistor.children[3].material.color.set(0xFFFFFF);
                break;
            case "r3c1":
                resistor.children[3].material.color.set(0x808080);
                break;
            case "r3c2":
                resistor.children[3].material.color.set(0x800080);
                break;
            case "r3c3":
                resistor.children[3].material.color.set(0x0000FF);
                break;
            case "r3c4":
                resistor.children[3].material.color.set(0x00FF00);
                break;
            case "r3c5":
                resistor.children[3].material.color.set(0xFFFF00);
                break;
            case "r3c6":
                resistor.children[3].material.color.set(0xFFA500);
                break;
            case "r3c7":
                resistor.children[3].material.color.set(0xFF0000);
                break;
            case "r3c8":
                resistor.children[3].material.color.set(0x8B4513);
                break;
            case "r3c9":
                resistor.children[3].material.color.set(0x0);
                break;
            case "r3cA":
                resistor.children[3].material.color.set(0xFFD700);
                break;
            case "r3cB":
                resistor.children[3].material.color.set(0xC0C0C0);
                break;
            //
            case "r4c0":
                resistor.children[4].material.color.set(0xFFFFFF);
                break;
            case "r4c1":
                resistor.children[4].material.color.set(0x808080);
                break;
            case "r4c2":
                resistor.children[4].material.color.set(0x800080);
                break;
            case "r4c3":
                resistor.children[4].material.color.set(0x0000FF);
                break;
            case "r4c4":
                resistor.children[4].material.color.set(0x00FF00);
                break;
            case "r4c5":
                resistor.children[4].material.color.set(0xFFFF00);
                break;
            case "r4c6":
                resistor.children[4].material.color.set(0xFFA500);
                break;
            case "r4c7":
                resistor.children[4].material.color.set(0xFF0000);
                break;
            case "r4c8":
                resistor.children[4].material.color.set(0x8B4513);
                break;
            case "r4c9":
                resistor.children[4].material.color.set(0x0);
                break;
            case "r4cA":
                resistor.children[4].material.color.set(0xFFD700);
                break;
            case "r4cB":
                resistor.children[4].material.color.set(0xC0C0C0);
                break;
            // 
            case "r5c0":
                resistor.children[5].material.color.set(0xC0C0C0);
                break;
            case "r5c1":
                resistor.children[5].material.color.set(0xFFD700);
                break;
            case "r5c2":
                resistor.children[5].material.color.set(0x808080);
                break;
            case "r5c3":
                resistor.children[5].material.color.set(0x800080);
                break;
            case "r5c4":
                resistor.children[5].material.color.set(0x0000FF);
                break;
            case "r5c5":
                resistor.children[5].material.color.set(0x00FF00);
                break;
            case "r5c6":
                resistor.children[5].material.color.set(0xFF0000);
                break;
            case "r5c7":
                resistor.children[5].material.color.set(0x8B4513);
                break;
            default:
                console.log('No action assigned for this object.');
        }
    }
}

console.log(resistor.children);
resistor.children.forEach(child => console.log(child.name, child));

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