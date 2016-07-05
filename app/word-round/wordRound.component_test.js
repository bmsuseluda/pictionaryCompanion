'use strict';

describe('wordRound', function () {

    beforeEach(module('wordRound'));

    describe('WordRoundController', function () {
        var ctrl;

        beforeEach(inject(function ($componentController) {

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

            localStorage.setItem("words", JSON.stringify(words));
            localStorage.setItem("wordsPlayed", JSON.stringify(wordsPlayedIDs));

            ctrl = $componentController('wordRound');
            spyOn(ctrl, 'callInitialize').and.stub();

            ctrl.initControlScope();
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
    });
});