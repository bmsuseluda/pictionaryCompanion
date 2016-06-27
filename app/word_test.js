describe('wordsControl', function() {

  beforeEach(module('pictionary-companion'));

  it('should create a words model with 3 words and the first selected', inject(function($controller) {
    var scope = {};
    var ctrl = $controller('wordsControl', {$scope: scope});

    expect(scope.wordsUnplayed.length).toBe(2);
    expect(scope.word.word).toBe('Katze');
    expect(scope.wordsPlayed.length).toBe(1);
  }));
});