function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function findAllIndexes(str, char) {
  var indexes = [],
    i = -1;
  while ((i = str.indexOf(char, i + 1)) !== -1) {
    indexes.push(i);
  }
  return indexes;
}

function isInsideRect(mouseX, mouseY, rect) {
  const { x, y, width, height } = rect;
  return mouseX > x && mouseX < x + width && mouseY > y && mouseY < y + height;
}

function isColliding(rect1, rect2) {
  const rect1Right = rect1.x + rect1.width;
  const rect2Right = rect2.x + rect2.width;
  const rect1Bottom = rect1.y + rect1.height;
  const rect2Bottom = rect2.y + rect2.height;

  return rect1Right > rect2.x && rect2Right > rect1.x && rect1Bottom > rect2.y && rect2Bottom > rect1.y;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // swapping elements using destructuring assignment
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function removeItemFromArray(myArray, itemToRemove) {
  const index = myArray.indexOf(itemToRemove);

  // If the object exists in the array, remove it
  if (index > -1) {
    myArray.splice(index, 1);
  }
}
