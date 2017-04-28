document.addEventListener('DOMContentLoaded', function() {
  let guessCount = 4;
  let password = '';

  let start = document.getElementById('start');
  start.addEventListener('click', function() {
    toggleClasses(document.getElementById('start-screen'), 'hide', 'show');
    toggleClasses(document.getElementById('game-screen'), 'hide', 'show');
    startGame();
  });

  const startGame = () => {
    // get random words and append them to the DOM
    let wordList = document.getElementById("word-list");
    let randomWords = getRandomValues(words, wordCount=15);
    randomWords.forEach(function(word) {
      let li = document.createElement("li");
      li.innerText = word;
      wordList.appendChild(li);
    });

    // set a secret password and the guess count display
    password = getRandomValues(randomWords, 1)[0];
    setGuessCount(guessCount);

    // add update listener for clicking on a word
    wordList.addEventListener('click', updateGame);
  }

  const updateGame = (e) => {
    if (e.target.tagName === "LI" && !e.target.classList.contains("disabled")) {
      // grab guessed word, check it against password, update view
      let guess = e.target.innerText;
      let similarityScore = compareWords(guess, password);
      e.target.classList.add("disabled");
      e.target.innerText = `${e.target.innerText} --> Matching Letters: ${similarityScore}`;
      setGuessCount(guessCount - 1);

      // check whether the game is over
      if (similarityScore === password.length) {
        toggleClasses(document.getElementById("winner"), 'hide', 'show');
        this.removeEventListener('click', updateGame);
      } else if (guessCount === 0) {
        toggleClasses(document.getElementById("loser"), 'hide', 'show');
        this.removeEventListener('click', updateGame);
      }
    }
  }

  const setGuessCount = (newCount) => {
    guessCount = newCount;
    document.getElementById("guesses-remaining").innerText = `Guesses remaining: ${guessCount}.`;
  }

  const toggleClasses = (element, ...num) => {
    for (let i = 0; i < num.length; i++) {
      element.classList.toggle(num[i]);
    }
  }

  const compareWords = (...words) => {
    if (words[0].length !== words[1].length) throw "Words must have the same length";
    let count = 0;
    for (let i = 0; i < words[0].length; i++) {
      if (words[0][i] === words[1][i]) count++;
    }
    return count;
  }

  const shuffle = (array) => {
    let arrayCopy = array.slice();
    for (let idx1 = arrayCopy.length - 1; idx1 > 0; idx1--) {
      // generate a random index between 0 and idx1 (inclusive)
      let idx2 = Math.floor(Math.random() * (idx1 + 1));

      // swap elements at idx1 and idx2
      [arrayCopy[idx2], arrayCopy[idx1]] = [arrayCopy[idx1], arrayCopy[idx2]];
    }
    return arrayCopy;
  }

  const getRandomValues = (array, numberOfVals) => shuffle(array).slice(0, numberOfVals);

});