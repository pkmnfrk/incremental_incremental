import { randomInt, randomItem } from "./math";

const nouns = [
    "Banana",
    "Apple",
    "Orange",
    "Cookie",
    "Lint",
    "Cat",
    "Dog",
    "Cow",
    "Sheep",
    "Elephant",
    "Giraffe",
    "Hamster",
    "Space",
    "Star",
    "Galaxy",
    "Dirt",
    "Molecule",
    "Atom",
    "Computer",
    "Bitcoin",
    "NFT",
    "Incremental",
    "Number",
    "Calculator",
];

const verbs = [
    "Clicker",
    "Petter",
    "Eater",
    "Finder",
    "Incremental",
    "Combiner",
    "Multiplier",
    "Idle",
    "Singularity",
    "Builder",
    "Skilling",
    "Hero",

]

const suffixes = [
    "Supreme",
    "DX",
    "64",
    "Advance",
    "For Nintendo 3DS",
    "Infinite",
    "Ultra",
    "Perfect",
    "Mania",
    "Mod",
]



export function nameXYZ() {
    const first = randomItem(nouns);
    const second = randomItem(verbs);
    let third = "";
    let fourth = "";
    if(Math.random() < 0.2) {
        third = " " + randomItem(suffixes);
        if(Math.random() < 0.2) {
            fourth = " " + randomItem(suffixes);
        }
    }
    

    return `${first} ${second}${third}`;
}


export function randomName() {
    return nameXYZ();
}