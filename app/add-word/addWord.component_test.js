'use strict';

describe('addWord', function () {

    beforeEach(module('addWord'));

    describe('addWordController', function () {
        var ctrl;

        var words = [{
            word: "Katze"
            , category: "animals"
        }, {
            word: "Hund"
            , category: "animals"
        }, {
            word: "Superman"
            , category: "comics"
        }];

        beforeEach(inject(function ($componentController) {

            localStorage.setItem("words", JSON.stringify(words));

            ctrl = $componentController('addWord');
        }));

        it('addNewWord: should be 1 word more in local storage', function () {
            ctrl.addNewWord("Wassermann", "zodiac sign")
            var wordsLS = JSON.parse(localStorage.getItem("words"));
            expect(wordsLS.length).toBe(words.length + 1);
        });

        it('addNewWord: word is already there', function () {
            ctrl.word = "Katze";
            ctrl.category = "animals";
            ctrl.addNewWord();
            var wordsLS = JSON.parse(localStorage.getItem("words"));
            expect(wordsLS.length).toBe(words.length);
        });
    });
});