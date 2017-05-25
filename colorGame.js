var numSquares = 6;
var colors = [];
var pickedColor;
// var randomColorHTML;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");


init();

function init() {
  //mode buttons event listeners
  setupModeButtons();
  //add click listeners to squares
  setupSquares();
  reset();
}

function setupModeButtons() {
  for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener('click', function(e) {
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");
      this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
      reset();
    });
  }
}

function setupSquares() {
  for (var i = 0; i < squares.length; i++) {
    squares[i].addEventListener("click", function(e) {
      //get color of squares
      var clickedColor = this.style.backgroundColor;
      //compare with pickedColor
      if (clickedColor === pickedColor) {
        messageDisplay.textContent = "Correct!";
        resetButton.textContent = "Play again?";
        changeColors(pickedColor);
        h1.style.backgroundColor = clickedColor;
      } else {
        this.style.backgroundColor = "#232323";
        messageDisplay.textContent = "Try again.";
      }
    });
  }
}

function reset() {
  //generate all new colors
  colors = generateRandomColors(numSquares);
  //pick a new random color from array
  pickedColor = pickColor();
  // change colorDisplay to match pickedColor but with spans to underline proper colors
  colorDisplay.innerHTML = insertSpan(pickedColor);

  //these 6 lines are there to insert underline into created spans containing r, g and b values in colorDisplay element. It's not best way to do it but for now I accept that
  var colorSpans = document.querySelectorAll("h1 > span > span");
  var spanColorsArray = ["red", "green", "blue"];
  for (var i = 0; i < colorSpans.length; i++) {
    colorSpans[i].style.borderRadius = "10px" ;
    colorSpans[i].style.border = "1px solid " + spanColorsArray[i] ;
    colorSpans[i].style.backgroundColor = spanColorsArray[i];
    // colorSpans[i].style.textDecoration = "underline";
    // colorSpans[i].style.textDecorationColor = spanColorsArray[i];
  }
  //

  // colorDisplay.textContent = pickedColor;
  resetButton.textContent = "New colors";
  //reset 'correct' to be blank
  messageDisplay.textContent = "";
  // change colors of square
  for (var i = 0; i < squares.length; i++) {
    if(colors[i]){
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }
  //reset bg color of h1
  h1.style.backgroundColor = "steelblue";
}

resetButton.addEventListener('click', function(e) {
  reset();
});

function changeColors(color) {
  //loop through all squares
  for (var i = 0; i < squares.length; i++) {
    //change colors of every square to picked one
    squares[i].style.backgroundColor = color;
  }
}

function pickColor() {
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}
function generateRandomColors(num) {
  //make an array
  var arr = [];
  //add num random colors to array
  for (var i = 0; i < num; i++) {
    //get random color and push into array
    arr.push(randomColor());
  }
  //return an array
  return arr;
}
function randomColor() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  return "rgb(" + r + ", " + g + ", " + b + ")";
}

function insertSpan(str) {
  var splitted = str.split(/\(|\)|, /);
  var openSpan = "<span>";
  var closeSpan = "</span>";
  return splitted[0] + "(" + openSpan + splitted[1] + closeSpan + ", "+ openSpan + splitted[2] + closeSpan + ", "+ openSpan + splitted[3] + closeSpan + ")"
}
