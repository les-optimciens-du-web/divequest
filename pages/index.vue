<template>
    <!-- Div bleue fixe en haut -->
    <div class="fixed top-0 bottom-0 left-0 right-0 bg-blue-500 z-10"></div>

    <!-- Div fixe en bas de la page avec opacité dynamique -->
    <div
        :style="{ opacity: opacity }"
        class="fixed top-0 bottom-0 left-0 right-0 bg-black z-40"
    ></div>

    <!-- Image qui doit être visible au centre de la page -->
    <div class="h-[50vh] w-full z-20 relative overflow-hidden">
        <img
            src="/public/image-dessus-mer.svg"
            class="w-full h-full object-cover object-top"
        />
    </div>

    <div
        class="fixed flex justify-center items-center top-0 bottom-0 left-0 right-0 z-30"
    >
        <div :style="{ transform: `rotate(${rotate})` }" class="w-1/2 h-auto">
            <Diver :organes="false" />
        </div>
    </div>
    <div
        class="fixed flex justify-center items-center top-0 bottom-0 left-0 right-1/2 z-40"
    >
        <Card :organe="organeCurrent" />
    </div>
    <div
        v-if="isVertical()"
        class="fixed flex justify-center items-center top-0 bottom-0 left-0 right-0 z-50"
    >
        <div :style="{ transform: `rotate(${rotate})` }" class="w-1/3 h-auto">
            <Diver :organes="true" />
        </div>
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

const isVertical = () => {
    if (window && window.scrollY) {
        const scrollPosition = window.scrollY;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const scrollPercentage = scrollPosition / maxScroll;
        return scrollPercentage >= 0.25 / 4;
    }
    return false;
};

const rotate = ref("-10deg");
const handleRotate = () => {
    const scrollPosition = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollPercentage = scrollPosition / maxScroll;
    const tmpInt = -10 + scrollPercentage * -360 * 4;
    const tmp = `${tmpInt}deg`;
    if (scrollPercentage >= 0.25 / 4) {
        rotate.value = "-100deg";
        const modulo = 40;
        const dec = tmpInt % modulo < 0 ? -(tmpInt % modulo) : tmpInt % modulo;
        // console.log(dec);
        if (dec >= 0 && dec < modulo / 4) {
            rotate.value = `${-100 + (dec % (modulo / 4))}deg`;
            // console.log(`1  ${-100 + dec % 5 + 1}`);
        } else if (dec >= modulo / 4 && dec < modulo / 2) {
            rotate.value = `${-100 + modulo / 4 - (dec % (modulo / 4))}deg`;
            // console.log(`2  ${ -100 + 4 - dec % 5}`);
        } else if (dec >= modulo / 2 && dec < modulo * 0.75) {
            rotate.value = `${-100 - (dec % (modulo / 4))}deg`;
            // console.log(`3  ${ -100 - dec % 5 - 1}`);
        } else if (dec >= modulo * 0.75 && dec < modulo) {
            rotate.value = `${-100 - modulo / 4 + (dec % (modulo / 4))}deg`;
            // console.log(`4  ${ -100 - 5 + dec % 5}`);
        }
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

const organeCurrent = ref({
    id: -1,
    nom: "",
    texte: "",
    idsvg: "",
});
provide("organeCurrent", organeCurrent);
</script>

<style scoped>
h1 {
    text-align: center;
    color: darkblue;
}
</style>
