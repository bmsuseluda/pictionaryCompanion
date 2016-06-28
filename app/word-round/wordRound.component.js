'use strict';

angular.
module('wordRound').
component('wordRound', {
    templateUrl: 'word-round/wordRound.template.html',

    /**
     * Words Controller
     */
    controller: function WordRoundController($http, $q) {
        var controlScope = this;

        this.readJSONFilesAndStartInit = function ($http, $q, controlScope) {
            var promises = [];
            promises.push($http.get('wordsData/words-german.json'));
            promises.push($http.get('userData/user-wordsPlayed.json'));

            $q.all(promises).then(function (results) {
                var words = results[0].data;
                var wordsPlayedIDs = results[1].data;

                controlScope.initControlScope(controlScope, words, wordsPlayedIDs);
            });
        };

        this.readJSONFilesAndStartInit($http, $q, controlScope);

        this.initControlScope = function (controlScope, words, wordsPlayedIDs) {
            var wordsPlayed = controlScope.initWordsPlayed(words, wordsPlayedIDs);
            controlScope.wordsPlayed = wordsPlayed;
            controlScope.wordsUnplayed = controlScope.initWordsUnplayed(words, wordsPlayed);

            controlScope.getNewWord(controlScope);
        };

        this.getNewWord = function (controlScope) {

            var wordsUnplayed = controlScope.wordsUnplayed;

            if (wordsUnplayed.length > 0) {

                var actualWord = wordsUnplayed[0];
                controlScope.word = actualWord;
                controlScope.wordsPlayed.push(actualWord);

                wordsUnplayed.splice(wordsUnplayed.indexOf(actualWord), 1);
                controlScope.wordsUnplayed = wordsUnplayed;
            }
        };

        this.initWordsPlayed = function (words, wordsPlayedIDs) {
            var wordsPlayed = [];

            if (wordsPlayedIDs != null && wordsPlayedIDs.length > 0) {
                for (var i = 0; i < words.length; i++) {
                    var word = words[i];
                    if (this.isWordPlayed(word.id, wordsPlayedIDs)) {
                        wordsPlayed.push(word);
                    }
                }
            }
            return wordsPlayed;
        };

        this.initWordsUnplayed = function (words, wordsPlayed) {
            var wordsUnplayed = [];

            if (wordsPlayed != null && wordsPlayed.length > 0) {
                for (var i = 0; i < words.length; i++) {
                    var word = words[i];
                    if (!this.isWordPlayed(word.id, wordsPlayed)) {
                        wordsUnplayed.push(word);
                    }
                }
            } else {
                wordsUnplayed = words;
            }

            return wordsUnplayed;
        };

        this.isWordPlayed = function (id, wordsPlayed) {
            for (var i = 0; i < wordsPlayed.length; i++) {
                if (id == wordsPlayed[i].id) {
                    return true;
                }
            }
        };
    }
});