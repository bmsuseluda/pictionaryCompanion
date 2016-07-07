'use strict';

angular.module('addWord').component('addWord', {
    templateUrl: 'add-word/addWord.template.html',

    /**
     * Controller to add a new word.
     */
    controller: ['Initialize', function AddWordController(Initialize) {

        var controlScope = this;
        var word, category = {};

        /**
         * Adds the new word to the local storage.
         */
        this.addNewWord = function () {
            Initialize.addNewWord({word: controlScope.word, category: controlScope.category});
        };
    }]
});