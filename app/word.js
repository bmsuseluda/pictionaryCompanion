'use strict';

var pictionary = angular.module('pictionary-companion', []);

var words = {};

/**
 * Words Controller
 */
pictionary.controller('wordsControl', function ($scope, $http) {
    $http.get('words-german.json').then(function (words) {
        initWords($scope, words);
    });
});

var initWords = function ($scope, words) {
    $scope.words = words.data;
    $scope.word = words.data[0];
};

var getNewWord = function () {
    return 1;
};