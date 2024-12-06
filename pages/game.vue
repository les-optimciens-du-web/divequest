<template>
    <div style="height: 4000vh"></div>
    <h1>
        <p>Compteur: {{ battement }}</p>
        <p>Compteur2: {{ o2 }}</p>
        <div class="button-container">
            <button
                v-if="respi != 0"
                @click="incrementbattement"
                id="button"
                class="button-game"
            >
                Le coeur
            </button>
            <button
                v-if="respi == 0"
                class="button-game"
                @mousedown="startBreathing"
                @mouseup="stopBreathing"
                @mouseleave="stopBreathing"
            >
                Maintiens pour augmenter le compteur
            </button>
        </div>
    </h1>
</template>

<script setup>
import { ref, onMounted } from "vue";

// Variables réactives pour gérer les pressions, le temps et la vitesse de défilement
const battement = ref(0);
const startTime = ref(Date.now());
const scrollSpeed = ref(0);
const respi = ref(0);
const o2 = ref(0);

const startBreathing = () => {
    if (respi.value == 0) {
        intervalId = setInterval(() => {
            o2.value++;
        }, 100);
    }
};

const stopBreathing = () => {
    console.log("test");
    respi.value == 1;
};
// Méthode pour incrémenter le compteur de pressions
const incrementbattement = () => {
    battement.value++;
};

// Méthode pour calculer les pressions par seconde et ajuster la vitesse
const updatePressRate = () => {
    const currentTime = Date.now();
    const elapsedTime = (currentTime - startTime.value) / 1000; // Temps écoulé en secondes

    if (elapsedTime >= 1) {
        // Calcul des pressions par seconde
        const pressRate = battement.value / elapsedTime;
        console.log(`Pressions par seconde : ${pressRate.toFixed(2)}`);

        // Ajustement de la vitesse de défilement
        scrollSpeed.value = pressRate * 5;

        // Réinitialisation des compteurs
        battement.value = 0;
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
.button-container {
    display: flex; /* Utilise Flexbox pour le conteneur */
    justify-content: center; /* Centre les boutons horizontalement */
    align-items: flex-end; /* Aligne les boutons en bas */
    gap: 40px; /* Ajoute de l'espace entre les boutons */
    position: fixed; /* Fixe le conteneur pour qu'il soit en bas */
    bottom: 40px; /* Espace de 20px depuis le bas de la page */
    width: 100%; /* Prend toute la largeur de la page */
}

.button-game {
    background-color: #4caf50;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 16px;
    width: 100%;
    width: 150px; /* Fixe la largeur du bouton */
    height: 150px;
}
</style>
