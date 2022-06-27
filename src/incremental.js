import { randomFloat, randomInt, randomItem } from "./math";
import { setAlarm, setRepeatingAlarm } from "./time";
import {getStore, addReviveHandler} from "./store";
import { randomName } from "./names";

const levels = [
    {
        minClicks: 1e4,
        maxClicks: 1e5,
        minCostScale: 1.01,
        maxCostScale: 1.2,
        browseTime: 60_000,
        ipScale: 1,
    },
    {
        minClicks: 1e8,
        maxClicks: 1e9,
        minCostScale: 1.1,
        maxCostScale: 1.3,
        browseTime: 300_000,
        ipScale: 1e3,
    },
    {
        minClicks: 1e12,
        maxClicks: 1e13,
        minCostScale: 1.15,
        maxCostScale: 1.35,
        browseTime: 3_600_000,
        ipScale: 1e6,
    }
]

const upgrades = {
    clicksPerClick: {
        baseCost: 10,
        extraScale: 1.5,
        getLevel(incremental) {
            return incremental.clicksPerClick - 1;
        },
        onUpgrade(incremental) {
            incremental.clicksPerClick += 1;
        },
        getValue(incremental) {
            return incremental.clicksPerClick * incremental.clicksMultiplier;
        },
    },
    clicksPerSecond: {
        baseCost: 100,
        extraScale: 0.9,
        getLevel(incremental) {
            return incremental.clicksPerSecond;
        },
        onUpgrade(incremental) {
            incremental.clicksPerSecond += 1;
        },
        getValue(incremental) {
            return incremental.clicksPerSecond * incremental.clicksMultiplier;
        },
    },
    clickGain: {
        baseCost: 1000,
        extraScale: 2.1,
        getLevel(incremental) {
            return Math.log2(incremental.clicksMultiplier * 2);
        },
        onUpgrade(incremental) {
            incremental.clicksMultiplier *= 2;
        },
        getValue(incremental) {
            return incremental.clicksMultiplier;
        },
    }
}

let manualClickOnCooldown = false;

export function startBrowse(level) {
    const store = getStore();
    const data = level <= 2 ? levels[level] : levels[2];
    if(store.value.browse.isBrowsing) return;

    store.value.browse = {
        isBrowsing: true,
        level,
        timeLeft: data.browseTime,
    };

    setAlarm(browseComplete, data.browseTime, browseProgress);
}

export function doManualClick() {
    if(manualClickOnCooldown) {
        return;
    }

    setTimeout(() => {
        manualClickOnCooldown = false;
    }, 100);

    manualClickOnCooldown = true;

    const store = getStore();
    if(!store.value.incremental) {
        return;
    }

    const count = store.value.incremental.clicksPerClick * store.value.incremental.clicksMultiplier;
    
    store.value.incremental.clicks += count;
    if(store.value.incremental.clicks >= store.value.incremental.maxClicks) {
        store.value.incremental = null;
    }
}

export function buyUpgrade(upgradeId) {
    const store = getStore();
    if(!store.value.incremental) {
        return;
    }
    const upgrade = upgrades[upgradeId];
    if(!upgrade) {
        return;
    }

    const cost = getUpgradeCost(upgradeId);

    if(cost <= store.value.incremental.clicks) {
        store.value.incremental.clicks -= cost;
        upgrade.onUpgrade(store.value.incremental);
    }
}

export function getUpgradeCost(upgradeId) {
    const store = getStore();
    if(!store.value.incremental) {
        return 0;
    }

    const upgrade = upgrades[upgradeId];
    if(!upgrade) {
        return 0;
    }

    return Math.floor(upgrade.baseCost * Math.pow(store.value.incremental.costScale * upgrade.extraScale, upgrade.getLevel(store.value.incremental)));
}

export function getUpgradeValue(upgradeId) {
    const store = getStore();
    if(!store.value.incremental) {
        return 0;
    }

    const upgrade = upgrades[upgradeId];
    if(!upgrade) {
        return 0;
    }

    return +upgrade.getValue(store.value.incremental);
}

export function getIpGain(incremental) {
    if(incremental.clicks < incremental.maxClicks) return 0;
    return Math.floor(Math.log1p(incremental.clicks / incremental.maxClicks * 3 * levels[incremental.level].ipScale));
}

function generateIncremental(level) {
    const data = level <= 2 ? levels[level] : levels[2];

    return {
        name: randomName(),
        clicks: 0,
        maxClicks: randomInt(data.minClicks, data.maxClicks),
        clicksPerClick: 1,
        clicksPerSecond: 0,
        clicksMultiplier: 1,
        costScale: randomFloat(data.minCostScale, data.maxCostScale),
        level,
    };
}

function browseComplete() {
    const store = getStore();
    store.value.browse.isBrowsing = false;
    store.value.incremental = generateIncremental(store.value.browse.level);
}

function browseProgress(timeLeft) {
    getStore().value.browse.timeLeft = timeLeft;
}

function autoClicking(eventCount = 1) {
    const store = getStore();

    if(store.value.incremental) {
        // console.log("Got", eventCount, "ticks at once");
        const clicks = eventCount * store.value.incremental.clicksPerSecond / 10 * store.value.incremental.clicksMultiplier;
        store.value.incremental.clicks += clicks;
    }
}


addReviveHandler((rawStore) => {
    if(rawStore.browse.isBrowsing) {
        setAlarm(browseComplete, rawStore.browse.timeLeft, browseProgress)
    }
    setRepeatingAlarm(autoClicking, 100);
    
});