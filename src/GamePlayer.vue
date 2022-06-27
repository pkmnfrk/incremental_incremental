<script setup>
    import {ref} from "vue";
    import GameUpgrades from "./GameUpgrades";
    import ProgressBar from "./ProgressBar.vue";

    import { getStore } from "./store";
    import { doManualClick, getIpGain } from "./incremental";
    import { formatNumber } from "./format";

    const store = getStore();

</script>

<template>
    <template v-if="store">
        <h2>{{store.incremental.name}}</h2>
        <p>Clicks: {{formatNumber(Math.floor(store.incremental.clicks))}} / {{formatNumber(store.incremental.maxClicks)}}</p>
        <ProgressBar v-if="store.incremental.clicks < store.incremental.maxClicks" :value="store.incremental.clicks / store.incremental.maxClicks * 100"/>
        <p v-else><button class="complete">Complete Game for {{getIpGain(store.incremental)}} IP</button></p>
        <p><button class="clicker" @click="() => doManualClick()">Click</button></p>
        <GameUpgrades />
    </template>
</template>

<style>
    .clicker {
        width: 300px;
        height: 100px;
        font-size: 32px;
    }
    .complete {
        width: 300px;
        height: 25px;
        font-size: 18px;
        background-color: green;
        color: white;
        border: 1px solid white;
        cursor: pointer;
    }
    .complete:hover {
        /* color: red; */
        background-color: limegreen;
    }
</style>