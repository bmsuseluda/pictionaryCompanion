'use strict';

describe('wordRound', function () {

    beforeEach(module('wordRound'));

    describe('WordRoundController', function () {
        var ctrl;

        beforeEach(inject(function ($componentController, _$httpBackend_, _$q_) {

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

            localStorage.setItem("wordsPlayed", JSON.stringify(wordsPlayedIDs));

            ctrl = $componentController('wordRound');

            spyOn(ctrl, 'readJSONFilesAndStartInit').and.stub();

            ctrl.initLocalStorage(words);
            ctrl.initControlScope(ctrl);
        }));

        it('should be 3 words in local storage', function () {
            expect(JSON.parse(localStorage.getItem("words")).length).toBe(3);
        });

        it('should be just 1 unplayed word', function () {
            expect(ctrl.wordsUnplayed.length).toBe(1);
        });

        it('should be the word hund', function () {
            expect(ctrl.word.word).toBe('Hund');
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