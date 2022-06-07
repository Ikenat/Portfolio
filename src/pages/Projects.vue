<script setup>
import { useTitle } from '@vueuse/core'
import { ref, onMounted } from "@vue/runtime-core";
import Flag from "../components/Flag.vue";

    let projet = ref('');
    let rect = ref('');
    onMounted(() =>{


        window.addEventListener("scroll", addFixed);
        projet.value = document.querySelector('.background');
        rect.value = projet.value.getBoundingClientRect();
    })
    const addFixed = () => {
        if(window.scrollY >= rect.value.y && window.scrollY <= rect.value.bottom) {
            projet.value.classList.toggle('fixed');
            projet.value.classList.toggle('absolute');
            window.removeEventListener("scroll", addFixed);
            window.addEventListener("scroll", addAbsolute);
        }
    }

    const addAbsolute = () => {
        if(window.scrollY < rect.value.y) {
            projet.value.classList.remove('bottom');
            projet.value.classList.toggle('fixed');
            projet.value.classList.toggle('absolute');
            window.removeEventListener("scroll", addAbsolute);
            window.addEventListener("scroll", addFixed);
        }

        if(window.scrollY > rect.value.bottom) {
            projet.value.classList.toggle('fixed');
            projet.value.classList.add('bottom');
            projet.value.classList.toggle('absolute');
            window.removeEventListener("scroll", addAbsolute);
            window.addEventListener("scroll", addFixed);
        }
    }

</script>

<template>
    <h2>Project</h2>
    <div class="fill-background">
        <div class="projects-wrapper">
            <img src="../assets/img/Projects/JdGG/main.png" alt="zreraz">
            <img src="../assets/img/Projects/Portfolio/main.png" alt="">
            <div class="background absolute">
                <p>PROJET</p>
            </div>
        </div>
    </div>
    <Flag id="JDGG" texture="/src/assets/img/Projects/JdGG/main.png"/>
    

    
</template>

<style scoped>

    .fill-background {
        background: var(--second-color);
        z-index: -2;
    }
    .projects-wrapper {
        padding: 0 calc(100vw / 9);
        display: flex;
        flex-direction: column;
        gap: 150px;
    }

    img {
        width: -webkit-fill-available;
        width: -moz-available;
        object-fit: cover;
        object-position: top;
        aspect-ratio: 16 / 9;
    }
    .background.absolute {
        position: absolute;
    }
    .background.fixed {
        position: fixed;
    }
    .background:not(.bottom) {
        z-index: -3;
        
        top: 0;
        left: 50%;
        transform: translateX(-50%);
    }

    .background.bottom {
        z-index: -3;
        
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
    }

    .background p {
        font-size: 19rem;
    }
</style>