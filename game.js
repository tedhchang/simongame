var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("." + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

  level++;
  $("#level-title").text("Level " + level);
}

$(".btn").click(function() {

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  checkAnswer(userClickedPattern.length - 1)
  playSound(userChosenColor);
  animatePress(userChosenColor);
})

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed")
  setTimeout(function() {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}


$(document).on("keypress", function() {
  if (started === false) {
    nextSequence()
    started = true
  }
})

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    var audio = new Audio("sounds/wrong.mp3");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200)
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
