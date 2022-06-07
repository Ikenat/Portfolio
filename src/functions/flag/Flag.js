import * as THREE from 'three';
import fragmentShader from './shaders/fragmentShader.glsl'


const vertexShader = `  
uniform vec2 uFrequency;
uniform float uTime;

varying vec2 vUv;
varying float vElevation;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float elevation = sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
    elevation += sin(modelPosition.y * uFrequency.y - uTime) * 0.1;

    modelPosition.z += elevation;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    vUv = uv;
    vElevation = elevation;
} 
`;
const textureLoader = new THREE.TextureLoader()

export default class Flag extends THREE.Object3D {
  constructor(speed, Texture ) {
    super();

    /**
     * Textures
     */
    this.flagTexture = textureLoader.load(Texture)

    this.geometry = new THREE.PlaneGeometry(100, 100);
    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms:
        {
            uFrequency: { value: new THREE.Vector2(10, 5) },
            uTime: { value: 0 },
            uProg: { value: 0 },
            uTexture: { value: this.flagTexture }
        },
      transparent: true,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.add(this.mesh);
  }
}