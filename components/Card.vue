<template>
    <div class="bg-blue-800 w-1/2 p-10 rounded-lg" v-if="organe.id != -1">
        <h1 class="text-white text-4xl">{{ organe.nom }}</h1>
        <p class="text-white">{{ organe.texte }}</p>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    organe: { id: number; nom: string; texte: string; idsvg: string };
}>();
</script>
