// 10secMath.js

$(document).ready(function(){
  var currentQuestion;
  var interval;
  var timeLeft = 10;
  var score = 0;
  var highScore = 0;
  var number;
  
  var updateTimeLeft = function (amount) {
    timeLeft += amount;
    $('#time-left').text(timeLeft);
  };
  
  var updateScore = function (amount) {
    score += amount;
    $('#score').text(score);
  };
  
  var updateHighScore = function (num){
    $('#highScore').text(num);
  }
  
  var startGame = function () {
    if (!interval) {
      if (timeLeft === 0) {
        updateTimeLeft(10);
        
        if(score>highScore){
            highScore = score;
            updateHighScore(highScore);
        }
        updateScore(-score);
      }
      interval = setInterval(function () {
        updateTimeLeft(-1);
        if (timeLeft === 0) {
          clearInterval(interval);
          interval = undefined;
        }
      }, 1000);  
    }
  };
  
  var slider = document.getElementById("myRange");
  var output = document.getElementById("demo");
  output.innerHTML = slider.value;

  slider.oninput = function() {
    output.innerHTML = this.value;      
  }
  
  //Need to grab number value 
  number = $("#myRange").val();

  $(document).on('input', '#myRange', function() {
    number = $(this).val();  
  })
 
  var randomNumberGenerator = function (size) {
    return Math.ceil(Math.random() * size);
  };
  
  var questionGenerator = function () {
    var question = {};
    var num1 = randomNumberGenerator(number);
    var num2 = randomNumberGenerator(number);
        
    if($("#Add").prop('checked')){
        question.answer = num1 + num2;
        question.equation = String(num1) + " + " + String(num2);
    }
    
    if($("#Subtract").prop('checked')){
        
        for(var i=0; i<=10; i++){            
            if(num1>=num2){                
                break;
            }
            else{
                num1 = randomNumberGenerator(number);
                i++;
            }
        }        
        
        question.answer = num1 - num2;
        question.equation = String(num1) + " - " + String(num2);
    }
    
    if($("#Multiply").prop('checked')){
        question.answer = num1 * num2;
        question.equation = String(num1) + " * " + String(num2);
    }
    
    if($("#Divide").prop('checked')){
        for(i=2; i<=10; i++){
            dividend=num1%i;
            if(dividend===0){
                num2=i;
                break;
            }
            else{
                num1 = randomNumberGenerator(number);
                i=2;
            }
        }
        
        question.answer = num1 / num2;
        question.equation = String(num1) + " / " + String(num2);
    }      
        
    return question;
  };
  
  var renderNewQuestion = function () {      
    currentQuestion = questionGenerator();
    $('#equation').text(currentQuestion.equation);      
  };
  
  var checkAnswer = function (userInput, answer) {
    if (userInput === answer) {
      renderNewQuestion();
      $('#user-input').val('');
      updateTimeLeft(+1);
      updateScore(+1);
    }
  };
   
  $('#user-input').on('keyup', function () {
    startGame();
    checkAnswer(Number($(this).val()), currentQuestion.answer);
    
  });
  
    renderNewQuestion();
});