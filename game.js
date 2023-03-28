// Welcome note
alert("Hi, This is the Simon Game");

// required variables for edcision making
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// event handler to execute when a key is pressed from keyboard
$(document).keydown(function () {
  if (started == false) {
    // pres sot start the game
    started = true;
    nextSequence();
  }
});

// event handler to execute when a button is clicked
$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

// randomly setting the new color for the sequence
function nextSequence() {
  userClickedPattern = [];
  $("#level-title").text("Level " + ++level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
}

// when buttons are clicked or randomly set
function playSound(name) {
  var color = new Audio("sounds/" + name + ".mp3");
  color.play();
}

// animation if a button is pressed
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// decision making
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    // corresponding colors are same
    if (gamePattern.length === userClickedPattern.length) {
      // all the colors of the game pattern are entered

      setTimeout(function () {
        // call for the new pattern in the sequence after a given 1000ms delay
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

// restart the game. by reinitialising values
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
