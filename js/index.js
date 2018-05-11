/* REFERENCJE DO HTML-A */
var rock = document.getElementById('btn-rock');
var scissors = document.getElementById('btn-scissors');
var paper = document.getElementById('btn-paper');
var output = document.getElementById('output');
var outputPlayerWin = document.getElementById('outputPlayerWin');
var outputComputerWin = document.getElementById('outputComputerWin');
var newGameElem = document.getElementById('btn-newgame');
var outputPlayerName = document.getElementById('outputPlayerName');
var playername = document.getElementById('outputPlayerName');
var playerPoints = document.getElementById('outputPlayerCountWin');
var computerPoints = document.getElementById('outputComputerCountWin');
var playerPanel = document.getElementById('playerPanel');
var computerPanel = document.getElementById('computerPanel');
var buttonsPanel = document.getElementById('buttonsPanel');


/************ STARTOWE ZMIENNE ****************/

//var choice;
var player = { name: '', score: 0, choice: ''};
var computer = { score: 0, choice: '' };
var gameState = 'notStarted';
var roundsAmount = 10;

/************** NASŁCUHWIACZE **************/

newGameElem.addEventListener('click', newGame);
rock.addEventListener('click', function() { playerChoice("rock"); });
scissors.addEventListener('click', function() { playerChoice("scissors");});
paper.addEventListener('click', function() { playerChoice("paper");});

/************* USTAWIENIE PLANSZY ****************/

function setGame() {
  switch(gameState) {
    case 'started':
        newGameElem.style.display = 'none';
        playerPanel.style.display = 'flex';
        computerPanel.style.display = 'flex';
        buttonsPanel.style.display = 'flex';
      break;
    case 'ended':
        setTimeout(function(){
        newGameElem.innerText = 'Jeszcze raz';
        newGameElem.style.display = 'block';
        playerPanel.style.display = 'none';
        computerPanel.style.display = 'none';
        buttonsPanel.style.display = 'none';
        }, 100)
      break;
    case 'notStarted':
        newGameElem.style.display = 'block';
        playerPanel.style.display = 'none';
        computerPanel.style.display = 'none';
        buttonsPanel.style.display = 'none';
        break;
    default:
        break;
        
  }
}

setGame();

/*********** NOWA GRA **************/

function newGame() {
  player.name = window.prompt('Enter your name');
  roundsAmount = window.prompt('Enter rounds amount');
  
  if((player.name.length > 0) && !(isNaN(roundsAmount))) {
   
    player.score = 0;
    computer.score = 0;
    outputPlayerWin.innerHTML = " ";
    outputComputerWin.innerHTML = " ";
    setGamePoints();
    
    gameState = 'started';
    setGame();
  
    outputPlayerName.innerHTML = player.name;
  }
  else if(player.name.length == 0){
  alert('Wpisz poprawnę imię!');
  }
  else if((isNaN(roundsAmount))){
    alert('Wpisz właściwą liczbę rund!');
  }
}

/*********** AKTUALIZOWANIE PUNKTÓW ****************/

function setGamePoints() {
    outputPlayerCountWin.innerHTML = player.score;
    outputComputerCountWin.innerHTML = computer.score;
}

/********** WYBÓR KOMPUTERA ***********/

function computerChoice() {
  var randomChoice = Math.floor(Math.random() * 3);
  if(randomChoice == 0){
    choice = 'rock';
  }
  else if(randomChoice == 1){
    choice = 'scissors';
  }
  else if(randomChoice == 2){
    choice = 'paper';
  }
  return choice;
}

/****************** WYBÓR GRACZA **************/

function playerChoice(playerPick) {
  
  player.choice = playerPick;
  computer.choice = computerChoice();
  output.innerHTML = player.choice;
  output2.innerHTML = computer.choice;

  whoWin();
  
  isWinner();
}

/******************* KTO WYGRAŁ ************/

function whoWin(){
  
  if(
    (player.choice == 'paper' && computer.choice == 'rock') ||
    (player.choice == 'rock' && computer.choice == 'scissors') ||
    (player.choice == 'scissors' && computer.choice == 'paper')) {
    
      outputPlayerWin.innerHTML = "Wygrana!";
      outputComputerWin.innerHTML = " ";
      player.score++;
  }    
  else if(player.choice == computer.choice) {
    outputPlayerWin.innerHTML = "Remis!";
    outputComputerWin.innerHTML = "Remis!";
    //remis
  } else {
      outputComputerWin.innerHTML = "Wygrana!";
      outputPlayerWin.innerHTML = " ";
      computer.score++;
  }
  
  setGamePoints();
}


/******************* CZY KONIEC GRY? ************/

function isWinner() {
  
  if(player.score == roundsAmount || computer.score == roundsAmount) {
     gameState = 'ended';
     setGame();
     
     var winner = (player.score > computer.score) ? player.name : 'Computer';
     setTimeout(function() { alert('Zwyciężył '+winner) }, 100);
  }
}