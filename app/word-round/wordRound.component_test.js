'use strict';

describe('wordRound', function () {

    beforeEach(module('wordRound'));

    describe('WordRoundController', function () {
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

        var wordsPlayed = [{
            word: "Katze"
            , category: "animals"
        }];

        beforeEach(inject(function ($componentController) {

            localStorage.setItem("words", JSON.stringify(words));
            localStorage.setItem("wordsPlayed", JSON.stringify(wordsPlayed));

            ctrl = $componentController('wordRound');
            spyOn(ctrl, 'callInitialize').and.stub();

            ctrl.initControlScope();
            ctrl.getNewWord();
        }));

        it('should be just 1 unplayed word', function () {
            expect(ctrl.wordsUnplayed.length).toBe(1);
        });

        it('should be the word hund', function () {
            expect(ctrl.word.word).toEqual('Hund');
        });

        it('should be 2 played words', function () {
            expect(ctrl.wordsPlayed.length).toBe(2);
        });

        it('Reset: should be 1 played words', function () {
            ctrl.resetPlayedWords(ctrl);
            expect(ctrl.wordsPlayed.length).toBe(1);
            expect(JSON.parse(localStorage.getItem("wordsPlayed")).length).toBe(1);
        });

        it('isWordPlayed: should be equal', function () {
            var word = {
                word: "Katze"
                , category: "animals"
            };

            expect(ctrl.isWordPlayed(word, wordsPlayed)).toBeTruthy();
        });

        it('getNewWord: wordlist got 1 new word in LocalStorage', function () {
            localStorage.setItem("wordsPlayed", JSON.stringify(words));
            words.push({
                word: "Batman"
                , category: "comic"
            })
            localStorage.setItem("words", JSON.stringify(words));

            ctrl.getNewWord();

            expect(ctrl.word.word).toEqual('Batman');
        });
    });
});