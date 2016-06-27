'use strict';

describe('wordRound', function () {

    beforeEach(module('wordRound'));

    describe('WordRoundController', function () {
        var $httpBackend, ctrl;

        beforeEach(inject(function ($componentController, _$httpBackend_) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('wordsData/words-german.json').respond([{
                id: 1
                , word: "Katze"
                , category: "animals"
            }, {
                id: 2
                , word: "Hund"
                , category: "animals"
            }]);
            $httpBackend.expectGET('userData/user-wordsPlayed.json').respond([{
                id: 1
            }]);

            ctrl = $componentController('wordRound');
        }));

        it('should create a words model with 3 words and the first selected', function () {

            expect(ctrl.wordsUnplayed.length).toBe(1);
            expect(ctrl.word.word).toBe('Hund');
            expect(ctrl.wordsPlayed.length).toBe(1);
        });
    });
});