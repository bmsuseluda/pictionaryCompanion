'use strict';

angular.module('statistics').component('statistics', {
    templateUrl: 'statistics/statistics.template.html',

    /**
     * Controller for statistics of all players pictionary games for a user.
     */
    controller: function statisticsController() {
        var controlScope = this;
        var statics = {
            wordsPlayed: "wordsPlayed",
            words: "words"
        };

        /**
         * Initialize played words.<br>
         * Reads the metadata for a wordID from the wordlist.
         *
         * @param words
         * @param wordsPlayedIDs
         * @returns {Array} played words
         */
        this.initWordsPlayed = function (words, wordsPlayedIDs) {
            var wordsPlayed = [];

            if (wordsPlayedIDs !== null && wordsPlayedIDs.length > 0) {
                for (var i = 0; i < words.length; i++) {
                    var word = words[i];
                    if (this.isWordPlayed(word.id, wordsPlayedIDs)) {
                        wordsPlayed.push(word);
                    }
                }
            }
            return wordsPlayed;
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
                    if (!this.isWordPlayed(word.id, wordsPlayed)) {
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
         * @param id wordID to prove
         * @param wordsPlayed
         * @returns {boolean}
         */
        this.isWordPlayed = function (id, wordsPlayed) {
            for (var i = 0; i < wordsPlayed.length; i++) {
                if (id === wordsPlayed[i].id) {
                    return true;
                }
            }
        };

        /**
         * Initialize the controllerScope with unplayed and played words.
         */
        this.initControlScope = function () {

            var words = JSON.parse(localStorage.getItem(statics.words));
            var wordsPlayedIDs = JSON.parse(localStorage.getItem(statics.wordsPlayed));

            var wordsPlayed = controlScope.initWordsPlayed(words, wordsPlayedIDs);
            controlScope.wordsPlayed = wordsPlayed;
            controlScope.wordsUnplayed = controlScope.initWordsUnplayed(words, wordsPlayed);
        };

        this.initControlScope(controlScope);
    }
});