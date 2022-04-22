<script setup>
import { reactive } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import { onMounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger';


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


onMounted(() => {
  const links = document.querySelectorAll(".box");
let marquee = document.querySelector('.boxes')

  console.log(marquee);

  // assign the timeline returned from the helper function to 'loop'  
  let loop = horizontalLoop(links, {
    repeat: -1,
    speed: 1 + 0.5,
    reversed: false,
    paddingRight: parseFloat(gsap.getProperty(links[0], "marginRight", "px"))
});

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
    if (config.draggable && typeof Draggable === "function") {
        let proxy = document.createElement("div"),
            wrap = gsap.utils.wrap(0, 1),
            ratio,
            startProgress,
            draggable,
            dragSnap,
            roundFactor,
            align = () =>
                tl.progress(
                    wrap(
                        startProgress + (draggable.startX - draggable.x) * ratio
                    )
                ),
            syncIndex = () => tl.updateIndex();
        typeof InertiaPlugin === "undefined" &&
            console.warn(
                "InertiaPlugin required for momentum-based scrolling and snapping. https://greensock.com/club"
            );
        draggable = Draggable.create(proxy, {
            trigger: items[0].parentNode,
            type: "x",
            onPress() {
                startProgress = tl.progress();
                tl.progress(0);
                populateWidths();
                totalWidth = getTotalWidth();
                ratio = 1 / totalWidth;
                dragSnap = totalWidth / items.length;
                roundFactor = Math.pow(
                    10,
                    ((dragSnap + "").split(".")[1] || "").length
                );
                tl.progress(startProgress);
            },
            onDrag: align,
            onThrowUpdate: align,
            inertia: true,
            snap: (value) => {
                let n =
                    Math.round(parseFloat(value) / dragSnap) *
                    dragSnap *
                    roundFactor;
                return (n - (n % 1)) / roundFactor;
            },
            onRelease: syncIndex,
            onThrowComplete: () => gsap.set(proxy, { x: 0 }) && syncIndex()
        })[0];
    }

    return tl;
}
  
})

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
    <section id="crea" class="creative">
      <h2>J'essaie d'être un</h2>
      <div class="relative">
        <div class="abso">
        <div id="no01" class="boxes-wrapper">
          <div class="boxes">
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
          </div>
        </div>
        <div id="no03" class="boxes-wrapper">
          <div class="boxes">
              <span class="box crea">Creative</span>
              <span class="box dev">Developpeur</span>
              <span class="box crea">Creative</span>
              <span class="box dev">Developpeur</span>
          </div>
        </div>
      </div>
      </div>
    </section> 
    <section id="reste">

    </section>
  </div>
</template>

<style>

.home {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: calc(100vh - min(150px, 15vh) - 30px) repeat(3, 100vh);
  gap: 30px;
  grid-template-areas: ". hero hero hero hero hero hero ."
                       ". about about about about about about ."
                       "fullpage fullpage fullpage fullpage fullpage fullpage fullpage fullpage"
                       ". reste reste reste reste reste reste ."
  
  ;
}
 #hero {
   grid-area: hero;
 }

#about{
  grid-area: about;
}

#crea {
  grid-area: fullpage;
}

#reste {
  grid-area: reste;
}


</style>