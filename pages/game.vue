<template>
    <div class="h-20"></div>
    <h1>
        <button @click="incrementPressCount" id="button">Appuyez ici</button>
    </h1>
</template>

<script setup>
import { ref, onMounted } from "vue";

// Variables réactives pour gérer les pressions, le temps et la vitesse de défilement
const pressCount = ref(0);
const startTime = ref(Date.now());
const scrollSpeed = ref(0);

// Méthode pour incrémenter le compteur de pressions
const incrementPressCount = () => {
    pressCount.value++;
};

// Méthode pour calculer les pressions par seconde et ajuster la vitesse
const updatePressRate = () => {
    const currentTime = Date.now();
    const elapsedTime = (currentTime - startTime.value) / 1000; // Temps écoulé en secondes

    if (elapsedTime >= 1) {
        // Calcul des pressions par seconde
        const pressRate = pressCount.value / elapsedTime;
        console.log(`Pressions par seconde : ${pressRate.toFixed(2)}`);

        // Ajustement de la vitesse de défilement
        scrollSpeed.value = pressRate * 5;

        // Réinitialisation des compteurs
        pressCount.value = 0;
        startTime.value = Date.now();
    }
};

// Fonction pour faire défiler la page
const scrollPage = () => {
    window.scrollBy(0, scrollSpeed.value);
};

// Initialisation des intervalles
onMounted(() => {
    // Met à jour le calcul de la pression toutes les 100ms
    setInterval(updatePressRate, 100);

    // Fait défiler la page toutes les 10ms
    setInterval(scrollPage, 10);
});
</script>

<style scoped>
button {
    position: fixed;
    top: 80%; /* Déplace le bouton plus bas (tu peux ajuster cette valeur selon tes besoins) */
    left: 50%;
    transform: translateX(-50%); /* Centre le bouton horizontalement */
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 16px;
}
</style>
