// Wait for the DOM content to be fully loaded before executing JavaScript
  document.addEventListener('DOMContentLoaded', function() {
  // This function is called after the web page has been loaded.

  // Add a mouse-down event listener to the canvas element.
  document.getElementById('canvas1').addEventListener('mousedown', handleMouseDown)

  // Add a click event listener to the "Puzzle" button.
  document.getElementById('puzzle_button').addEventListener('click', handlePuzzleButton)

  // Add a click event listener to the "Solve" button using the Fetch API.
  document.getElementById('solve_button').addEventListener('click', handleSolveButton)

  // Add key event handlers for the entire document, not specific elements.
  document.addEventListener('keydown', handleKeyDown)
  document.addEventListener('keyup', handleKeyUp)

  // Set up a timer to call the handleTimer function every 100 milliseconds.
  timer = setInterval(handleTimer, 100)

  // Initialize and draw the canvas.
  drawCanvas()
})
