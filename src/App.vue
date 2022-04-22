<script setup>

import { onMounted } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import Hero from './components/hero.vue'
import Home from './components/Home.vue'
import Navigation from './components/Navigation.vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

import ScrollToTop from './components/icons/ScrollToTop.vue'

onMounted(() => {
    let body = document.body
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // dark mode
    body.setAttribute("data-theme", "dark");
  } else {
    body.setAttribute("data-theme", "light");
  }

});


</script>

<template id="top">
  <Navigation />

  <main>
    <Hero class="panel" />
    <Home class="panel" />
  </main>

  <div class="scrollToTop">
    <a href="#top">
      <ScrollToTop />
    </a>
  </div>
  <div class="canvas">
  </div>
</template>

<style>
@import './assets/css/base.css';

body {
  height: 500vh;
}

  .canvas {

  position: absolute;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;
  z-index: -1;

  background-image: url('./src/assets/img/hero-banner.png');
  background-size: cover;
  background-repeat: no-repeat;

}

.scrollToTop {
  position: fixed;
  bottom: 10vh;
  right: 10vh;

  box-shadow: 5px 5px 1px rgba(174, 174, 192, 50%);

  background: var(--main-color);
  border-radius: var(--radius);

  width: fit-content;
  height: fit-content;
}

.scrollToTop a {
  display: grid;
  place-items: center;
}
</style>
