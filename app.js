

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