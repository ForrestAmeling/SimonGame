var game = {
  count: 0,
  possibilities: ['#green', '#blue', '#red', '#yellow'],
  currentGame: [],
  player: [],
  sound: {
    red: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
    green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
    yellow: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
    blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
  },
  strict: false,
}

function clearGame() {
  game.currentGame = [];
  game.count = 0;
  addCount();
}

function newGame() {
  clearGame();
}

$('#reset').on('click', function(event) {
  clearGame();
});

$('#strict').on('click', function(event) {
  if (game.strict === false) {
    game.strict = true;
    clearGame();
    alert("Strict is on. One mistake, and it's all over!")
  } else {
    game.strict = false;
    clearGame();
    alert("Strict is off")
  }
});

function showMoves() {
  var i = 0;
  var moves = setInterval(function() {
    playGame(game.currentGame[i]);
    i++;
    if (i >= game.currentGame.length) {
      clearInterval(moves);
    }
  }, 700)

  clearPlayer();
}

function sound(name) {
  switch (name) {
    case '#green':
      game.sound.green.play();
      break;
    case '#blue':
      game.sound.blue.play();
      break;
    case '#red':
      game.sound.red.play();
      break;
    case '#yellow':
      game.sound.yellow.play();
      break;
  };
}

function playGame(field) {
  $(field).addClass('fill');
  sound(field);
  setTimeout(function() {
    $(field).removeClass('fill');
  }, 200);
}

function clearPlayer() {
  game.player = [];
}

function addToPlayer(id) {
  var field = "#" + id
  console.log(field);
  game.player.push(field);
  playerTurn(field);
}

function playerTurn(x) {
  if (game.player[game.player.length - 1] !== game.currentGame[game.player.length - 1]) {
    if (game.strict) {
      alert('You fail!');
      newGame();
    } else {
      alert('Nope!');
      showMoves();
    }
  } else {
    sound(x);
    var check = game.player.length === game.currentGame.length;
    if (check) {
      if (game.count == 20) {
        alert('You won!');
      } else {
        nextLevel();
      }
    }
  }
}

function nextLevel() {
  addCount();
}

function generateMove() {
  game.currentGame.push(game.possibilities[(Math.floor(Math.random() * 4))]);
  //alert(game.currentGame.length);
  showMoves();
}

function addCount() {
  game.count++;
  $('#count').addClass('animated fadeOutDown');

  setTimeout(function() {
    $('#count').removeClass('fadeOutDown').html(game.count).addClass('fadeInDown');
  }, 200);

  generateMove();
}

newGame();

