// Initialize Firebase
var config = {
  apiKey: "AIzaSyBI6sUQ6PCxQrvWGpAp8TKsO9FYi_iULCI",
  authDomain: "connect-four-780e9.firebaseapp.com",
  databaseURL: "https://connect-four-780e9.firebaseio.com",
  storageBucket: "connect-four-780e9.appspot.com",
  messagingSenderId: "857718574300"
};
firebase.initializeApp(config);

const AI = {
  displayName: 'Computer',
  winCount: 0,
  lossCount: 0,
  pieceColor: 'red',
  profilePic: './img/computer.jpg'
}

var ActivePlayer = {}
var userId;

const GameEngine = {
  gameOver: false,
  ai: false,
  currentPlayer: ActivePlayer,
  board: {
    column0: Array(6).fill(null),
    column1: Array(6).fill(null),
    column2: Array(6).fill(null),
    column3: Array(6).fill(null),
    column4: Array(6).fill(null),
    column5: Array(6).fill(null),
    column6: Array(6).fill(null)
  },

  togglePlayer: function(){
    if(this.currentPlayer == ActivePlayer && this.gameOver == false){
      this.currentPlayer = AI;
      GameEngine.aiMove();
    } else {
      this.currentPlayer = ActivePlayer;
    }
  },

  validMove: function(columnNum){
    if(this.board[`column${columnNum}`].includes(null) && this.gameOver == false){
      return true;
    } else {
      return false;
    }
  },

  makeMove: function(columnNum) {
    for(var rowNum = 0; rowNum < 6; rowNum++){
      if(this.board[`column${columnNum}`][rowNum] == null){
        this.board[`column${columnNum}`][rowNum] = this.currentPlayer.pieceColor;
        ViewEngine.updateSpace(columnNum, rowNum);
        break;
      }
    }

    switch (GameEngine.checkVictory()) {
      case true:
        console.log('win')
        GameEngine.gameOver = true;
        ViewEngine.flashMessage('win');
        $('#gameButtons').css('display','block')
        $('#addPiece').css('display', 'none')
        GameEngine.updateWins();
        break;
      case null:
        console.log('draw')
        GameEngine.gameOver = true;
        ViewEngine.flashMessage('draw');
        GameEngine.togglePlayer();
        $('#gameButtons').css('display', 'block')
        $('#addPiece').css('display', 'none')
        break;
      default:
        console.log('next player')
        GameEngine.togglePlayer();
    }
  },

  checkVictory: function(){
    //Idea for "every" function check came from first answer here: http://stackoverflow.com/questions/29711396/can-you-compare-multiple-variables-to-see-if-they-all-equal-the-same-value-in-js

    //check vertical 4-in-a-row
    for(var rowNum = 0; rowNum+3 < 6; rowNum++){
      for(var columnNum = 0; columnNum < 7; columnNum++){
        var vertCheck = (this.board[`column${columnNum}`].slice(rowNum, rowNum+4))

        if(vertCheck.every(function(n){return n == vertCheck[0] && n != null})){
          return true;
        }
      }
    }

    //check horizontal 4-in-a-row
    for(var rowNum = 0; rowNum < 6; rowNum++){
      for(var columnNum = 0; columnNum+3 < 7; columnNum++){
        var horzCheck = []
        horzCheck[0] = this.board[`column${columnNum}`][rowNum];
        horzCheck.push(this.board[`column${columnNum+1}`][rowNum]);
        horzCheck.push(this.board[`column${columnNum+2}`][rowNum]);
        horzCheck.push(this.board[`column${columnNum+3}`][rowNum]);

        if(horzCheck.every(function(n){return n == horzCheck[0] && n != null})){
          return true;
        }
      }
    }

    //check forward diagonal 4-in-a-row ie - /
    for(var rowNum = 0; rowNum+3 < 6; rowNum++){
      for(var columnNum = 0; columnNum+3 < 7; columnNum++){
        var forwardDiagCheck = []
        forwardDiagCheck[0] = this.board[`column${columnNum}`][rowNum];
        forwardDiagCheck.push(this.board[`column${columnNum+1}`][rowNum+1]);
        forwardDiagCheck.push(this.board[`column${columnNum+2}`][rowNum+2]);
        forwardDiagCheck.push(this.board[`column${columnNum+3}`][rowNum+3]);
        if(forwardDiagCheck.every(function(n){return n == forwardDiagCheck[0] && n != null})){
          return true;
        }
      }
    }

    //check backward diagonal 4-in-a-row ie - \
    for(var rowNum = 0; rowNum+3 < 6; rowNum++){
      for(var columnNum = 0; columnNum+3 < 7; columnNum++){
        var backDiagCheck = []
        backDiagCheck[0] = this.board[`column${columnNum}`][rowNum+3];
        backDiagCheck.push(this.board[`column${columnNum+1}`][rowNum+2]);
        backDiagCheck.push(this.board[`column${columnNum+2}`][rowNum+1]);
        backDiagCheck.push(this.board[`column${columnNum+3}`][rowNum]);
        if(backDiagCheck.every(function(n){return n == backDiagCheck[0] && n != null})){
          return true;
        }
      }
    }

    var drawCheck = true;
    for(var columnNum = 0; columnNum < 7; columnNum++){
      //if there is still a single null on the board, drawCheck will remain
      //true and victory check will return null to signal this, otherwise
      //victory check will return false to signal the game is not over, keep playing
      if(this.board[`column${columnNum}`].includes(null)){
        drawCheck = false;
      }
    }

    if(drawCheck == true){
      return null;
    } else {
      return false;
    }
  },

  updateWins: function(){
    var updates = {};
    if(GameEngine.currentPlayer == ActivePlayer){
      ActivePlayer.winCount++;
      updates['/users/' + userId + '/winCount'] = ActivePlayer.winCount;
      ActivePlayer.totalGames++;
      updates['/users/' + userId + '/totalGames'] = ActivePlayer.totalGames;
    } else if (GameEngine.currentPlayer == AI) {
      ActivePlayer.totalGames++;
      updates['/users/' + userId + '/totalGames'] = ActivePlayer.totalGames;
    }
    return firebase.database().ref().update(updates);
  },

  resetGame: function(){
    GameEngine.gameOver = false;
    GameEngine.board = {
      column0: Array(6).fill(null),
      column1: Array(6).fill(null),
      column2: Array(6).fill(null),
      column3: Array(6).fill(null),
      column4: Array(6).fill(null),
      column5: Array(6).fill(null),
      column6: Array(6).fill(null)
    };
    ViewEngine.flashMessage('clear');
    ViewEngine.resetBoard();
    if(this.currentPlayer == AI){
      GameEngine.aiMove();
    }
  },


  aiMove: function(){
    if(GameEngine.gameOver == false){
      var columnNum = GameEngine.aiDecide();
      if(GameEngine.validMove(columnNum)){
        window.setTimeout(function(){GameEngine.makeMove(columnNum)}, 400);
      } else {
        console.log('bad move')
        GameEngine.aiMove()
      }
    }
  },

  aiDecide: function(){
    var randomMove = Math.floor(Math.random()*7);
    console.log('random try')
    return randomMove;
  },

}

const ViewEngine = {
  updateSpace: function(columnNum, rowNum){
    $(`[data-column="${columnNum}"][data-row="${rowNum}"]`).css('backgroundColor', GameEngine.currentPlayer.pieceColor)
  },

  flashMessage: function(msg){
    if(msg == 'win'){
      $('#flashMsg').html(`${GameEngine.currentPlayer.displayName} has won!`)
    } else if (msg == 'draw') {
      $('#flashMsg').html(`This match is a draw!`)
    } else if (msg == 'clear') {
      $('#flashMsg').html('')
    }
  },

  resetBoard: function(){
    $('#board .space').css('backgroundColor', '#bbb')
    $('#gameButtons').css('display', 'none')
    $('#addPiece').css('display', 'block')
  },

  turnIndicator: function(columnNum, color){
    $(`#addPiece [data-column="${columnNum}"]`).css('backgroundColor', color)
    $('#turnDisplay .space').css('backgroundColor', color)
  },

  updateHeader: function(){
    $('#p1_piece').css('backgroundColor', ActivePlayer.pieceColor);
    $('#p2_piece').css('backgroundColor', AI.pieceColor);
    $('#p1_pic').attr('src', ActivePlayer.profilePic);
    $('#p2_pic').attr('src', AI.profilePic);
    $('#p1_name').html(`${ActivePlayer.displayName}`);
    $('#p2_name').html(`${AI.displayName}`);
  },

  updateProfile: function(){
    $('.form table').html(`
      <tr>
        <td>Display Name: </td>
        <td>${ActivePlayer.displayName}</td>
      </tr>
      <tr>
        <td>Email: </td>
        <td>${ActivePlayer.email}</td>
      </tr>
      <tr>
        <td>Wins: </td>
        <td>${ActivePlayer.winCount}</td>
      </tr>
      <tr>
        <td>Total Games: </td>
        <td>${ActivePlayer.totalGames}</td>
      </tr>
      <tr>
        <td>Player Rank: </td>
        <td>${ActivePlayer.rank}</td>
      </tr>
      <tr>
        <td>Piece Color: </td>
        <td>${ActivePlayer.pieceColor}</td>
      </tr>`)
  }
}

const GameController = {
  onClickNewGame: function(event){
    GameEngine.resetGame();
  },

  onClickBoardSpace: function(event){
    let $space = $(event.target)
    // console.log(GameEngine.validMove($space.data('column')))
    if(GameEngine.validMove($space.data('column'))){
      GameEngine.makeMove($space.data('column'))
    }
    // var columnNum = event.target.dataset.column;
    // if(GameEngine.validMove(columnNum))
    // ViewEngine.turnIndicator(columnNum, GameEngine.currentPlayer.pieceColor)
  },

  // onClickAIGame: function(event){}
}

const AuthController = {
  onClickLogin: function(event){
    const email = $('#emailAddr').val();
    $('#emailAddr').val('');
    const pass = $('#password').val();
    $('#password').val('');
    const auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(function(error){
      code = error.code;
      message = error.message;
    });
    promise.then(function(){}, function(){
      code = code.split('-')
      if(code[1]=='email'){
        $('#emailAddr').addClass('error')
      } else if (code[1]=='password') {
        $('#password').addClass('error')
      };
      $('#loginArea div').html(`${message}`)
  })
},

  onClickSignup: function(event){
    const email = $('#emailAddr').val();
    $('#emailAddr').val('');
    const pass = $('#password').val();
    $('#password').val('');
    const auth = firebase.auth();
    var code;
    var message;

    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(function(error){
      code = error.code;
      message = error.message;
    });
    promise.then(function(){
      var userId = auth.currentUser.uid;
      DatabaseController.addUserToDatabase(email, userId);
    }, function(){
      code = code.split('-')
      if(code[1]=='email'){
        $('#emailAddr').addClass('error')
      } else if (code[1]=='password') {
        $('#password').addClass('error')
      };
      $('#loginArea div').html(`${message}`)
    });
  },

  onClickInput: function(event){
    $('.input').removeClass('error')
    $('#loginArea div').html('')
  },

  onClickLogout: function(event){
    firebase.auth().signOut();
  }
}

const DatabaseController = {
  addUserToDatabase: function(email, userId){
    firebase.database().ref('users/' + userId).set({
      displayName: email,
      email: email,
      winCount: 0,
      totalGames: 0,
      rank: '0 of 0',
      pieceColor: 'black',
      profilePic: './img/profile_pic.jpg'
    })
  },

  updateUser: function(){
    var updates = {};
    if($('#colors').val()){
      updates['/users/' + userId + '/pieceColor'] = $('#colors').val();
      ActivePlayer.pieceColor = $('#colors').val()
    }
    $('#colors').val('');
    if($('#newDisplayName').val()){
      updates['/users/' + userId + '/displayName'] = $('#newDisplayName').val();
      ActivePlayer.displayName = $('#newDisplayName').val()
    }
    $('#newDisplayName').val('');
    return firebase.database().ref().update(updates);
  },

 //https://firebase.google.com/docs/reference/js/firebase.database.DataSnapshot
 //http://stackoverflow.com/questions/1069666/sorting-javascript-object-by-property-value
  updateRank: function(){
    var updates = {};
    var scores = {};
    var rank;
    var total;
    var query = firebase.database().ref("users");
    query.on('value', function(snapshot){
      snapshot.forEach(function(childSnapshot) {
        scores[childSnapshot.key] = childSnapshot.val().winCount;
      });
      var sortedKeys = Object.keys(scores).sort(function(a,b){return scores[a]-scores[b]}).reverse();
      rank = sortedKeys.indexOf(firebase.auth().currentUser.uid)+1;
      total = sortedKeys.length;
      var formatted = `${rank} of ${total}`;
      updates['/users/' + userId + '/rank'] = formatted;
      return firebase.database().ref().update(updates);
    });
  }
}

//Connects buttons and board positions to respective actions in GameController
$(document).ready(function(){
  $('#newGame').click(function(){
    GameController.onClickNewGame(event)
  });

  $('#board .space').click(function(){
    GameController.onClickBoardSpace(event);
  });
//https://youtu.be/-OKrloDzGpU?list=PLl-K7zZEsYLmnJ_FpMOZgyg6XcIGBu2OX
  $('#loginBtn').click(function(event){
    AuthController.onClickLogin(event);
  });

  $('#signUpBtn').click(function(event){
    AuthController.onClickSignup(event);
  });

  $('#logoutBtn').click(function(event){
    AuthController.onClickLogout(event);
  });

  $('#startGame').click(function(event){
    window.location.href='./game.html'
  });

  $('#submitUpdates').click(function(event){
    DatabaseController.updateUser();
  });

  $('#profile').click(function(event){
    window.location.href='./index.html'
  })

  $('.input').click(function(event){
    AuthController.onClickInput(event);
  })

  firebase.auth().onAuthStateChanged(function(firebaseUser){
    if(firebaseUser){
      userId = firebase.auth().currentUser.uid;
      var currentUser = firebase.database().ref('/users/' + userId);
      currentUser.on('value', function(snapshot) {
        console.log(snapshot.val());
        DatabaseController.updateRank();
        ActivePlayer = snapshot.val();
        ViewEngine.updateHeader();
        GameEngine.togglePlayer();
        ViewEngine.updateProfile();
      });
      $('#loginArea').addClass('hide');
      $('#updateArea').removeClass('hide');
    } else {
      console.log('No user logged in')
      $('#loginArea').removeClass('hide');
      $('#updateArea').addClass('hide');
    }
  });

  //show color of current player at top of column on hover
  $('#board .space').hover(function(event) {
      var columnNum = event.target.dataset.column;
      if(GameEngine.validMove(columnNum))
      ViewEngine.turnIndicator(columnNum, GameEngine.currentPlayer.pieceColor)
    }, function(event) {
      ViewEngine.turnIndicator(event.target.dataset.column, '#fff')
  });
});
