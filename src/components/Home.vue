<script setup>
import { reactive } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import { onMounted } from 'vue'
import gsap from 'gsap'


function gerUrl(param) {
  return './src/assets/img/' + param;
}

function ChangeActive(el) {
  let pagination = document.querySelector('.pagination_number');
  pagination.childNodes.forEach((button, index) => {
    console.log(button);
    if ( (index !== 0 && index !== 5) && Object.values(button.childNodes[0].classList).includes('active')) {
      button.childNodes[0].classList.toggle('active')
      button.childNodes[0].classList.toggle('light_font')
    }
  })
  el.target.classList.add('active');
  el.target.classList.add('light_font');
}

const img = reactive([
  {
  url: 'pic1.jpg',
  position: 'un',
  alt: 'test'
  },
  {
  url: 'pic1.jpg',
  position: 'deux',
  alt: 'test'
  },
  {
  url: 'pic1.jpg',
  position: 'trois',
  alt: 'test'
  },
  {
  url: 'pic1.jpg',
  position: 'quatre',
  alt: 'test'
  },
])
</script>

<template>
  <div class="home">
    <section id="about">
      <div class="wrapper left">
        <h2>About</h2>
        <p class="light-weight">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id libero posuere tincidunt ac. Habitant vivamus blandit tellus sed. Egestas erat egestas dictum nisl. Quisque dignissim donec ipsum sed. Ullamcorper a ac laoreet aenean ac elit.
          Augue cursus maecenas vestibulum sed ipsum,
        </p>
      </div>
      <div class="wrapper right">
        <div class="relative-img">
          <div v-for="(image, index) in img" :key="index" class="img" :class="image.position">
            <img :src="gerUrl(image.url)" :alt="image.alt">
          </div>
        </div>
        <div class="pagination">
          <ul>
            <li>
              <button class="prev">
                <svg width="12" height="19" viewBox="0 0 12 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.5286 16.8334L4.65857 9.9483L11.5286 3.06326L9.41357 0.948242L0.413574 9.9483L9.41357 18.9484L11.5286 16.8334Z" fill="#524A4E"/>
                </svg>
              </button>
            </li>
            <div class="pagination_number">
              <li v-for="(image, index) in img" :key="index">
              <button :class="{active: index==0, light_font: index==0}" @click="ChangeActive">
                {{ index + 1 }}
              </button>
            </li>
            </div>
            <li>
              <button class="next">
                <svg width="12" height="19" viewBox="0 0 12 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.471436 3.06313L7.34143 9.94818L0.471436 16.8332L2.58643 18.9482L11.5864 9.94818L2.58643 0.94812L0.471436 3.06313Z" fill="#524A4E"/>
                </svg>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <section class="creative">
      <h2>J'essaie d'être un</h2>
      <div class="abso">
        <div id="no01" class="boxes-wrapper">
          <div class="boxes">
            <div class="box crea">
              <p>Creative</p>
            </div>
            <div class="box dev">
              <p>Developpeur</p>
            </div>
            <div class="box crea">
              <p>Creative</p>
            </div>
            <div class="box dev">
              <p>Developpeur</p>
            </div>
          </div>
        </div>
        <div id="no02" class="boxes-wrapper">
          <div class="boxes">
            <div class="box dev">
              <p>Developpeur</p>
            </div>
            <div class="box crea">
              <p>Creative</p>
            </div>
            <div class="box dev">
              <p>Developpeur</p>
            </div>
            <div class="box crea">
              <p>Creative</p>
            </div>
          </div>
        </div>
        <div id="no03" class="boxes-wrapper">
          <div class="boxes">
            <div class="box crea">
              <p>Creative</p>
            </div>
            <div class="box dev">
              <p>Developpeur</p>
            </div>
            <div class="box crea">
              <p>Creative</p>
            </div>
            <div class="box dev">
              <p>Developpeur</p>
            </div>
          </div>
        </div>
      </div>
    </section> 
  </div>
</template>