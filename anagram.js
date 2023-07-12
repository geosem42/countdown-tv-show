const fs = require('fs');
const path = require('path');

// enter your anagram here
const anagram = 'dirtybash'

function getSortedWord(word) {
    return word.split('').sort().join('');
}

function findAnagrams(word, dictionary) {
    const sortedWord = getSortedWord(word);
    const anagrams = dictionary.filter(dictionaryWord => getSortedWord(dictionaryWord) === sortedWord);
    return anagrams;
}

// word list from dwyl/english-words
fs.readFile(path.join(__dirname, 'words.txt'), 'utf8', function(err, data) {
    if (err) {
        console.error('Could not find or open file for reading\n', err);
        process.exit();
    }

    const dictionary = data.split('\n');
    console.log(findAnagrams(anagram, dictionary));
});
