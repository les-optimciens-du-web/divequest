<template>
  <!-- Div bleue fixe en haut -->
  <div class="fixed top-0 bottom-0 left-0 right-0 bg-blue-500 z-10"></div>

  <!-- Div fixe en bas de la page avec opacité dynamique -->
  <div :style="{ opacity: opacity }" class="fixed top-0 bottom-0 left-0 right-0 bg-black z-20">
    <h1>Scroll down to see the magic</h1>
    {{ opacity }}
  </div>

  <!-- Image qui doit être visible au centre de la page -->
  <div class="w-1/2 h-full z-30 relative">
    <img src="/public/image-dessus-mer.svg" class="w-full h-full object-cover aspect-video" />
  </div>

  <!-- Contenu pour tester le défilement -->
  <div style="height: 400vh;"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// Variable réactive pour l'opacité
const opacity = ref(0);

// Fonction pour gérer le défilement et calculer l'opacité
const handleScroll = () => {
  const scrollPosition = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  opacity.value = Math.max(0, (scrollPosition / maxScroll) * 0.5);
};

// Attacher l'écouteur d'événements au moment du montage
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

// Nettoyer l'écouteur lors du démontage
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
h1 {
  text-align: center;
  color: darkblue;
}
</style>
