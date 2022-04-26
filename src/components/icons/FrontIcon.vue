<template>
    <svg width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M48.5 26.7102V16.5852C48.5 15.9884 48.2629 15.4161 47.841 14.9942C47.419 14.5722 46.8467 14.3352 46.25 14.3352H27.125L21.5 7.58516H8C7.40326 7.58516 6.83097 7.82221 6.40901 8.24417C5.98705 8.66613 5.75 9.23842 5.75 9.83516V45.8352C5.75 46.4319 5.98705 47.0042 6.40901 47.4262C6.83097 47.8481 7.40326 48.0852 8 48.0852H26.7659C26.7659 48.0852 24.9276 36.2067 30.6355 30.4988C36.3434 24.7908 48.5 26.7102 48.5 26.7102Z" :fill="theme" :stroke="theme" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M38.6719 36.1403L33.0469 41.7653L38.6719 47.3903" :stroke="theme" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M46.374 47.3904L51.999 41.7654L46.374 36.1404" :stroke="theme" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
</template>

<script setup>
  const props = defineProps({
    theme: String
    })
</script>