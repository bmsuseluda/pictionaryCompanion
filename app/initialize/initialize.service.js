'use strict';

angular.module('initialize').factory('Initialize', ['$http',
    function ($http) {

        var statics = {
            wordsPlayed: "wordsPlayed",
            words: "words"
        };

        console.log("initialize");

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

                console.log('initialize.controlScope');

                localStorage.setItem(statics.words, JSON.stringify(words));

                if (localStorage.getItem(statics.wordsPlayed) === null) {
                    localStorage.setItem(statics.wordsPlayed, JSON.stringify([]));
                }
            }
        };
    }]
);