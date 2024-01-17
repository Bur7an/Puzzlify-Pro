//KEY CODES
//should clean up these hard-coded key codes
const ENTER = 13

// array to store user's attempt
let user_attempt = new Array()

function handleKeyDown(e) {}

function handleKeyUp(e) {
  if (e.which == ENTER) {
    handlePuzzleButton() //ENTER key treated like a submit
    document.getElementById('userTextField').value = ''
  }
}

function handlePuzzleButton() {

  let userText = document.getElementById('userTextField').value
  if (userText && userText != '') {
    let userRequestObj = { text: userText }
    let userRequestJSON = JSON.stringify(userRequestObj)
    document.getElementById('userTextField').value = ''
    let textDiv = document.getElementById('text-area')
    textDiv.innerHTML = ''
    textDiv.innerHTML = textDiv.innerHTML + `<p style="color: black"><strong>${userText}</strong></p>`
    //alert ("You typed: " + userText);

    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        
        // We anticipate that the response text will be in the form of a JSON string
        let responseObj = JSON.parse(this.responseText)

        words = [] // reset words
        for (let i = 0; i < responseObj.originalLines.length; ++i) {
          for (let word of responseObj.originalLines[i].split(" "))
          words.push({word: word, x: 50, y: 50})
        } randomizeLocation()

        delete responseObj.originalLines
        console.log("data: " + JSON.stringify(responseObj))
        console.log("typeof: " + typeof this.responseText)

        drawCanvas()
      }
    }
    xhttp.open("POST", "userText") //API .open(METHOD, URL)
    xhttp.send(userRequestJSON) //API .send(BODY)
  }
}

/**
 * Handles user's puzzle-solving attempt:
 * 1. Aligns and organizes words into rows based on their positions.
 * 2. Checks the correctness of the user's attempt.
 * 3. Displays the attempt with appropriate styling and logs the result.
 */

function handleSolveButton() {
  // reset user attempt array
  user_attempt = []

  // Define constants for vertical bounds and row height
  const MINIMUM_Y = 20
  const MAXIMUM_Y = 280
  const HEIGHT_OF_ROWS = 26

  // Calculate the number of rows that can fit within the specified vertical bounds
  const NUM_ROWS = Math.floor((MAXIMUM_Y - MINIMUM_Y) / HEIGHT_OF_ROWS) + 1

  // Populate the user attempt array with empty arrays (one for each row)
  for (let i = 0; i < NUM_ROWS; ++i) user_attempt.push([])

  // Snap words to the nearest row and organize them into their respective rows
  for (let word of words) {
      let y = Math.min(Math.max(Math.floor((word.y + 10) / HEIGHT_OF_ROWS) * HEIGHT_OF_ROWS, MINIMUM_Y), MAXIMUM_Y)
      word.y = y
      let index = Math.floor((y + 10 - MINIMUM_Y) / HEIGHT_OF_ROWS)
      user_attempt[index].push(word)
  }

  // Sort words within each row by their X coordinates

  for (let row of user_attempt)
      row.sort((a, b) => a.x - b.x)

  // Display the user's attempt as plaintext and provide feedback on correctness
  let plain_text = ""
  let textDiv = document.getElementById("text-area")
  textDiv.innerHTML = ''

  for (let arr of user_attempt) {
      for (let word of arr)
          plain_text += word.word + " "
      if (arr.length > 0)
          plain_text += "<br>"
  }

  // Check if the attempt is correct
  let comparison = true

  for (let i = 0; i < words.length; ++i)
      if (user_attempt.flat()[i].word !== words[i].word) comparison = false

  // Display the result and provide appropriate styling
  if (comparison)
      textDiv.innerHTML += `<p style="color: green;"> ${plain_text}</p>`
  else
      textDiv.innerHTML += `<p style="color: red;"> ${plain_text}</p>`

  // Log the result
  console.log(comparison);
}

