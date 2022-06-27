import {ref, reactive, nextTick} from "vue";
import { advanceClock } from "./time";
const store = ref(null);
const reviveHandlers = [];

export function addReviveHandler(handler) {
    reviveHandlers.push(handler);
}

export function loadStore() {
    const rawData = window.localStorage.incremental_incremental;
    let data;
    try {
        data = JSON.parse(rawData);
    } catch(e) {
        data = {};
    }

    let oldClock = null;
    if(data.clock) {
        oldClock = data.clock;
        delete data.clock;
    }

    data = fixupData(data);

    store.value = data;

    for(const handler of reviveHandlers) {
        handler(data);
    }

    if(oldClock) {
        const deltaTime = new Date().getTime() - oldClock;
        console.log("Advancing time by", deltaTime);
        advanceClock(deltaTime);
    }

    saveStore();
}

export function saveStore() {
    const rawData = JSON.stringify({
        ...store.value,
        clock: new Date().getTime(),

    });
    window.localStorage.incremental_incremental = rawData;
}

export function getStore() {
    return store;
}

function fixupData(data = {}) {
    //initial
    data = {
        incremental: null,
        completed: 0,
        ...data,
    }

    data.browse = {
        isBrowsing: false,
        timeLeft: 0,
        level: 0,
        label: null,
        ...data.browse,
    };

    if(data.incremental) {
        data.incremental = {
            clicks: 0,
            maxClicks: 1,
            clicksPerClick: 1,
            clicksPerSecond: 0,
            clicksMultiplier: 1,
            costScale: 1.1,
            level: 0,
            ...data.incremental,
        };

        if(isNaN(data.incremental.clicks) || typeof data.incremental.clicks != "number") {
            data.incremental.clicks = 0;
        }
    }

    return data;
}
