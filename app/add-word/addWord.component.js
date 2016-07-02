'use strict';

angular.module('addWord').component('addWord', {
    templateUrl: 'add-word/addWord.template.html',

    /**
     * Controller for a round in a pictionary game.
     */
    controller: function AddWordController() {
        var controlScope = this;
        var statics = {
            words: "words"
        };

        /**
         * Adds the new word to the local storage.
         */
        this.addNewWord = function (word, category) {
            var words = JSON.parse(localStorage.getItem(statics.words));
            words.push({"id": controlScope.getFreeID(words), "word": word, "category": category});
            localStorage.setItem(statics.words, JSON.stringify(words));
        };

        /**
         * Returns ID that is not used in the word array.
         */
        this.getFreeID = function (words) {
            var freeID = 0;
            var idIsFree = false;

            for (var i = 0; idIsFree === true; i++) {
                idIsFree = true;
                console.log(i);
                words.forEach(function (word) {
                    if (i === word.id) {
                        idIsFree = false;
                    }
                });

                if (idIsFree) {
                    freeID = i;
                }
            }

            return freeID;
        };
    }
});