<script setup>
import ThemeIcon from './icons/ThemeModeIcon.vue'
import Github from './icons/GithubIcon.vue'
import NavIcon from './icons/NavIcon.vue'

function switchTheme() {
            let body = document.body
            let theme = body.getAttribute("data-theme") 
            console.log(theme);
            switch(theme) {
                    case "dark" :
                        body.setAttribute("data-theme", "Light");
                        break
                    default: 
                        body.setAttribute("data-theme", "dark")
                        break;
                }
        };
</script>

<template>
    <nav>
    <header class="logo">
      <h1 class="light_font">Julien D</h1>
    </header>
    <ul class="navigation">
      <li>
        <button class="light-svg">
          <ThemeIcon theme="#F2EAD9" @click="switchTheme"/>
        </button>
      </li>
      <li>
        <a href="https://github.com/Ikenat" target="_blank">
          <Github theme="#F2EAD9"/>
        </a>
      </li>
      <li>
        <button>
          <NavIcon theme="#F2EAD9" />
        </button>
      </li>
    </ul>
  </nav>
</template>