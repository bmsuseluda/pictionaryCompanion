'use strict';

angular.
    module('wordRound').
        component('wordRound', {
            templateUrl: 'word-round/wordRound.template.html',
        
                /**
                 * Words Controller
                 */
                controller: function WordRoundController($http, $scope) {
                    var words = pictionary.readWordsFromJSON($http);
                    var wordsPlayed = pictionary.initWordsPlayed(words, $http);
                    var wordsUnplayed = pictionary.initWordsUnplayed(words, wordsPlayed);
                    var actualWord = wordsUnplayed[0];
                    
                    this.wordsPlayed = wordsPlayed;
                    this.word = actualWord;
                    wordsUnplayed.pop(actualWord);
                    this.wordsUnplayed = wordsUnplayed;
                }
});

var pictionary = [];

pictionary.readWordsPlayedIDsFromJSON = function($http) {
    /**var wordsPlayed = null;
    $http.get('userData/user-wordsPlayed.json').then(function (wordsPlayedJSON) {
        wordsPlayed = wordsPlayedJSON.data;
    });
    return wordsPlayed;**/
    
    return [{"id": 1}]
};

pictionary.readWordsFromJSON = function($http) {
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

pictionary.initWordsPlayed = function (words, $http) {
    var wordsPlayedIDs = pictionary.readWordsPlayedIDsFromJSON($http);
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

pictionary.getNewWord = function () {
    $scope.word = pictionary.wordsUnplayed[0];
};