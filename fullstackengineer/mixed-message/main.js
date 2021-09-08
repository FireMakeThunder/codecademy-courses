/**
 * Have fun with this.
 * Nouns can be singular or plural, use articles for singular nouns.
 * Come up with any new formats and responses to add to the list if it pleases you.
 */

const noun = 'a skyscraper, a mountain, an avalance, a paper airplane, a kaleidescope, a guitar string, bubblegum, last friday, a violin, candycanes';

const adjective = 'heavy, strange, funky, happy, hairless, disrespectful, duck-like, frisky, startling';

const sense = 'sound, look, taste, feel, smell';
const senses = 'sounds, looks, tastes, smells, feels';

const response = [
    'I think about it daily.',
    'The world may never know.',
    'I get asked that every day.',
    'Oh well, gotta go!',
    'Seems odd, I think.',
    'I never think about it.',
    'Anyway, could you pass the grey poupon?',
    "It's rather amazing, isn't it!"
];

function getRandom(list, exclude) {
    // Convert a string into an array
    if (typeof list === 'string') {
        list = list.split(', ');
    }

    // Exclude could be used to prevent a repeat
    if(exclude) {
        list = list.filter(item => item !== exclude);
    }

    // Return a random element from the list
    return list[Math.floor(Math.random() * list.length)]
}

const question = [
    `Have you ever wondered why ${getRandom(noun)} ${getRandom(senses)} rather ${getRandom(adjective)}?`,
    `Why does ${getRandom(noun)} ${getRandom(sense)} a lot like ${getRandom(noun)}?`
]

console.log(getRandom(question));
console.log('...');
console.log(getRandom(response));
