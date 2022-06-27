<script setup>
    import {ref, reactive, computed} from "vue";
    import { getStore } from "./store";
    import { buyUpgrade, getUpgradeCost, getUpgradeValue } from "./incremental";
    import { formatNumber } from "./format";

    const store = getStore();

    const upgrades = reactive([
        {
            id: "clicksPerClick",
            label: "Clicks per click",
            cost: computed(() => getUpgradeCost("clicksPerClick")),
            value: computed(() => formatNumber(getUpgradeValue("clicksPerClick")) + "/click"),
            classes: computed(() => ({
                affordable: getUpgradeCost("clicksPerClick") <= store.value.incremental.clicks,
            })),
        },
        {
            id: "clicksPerSecond",
            label: "Clicks per sec",
            cost: computed(() => getUpgradeCost("clicksPerSecond")),
            value: computed(() => formatNumber(getUpgradeValue("clicksPerSecond")) + "/sec"),
            classes: computed(() => ({
                affordable: getUpgradeCost("clicksPerSecond") <= store.value.incremental.clicks,
            })),
        },
        {
            id: "clickGain",
            label: "Clicks multiplier",
            cost: computed(() => getUpgradeCost("clickGain")),
            value: computed(() => "x" + formatNumber(getUpgradeValue("clickGain"))),
            classes: computed(() => ({
                affordable: getUpgradeCost("clickGain") <= store.value.incremental.clicks,
            })),
        },
    ]);

    const prestiges = reactive([
    ]);


</script>

<template>
    <template v-if="store">
        <div class="upgrades">
            <div class="col">
                <h3>Upgrades</h3>
                <p v-for="u of upgrades" :key="u.id">
                    <button class="upgrade" :class="u.classes" @click="() => buyUpgrade(u.id)">{{u.label}} (Cost:&nbsp;{{formatNumber(u.cost)}}) (Cur:&nbsp;{{u.value}})</button>
                </p>
            </div>
            <div class="col" v-if="prestiges.length">
                <h3>Prestige</h3>
                <p v-for="u of prestiges" :key="u.id">
                    <button class="upgrade" :class="u.classes" @click="() => buyUpgrade(u.id)">{{u.label}} (Cost:&nbsp;{{u.cost}}) (Cur:&nbsp;{{u.value}})</button>
                </p>
            </div>
        </div>
    </template>
</template>

<style>
    .upgrades {
        display: flex;
        flex-direction: row;
    }
    .upgrades .col {
        display: flex;
        flex-direction: column;
        padding: 5px;
    }
    .upgrade {
        font-size: 18px;
        width: 300px;
        height: 50px;
        background-color: #ccc;
        color: #aaa;
    }
    .upgrade.affordable {
        color: black;
        background-color: white;
        cursor:pointer;
    }
    .upgrade.affordable:hover {
        background-color: #ff0;
    }
</style>