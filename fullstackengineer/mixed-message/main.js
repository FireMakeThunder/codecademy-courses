const noun = 'a skyscraper, a mountain, an avalance, a paper airplane, a kaleidescope, a guitar string, bubblegum, last friday, a violin, candycanes';

const adjective = 'heavy, strange, funky, happy, hairless, disrespectful, duck-like, frisky, startling';

const sense = 'sound, look, taste, feel, smell';
const sensed = 'sounded, looked, tasted, smelt, felt';

const response = [
    'I think about it daily.',
    'The world may never know.',
    'I get asked that every day.',
    'Oh well, gotta go!',
    'Seems odd, I think.',
    'I never think about it.',
    'By the way, could you pass the grey poupon?',
    "It's rather amazing, isn't it!"
];

function getRandom(list, exclude) {
    // Get the nouns as an array. Exclude the noun if it was passed through
    if (typeof list === 'string') {
        list = list.split(', ').filter(item => item !== exclude);
    }

    return list[Math.floor(Math.random() * list.length)]
}

const format = [
    `Have you ever wondered why ${getRandom(noun)} ${getRandom(sensed)} rather ${getRandom(adjective)}?`,
    `Why does ${getRandom(noun)} ${getRandom(sense)} a lot like ${getRandom(noun)}?`
]


function format1() {
    let noun1 = getRandom(noun);
    let sense1 = getRandom(sense);
    let noun2 = getRandom(noun, noun1);
    
    return `Why does ${noun1} ${sense1} a lot like ${noun2}?`;
}


function format2() {
    let noun1 = getRandom(noun);
    let sense1 = getRandom(sensed);
    let adjective1 = getRandom(adjective);
    
    return `Have you ever wondered why ${noun1} ${sense1} rather ${adjective1}?`;
}



console.log(getRandom(format));
console.log(getRandom(response));