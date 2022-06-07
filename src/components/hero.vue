<script setup>
import ScrollIcon from './icons/scrollIcon.vue'
import PlayIcon from './icons/PlayArrow.vue'
</script>

<template>
    <section class="herobanner" id="hero">
      <div>
        <h2 class="light_font gerbil">
          Web<br>
          <span class="argentum light-weight">Developper</span><br>
          <span class="argentum">Portfolio</span>
        </h2>
        <button class="play3d">
          <PlayIcon />
          <span class="logo__text">3D portfolio</span>
        </button>
      </div>
      <a href="#about" class="scrollMore">
        <ScrollIcon color="#fffffe"/>
      </a>
    </section>
</template>

<style scoped>
.parallax {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: -1;
    }
</style>
