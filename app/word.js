'use strict';

var pictionary = angular.module('pictionary-companion', []);

pictionary.wordsPlayed = [
    {"id": 1},
]
pictionary.wordsUnplayed = [];
pictionary.words = [
    {"id": 1, "word": "Hund", "up": 2, "down": 0, "category": "animals"},
    {"id": 2, "word": "Katze", "up": 3, "down": 0, "category": "animals"},
    {"id": 3, "word": "Schaf", "up": 4, "down": 0, "category": "animals"},
    {"id": 4, "word": "Superman", "up": 2, "down": 0, "category": "comic"}
];

/**
 * Words Controller
 */
pictionary.controller('wordsControl', function ($scope, $http) {
    pictionary.readJSONFiles($http);
    pictionary.initWords($scope, pictionary.words, pictionary.wordsPlayed);
});

pictionary.readJSONFiles = function (http) {
     /**$http.get('words-german.json').then(function (wordsJSON) {
        pictionary.words = wordsJSON.data;
    });
    $http.get('user-wordsPlayed.json').then(function (wordsPlayedJSON) {
        pictionary.wordsPlayed = wordsPlayedJSON.data;
    });**/
}

pictionary.initWords = function ($scope, words, wordsPlayed) {
    
    var wordsPlayedFull = [];

    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        if (pictionary.isWordPlayed(word.id, wordsPlayed)) {
            wordsPlayedFull.push(word);
        } else {
            pictionary.wordsUnplayed.push(word);
        }
    }
    
    var word = pictionary.wordsUnplayed[0];
    $scope.word = word;
    
    pictionary.wordsUnplayed.pop(word);
    $scope.wordsUnplayed = pictionary.wordsUnplayed;
    $scope.wordsPlayed = wordsPlayedFull;
     
    //pictionary.wordsPlayed.push(word.id);
};
    
pictionary.isWordPlayed = function (id, wordsPlayed) {
    for (var i = 0; i < wordsPlayed.length; i++) {
        if (id == wordsPlayed[i].id) {
            return true;
        }
    }
}

pictionary.getNewWord = function () {
    $scope.word = pictionary.wordsUnplayed[0];
};