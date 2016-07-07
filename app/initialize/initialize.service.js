'use strict';

angular.module('initialize').factory('Initialize', ['$http',
    function ($http) {

        var ctrl = this;

        var statics = {
            wordsPlayed: "wordsPlayed",
            words: "words"
        };

        this.isEmpty = function (object) {

            if (object === null || object === '') {
                return true;
            } else {
                return false;
            }
        };

        this.isWordEmpty = function (word) {

            if (ctrl.isEmpty(word) || ctrl.isEmpty(word.word) || ctrl.isEmpty(word.category)) {
                return true;
            } else {
                return false;
            }
        };

        /**
         * Proves if the word is new.
         *
         * @param word
         * @return {boolean}
         */
        this.isWordNew = function (word) {
            var words = JSON.parse(localStorage.getItem(statics.words));

            for (var i = 0; i < words.length; i++) {
                if (word.word === words[i].word) {
                    return false;
                }
            }
            return true;
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
            addNewWord: function (word) {
                if (!ctrl.isWordEmpty(word) && ctrl.isWordNew(word)) {
                    var words = JSON.parse(localStorage.getItem(statics.words));
                    words.push({"word": word.word, "category": word.category});
                    localStorage.setItem(statics.words, JSON.stringify(words));
                }
            }
        };
    }]
);