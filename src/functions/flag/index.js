import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap';


export default class Gl {
  constructor(canva) {
    this.canva = canva;
    this.renderer = new THREE.WebGLRenderer({
        canvas: canva,
        antialias: true, 
        alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.setSize(canva.clientWidth, canva.clientHeight);
    this.renderer.setClearColor( 0xffffff, 0 );

    this.camera = new THREE.PerspectiveCamera(
      45,
      canva.clientWidth / canva.clientHeight,
      0.1,
      200
    );
    this.camera.position.set(0, 0, 120);

    this.scene = new THREE.Scene();


    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.clock = new THREE.Clock();

    this.mouse = new THREE.Vector2();
    this.mouseTarget = new THREE.Vector2();

    this.init();
    this.animate();
  }

  init() {
    this.addEvents();
  }

  addEvents() {
    window.addEventListener('resize', this.resize.bind(this));
  }

  resize() {

    let width = this.canva.clientWidth;
    let height = this.canva.clientHeight;

    // Update camera
    this.camera.aspect = width / height;

    // Update renderer
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))

    this.camera.updateProjectionMatrix();
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.render();
  }

  render() {
    // this.controls.update();

    // Remove loading class when scene has objects
    if (this.scene.children.length > 0) {
      document.body.classList.remove('loading');
    }

    // Update uniforms
    this.scene.children.forEach(mesh => {
      mesh.material.uniforms.uTime.value = this.clock.getElapsedTime();
    });

   

    this.renderer.render(this.scene, this.camera);
  }
}