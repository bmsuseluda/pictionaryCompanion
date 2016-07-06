'use strict';

angular.module('initialize').factory('Initialize', ['$http',
    function ($http) {

        var statics = {
            wordsPlayed: "wordsPlayed",
            words: "words"
        };

        return {
            /**
             * Reads the wordlist from json.
             *
             * @param response
             */
            getWords: function (response) {
                $http.get('wordsData/words-german.json').then(response);
            },

            /**
             * Initialize the localStorage with the data from parameter words<br>
             * Writes the wordlist, playedWords and roundstatistics in the local storage.
             *
             * @param words
             */
            initLocalStorage: function (words) {

                localStorage.setItem(statics.words, JSON.stringify(words));

                if (localStorage.getItem(statics.wordsPlayed) === null) {
                    localStorage.setItem(statics.wordsPlayed, JSON.stringify([]));
                }
            },

            /**
             * Adds a new word to local storage and server.
             *
             * @param word
             */
            addWord: function (word) {

            }
        };
    }]
);