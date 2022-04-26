<script setup>
import ScrollIcon from './icons/scrollIcon.vue'
import PlayIcon from './icons/PlayArrow.vue'
</script>

<template>
    <section class="herobanner" id="hero">
      <div>
        <h2 class="light_font">Portfolio</h2>
        <p class="light_font big">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Luctus tortor non egestas vivamus nulla aliquam. Eu lectus nibh sollicitudin semper. </p>
        <button class="play3d">
          <PlayIcon />
          <span>3D portfolio</span>
        </button>
      </div>
      <a href="#about" class="scrollMore">
        <ScrollIcon />
      </a>
    </section>
</template>
