<script setup>
    import {ref, computed} from "vue";

    import DotDotDot from "./DotDotDot.vue"

    import { formatHumanTime } from "./format";
    import { startBrowse } from "./incremental";
    import { getStore } from "./store";

    const levelLabels = [
        "the web",
        "Steam",
        "Reddit",
    ]

    const canSteam = ref(true);
    const canReddit = ref(true);

    const store = getStore();

    const timeRemaining = computed(() => {
        return formatHumanTime(store.value.browse.timeLeft, 1);
    })

</script>

<template>
    <template v-if="store">
        <p v-if="!store.browse.isBrowsing">
            <button class="finder" @click="() => startBrowse(0)">Search the web for "incremental game"</button>
            <button class="finder" @click="() => startBrowse(1)" v-if="canSteam">Search Steam for "incremental game"</button>
            <button class="finder" @click="() => startBrowse(2)" v-if="canReddit">Browse /r/incremental_games</button>
        </p>
        <p v-else>
            <p>Searching {{levelLabels[store.browse.level]}} for incremental games<DotDotDot /></p>
            <p><span>{{timeRemaining}}</span> remaining...</p>
        </p>
    </template>
</template>

<style>
    .finder {
        font-size: 18px;
    }
</style>