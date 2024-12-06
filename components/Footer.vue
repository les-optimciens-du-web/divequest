<template>
    <footer  class="fixed flex bottom-0 left-0 right-0 px-[50px] items-center justify-between z-50 h-16">
      <NuxtLink :style="{ opacity: opacity }" to="/contact" :class="color">Contact</NuxtLink>
      <NuxtLink :style="{ opacity: opacity }" to="/mentions-legales" :class="color">Mentions légales</NuxtLink>
    </footer> 
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  
  // Variable réactive pour l'opacité
  const opacity = ref(1);
  const color = ref("text-black");
  
  // Fonction pour gérer le défilement et calculer l'opacité
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
  
    // Calcul du pourcentage de défilement
    const scrollPercentage = scrollPosition / maxScroll;
  
    // Si l'utilisateur a fait défiler au moins 10% de la page, l'opacité devient 0
    if (scrollPercentage < 0.05) {
      opacity.value = 1; // Les boutons disparaissent complètement après 10% de défilement
      color.value = "text-black";
    } else if (scrollPercentage < 0.1){
      opacity.value = 1 - 20 * (scrollPercentage-0.05); // Opacité complète si le défilement est inférieur à 10%
      color.value = "text-black";
    } else if (scrollPercentage > 0.95 ) {
        opacity.value = 1;
        color.value = "text-white";
    }
        else if (scrollPercentage > 0.9){
        opacity.value = 
        1 - 20 * (0.95-scrollPercentage); // Opacité complète si le défilement est inférieur à 10%
        color.value = "text-white";
        } else {
        opacity.value = 0; // Les boutons disparaissent complètement après 10% de défilement
    }
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
  /* Style additionnel pour le footer si nécessaire */
  footer {
    transition: opacity 0.3s ease;
  }
  </style>
  