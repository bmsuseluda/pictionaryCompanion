'use strict';

angular.module('wordRound').component('wordRound', {
    templateUrl: 'word-round/wordRound.template.html',

    /**
     * Controller for a round in a pictionary game.
     */
    controller: ['Initialize', function WordRoundController(Initialize) {
        var controlScope = this;
        var statics = {
            wordsPlayed: "wordsPlayed",
            words: "words"
        };

        /**
         * Adds the actual played word to the local storage.
         *
         * @param actualWord
         */
        this.addNewPlayedWordToLocalStorage = function (actualWord) {

            var wordsPlayed = JSON.parse(localStorage.getItem(statics.wordsPlayed));
            wordsPlayed.push(actualWord);
            localStorage.setItem(statics.wordsPlayed, JSON.stringify(wordsPlayed))
        };

        /**
         * Sets new word from unplayed words in controllerScope. Updates the played and unplayed words.
         */
        this.getNewWord = function () {

            controlScope.initControlScope();

            var wordsUnplayed = controlScope.wordsUnplayed;

            if (wordsUnplayed.length > 0) {

                var actualWord = wordsUnplayed[0];
                controlScope.word = actualWord;
                controlScope.wordsPlayed.push(actualWord);
                controlScope.addNewPlayedWordToLocalStorage(actualWord);

                wordsUnplayed.splice(wordsUnplayed.indexOf(actualWord), 1);
                controlScope.wordsUnplayed = wordsUnplayed;
            }
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
                controlScope.getNewWord();
            });
        };

        this.callInitialize();
    }]
});