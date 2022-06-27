<script setup>
    import {ref, onMounted} from "vue";
    import GameFinder from "./GameFinder.vue"
    import GamePlayer from "./GamePlayer.vue";

    import {useTimer, useTick} from "./timer";
    import {getStore, saveStore, loadStore } from "./store";
    import { advanceClock } from "./time";
    

    const clicks = ref(0)
    const store = getStore();

    function doClick() {
        clicks.value++;
    }

    useTimer(5_000, () => {
        saveStore();
    })

    useTick((deltaMs) => {
        advanceClock(deltaMs);
    })

    onMounted(() => {
        loadStore();
    })
</script>

<style>
    body {
        background-color: #111;
        color: white;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    }
</style>

<template>
  <div>
    <h1>
      Incremental Incremental
    </h1>
    <GameFinder />
    <GamePlayer />
  </div>
</template>