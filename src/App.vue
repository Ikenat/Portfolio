<script setup>

import { watchEffect, onMounted, ref, computed, onUpdated } from 'vue';
import Home from './pages/Home.vue'
import Navigation from './components/Navigation.vue'
import FooterInformation from './components/Footer.vue'
import { useSizeStore } from './stores/size'
import { useThemeStore } from './stores/theme'

import ScrollToTop from './components/icons/ScrollToTop.vue'

const themeStore = useThemeStore();
const SizeStore = useSizeStore();



onMounted(() => {
    let body = document.body
    console.log(themeStore.isDark);
    if ((window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) || themeStore.isDark) {
    // dark mode
    body.setAttribute("data-theme", "dark");
  } else {
    body.setAttribute("data-theme", "light");
  }

});




const progress = ref(0)

watchEffect(async () => {
    const handleScroll = () => {
        progress.value = window.scrollY
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
        window.removeEventListener("scroll", handleScroll)
    }
})




const translateY = computed(() => {
    return `transform: translateY(${ progress.value * 0.5 }px)`
})


</script>

<template id="top">
  <Navigation :path="$route.path"/>

  <main>
    <div class="layout-content">
      <router-view></router-view>
    </div>
  </main>
  <FooterInformation />

  <div class="scrollToTop">
    <a href="#top">
      <ScrollToTop />
    </a>
  </div>
  <div class="canvas" v-bind:style="translateY" v-if="$route.path == '/'">
    <img 
            src="./assets/img/hero-banner.png" 
            alt="reazz"
            class="parallax"
        >
  </div>
</template>

<style>
@import './assets/css/base.css';


  .canvas {

  position: absolute;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;
  z-index: -10;
}

.parallax {
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
    }

.scrollToTop {
  position: fixed;
  bottom: 5vh;
  right: 5vh;

  box-shadow: 5px 5px 1px rgba(174, 174, 192, 50%);

  background: var(--main-color);
  border-radius: var(--radius);

  width: 50px;
  height: 50px;
}

.scrollToTop svg {
  height: 50px;
  width: 50px;
}

.scrollToTop a {
  display: grid;
  place-items: center;
}
</style>
