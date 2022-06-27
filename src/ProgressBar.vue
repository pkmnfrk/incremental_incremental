<script setup>
    import { computed } from "vue";
    import {clamp} from "./math";

    const props = defineProps({
        color: {
            type: String,
            default: "green",
        },
        value: {
            type: Number,
            required: true,
        },
    });

    const styles = computed(() => {
        return {
            width: (clamp(props.value / 100, 0, 1) * 300) + "px",
            backgroundColor: props.color,
        }
    })


</script>
<template>
    <div class="bar-outer">
        <div class="bar-inner" :style="styles"></div>
    </div>
</template>
<style>
    .bar-outer {
        border: 1px solid white;
        background-color: white;
        width: 300px;
        height: 25px;
    }

    .bar-inner {
        height: 25px;
    }
</style>