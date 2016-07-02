'use strict';

angular.module('initialize').component('initialize', {

    /**
     * Controller initialize the local storage.
     *
     * @param $http
     * @param $q
     */
    controller: function InitializeController($http, $q) {
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
            });
        };

        this.readJSONFilesAndStartInit($http, $q);
    }
});