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

<template>
  <div>
    <h1>
      Incremental Incremental
    </h1>
    <GameFinder />
    <GamePlayer />
  </div>
  <footer>This stupid game is &copy; 2022 by Mike Caron. <a href="https://github.com/pkmnfrk/incremental_incremental">GitHub</a></footer>
</template>

<style>
    body {
        background-color: #111;
        color: white;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    }

    footer {
        text-align: center;
    }
    footer a {
        color: lightblue;
    }
    footer a:visited {
        color: aqua;
    }
</style>