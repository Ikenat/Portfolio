<script setup>
import ScrollIcon from './icons/scrollIcon.vue'
import PlayIcon from './icons/PlayArrow.vue'
</script>

<template>
    <section class="herobanner">
      <div>
        <h2 class="light_font">Portfolio</h2>
        <p class="light_font big">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Luctus tortor non egestas vivamus nulla aliquam. Eu lectus nibh sollicitudin semper. </p>
        <button class="light_font play3d">
          <PlayIcon />
          3D portfolio
        </button>
      </div>
      <a href="#About" class="scrollMore">
        <ScrollIcon />
      </a>
    </section>
</template>
