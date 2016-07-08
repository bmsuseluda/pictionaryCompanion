'use strict';

angular.module('statistics').component('statistics', {
    templateUrl: 'statistics/statistics.template.html',

    /**
     * Controller for statistics of all players pictionary games for a user.
     */
    controller: ['Initialize', function StatisticsController(Initialize) {
        var controlScope = this;
        var statics = {
            wordsPlayed: "wordsPlayed",
            words: "words"
        };


        /**
         * Resets the words played in the local storage.
         */
        this.resetPlayedWords = function () {

            localStorage.setItem(statics.wordsPlayed, JSON.stringify([]));

            controlScope.initControlScope();
        };

        /**
         * Initialize unplayed words.
         *
         * @param words
         * @param wordsPlayed
         * @returns {Array} unplayed words
         */
        this.initWordsUnplayed = function (words, wordsPlayed) {
            var wordsUnplayed = [];

            if (wordsPlayed !== null && wordsPlayed.length > 0) {
                for (var i = 0; i < words.length; i++) {
                    var word = words[i];
                    if (!this.isWordPlayed(word, wordsPlayed)) {
                        wordsUnplayed.push(word);
                    }
                }
            } else {
                wordsUnplayed = words;
            }

            return wordsUnplayed;
        };

        /**
         * Proves if the word was all ready played.
         *
         * @param word to prove
         * @param wordsPlayed
         * @returns {boolean}
         */
        this.isWordPlayed = function (word, wordsPlayed) {
            for (var i = 0; i < wordsPlayed.length; i++) {
                if (word.word === wordsPlayed[i].word) {
                    return true;
                }
            }
            return false;
        };

        /**
         * Initialize the controllerScope with unplayed and played words.
         */
        this.initControlScope = function () {

            var words = JSON.parse(localStorage.getItem(statics.words));
            var wordsPlayed = JSON.parse(localStorage.getItem(statics.wordsPlayed));

            controlScope.wordsPlayed = wordsPlayed;
            controlScope.wordsUnplayed = controlScope.initWordsUnplayed(words, wordsPlayed);
        };

        /**
         * Calls the initialize service.
         */
        this.callInitialize = function () {

            Initialize.getWords(function (wordsResponse) {
                Initialize.initLocalStorage(wordsResponse.data);
                controlScope.initControlScope();
            });
        };

        this.callInitialize();
    }]
});