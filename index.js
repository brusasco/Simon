var buttonColors = ["red", "blue", "green", "yellow"];



var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

//CLICK TITLE TO START

$("#level-title").click(function() {
  if (!started) {
    $("#level-title").text("Level" + level + "!!!");

    nextSequence();

  }
});

//CLICK FUNCTION
$(".btn1").click(function() {

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);

});


//FUCNTIONS

function nextSequence() {

  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level).addClass("header");

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  if (started = true) {
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
  } else {

    setTimeout(function() {
      $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    }, 1000);
    setTimeout(function() {
      playSound(randomChosenColor), 1000;
    });
    started = true;

  }

}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}



function animatePress(currentColor) {

  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100)
}



function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over")
    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 200);

    $("#level-title").text("GAME OVER! CLICK ME TO RESTART");
    startOver();
  }

}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
