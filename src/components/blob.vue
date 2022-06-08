<template>
    <canvas class="webgl blob" :id="props.id">
    </canvas>
</template>

<style>
    .webgl.blob {
        width: 500px;
        height: 500px; 
        background: transparent;   
    }
    #app:not(.xl) .webgl.blob {
        width: 200px;
        height: 200px; 
        background: transparent;   
    }

</style>

<script setup>
import { ref, onMounted, reactive } from '@vue/runtime-core'
import GL from '../functions/blobs'
import Blob from '../functions/blobs/Blob'
import gsap from 'gsap'

const props = defineProps(['id', 'number'])

class App {
  constructor(canvas) {
    this.GL = new GL(canvas);
    this.blobs = [];
    this.addBlobs();

    // Main animation tl
    this.tl = gsap.timeline({
      delay: 0.25,
    });

    this.tl
      .add(this.animBlobs(), '-=1.5');
  }

  addBlobs() {
    // size, speed, color, freq, density, strength, offset
    const blob = new Blob(5, 0.3, 0.5, 1.5, 0.12, Math.PI * 5, props.number);      

    blob.position.set(-0, 0, 2);
    blob.rotation.set(-0.4, 0, 0.5);

    this.blobs = [blob];
    this.GL.scene.add(...this.blobs);
  }

  animBlobs() {
    // Move Threejs Blobs
    const tl = gsap.timeline({
      defaults: {
        duration: 2,
        ease: 'power3.inOut'
      },
    });

    const uniformAlphas = [
      this.blobs[0].mesh.material.uniforms.uAlpha,
    ];

    tl
      .from(this.blobs[0].position, { z: -5 })
      .from(uniformAlphas, {
        value: 0,
        stagger: 0.2,
        ease: 'power3.inOut'
      }, 0);

    return tl;
  }
}

onMounted(() => {
    const canva = document.getElementById(props.id)
    new App(canva);
})


</script>