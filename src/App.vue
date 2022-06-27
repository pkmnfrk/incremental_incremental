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
        <h1>Incremental Incremental</h1>
        <GameFinder />
        <GamePlayer />
    </div>
    <footer>
        <p>
            Disclaimer: This game is in early development. It might not work properly, time scales might be messed up,
            it is definitely not balanced or fun, etc. In time, these things will change (maybe except the fun part :), so bear with me! 6
        </p>
        <p>Any resemblance to other incremental games is wholly unintentional, except where funny.</p>

        <p>&copy; 2022 by Mike Caron. <a href="https://github.com/pkmnfrk/incremental_incremental">GitHub</a></p>
    </footer>
</template>

<style>
    body {
        background-color: #111;
        color: white;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    }

    footer {
        text-align: center;
        max-width: 1000px;
        margin: 0 auto;
    }
    footer a {
        color: lightblue;
    }
    footer a:visited {
        color: aqua;
    }
</style>