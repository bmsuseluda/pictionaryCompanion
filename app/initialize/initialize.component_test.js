'use strict';

describe('initialize', function () {

    beforeEach(module('initialize'));

    describe('initializeController', function () {
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

            ctrl = $componentController('initialize');

            spyOn(ctrl, 'readJSONFilesAndStartInit').and.stub();

            ctrl.initLocalStorage(words);
        }));

        it('should be 3 words in local storage', function () {
            expect(JSON.parse(localStorage.getItem("words")).length).toBe(3);
        });
    });
});