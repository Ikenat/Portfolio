<script setup>
import { watchEffect, onMounted, onBeforeUnmount, ref, computed } from 'vue';

const progress = ref(0)
const container = ref()
const app = document.querySelector("#app");

watchEffect(async () => {
    const handleScroll = () => {
        progress.value = app.clientHeight - window.scrollY - container.value?.clientHeight
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
        window.removeEventListener("scroll", handleScroll)
    }
})




const translateY = computed(() => {
    return `transform: translateY(-${ progress.value * 0.5 }px)`
})

</script>

<template>
    <footer ref="container" id="footer">
        <img 
            src="../assets/img/footer.png" 
            alt="reazz"
            class="parallax"
            v-bind:style="translateY"
        >
        <h2>Thank You</h2>
        <div class="informations informations-wrapper">
            <p class="title reseau">Mes resaux</p>
            <div class="information">
                <h5>LinkedIn</h5>
                <p>Julien Demanet</p>
                <a href="#">
                    <svg width="23" height="18" viewBox="0 0 23 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.7177 10.3444H0V8.91376L23 8.80371V10.2343C19.8306 9.88218 18.1579 12.582 17.7177 13.976V17.8276H14.7464V13.7559C15.0105 11.819 16.764 10.7479 17.7177 10.3444Z" fill="#FAEEE7"/>
                        <path d="M17.7177 7.48374H0V8.91437L23 9.02441V7.59379C19.8306 7.94595 18.1579 5.2461 17.7177 3.85216V0.000490189H14.7464V4.07226C15.0105 6.0091 16.764 7.08024 17.7177 7.48374Z" fill="#FAEEE7"/>
                    </svg>
                visiter mon LinkedIn
                </a>
            </div>
            <div class="information">
                <h5>Github</h5>
                <p>Julien Demanet</p>
                <a href="#">
                    <svg width="23" height="18" viewBox="0 0 23 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.7177 10.3444H0V8.91376L23 8.80371V10.2343C19.8306 9.88218 18.1579 12.582 17.7177 13.976V17.8276H14.7464V13.7559C15.0105 11.819 16.764 10.7479 17.7177 10.3444Z" fill="#FAEEE7"/>
                        <path d="M17.7177 7.48374H0V8.91437L23 9.02441V7.59379C19.8306 7.94595 18.1579 5.2461 17.7177 3.85216V0.000490189H14.7464V4.07226C15.0105 6.0091 16.764 7.08024 17.7177 7.48374Z" fill="#FAEEE7"/>
                    </svg>
                visiter mon Github
                </a>
            </div>
            <div class="information">
                <h5>Email</h5>
                <p>dev.demanet@gmail.com</p>
                <a href="#">
                    <svg width="23" height="18" viewBox="0 0 23 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.7177 10.3444H0V8.91376L23 8.80371V10.2343C19.8306 9.88218 18.1579 12.582 17.7177 13.976V17.8276H14.7464V13.7559C15.0105 11.819 16.764 10.7479 17.7177 10.3444Z" fill="#FAEEE7"/>
                        <path d="M17.7177 7.48374H0V8.91437L23 9.02441V7.59379C19.8306 7.94595 18.1579 5.2461 17.7177 3.85216V0.000490189H14.7464V4.07226C15.0105 6.0091 16.764 7.08024 17.7177 7.48374Z" fill="#FAEEE7"/>
                    </svg>
                Envoyer un mail
                </a>
            </div>
            <div class="information">
                <h5>Téléphone</h5>
                <p> 06 52 19 78 08</p>
            </div>
            <p class="title localisation">Ma localisation</p>
            <div class="information">
                <h5>Rennes, France</h5>
                <p>Peut également travailler en télétravail</p>
            </div>
        </div>
    </footer>
</template>

<style scoped>

    h5, p:not(.title), a {
        color: var(--second-color);
    }

    footer {
        position: relative;
        height: 100vh;
        width: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        display: grid;
        place-items: self-end self-end;
        z-index: -10;
    }

    .parallax {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: -1;
    }

    h2 {
        padding: 0 calc(100vw / 9);
    }

    h5, h2 {
        font-family: "gerbil";
        color: var(--second-color);
        text-decoration: underline;
        margin-right: var(--mb-2);
    }

    .informations {
        width: 100%;
    }

    .informations-wrapper {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(2, auto);
    }
    p.title {
        color: var(--second-color-alt);
        font-weight: 300;
    }
    p.title.reseau {
        grid-column: 1 / span 1;
        grid-row: 1 / span 1;
    }
    p.title.localisation {
        grid-column: 5 / span 1;
        grid-row: 1 / span 1;
    }

    .information {
        grid-column: span 1;
        grid-row: 2/2;
        border: 2px solid var(--second-color);
        border-bottom: none;
        border-left: none;

        display: flex;
        flex-direction: column;

        padding: 25px;
    }

    .information h5 {
        margin-bottom: var(--mb-1);
    }
    .information p, .information a {
        font-weight: lighter;
    }

    .information:last-child {
        border-right: none;
    }
</style>>
