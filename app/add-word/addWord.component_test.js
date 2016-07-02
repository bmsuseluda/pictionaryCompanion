'use strict';

describe('addWord', function () {

    beforeEach(module('addWord'));

    describe('addWordController', function () {
        var ctrl;

        var words = [{
            id: 0
            , word: "Katze"
            , category: "animals"
        }, {
            id: 1
            , word: "Hund"
            , category: "animals"
        }, {
            id: 2
            , word: "Superman"
            , category: "comics"
        }];

        beforeEach(inject(function ($componentController) {

            localStorage.setItem("words", JSON.stringify(words));

            ctrl = $componentController('addWord');
        }));

        /*it('next freeID should be 4', function () {
         var freeID = ctrl.getFreeID(words);
         expect(freeID).toBe(4);
         });*/

        it('should be 1 word more in local storage', function () {
            ctrl.addNewWord("Wassermann", "zodiac sign")
            var wordsLS = JSON.parse(localStorage.getItem("words"));
            expect(wordsLS.length).toBe(words.length + 1);
        });
    });
});