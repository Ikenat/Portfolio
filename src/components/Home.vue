<script setup>
import ScrollIcon from './icons/scrollIcon.vue'
import PlayIcon from './icons/PlayArrow.vue'
import { reactive } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'


function gerUrl(param) {
  return './src/assets/img/' + param;
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
    <section class="herobanner">
      <div>
        <h2 class="light-font">Portfolio</h2>
        <p class="light-font big">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Luctus tortor non egestas vivamus nulla aliquam. Eu lectus nibh sollicitudin semper. </p>
        <button class="light-font play3d">
          <PlayIcon />
          3D portfolio
        </button>
      </div>
      <a href="#About" class="scrollMore">
        <ScrollIcon />
      </a>
    </section>
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
            <li v-for="(image, index) in img" :key="index">
              <button>
                {{ index + 1 }}
              </button>
            </li>
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
</template>