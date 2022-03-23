
$(".message_btn").click(() => {
  $(".message").addClass("hidden");    
  $(".game").addClass("shown");
});


// Main colors of the game
buttonColours = ["red", "blue", "green", "yellow"];

// an array to store a game pattern
gamePattern=[];

// an array to store what button user pressed
userClickedPattern=[];

// Checker if game has satarted.
let gameStarted = false;

// to store at what level game currently is at
let level = 0;

// Function to randomly pick a color
function nextSequence() {
  userClickedPattern = [];
  
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);    
  playSound(randomChosenColour);  
  buttonAnimation(randomChosenColour);    
  level ++;
  $("#level-title").html("Level " + level);
}

// Function to detect what button user pressed and push that value into the array to store
$( ".btn" ).click(function() {
  let userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  buttonAnimation(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

// to check if user follows game's pattern
function checkAnswer(currentLevel) {
  // check if value of the last user answer is the same as game's
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
      //check if length of the array with user answers are the same as game's
      if (userClickedPattern.length === gamePattern.length) {
          // if all good then call function to create next game pattern
          setTimeout(function() {
              nextSequence();            
          }, 1000);
      }
      // if user pressed a wrong button
  } else {     
      playSound("wrong");
      $("body").addClass( "game-over");
      $( ".game_btn").html("Start Over!");
      setTimeout(function() {
          $("body").removeClass( "game-over");;            
      }, 250);
      if (window_width > 800) {
          $("#level-title").text("Game Over! Press Any Key to Restart.");            
      } else {
          $("#level-title").text("Game Over! Press START OVER button to Restart.");
      }
      
      startOver();                
  } 
 
}

// Function to play button sounds
function playSound(name) {      
  let audio = new Audio ('sounds/'+ name +'.mp3');
  audio.play();    
}

function buttonAnimation(button) {
  // button animation
  $("#" + button).fadeOut(100).fadeIn(100);    
}

$(document).keypress(function() {
  if (!gameStarted) {
  $( "#level-title").html("Level 0");
   nextSequence();
   gameStarted = true;
  };      
});

$( ".game_btn").html("Start the Game!");

$(".game_btn").click(function() {
  if (!gameStarted) {
  $( "#level-title").html("Level 0");
   nextSequence();
   gameStarted = true;
  };      
});

// function to restart the game
function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}


// hide button game on large screen
let window_width = window.innerWidth;
let window_height = window.innerHeight;

if (window_width > 800) {
  $(".game_btn").addClass("hide-content");
  $("#level-title").html("Press Any Key to Start");  
  $("#level-title").width( "60%" );  
};