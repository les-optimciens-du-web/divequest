<script setup lang="ts"></script>

<template>
    <header
        class="fixed top-0 left-0 right-0 h-16 flex items-center justify-center z-50"
    >
        <NuxtLink to="/" v-if="$route.path != '/'"> Dive Quest </NuxtLink>
        <a href="#" v-else> Dive Quest </a>

    </header>
</template>

<style>
/* @import "assets/header-footer.css"; */
</style>
