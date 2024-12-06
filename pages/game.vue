<template>
    <div style="height: 2000vh"></div>
    <div
        class="fixed top-8 left-0 right-0 h-16 flex items-center justify-center"
    >
        <p class="text-center text-xl font-bold">Score ={{ profondeur }}</p>
    </div>
    <!-- Jauge fixée en haut à droite -->
    <div class="gauge-container">
        <!-- Jauge -->
        <div class="gauge-bar" :style="{ width: o2 / 2 + '%' }"></div>
        <span class="gauge-label">O2</span>
    </div>
    <h1>
        <p>Compteur: {{ battement }}</p>
        <p>Compteur2: {{ o2 }}</p>
        <div class="button-container">
            <button
                v-if="!respi && alive"
                @click="incrementbattement"
                id="button"
                class="button-game"
            >
                Le coeur
            </button>
            <button
                v-if="respi && alive"
                class="button-game"
                @mousedown="startBreathing"
                @mouseup="stopBreathing"
                @mouseleave="stopBreathing"
            >
                Maintenir pour augmenter le compteur
            </button>
        </div>
    </h1>
    <div v-if="!alive" class="game-over-container">
        <p v-if="die_o2">Vous êtes mort par manque d'O2</p>
        <p v-if="die_o2_pres">
            Vous êtes mort car vous aviez trop de O2 pour le niveau de
            pression, cela vous a rendu fou.
        </p>
        <p v-if="die_card">
            Vous devez faire attention à vos battements cardiaques, il faut en
            faire assez, mais pas trop.
        </p>
        <button @click="RefreshGame" class="button-game">Restart</button>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";

// Variables réactives pour gérer les pressions, le temps et la vitesse de défilement
const battement = ref(0);
const startTime = ref(Date.now());
const scrollSpeed = ref(0);
const respi = ref(true);
const alive = ref(true);
const o2 = ref(0);
const maxo2 = ref(200);
const profondeur = ref(0);
const route = useRoute(); // Utilisation de useRoute pour accéder aux informations de la route

// Les différentes types de morts
const die_o2 = ref(false);
const die_o2_pres = ref(false);
const die_card = ref(false);

// Intervalle de mise à jour
const intervalId = ref(null); // Changement ici, intervalId est maintenant un ref.

const isalive = () => {
    profondeur.value = window.scrollY / 100;
    console.log(profondeur.value);
    if (o2.value == 0) {
        die_o2.value = true;
        alive.value = false;
    }
    if (battement.value > 8) {
        alive.value = false;
        die_card.value = true;
    }
    if (profondeur.value > 20 && o2.value / 2 > profondeur.value - 20) {
        die_o2_pres.value = true;
        alive.value = false;
    }
};

const RefreshGame = () => {
    battement.value = 0;
    startTime.value = Date.now();
    scrollSpeed.value = 0;
    respi.value = true;
    alive.value = true;
    o2.value = 0;
    die_o2.value = false;
    die_o2_pres.value = false;
    die_card.value = false;
    window.scrollTo(0, 0);

    // Arrêter l'intervalle précédent s'il existe
    if (intervalId.value) {
        clearInterval(intervalId.value);
        intervalId.value = null; // Réinitialiser intervalId après l'avoir nettoyé
    }

    // Relancer les intervalles si la route est "/game"
    if (route.path == "/game" && alive.value) {
        intervalId.value = setInterval(updatePressRate, 100);
        setInterval(scrollPage, 10);
    }
};

const startBreathing = () => {
    if (respi.value) {
        intervalId.value = setInterval(() => {
            if (o2.value < maxo2.value) {
                o2.value++;
            }
        }, 50);
    }
};

const stopBreathing = () => {
    if (intervalId.value != null) {
        respi.value = false;
        console.log(respi.value);
        clearInterval(intervalId.value);
        intervalId.value = null;
    }
};

// Méthode pour incrémenter le compteur de pressions
const incrementbattement = () => {
    battement.value++;
};

// Méthode pour calculer les pressions par seconde et ajuster la vitesse
const updatePressRate = () => {
    if (alive.value && !respi.value) {
        const currentTime = Date.now();
        const elapsedTime = (currentTime - startTime.value) / 1000; // Temps écoulé en secondes

        if (elapsedTime >= 1) {
            // Calcul des pressions par seconde
            const pressRate = Math.round(battement.value / elapsedTime);
            console.log(`Pressions par seconde : ${pressRate.toFixed(2)}`);

            // Ajustement de la vitesse de défilement
            scrollSpeed.value = pressRate * 5 + 1;
            o2.value = Math.max(
                0,
                o2.value -
                    Math.round(
                        ((scrollSpeed.value - 1) * (scrollSpeed.value - 1)) /
                            10,
                    ),
            );
            if (!respi.value) {
                isalive();
            }
            // Réinitialisation des compteurs
            battement.value = 0;
            startTime.value = Date.now();
        }
    }
};

// Fonction pour faire défiler la page
const scrollPage = () => {
    window.scrollBy(0, scrollSpeed.value);
};

// Initialisation des intervalles
onMounted(() => {
    // Vérifie si la route est "/game" et initialise les intervalles
    if (route.path == "/game" && alive.value) {
        intervalId.value = setInterval(updatePressRate, 100);
        setInterval(scrollPage, 10);
    }
});

// Surveiller la route et réinitialiser les intervalles en cas de changement de route
watch(
    () => route.path,
    (newPath) => {
        if (newPath !== "/game") {
            if (intervalId.value) {
                clearInterval(intervalId.value);
                intervalId.value = null;
            }
        }
    },
);
</script>

<style scoped>
/* Conteneur de la jauge fixée */
.gauge-container {
    position: fixed; /* Position fixe */
    top: 10px; /* Distance par rapport au haut de l'écran */
    right: 10px; /* Distance par rapport au bord droit */
    width: 200px; /* Largeur fixe de la jauge */
    height: 20px;
    background-color: #e0e0e0;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    z-index: 1000; /* Assurez-vous qu'elle reste au-dessus des autres éléments */
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
}

/* Barre de remplissage */
.gauge-bar {
    height: 100%;
    background-color: #4caf50;
    transition: width 0.3s ease; /* Animation fluide */
    position: absolute;
    left: 0;
    top: 0;
}

/* Texte affichant le pourcentage */
.gauge-label {
    font-size: 12px;
    color: #000;
    z-index: 2;
    position: relative;
}

.button-container {
    display: flex; /* Utilise Flexbox pour le conteneur */
    justify-content: center; /* Centre les boutons horizontalement */
    align-items: flex-end; /* Aligne les boutons en bas */
    gap: 40px; /* Ajoute de l'espace entre les boutons */
    position: fixed; /* Fixe le conteneur pour qu'il soit en bas */
    bottom: 40px; /* Espace de 20px depuis le bas de la page */
    width: 100%; /* Prend toute la largeur de la page */
}

.game-over-container {
    display: flex; /* Utilise Flexbox pour le conteneur */
    flex-direction: column;
    justify-content: center; /* Centre les boutons horizontalement */
    align-items: center; /* Aligne les boutons en bas */
    gap: 40px; /* Ajoute de l'espace entre les boutons */
    position: fixed; /* Fixe le conteneur pour qu'il soit en bas */
    top: 0;
    left: 0;
    height: 100%;
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
