'use strict';

describe('wordRound', function() {

  beforeEach(module('wordRound'));
    
    describe('WordRoundController', function() {
    
      it('should create a words model with 3 words and the first selected', inject(function($componentController) {
        var ctrl = $componentController('wordRound');

        expect(ctrl.wordsUnplayed.length).toBe(2);
        expect(ctrl.word.word).toBe('Katze');
        expect(ctrl.wordsPlayed.length).toBe(1);
      }));
    });
});