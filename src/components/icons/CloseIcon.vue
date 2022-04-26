<template>
    <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M50.475 45L71.25 65.775V71.25H65.775L45 50.475L24.225 71.25H18.75V65.775L39.525 45L18.75 24.225V18.75H24.225L45 39.525L65.775 18.75H71.25V24.225L50.475 45Z" :fill="theme"/>
</svg>

</template>


<script setup>
  const props = defineProps({
    theme: String
    })
</script>
