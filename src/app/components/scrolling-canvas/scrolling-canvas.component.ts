import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild
} from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'ngthree-scrolling-canvas',
  templateUrl: './scrolling-canvas.component.html',
  styleUrls: ['./scrolling-canvas.component.scss']
})
export class ScrollingCanvasComponent implements AfterViewInit {
  @ViewChild('myCanvas') myCanvas!: ElementRef<HTMLCanvasElement>;

  // Setup the scene, camera, and renderer
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer!: THREE.WebGLRenderer;

  // Offsets
  cameraOffset = 2;

  // Test shapes
  torus!: THREE.Mesh<THREE.TorusGeometry, THREE.MeshStandardMaterial>;
  box!: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>;
  sphere!: THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>;

  // Basic lights
  pointLight!: THREE.PointLight;
  ambientLight!: THREE.AmbientLight;

  // Controls
  controls!: OrbitControls;

  // Helpers
  lightHelper!: THREE.PointLightHelper;
  gridHelper!: THREE.GridHelper;

  // Scene background (can create load progress callback in case loading is an issue)
  spaceTexture = new THREE.TextureLoader().load('assets/bgs/space.jpg');

  constructor() { }

  ngAfterViewInit(): void {
    // Initialize once the canvas element has been created
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.myCanvas.nativeElement
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    //this.camera.position.setZ(30);
    this.camera.position.setZ(this.cameraOffset);

    console.log('scrolling canvas: ', this.camera);
    this.renderer.render(this.scene, this.camera);

    // Each object - geometry, 
    const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
    const material = new THREE.MeshStandardMaterial({color: 0xFF7700 });
    this.torus = new THREE.Mesh (geometry, material);

    this.scene.add(this.torus);

    // Setup a basic point light
    this.pointLight = new THREE.PointLight(0xFFFFFF);
    this.pointLight.position.set(20, 20, 20);

    // Setup ambient lighting
    this.ambientLight = new THREE.AmbientLight(0xFFFFFF);

    this.scene.add(this.pointLight, this.ambientLight);

    this.lightHelper = new THREE.PointLightHelper(this.pointLight);
    this.gridHelper = new THREE.GridHelper(200, 50);
    this.scene.add(this.lightHelper, this.gridHelper);

    // Setup the controls using the initialized camera and the DOM element to listen for mouse events
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    //for (let i = 0; i < 200; i++) this.addStar();

    // Set the scene background
    this.scene.background = this.spaceTexture;

    // Add the test texture mapped box and moon
    this.box = this.addTexturedBox();
    this.sphere = this.addTexturedSphere();

    this.scene.add(this.box, this.sphere);

    console.log('scene: ', this.scene);

    this.animate();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const t = document.body.getBoundingClientRect().top;

    this.sphere.rotation.x += 0.05;
    this.sphere.rotation.y += 0.075;
    this.sphere.rotation.z += 0.05;

    this.box.rotation.y += 0.01;
    this.box.rotation.z += 0.01;

    this.camera.position.z = this.cameraOffset + (t * -0.02);
    //this.camera.position.x = t * -0.0002;
    //this.camera.position.y = t * -0.0002;
  }

  animate(): void {
    requestAnimationFrame(() => this.animate());
    if (this.renderer) {

      // Play around with things
      this.torus.rotation.x += 0.01;
      this.torus.rotation.y += 0.005;

      this.controls.update();

      this.renderer.render(this.scene, this.camera);
    }
  }

  addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({color: 0xFFFFFF});
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill(0).map(() => THREE.MathUtils.randFloatSpread(100));
    star.position.set(x, y, z);

    this.scene.add(star);
  }

  addTexturedBox(): THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial> {
    const kentTexture = new THREE.TextureLoader().load('assets/textures/Kent2-72.png');
    const box = new THREE.Mesh(
      new THREE.BoxGeometry(3, 3, 3),
      new THREE.MeshBasicMaterial({map: kentTexture})
    );

    return box;
  }

  addTexturedSphere(): THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial> {
    const moonTexture = new THREE.TextureLoader().load('assets/textures/moon.jpg');
    const moonNormal = new THREE.TextureLoader().load('assets/textures/moon-normal.jpg');
    const moon = new THREE.Mesh(
      new THREE.SphereGeometry(3, 32, 32),
      new THREE.MeshStandardMaterial({
        map: moonTexture,
        normalMap: moonNormal
      })
    );

    moon.position.setZ(30);
    moon.position.setX(-10);

    return moon;
  }

}
