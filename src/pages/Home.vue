<script setup>
import { useTitle } from '@vueuse/core'
import { reactive } from '@vue/reactivity';
import { onMounted, ref } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FrontIcon from '../components/icons/FrontIcon.vue';
import BackIcon from '../components/icons/BackIcon.vue';
import DataIcon from '../components/icons/DataIcon.vue';
import ServiceIcon from '../components/icons/ServiceIcon.vue';
import Title from '../components/Title.vue';
import Email from "../components/email.vue"
import Hero from '../components/hero.vue'
import Blob from '../components/blob.vue';

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
]);

let CurrentImg = ref(1);
const alt = reactive({
  1:'un',
  2:'deux',
  3:'trois',
  4:'quatre'
});

let themeIcon = reactive({
  light: "#FBF8F1",
  dark: "#232025"
})

let currentStack = ref(0);
let Stacks = reactive([
  {
    name: 'Front',
    stack: [
      {
        name: 'Vuejs',
        icon:'Vuejs.png',
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor consectetur leo purus adipiscing."
      },
      {
        name: 'Nuxtjs',
        icon:'Nuxt.svg',
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor consectetur leo purus adipiscing."
      },
      {
        name: 'typescript',
        icon:'Typescript.png',
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor consectetur leo purus adipiscing.",
        learning: true
      }
    ]
  },
  {
    name: 'Back',
    stack: [
      {
        name: 'php',
        icon:'php.png',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor consectetur leo purus adipiscing.'
      },
      {
        name: 'nodeJs',
        icon:'nodeJs.png',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor consectetur leo purus adipiscing.'
      },
      {
        name: 'Laravel',
        icon:'Laravel.png',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor consectetur leo purus adipiscing.',
        learning: true
      },
    ]
  },
  {
    name: 'Data',
    stack: [
      {
        name: 'MySQL',
        icon:'MySQL.png',
        text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor consectetur leo purus adipiscing.'
      },
      {
        name: 'MongoDB',
        icon:'MongoDB.png',
        text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor consectetur leo purus adipiscing.',
        learning: true
      },
    ]
  },
  {
    name: 'Services',
    stack: [
      {
        name: 'Gsap',
        icon:'Gsap.png',
      },
      {
        name: 'Git',
        icon:'Git.png',
      },
      {
        name: 'GraphQl',
        icon:'GraphQl.png',
        text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor consectetur leo purus adipiscing.',
        learning:true
      },
      {
        name: 'Jest',
        icon:'Jest.png',
      },
      {
        name: 'ThreeJs',
        icon:'ThreeJs.png',
        text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dolor consectetur leo purus adipiscing.',
      },
      {
        name: 'Stripe',
        icon:'Stripe.png',
        learning:true
      },
      {
        name: 'Axios',
        icon:'Axios.svg',
      },
    ]
  }
])

let Projects = reactive([
  {
    name:"Portfolio",
    text: "Lorem ipsum dolor sit amet, consectetur ",
    thumbnail: "main.png",
  },
  {
    name:"JdGG",
    text: "Lorem ipsum dolor sit amet, consectetur ",
    thumbnail: "main.png",
  },
  {
    name:"JdGG",
    text: "Lorem ipsum dolor sit amet, consectetur ",
    thumbnail: "main.png",
  },
  {
    name:"Portfolio",
    text: "Lorem ipsum dolor sit amet, consectetur ",
    thumbnail: "main.png",
  },
])
//get url of img
function gerUrl(param) {
  return './src/assets/img/' + param;
}

//get pagination previously active
const getPaginationActive = (nextImg = 0) => {
  let pagination = document.querySelector('.pagination_number');
  let indexPrevious = 0
  pagination.childNodes.forEach((button, index) => {
    if ( (index !== 0 && index !== 5) && Object.values(button.childNodes[0].classList).includes('active')) {
      indexPrevious = index;
    }
  })
  if(nextImg !== 0) {
    return pagination.childNodes[nextImg];
  } else {
    return pagination.childNodes[indexPrevious];
  }
}

//change wich button is active
const changePaginationActive = (toActive, toRemove) => {
      toRemove.childNodes[0].classList.remove('active');
      toRemove.childNodes[0].classList.remove('light_font');

      toActive.classList.add('active');
      toActive.classList.add('light_font');
}

const Next = () => {
  let nextImgKey = CurrentImg.value < 4 ? (CurrentImg.value + 1) : 1;

  changePaginationActive(getPaginationActive(nextImgKey).childNodes[0], getPaginationActive())
  return nextImgKey;
}

const Prev = () => {
  let nextImgKey = CurrentImg.value > 1 ? (CurrentImg.value - 1) : 4;

  changePaginationActive(getPaginationActive(nextImgKey).childNodes[0], getPaginationActive())
  return nextImgKey;
}

//get number img we want and remove class from prev pagination
const Pagination = (index, event) => {
  changePaginationActive(event.target, getPaginationActive());


  let nextImgKey = Object.keys(alt).find((element, i) => {
    return i === index;
  });

  return nextImgKey;
}

const ChangeActive = (event, index = 10) => {
  let nextImgKey = CurrentImg.value;

  //get action to change img
  switch(event.target.classList[0]) {
    case 'Pagination': 
      nextImgKey = Pagination(index, event);
      break;
    case 'next':
      nextImgKey = Next();
      break;
    case 'prev': 
      nextImgKey = Prev();
      break;
    default:
      nextImgKey = CurrentImg.value;
      break;
  }

  CurrentImg.value = nextImgKey;

  //remove active from previous img
  let images = document.querySelectorAll('.img');
  images.forEach((img) => {
    if(img.classList.value.includes('active')) {
      img.classList.toggle('active')
    }
  })


  let nextImg = '#' + alt[nextImgKey];

  //animate new img et set active class
  gsap.to(nextImg, {x: 100, duration: 0.5}).then(gsap.to(nextImg, {x: 0, duration:0.5, delay:0.5}).then(document.querySelector(nextImg).classList.toggle("active")))
}

const ChangeStack = async (newIndex) => {
  currentStack.value = await newIndex;
  AnimateStack();
}

const  AnimateStack = () => {
  
}

const ScrollAnimation = () => {
  gsap.registerPlugin(ScrollTrigger);
  gsap.to('.text p', {
    backgroundPositionX: "0%",
    stagger: 1,
    scrollTrigger: {
      trigger: ".text p",
      scrub: 1,
      start: "top center",
      end: "bottom top",
    }
  })
}

onMounted(() => {

  ScrollAnimation();

  let marquee = document.querySelector('.boxes')


  gsap.utils.toArray('.boxes').forEach((line, i) => {
    const words = line.querySelectorAll(".box"),
          tl = horizontalLoop(words, {
              repeat: -1,
              speed:  1.3,
              reversed: i === 1 ? true : false,
              paddingRight: parseFloat(gsap.getProperty(words[0], "marginRight", "px"))
});
  })

  // assign the timeline returned from the helper function to 'loop'  
 

function horizontalLoop(items, config) {
    items = gsap.utils.toArray(items);
    config = config || {};
    let tl = gsap.timeline({
            repeat: config.repeat,
            paused: config.paused,
            defaults: { ease: "none" },
            onReverseComplete: () =>
                tl.totalTime(tl.rawTime() + tl.duration() * 100)
        }),
        length = items.length,
        startX = items[0].offsetLeft,
        times = [],
        widths = [],
        xPercents = [],
        curIndex = 0,
        pixelsPerSecond = (config.speed || 1) * 100,
        snap =
            config.snap === false
                ? (v) => v
                : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
        populateWidths = () =>
            items.forEach((el, i) => {
                widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
                xPercents[i] = snap(
                    (parseFloat(gsap.getProperty(el, "x", "px")) / widths[i]) *
                        100 +
                        gsap.getProperty(el, "xPercent")
                );
            }),
        getTotalWidth = () =>
            items[length - 1].offsetLeft +
            (xPercents[length - 1] / 100) * widths[length - 1] -
            startX +
            items[length - 1].offsetWidth *
                gsap.getProperty(items[length - 1], "scaleX") +
            (parseFloat(config.paddingRight) || 0),
        totalWidth,
        curX,
        distanceToStart,
        distanceToLoop,
        item,
        i;
    populateWidths();
    gsap.set(items, {
        // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
        xPercent: (i) => xPercents[i]
    });
    gsap.set(items, { x: 0 });
    totalWidth = getTotalWidth();
    for (i = 0; i < length; i++) {
        item = items[i];
        curX = (xPercents[i] / 100) * widths[i];
        distanceToStart = item.offsetLeft + curX - startX;
        distanceToLoop =
            distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
        tl.to(
            item,
            {
                xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
                duration: distanceToLoop / pixelsPerSecond
            },
            0
        )
            .fromTo(
                item,
                {
                    xPercent: snap(
                        ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
                    )
                },
                {
                    xPercent: xPercents[i],
                    duration:
                        (curX - distanceToLoop + totalWidth - curX) /
                        pixelsPerSecond,
                    immediateRender: false
                },
                distanceToLoop / pixelsPerSecond
            )
            .add("label" + i, distanceToStart / pixelsPerSecond);
        times[i] = distanceToStart / pixelsPerSecond;
    }
    function toIndex(index, vars) {
        vars = vars || {};
        Math.abs(index - curIndex) > length / 2 &&
            (index += index > curIndex ? -length : length); // always go in the shortest direction
        let newIndex = gsap.utils.wrap(0, length, index),
            time = times[newIndex];
        if (time > tl.time() !== index > curIndex) {
            // if we're wrapping the timeline's playhead, make the proper adjustments
            vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
            time += tl.duration() * (index > curIndex ? 1 : -1);
        }
        curIndex = newIndex;
        vars.overwrite = true;
        return tl.tweenTo(time, vars);
    }
    tl.next = (vars) => toIndex(curIndex + 1, vars);
    tl.previous = (vars) => toIndex(curIndex - 1, vars);
    tl.current = () => curIndex;
    tl.toIndex = (index, vars) => toIndex(index, vars);
    tl.updateIndex = () =>
        (curIndex = Math.round(tl.progress() * (items.length - 1)));
    tl.times = times;
    tl.progress(1, true).progress(0, true); // pre-render for performance
    if (config.reversed) {
        tl.vars.onReverseComplete();
        tl.reverse();
    }


    return tl;
}

})

</script>

<template>
  <div class="home">
    <Hero class="panel" />
    <section id="about">
      <div class="wrapper left">
        <Title title="About" />
        <p class="light-weight">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id libero posuere tincidunt ac. Habitant vivamus blandit tellus sed. Egestas erat egestas dictum nisl. Quisque dignissim donec ipsum sed. Ullamcorper a ac laoreet aenean ac elit.
          Augue cursus maecenas vestibulum sed ipsum,
        </p>
      </div>
      <div class="wrapper right">
        <div class="relative-img">
          <div v-for="(image, index) in img" :key="index" :data-index="index+1" class="img" :id="image.position" :class="{active: index == 0}">
            <img :src="gerUrl(image.url)" :alt="image.alt">
          </div>
        </div>
        <div class="pagination">
          <ul>
            <li>
              <button class="prev" @click.prevent.self="ChangeActive($event)">
                <svg width="12" height="19" viewBox="0 0 12 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.5286 16.8334L4.65857 9.9483L11.5286 3.06326L9.41357 0.948242L0.413574 9.9483L9.41357 18.9484L11.5286 16.8334Z" fill="#524A4E"/>
                </svg>
              </button>
            </li>
            <div class="pagination_number">
              <li v-for="(image, index) in img" :key="index">
              <button class="Pagination" :class="{active: index==0, light_font: index==0}" @click="ChangeActive($event, index)">
                {{ index + 1 }}
              </button>
            </li>
            </div>
            <li>
              <button class="next" @click="ChangeActive($event)">
                <svg width="12" height="19" viewBox="0 0 12 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.471436 3.06313L7.34143 9.94818L0.471436 16.8332L2.58643 18.9482L11.5864 9.94818L2.58643 0.94812L0.471436 3.06313Z" fill="#524A4E"/>
                </svg>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <section id="crea" class="creative">
      <Title title="J'essaie d'être un" />
      <div class="relative">
        <div class="abso">
        <div id="no01" class="boxes-wrapper">
          <div class="boxes">
              <span class="box crea">Creative</span>
              <span class="box dev">Developpeur</span>
              <span class="box crea">Creative</span>
              <span class="box dev">Developpeur</span>
              <span class="box crea">Creative</span>
              <span class="box dev">Developpeur</span>
          </div>
        </div>
        <div id="no02" class="boxes-wrapper">
          <div class="boxes">
              <span class="box dev">Developpeur</span>
              <span class="box crea">Creative</span>
              <span class="box dev">Developpeur</span>
              <span class="box crea">Creative</span>
              <span class="box dev">Developpeur</span>
              <span class="box crea">Creative</span>
          </div>
        </div>
        <div id="no03" class="boxes-wrapper">
          <div class="boxes">
              <span class="box crea">Creative</span>
              <span class="box dev">Developpeur</span>
              <span class="box crea">Creative</span>
              <span class="box dev">Developpeur</span>
              <span class="box crea">Creative</span>
              <span class="box dev">Developpeur</span>
          </div>
        </div>
      </div>
      </div>
    </section> 
    <section id="stack">
      <Title title="J'utilise" />
      <div class="stack__wrapper">
        <div class="wrapper stackNav__wrapper">
          <div class="stackNav Stackicon" @click="ChangeStack(0)" >
            <FrontIcon :theme="themeIcon.light" />
          </div>
          <div class="stackNav Stackicon active" @click="ChangeStack(1)" >
            <BackIcon :theme="themeIcon.dark" />
          </div>
          <div class="stackNav Stackicon " @click="ChangeStack(2)" >
            <DataIcon :theme="themeIcon.light" />
          </div>
          <div class="stackNav Stackicon" @click="ChangeStack(3)" >
            <ServiceIcon :theme="themeIcon.light" />
          </div>
        </div>
        <div class="wrapper stack__content" :class="Stacks[currentStack].name"> 
          <div class="Learning">
            <p class="light-weight">Learning</p>
          </div>
          <div v-for="(stack, index) in Stacks[currentStack].stack" :key="index" class="stack Stack-list-item" :class="stack.name">
              <div class="color" :class="{'dark': index % 3 == 0, 'mid': index % 3 == 1, 'light': index % 3 == 2}">
                <div class="stack__header">
                  <div class="stack__img-wrapper">
                    <img :src="'./src/assets/img/stack/' + stack.icon" :alt="stack.name + ' logo'">
                  </div>
                  <div class="stack__name">
                    <p>{{stack.name}}</p>
                  </div>
                </div>
                <div class="stack__text" v-if="stack.text !== null && stack.text !== undefined">
                  <p>{{stack.text}}</p>
                </div>
              </div>
          </div>
        </div>
      </div>
    </section>
    <section id="about2"> 
      <div class="container">   
        <div class="text">
          <div class="canvasBlob top">
            <Blob id="BlobTop" number="1"/>
          </div>
          <p>Actuellement</p>
          <p>A la recherche d'une</p>
          <p class="main">Alternance</p>
          <p>3 Semaine en entreprise</p>
          <p class="main">1 semaine de cours</p>
          <div class="canvasBlob bottom">
            <Blob id="BlobBottom" number="2"/>
          </div>
        </div>
        
      </div>
    </section>
    <section id="Project">
      <div class="Project__header">
        <div class="Project__header-content">
          <Title title="Project" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id libero posuere tincidunt ac. Habitant vivamus blandit tellus sed. Egestas erat egestas dictum nisl. Quisque dignissim donec ipsum sed. Ullamcorper a ac laoreet aenean ac elit.
Augue cursus maecenas vestibulum sed ipsum, habitant nec. Consectetur dolor natoque ultricies vestibulum rhoncus. Aliquet diam augue duis faucibus. Pretium faucibus faucibus leo commodo sit ut tellus. Tincidunt massa in curabitur fermentum dignissim purus tristique.
Ut sit quis varius massa venenatis eget tincidunt. A tristique metus sit in adipiscing. In justo q ut. varius massa venenatis eget tincidunt. A tristique metus sit in adipiscing. In justo q ut.
          </p>
        </div>
        
        <div class="Model">
          <img src="../assets/img/thorus.png" alt="thorus">
        </div>
      </div>
      <div class="tag">
        <span class="span">Selected Project 
          <svg width="23" height="18" viewBox="0 0 23 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.7177 10.3444H0V8.91376L23 8.80371V10.2343C19.8306 9.88218 18.1579 12.582 17.7177 13.976V17.8276H14.7464V13.7559C15.0105 11.819 16.764 10.7479 17.7177 10.3444Z" fill="#8571C7"/>
              <path d="M17.7177 7.48374H0V8.91437L23 9.02441V7.59379C19.8306 7.94595 18.1579 5.2461 17.7177 3.85216V0.000490189H14.7464V4.07226C15.0105 6.0091 16.764 7.08024 17.7177 7.48374Z" fill="#8571C7"/>
          </svg>
        </span>
      </div>
      <div class="Project__content">
        <div v-for="(project, index) in Projects" :key="index" class="Project-list-item" :class="project.name">
          <a href="#" class="item-img">
            <div class="img-wrapper">
              <img :src="'./src/assets/img/Projects/' + project.name + '/' + project.thumbnail" :alt="project.name">
            </div>
          </a>
          <div class="item-content">
              <p class="item-content__title">{{project.name}}</p>
              <p class="item-content__text">{{project.text}}</p>
              <router-link to="/" class="item-content__link">Voir le projet</router-link>
          </div>
        </div>
      </div>
      <div class="tag">
        <router-link to="/" class="span">All Projects <svg width="23" height="18" viewBox="0 0 23 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.7177 10.3444H0V8.91376L23 8.80371V10.2343C19.8306 9.88218 18.1579 12.582 17.7177 13.976V17.8276H14.7464V13.7559C15.0105 11.819 16.764 10.7479 17.7177 10.3444Z" fill="#8571C7"/>
              <path d="M17.7177 7.48374H0V8.91437L23 9.02441V7.59379C19.8306 7.94595 18.1579 5.2461 17.7177 3.85216V0.000490189H14.7464V4.07226C15.0105 6.0091 16.764 7.08024 17.7177 7.48374Z" fill="#8571C7"/>
          </svg></router-link>
      </div>
    </section>
    <Email />
  </div>
</template>

<style scoped>

    #about2 .text {
      position: relative;
      width: 100%;
    }

    #about2 .text > p {
      z-index: 2;
    }
  .canvasBlob {
    z-index: 1;
    position: absolute;
    width: auto;
    height: auto ;
    background: transparent;
    right: 0;
  }

  .canvasBlob.top {
    right: 0;
    top: 0;
  }

  .canvasBlob.bottom {
    bottom: 0;
    left: 0;
  }
</style>


