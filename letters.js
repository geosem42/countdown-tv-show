const fs = require('fs');
const path = require('path');

// Letters to be used to form words
const letters = ['t', 'i', 'n', 'e', 's', 'p', 'a', 't', 'u'];

function canFormWord(word, letters) {
    const lettersCopy = [...letters]; // copy the array to prevent side effects
    for (let letter of word) {
        const index = lettersCopy.indexOf(letter);
        if (index === -1) {
            return false; // if a letter is not in the array, the word can't be formed
        } else {
            lettersCopy.splice(index, 1); // if the letter is in the array, remove it
        }
    }
    return true;
}

fs.readFile(path.join(__dirname, 'words.txt'), 'utf8', function(err, data) {
    if (err) {
        console.error('Could not find or open file for reading\n', err);
        process.exit();
    }

    const dictionary = data.split('\n');
    const validWords = dictionary
        .filter(word => word.length > 3 && canFormWord(word, letters));

    validWords.sort((a, b) => a.length - b.length);
    console.log('All possible English words longer than 3 letters from smallest to biggest: \n', validWords.join(", "));
});
