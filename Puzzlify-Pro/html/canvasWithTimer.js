/*
Javascript example using an html <canvas> as the main
app client area.
The application illustrates:
-handling mouse dragging and release
to drag a strings around on the html canvas
-Keyboard arrow keys are used to move a moving box around

Here we are doing all the work with javascript.
(none of the words are HTML, or DOM, elements.
The only DOM element is just the canvas on which
where are drawing and a text field and button where the
user can type data

Mouse event handlers are being added and removed.

Keyboard keyDown handler is being used to move a "moving box" around
Keyboard keyUP handler is used to trigger communication with the
server via POST message sending JSON data

*/

//DATA MODELS
//Use javascript array of objects to represent words and their locations
let words = []
words.push({word: "I", x: 50, y: 50})
words.push({word: "like", x: 70, y: 50})
words.push({word: "javascript", x: 120, y: 50})

let timer

const canvas = document.getElementById('canvas1')


function getWordAtLocation(aCanvasX, aCanvasY) {

  //locate the word near aCanvasX,aCanvasY
  //Just use crude region for now.
  //should be improved to using length of word etc.

  //note you will have to click near the start of the word
  //as it is implemented now

  //p2 solution
    var context = canvas.getContext('2d')
    context.font = '20pt Arial'
    const TOLERANCE = 20
    for(var i=0; i<words.length; i++){
       var wordWidth = context.measureText(words[i].word).width
     if((aCanvasX > words[i].x && aCanvasX < (words[i].x + wordWidth))  &&
        Math.abs(words[i].y - aCanvasY) < TOLERANCE) return words[i]
    }
    return null
}

//part 1
// Define a function called 'randomizeLocation' that updates the positions of words on the canvas.
function randomizeLocation() {
  // Get the 2D rendering context for the canvas element.
  const context = canvas.getContext('2d');

  // Set the font style for the canvas context.
  context.font = '20pt Arial';

  // Iterate through each word in the 'words' array.
  for (let word of words) {
    // Calculate a random X coordinate within the canvas width
    // while considering the width of the word to prevent overflow.
    word.x = Math.floor(Math.random() * (canvas.width - context.measureText(words.word).width));

    // Calculate a random Y coordinate within the canvas height
    // with a minimum vertical position to avoid text going out of the canvas.
    word.y = Math.floor(Math.random() * (canvas.height - 25) + 20);
  }
}

// Call the function to randomize word positions on the canvas.
randomizeLocation();



function drawCanvas() {
  /*
  Call this function whenever the canvas needs to be redrawn.
  */

  const context = canvas.getContext('2d')

  context.fillStyle = 'white'
  context.fillRect(0, 0, canvas.width, canvas.height)

  context.font = '20pt Arial'
  context.fillStyle = 'cornflowerblue'
  context.strokeStyle = 'blue'

  for (let i = 0; i < words.length; i++) {

    let data = words[i]
    context.fillText(data.word, data.x, data.y)
    context.strokeText(data.word, data.x, data.y)
  }
}
