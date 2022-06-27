// let clock = 0;

/** @typedef {() => void} SingleAlarmHandler */
/** @typedef {(eventCount: int) => void} RepeatingAlarmHandler */

/** @type {(SingleAlarmHandler|RepeatingAlarmHandler)[]} */
const handlers = [];
const handlersById = {};

let incrementingId = 1;

function sortHandlers() {
    handlers.sort((a, b) => {
        if(a === b) return 0;
        if(a.remaining === b.remaining) {
            return handlers.indexOf(b) - handlers.indexOf(a);
        }

        return b.remaining - a.remaining;
    })
}

export function advanceClock(delta) {
    delta *= 10;

    while(delta > 0 && handlers.length) {
        let tick = delta; //Math.min(delta, handlers[0].remaining);    
        if(!tick) {
            alert("time has broken");
            debugger;
        }

        delta -= tick;

        for(const handler of handlers) {
            handler.remaining -= tick;

            if(handler.remaining <= 0) {
                let count = 0;
                while(handler.interval && handler.remaining <= 0) {
                    count += 1;
                    handler.remaining += handler.interval;
                }

                handler(count);
                
                if(!handler.interval) {
                    handlers.splice(handlers.indexOf(handler), 1);
                }
            } else if(handler.progress) {
                handler.progress(handler.remaining);
            }
        }
    }
}

/**
 * 
 * @param {SingleAlarmHandler} handler 
 * @param {*} timeMs 
 * @param {*} progress 
 */
export function setAlarm(handler, timeMs, progress) {
    handler.remaining = timeMs;
    handler.id = incrementingId++;
    handler.progress = progress;

    handlers.push(handler);
    handlersById[handler.id] = handler;

    sortHandlers();
}

/**
 * 
 * @param {RepeatingAlarmHandler} handler 
 * @param {*} timeMs 
 */
export function setRepeatingAlarm(handler, timeMs) {
    handler.remaining = timeMs;
    handler.interval = timeMs;
    handler.id = incrementingId++;

    handlers.push(handler);
    handlersById[handler.id] = handler;

    sortHandlers();
}

export function clearAlarm(id) {
    const handler = handlersById[id];
    if(!handler) return;

    delete handlersById[id];
    delete handlers[handler];
    delete handler.id;
    delete handler.remaining;
}