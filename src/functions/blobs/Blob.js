import * as THREE from 'three';
import noise from './shaders/noise.glsl'
import fragmentShader from './shaders/fragmentShader.glsl'
import fragmentShader2 from './shaders/fragmentShader2.glsl'

const rotation = `
  mat3 rotation3dY(float angle) {
    float s = sin(angle);
    float c = cos(angle);

    return mat3(
      c, 0.0, -s,
      0.0, 1.0, 0.0,
      s, 0.0, c
    );
  }
  
  vec3 rotateY(vec3 v, float angle) {
    return rotation3dY(angle) * v;
  }  
`;

const vertexShader = `  
  varying vec2 vUv;
  varying float vDistort;

  
  uniform float uTime;
  uniform float uSpeed;
  uniform float uNoiseDensity;
  uniform float uNoiseStrength;
  uniform float uFrequency;
  uniform float uAmplitude;
  
  ${noise}
  
  ${rotation}
  
  void main() {
    vUv = uv;
    
    float t = uTime * uSpeed;
    float distortion = 5.00 * pnoise(0.43 * position + t, vec3(2.0)) * uNoiseStrength;

    vec3 pos = position + (normal * distortion);
    float angle = sin(uv.y * uFrequency + t) * uAmplitude;
    pos = rotateY(pos, angle);    
    
    vDistort = distortion;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
  }  
`;




export default class Blob extends THREE.Object3D {
  constructor(size, speed, color, density, strength, offset, number) {
    super();

    this.geometry = new THREE.IcosahedronGeometry(size, 64);
    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader: number == 1 ? fragmentShader : fragmentShader2,
      uniforms: {
        uTime: { value: 1 },
        uSpeed: { value: speed },
        uNoiseDensity: { value: density },
        uNoiseStrength: { value: strength },
        uFreq: { value: 3 },
        uAmp: { value: 6 },
        uHue: { value: color },
        uOffset: { value: offset },
        uAlpha: { value: 1.0 },
      },
      defines: {
        PI: Math.PI
      },
      transparent: true,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.add(this.mesh);
  }
}