'use strict';

angular.module('wordRound').component('wordRound', {
    templateUrl: 'word-round/wordRound.template.html',

    /**
     * Controller for a round in a pictionary game.
     *
     * @param $http
     * @param $q
     */
    controller: function WordRoundController($http, $q) {
        var controlScope = this;
        var statics = {
            wordsPlayed: "wordsPlayed",
            words: "words"
        };
        
        /**
         * Initialize the localStorage with the data from parameter words<br>
         * Writes the wordlist, playedWords and roundstatistics in the local storage.
         *
         * @param words
         */
        this.initLocalStorage = function (words) {

            localStorage.setItem(statics.words, JSON.stringify(words));

            if (localStorage.getItem(statics.wordsPlayed) === null) {
                localStorage.setItem(statics.wordsPlayed, JSON.stringify([]));
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

            controlScope.getNewWord(controlScope);
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
         * Resets the words played in the local storage.
         */
        this.resetPlayedWords = function () {

            localStorage.setItem(statics.wordsPlayed, JSON.stringify([]));

            controlScope.initControlScope(controlScope);
        };

        /**
         * Sets new word from unplayed words in controllerScope. Updates the played and unplayed words.
         */
        this.getNewWord = function () {

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
         * Reads the word-list and user-data from JSON and starts initialisation of the controllerScope.
         *
         * @param $http
         * @param $q
         */
        this.readJSONFilesAndStartInit = function ($http, $q) {
            var promises = [];
            promises.push($http.get('wordsData/words-german.json'));

            $q.all(promises).then(function (results) {
                var words = results[0].data;

                controlScope.initLocalStorage(words);
                controlScope.initControlScope();
            });
        };

        this.readJSONFilesAndStartInit($http, $q);
    }
});