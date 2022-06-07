<template>
    <canvas class="webgl Flag" :id="props.id">
    </canvas>
    <img :src="props.texture" alt="raezra" class="hidden">
</template>

<style>
    .webgl.Flag {
        width: 800px;
        height: 1000px; 
        background: transparent;   
    }

    .hidden {
        display: none;
    }
</style>

<script setup>
import { onMounted } from '@vue/runtime-core'
import GL from '../functions/flag'
import Flag from '../functions/flag/Flag'
import gsap from 'gsap'

const props = defineProps(['id', 'texture'])

class App {
  constructor(canvas) {
    this.canvas = canvas
    this.GL = new GL(canvas );
    this.textures = [];
    this.addFlag();
    this.addEvents();

    // Main animation tl
    this.tl = gsap.timeline({
      delay: 0.25,
    });
  }

  addFlag() {
    // speed, texture
    const Texture = new Flag(0.3, props.texture);      

    Texture.position.set(-0, 0, 2);
    Texture.rotation.set(0, 0, 0);

    this.textures = [Texture];
    this.GL.scene.add(...this.textures);
  }
  addEvents() {
    this.canvas.addEventListener('mouseenter', this.mouseEnter.bind(this));
    this.canvas.addEventListener('mouseleave', this.mouseLeave.bind(this));
  }
  mouseEnter(e) {
    gsap.to(this.textures[0].material.uniforms.uProg, {
        value: 1,
        ease: 'power.inOut',
    })
  }
  mouseLeave(e) {
    gsap.to(this.textures[0].material.uniforms.uProg, {
      value: 0,
      ease: "power.inOut",
    })
  }

}

onMounted(() => {
    const canva = document.getElementById(props.id)
    new App(canva);
})


</script>