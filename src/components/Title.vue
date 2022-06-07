<template>
    <h3 class="title__header">{{ title }}</h3>
</template>

<script setup>
    const props = defineProps({
    title: String,
    })
</script>

<style scoped>
    h3 {
        margin-bottom: 6rem;
    }
</style>
