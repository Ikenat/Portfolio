<script setup>
import ThemeIcon from './icons/ThemeModeIcon.vue'
import Github from './icons/GithubIcon.vue'
import NavIcon from './icons/NavIcon.vue'
import CloseIcon from './icons/CloseIcon.vue'
import { reactive, ref } from '@vue/reactivity'
import { useSizeStore } from '../stores/size'
import { useRouteQuery } from '@vueuse/router'
import { useThemeStore } from '../stores/theme'

const themeStore = useThemeStore();
const SizeStore = useSizeStore();

let props = defineProps(['path']);
let links = reactive([
  {
    name: "About me",
    to:"/#about"
  },
  {
    name: "Project",
    to:"/projets"
  },
  {
    name: "Contact",
    to:"/#contact"
  },
  {
    name: "Source Code",
    to:"#",
    blank: true
  },
  {
    name: "Github",
    to:"#",
    blank: true
  },
  {
    name: "Email@gmail.com",
    to:"#",
    blank: true
  },
  {
    name: "LinkedIn",
    to:"#",
    blank: true
  },

])

let curTheme = ref('light');
let themeIcon = reactive({
  light: "#F0EADB",
  dark: "#232025"
})
let NavigationOpen = ref(false)

const switchTheme = () => {
    themeStore.switchTheme();
    console.log(themeStore.isDark);
    let body = document.body
    let theme = body.getAttribute("data-theme") 
    switch(theme) {
      case "dark" :
        body.setAttribute("data-theme", "Light");
        curTheme.value = 'light'
      break
      default: 
        body.setAttribute("data-theme", "dark");
        curTheme.value = 'dark'
      break;
    }
};

const toggleNav = () => {
  if (!NavigationOpen.value) {
    NavigationOpen.value = !NavigationOpen.value
  } else {
    setTimeout(function () {
    NavigationOpen.value = !NavigationOpen.value
  }, 700)
  }
  
  let nav = document.querySelector('.nav__wrapper');
  let navtest = document.querySelector('.test');

  navtest.classList.toggle('active');
  nav.classList.toggle("active");

  nav.querySelector("h1").classList.toggle("light_font");
}

const limitArray = (arr, to = 3, start = 0) => {
    if (to == -1) {
      return arr
    }
    if (to > arr.lenght) {
      return arr
    }

    return arr.slice(start, to)
}

const isLight = () => {
  switch (curTheme.value) {
    case 'dark':
        return true; 
      break;
  
    default:
      return props.path == '/' && !NavigationOpen.value; 
      break;
  }
}

</script>

<template>
  <div class="nav__wrapper">
    <div class="test">
      <div class="button__wrapper">
      <header class="logo">
        <router-link to="/" class="logo__text delay"><h1 class="light_font">Julien.D</h1></router-link>
    </header>
    <ul class="navigation">
      <li v-if="SizeStore.isDesktop" class="navButton">
        <button class="light-svg">
          <ThemeIcon :currentTheme="curTheme" :NavOpen="NavigationOpen" :theme="isLight() ? themeIcon.light : themeIcon.dark" @click="switchTheme"/>
        </button>
      </li>
      <li v-if="SizeStore.isDesktop" class="navButton">
        <a href="https://github.com/Ikenat" target="_blank">
          <Github :currentTheme="curTheme" :NavOpen="NavigationOpen" :theme="isLight() ? themeIcon.light : themeIcon.dark" />
        </a>
      </li>
      <li class="navButton">
        <button @click="toggleNav()">
          <NavIcon :NavOpen="NavigationOpen" />
        </button>
      </li>
    </ul>
    </div>
    
    <div class="links__wrapper">
      <h4>
        Menu
      </h4>
      <nav>
        <ul class="nav-ul__wrapper">
          <div class="link__wrapper-left">
            <li v-for="(link, index) in limitArray(links, 4)" :key="index" class="link__wrapper">
              <router-link class="link" :to="link.to" @click="toggleNav" :target="[link?.blank ? '_blank' : '']">{{link.name}}</router-link>
            </li>
          </div>
          <div class="link__wrapper-right">
            <li v-for="(link, index) in limitArray(links, 7, 4)" :key="index" class="link__wrapper">
              <router-link class="link" to="link.to">{{link.name}}</router-link>
            </li>
          </div>
        </ul>
      </nav>
      <div v-if="!SizeStore.isDesktop" class="button__wrapper-hidden">
        <li class="navButton">
        <button class="light-svg">
          <ThemeIcon :currentTheme="curTheme" :NavOpen="NavigationOpen" :theme="themeIcon" @click="switchTheme"/>
        </button>
      </li>
      <li class="navButton">
        <a href="https://github.com/Ikenat" target="_blank">
          <Github :currentTheme="curTheme" :NavOpen="NavigationOpen" :theme="themeIcon" />
        </a>
      </li>
      </div>
    </div>
    </div>
  </div>
</template>