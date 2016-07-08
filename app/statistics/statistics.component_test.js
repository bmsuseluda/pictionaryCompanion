'use strict';

describe('statistics', function () {

    beforeEach(module('statistics'));

    describe('statisticsController', function () {
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

            ctrl = $componentController('statistics');
            spyOn(ctrl, 'callInitialize').and.stub();

            ctrl.initControlScope();
        }));

        it('should be just 1 unplayed word', function () {
            expect(ctrl.wordsUnplayed.length).toBe(2);
            expect(ctrl.wordsUnplayed.indexOf(words))
        });

        it('should be 2 played words', function () {
            expect(ctrl.wordsPlayed.length).toBe(1);
        });

        it('Reset: should be 1 played words', function () {
            ctrl.resetPlayedWords(ctrl);
            expect(ctrl.wordsPlayed.length).toBe(0);
            expect(JSON.parse(localStorage.getItem("wordsPlayed")).length).toBe(0);
        });
    });
});