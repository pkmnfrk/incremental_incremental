<script setup>
    import {ref, computed} from "vue";
    import {useTimer} from "./timer";

    const dots = [
        "",
        ".",
        "..",
        "...",
    ]
    let num = ref(1);
    let label = computed(() => dots[num.value]);

    function onTimer() {
        num.value += 1;
        if(num.value > 3) {
            num.value = 1;
        }
    }

    useTimer(1000, onTimer);
</script>

<template>
    <span>{{label}}</span>
</template>