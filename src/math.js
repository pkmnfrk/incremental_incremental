export function randomInt(low, high) {
    return Math.floor(randomFloat(low, high));
}

export function randomFloat(low, high) {
    if(typeof low === "undefined") {
        high = low;
        low = 0
    }

    const r = high - low;

    return (Math.random() * r) + low;
}

export function randomItem(list) {
    return list[randomInt(0, list.length)];
}

/**
 * 
 * @param {number} value 
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
export function clamp(value, min, max) {
    if(value < min) return min;
    if(value > max) return max;
    return value;
}