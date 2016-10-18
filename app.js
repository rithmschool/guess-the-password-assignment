var wordCount = 12;
var guessCount = 4;

var start = document.getElementById('start');
start.addEventListener('click', function() {
  var startScreen = document.getElementById('start-screen');
  var gameScreen = document.getElementById('game-screen');
  startScreen.classList.toggle('hide');
  startScreen.classList.toggle('show');
  gameScreen.classList.toggle('show');
  gameScreen.classList.toggle('hide');
  startGame();
});

function startGame() {
  var wordList = document.getElementById("word-list");
  var randomWords = getRandomValues(words, 12);
  randomWords.forEach(function(word) {
    var li = document.createElement("li");
    li.innerText = word;
    wordList.appendChild(li);
  });
  var password = getRandomValues(randomWords, 1)[0];
}

function shuffle(array) {
  var arrayCopy = array.slice();
  for (var idx1 = arrayCopy.length - 1; idx1 > 0; idx1--) {
    // generate a random index between 0 and idx1 (inclusive)
    var idx2 = Math.floor(Math.random() * (idx1 + 1));

    // swap elements at idx1 and idx2
    var temp = arrayCopy[idx1];
    arrayCopy[idx1] = arrayCopy[idx2];
    arrayCopy[idx2] = temp;
  }
  return arrayCopy;
}

function getRandomValues(array, numberOfVals) {
  return shuffle(array).slice(0, numberOfVals + 1);
}