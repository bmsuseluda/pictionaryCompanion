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

        var promises = [];
        promises.push($http.get('wordsData/words-german.json'));
        promises.push($http.get('userData/user-wordsPlayed.json'));

        $q.all(promises).then(function (results) {
            var words = results[0].data;
            var wordsPlayedIDs = results[1].data;

            var wordsPlayed = pictionary.initWordsPlayed(words, wordsPlayedIDs);
            var wordsUnplayed = pictionary.initWordsUnplayed(words, wordsPlayed);
            var actualWord = wordsUnplayed[0];

            controlScope.wordsPlayed = wordsPlayed;
            controlScope.word = actualWord;
            wordsUnplayed.splice(wordsUnplayed.indexOf(actualWord), 1);
            controlScope.wordsUnplayed = wordsUnplayed;
        });

        this.getNewWord = function (controlScope) {
            var actualWord = controlScope.word;
            controlScope.wordsPlayed.push(actualWord);

            var wordsUnplayed = controlScope.wordsUnplayed;
            actualWord = wordsUnplayed[0];
            controlScope.word = actualWord;
            wordsUnplayed.splice(wordsUnplayed.indexOf(actualWord), 1);
            controlScope.wordsUnplayed = wordsUnplayed;
        };
    }
});

var pictionary = [];

pictionary.initWordsPlayed = function (words, wordsPlayedIDs) {
    var wordsPlayed = [];

    if (wordsPlayedIDs != null && wordsPlayedIDs.length > 0) {
        for (var i = 0; i < words.length; i++) {
            var word = words[i];
            if (pictionary.isWordPlayed(word.id, wordsPlayedIDs)) {
                wordsPlayed.push(word);
            }
        }
    }
    return wordsPlayed;
};

pictionary.initWordsUnplayed = function (words, wordsPlayed) {
    var wordsUnplayed = [];

    if (wordsPlayed != null && wordsPlayed.length > 0) {
        for (var i = 0; i < words.length; i++) {
            var word = words[i];
            if (!pictionary.isWordPlayed(word.id, wordsPlayed)) {
                wordsUnplayed.push(word);
            }
        }
    } else {
        wordsUnplayed = words;
    }

    return wordsUnplayed;
};

pictionary.isWordPlayed = function (id, wordsPlayed) {
    for (var i = 0; i < wordsPlayed.length; i++) {
        if (id == wordsPlayed[i].id) {
            return true;
        }
    }
};