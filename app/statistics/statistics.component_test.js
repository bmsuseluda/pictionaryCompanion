'use strict';

describe('statistics', function () {

    beforeEach(module('statistics'));

    describe('statisticsController', function () {
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

            ctrl = $componentController('statistics');
        }));

        it('should be just 1 unplayed word', function () {
            expect(ctrl.wordsUnplayed.length).toBe(2);
        });

        it('should be 2 played words', function () {
            expect(ctrl.wordsPlayed.length).toBe(1);
        });
    });
});