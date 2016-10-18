var wordCount = 15;
var guessCount = 4;

var start = document.getElementById('start');
start.addEventListener('click', function() {
  var startScreen = document.getElementById('start-screen');
  var gameScreen = document.getElementById('game-screen');
  toggleClasses(startScreen, 'hide', 'show');
  toggleClasses(gameScreen, 'hide', 'show');
  startGame();
});

function startGame() {
  var wordList = document.getElementById("word-list");
  var guessesRemaining = document.getElementById("guesses-remaining");
  var winner = document.getElementById("winner");
  var loser = document.getElementById("loser");
  var randomWords = getRandomValues(words, wordCount);
  randomWords.forEach(function(word) {
    var li = document.createElement("li");
    li.innerText = word;
    wordList.appendChild(li);
  });
  var password = getRandomValues(randomWords, 1)[0];
  wordList.addEventListener('click', function(e) {
    if (e.target.tagName === "LI" && !e.target.classList.contains("disabled")) {
      var guess = e.target.innerText;
      var similarityScore = compareWords(guess, password);
      e.target.classList.add("disabled");
      e.target.innerText = e.target.innerText + " --> Matching Letters: " + similarityScore;
      guessCount--;
      guessesRemaining.innerText = "Guesses remaining: " + guessCount + ".";
      if (similarityScore === password.length) {
        toggleClasses(winner, 'hide', 'show');
      } else if (guessCount === 0) {
        toggleClasses(loser, 'hide', 'show');
      }
    }
  });
  guessesRemaining.innerText = "Guesses remaining: " + guessCount + ".";
}

function toggleClasses(element) {
  for (var i = 1; i < arguments.length; i++) {
    element.classList.toggle(arguments[i]);
  }
}

function compareWords(word1, word2) {
  if (word1.length !== word2.length) throw "Words must have the same length";
  var count = 0;
  for (var i = 0; i < word1.length; i++) {
    if (word1[i] === word2[i]) count++;
  }
  return count;
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
  return shuffle(array).slice(0, numberOfVals);
}