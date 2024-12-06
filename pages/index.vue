<template>
    <!-- Div bleue fixe en haut -->
    <div class="fixed top-0 bottom-0 left-0 right-0 bg-blue-500 z-10"></div>

    <!-- Div fixe en bas de la page avec opacité dynamique -->
    <div
        :style="{ opacity: opacity }"
        class="fixed top-0 bottom-0 left-0 right-0 bg-black z-30"
    ></div>

    <!-- Image qui doit être visible au centre de la page -->
    <div class="h-[50vh] w-full z-40 relative overflow-hidden">
        <img
            src="/public/image-dessus-mer.svg"
            class="w-full h-full object-cover object-top"
        />
    </div>

    <div class="fixed flex justify-center items-center top-0 bottom-0 left-0 right-0  z-20">
      <img 
      :style="{ transform: `rotate(${rotate})` }"
      src="/public/perso-sous-mer-final(ptetre).svg" class="w-1/2 h-auto">
    </div>

    <!-- Contenu pour tester le défilement -->
    <div style="height: 400vh"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

// Variable réactive pour l'opacité
const opacity = ref(0);

// Fonction pour gérer le défilement et calculer l'opacité
const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    opacity.value = Math.max(0, (scrollPosition / maxScroll) * 0.5);
};

const rotate = ref("-10deg");
const handleRotate = () => {
    const scrollPosition = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollPercentage = scrollPosition / maxScroll;
    const tmp = `${-10 + scrollPercentage * (-360)*4}deg`;
    if (scrollPercentage >= 0.25/4) {
        rotate.value = "-100deg";
    } else {
        rotate.value = tmp;
    }
};


// Attacher l'écouteur d'événements au moment du montage
onMounted(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleRotate);
});

// Nettoyer l'écouteur lors du démontage
onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("scroll", handleRotate);
});
</script>

<style scoped>
h1 {
    text-align: center;
    color: darkblue;
}
</style>
