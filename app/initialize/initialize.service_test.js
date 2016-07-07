'use strict';

describe('Initialize', function () {

    var Initialize;

    var words = [{
        id: 1
        , word: "Katze"
        , category: "animals"
    }, {
        id: 2
        , word: "Hund"
        , category: "animals"
    }, {
        id: 3
        , word: "Superman"
        , category: "comics"
    }];

    var wordsPlayedIDs = [{
        id: 1
    }];

    beforeEach(module('initialize'));

    beforeEach(inject(function (_Initialize_) {

        Initialize = _Initialize_;

        localStorage.setItem("wordsPlayed", JSON.stringify(wordsPlayedIDs));

        Initialize.initLocalStorage(words);
    }));

    it('should be 3 words in local storage', function () {

        var wordsLS = JSON.parse(localStorage.getItem("words"));
        expect(wordsLS.length).toBe(3);
        for (var i = 0; i < words.length; i++) {
            expect(wordsLS.indexOf(words[i]) !== -1);
        }
        ;
    });

    it('addNewWord: should be 1 word more in local storage', function () {
        var word = {word: "Wassermann", category: "zodiac sign"};
        Initialize.addNewWord(word);
        var wordsLS = JSON.parse(localStorage.getItem("words"));
        expect(wordsLS.length).toBe(words.length + 1);
    });

    it('addNewWord: word is already there', function () {
        var word = {word: "Katze", category: "animals"};
        Initialize.addNewWord(word);
        var wordsLS = JSON.parse(localStorage.getItem("words"));
        expect(wordsLS.length).toBe(words.length);
    });

    it('addNewWord: word is empty', function () {
        var word = {word: "", category: ""};
        Initialize.addNewWord(word);
        var wordsLS = JSON.parse(localStorage.getItem("words"));
        expect(wordsLS.length).toBe(words.length);
    });
});