<script setup>
import ThemeIcon from './icons/ThemeModeIcon.vue'
import Github from './icons/GithubIcon.vue'
import NavIcon from './icons/NavIcon.vue'
import CloseIcon from './icons/CloseIcon.vue'
import { reactive, ref } from '@vue/reactivity'
import { useSizeStore } from '../stores/size'

const SizeStore = useSizeStore()

console.log(SizeStore.sizeScreen);

const sizeScreen = SizeStore.sizeScreen > 1240 ? 'screen': 'mobile';

console.log(sizeScreen);
let links = reactive([
  {
    name: "About me",
    to:"#"
  },
  {
    name: "Project",
    to:"#"
  },
  {
    name: "Contact",
    to:"#"
  },
  {
    name: "Source Code",
    to:"#"
  },
  {
    name: "Github",
    to:"#"
  },
  {
    name: "Email@gmail.com",
    to:"#"
  },
  {
    name: "LinkedIn",
    to:"#"
  },

])

let curTheme = ref('light');
let themeIcon = reactive({
  light: "#F0EADB",
  dark: "#232025"
})
let NavigationOpen = ref(false)

const switchTheme = () => {
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

</script>

<template>
  <div class="nav__wrapper">
    <div class="test">
      <div class="button__wrapper">
      <header class="logo">
      <a href="/"><h1 class="logo__text light_font delay">Julien D</h1></a>
    </header>
    <ul class="navigation">
      <li v-if="sizeScreen === 'screen'" class="navButton">
        <button class="light-svg">
          <ThemeIcon :currentTheme="curTheme" :NavOpen="NavigationOpen" :theme="themeIcon" @click="switchTheme"/>
        </button>
      </li>
      <li v-if="sizeScreen === 'screen'" class="navButton">
        <a href="https://github.com/Ikenat" target="_blank">
          <Github :currentTheme="curTheme" :NavOpen="NavigationOpen" :theme="themeIcon" />
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
              <a class="link" :href="link.to">{{link.name}}</a>
            </li>
          </div>
          <div class="link__wrapper-right">
            <li v-for="(link, index) in limitArray(links, 7, 4)" :key="index" class="link__wrapper">
              <a class="link" :href="link.to">{{link.name}}</a>
            </li>
          </div>
        </ul>
      </nav>
    </div>
    </div>
  </div>
</template>