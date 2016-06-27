'use strict';

angular.
    module('wordRound').
        component('wordRound', {
            templateUrl: 'word-round/wordRound.template.html',
        
                /**
                 * Words Controller
                 */
                controller: function WordRoundController($http, $scope) {
                    var words = pictionary.readWordsFromJSON();
                    var wordsPlayed = pictionary.initWordsPlayed(words);
                    var wordsUnplayed = pictionary.initWordsUnplayed(words, wordsPlayed);
                    var actualWord = wordsUnplayed[0];
                    
                    this.wordsPlayed = wordsPlayed;
                    this.word = actualWord;
                    wordsUnplayed.pop(actualWord);
                    this.wordsUnplayed = wordsUnplayed;
                }
});

var pictionary = [];

pictionary.readWordsPlayedIDsFromJSON = function() {
    /**$http.get('user-wordsPlayed.json').then(function (wordsPlayedJSON) {
        pictionary.wordsPlayed = wordsPlayedJSON.data;
    });**/
    return [
        {"id": 1}
    ];
};

pictionary.readWordsFromJSON = function() {
    /**$http.get('words-german.json').then(function (wordsJSON) {
        pictionary.words = wordsJSON.data;
    });**/
  return [
        {"id": 1, "word": "Hund", "up": 2, "down": 0, "category": "animals"},
        {"id": 2, "word": "Katze", "up": 3, "down": 0, "category": "animals"},
        {"id": 3, "word": "Schaf", "up": 4, "down": 0, "category": "animals"},
        {"id": 4, "word": "Superman", "up": 2, "down": 0, "category": "comic"}
    ]  
};

pictionary.initWordsPlayed = function (words) {
    var wordsPlayedIDs = pictionary.readWordsPlayedIDsFromJSON();
    var wordsPlayed = [];

    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        if (pictionary.isWordPlayed(word.id, wordsPlayedIDs)) {
            wordsPlayed.push(word);
        }
    }
    return wordsPlayed;
};

pictionary.initWordsUnplayed = function (words, wordsPlayed) {
    var wordsUnplayed = [];

    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        if (!pictionary.isWordPlayed(word.id, wordsPlayed)) {
            wordsUnplayed.push(word);
        }
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

pictionary.getNewWord = function () {
    $scope.word = pictionary.wordsUnplayed[0];
};