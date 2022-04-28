<template>
    <div class="icon">
      <div class="menu">

      </div>
    </div>

</template>

<script setup>
  const props = defineProps({
    theme: String,
    })
</script>

<style>

.icon {
    background: transparent;
    cursor: pointer;
    display: block;
    height: 90px;
    width: 90px;
}

.icon {
  display: grid;
  place-items: center;
}

.icon .menu::before,
.icon .menu::after {
  content: '';
  display: block;
  position: absolute;
  width: 60px;
}

.icon .menu {
  width: 90px;
}

.icon .menu ,
.icon .menu::before,
.icon .menu::after {
    background: #F0EADB;
    height: 10px;
    transition: background ease .3s, top ease .3s .3s, transform ease .3s;
}

.icon:hover .menu,
.icon:hover .menu::before,
.icon:hover .menu::after {
    background: var(--main-color);
}


.icon .menu::before {
    top: -26px;
    right: 0;
}

.icon .menu::after {
    top: 26px;
}
.nav__wrapper.active .icon .menu::before,
.nav__wrapper.active .icon .menu::after {
  width: 90px;
  background: #232025;
  top: 0;
  transition: top ease .3s, transform ease .3s .3s, background ease .3s;
}

.nav__wrapper.active .icon:hover .menu::before,
.nav__wrapper.active .icon:hover .menu::after {
  background: var(--main-color-hover);
}

.nav__wrapper.active .icon .menu {
  background: transparent
}

.nav__wrapper.active .icon .menu::before {
  transform: rotate(45deg);
}

.nav__wrapper.active .icon .menu::after {
  transform: rotate(-45deg);
}



</style>
