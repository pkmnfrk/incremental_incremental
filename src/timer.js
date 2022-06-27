import {onMounted, onUnmounted} from "vue";

const handlers = [];
const handlerData = {};
let lastTimestamp = null;

function handleAnimationFrame(timestamp) {
    let delta = 0;
    if(lastTimestamp) {
        delta = timestamp - lastTimestamp;
    }
    lastTimestamp = timestamp;

    for(const handler of handlers) {
        const data = handlerData[handler];

        data.remaining -= delta;
        data.passed += delta;
        if(data.remaining <= 0) {
            handler(data.passed);
            data.passed = 0;
            if(data.remaining < -data.interval) {
                // multiple iterations have passed, just reset state
                data.remaining = data.interval;
            }
            data.remaining += data.interval;
        }
    }

    if(handlers.length) {
        requestAnimationFrame(handleAnimationFrame);
    } else {
        lastTimestamp = null;
    }
}

export function useTimer(interval, onTimer) {
    onMounted(() => {
        const needsKickstart = !handlers.length;

        handlers.push(onTimer);
        handlerData[onTimer] = {
            interval,
            remaining: interval,
            passed: 0,
        };

        if(needsKickstart) {
            requestAnimationFrame(handleAnimationFrame);
        }
    });

    onUnmounted(() => {
        const ix = handlers.indexOf(onTimer);
        if(ix !== -1) {
            handlers.splice(ix, 1);
            delete handlerData[onTimer];
        }
    })
}

export function useTick(onTimer) {
    useTimer(0, onTimer);
}