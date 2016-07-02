'use strict';

describe('initialize', function () {

    beforeEach(module('initialize'));

    describe('initializeController', function () {
        var ctrl;

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

        beforeEach(inject(function ($componentController, _$httpBackend_, _$q_) {

            localStorage.setItem("wordsPlayed", JSON.stringify(wordsPlayedIDs));

            ctrl = $componentController('initialize');
            spyOn(ctrl, 'readJSONFilesAndStartInit').and.stub();
            ctrl.initLocalStorage(words);
        }));

        it('should be 3 words in local storage', function () {

            var wordsLS = JSON.parse(localStorage.getItem("words"));
            expect(wordsLS.length).toBe(3);
            for (var i = 0; i < words.length; i++) {
                expect(wordsLS.indexOf(words[i]) !== -1);
            }
            ;
        });
    });
});