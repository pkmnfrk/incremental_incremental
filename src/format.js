export function formatSeconds(value, decimals) {
    // assume ms
    return (value / 1000).toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    })
}

export function formatMinutes(value, decimals) {
    // assume ms
    return (value / 1000 / 60).toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    })
}

export function formatHours(value, decimals) {
    // assume ms
    return (value / 1000 / 60 / 60).toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    })
}

const ONE_SECOND = 1000;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;


export function formatHumanTime(value, decimals) {
    let ret = "";

    if(value > ONE_HOUR) {
        const hours = Math.floor(value / ONE_HOUR);
        value -= hours * ONE_HOUR;
        ret += hours + " hour";
        if(hours > 1) {
            ret += "s";
        }
    }
    
    if(value > ONE_MINUTE) {
        const minutes = Math.floor(value / ONE_MINUTE);
        value -= minutes * ONE_MINUTE;
        if(ret) {
            ret += " ";
        }
        ret += minutes + " minute";
        if(minutes != 1) {
            ret += "s";
        }
    }
    
    {
        if(ret) {
            ret += " ";
        }
        ret += formatSeconds(value, decimals) + " seconds";
    }

    return ret;
}

const suffixes = [
    "",
    "K",
    "M",
    "B",
    "T",
]

export function formatNumber(value) {
    let newValue = value;
    let suffix = 0;

    while(newValue > 1000 && suffix < suffixes.length) {
        newValue /= 1000;
        suffix += 1;
    }

    if(suffix >= suffixes.length) {
        const power = Math.log10(value);
        newValue = Math.floor(value / Math.pow(10, power - 2)) / 100;
        return `${newValue}e${power}`;
    }

    if(suffix > 0) {
        const decimals = newValue > 0 ? 3 - Math.floor(Math.log10(newValue)) : 0;
        const decimalMult = Math.pow(10, decimals);

        newValue = Math.floor(newValue * decimalMult) / decimalMult;

        newValue = newValue.toString();
        if(newValue.indexOf(".") === -1){
            newValue += ".";
            for(let i = 0; i < decimals; i++) {
                newValue += "0";
            }
        }
    }

    return `${newValue} ${suffixes[suffix]}`;
}
