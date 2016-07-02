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

            localStorage.setItem("words", JSON.stringify(words));
            localStorage.setItem("wordsPlayed", JSON.stringify(wordsPlayedIDs));

            ctrl = $componentController('wordRound');
            
            spyOn(ctrl, 'readJSONFilesAndStartInit').and.stub();

            ctrl.initControlScope(ctrl);
        }));

        it('should be just 1 unplayed word', function () {
            expect(ctrl.wordsUnplayed.length).toBe(1);
        });

        it('should be the word hund', function () {
            expect(ctrl.word.word).toBe('Hund');
        });

        it('should be 2 played words', function () {
            expect(ctrl.wordsPlayed.length).toBe(2);
        });
    });
});