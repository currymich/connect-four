var user = require('./user')

const GameEngine = {
  gameOver: false,
  ai: false,
  currentPlayer: user.User1,
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
    if(this.currentPlayer == user.User1){
      this.currentPlayer = user.User2;
    } else {
      this.currentPlayer = user.User1;
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
        $('#newGame').css('display', 'block')
        GameEngine.updateWins();
        break;
      case null:
        console.log('draw')
        GameEngine.gameOver = true;
        ViewEngine.flashMessage('draw');
        GameEngine.togglePlayer();
        $('#newGame').css('display', 'block')
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
    if(GameEngine.currentPlayer == user.User1){
      user.User1.winCount++;
      user.User2.lossCount++;
    } else if (GameEngine.currentPlayer == user.User2) {
      user.User2.winCount++;
      user.User1.lossCount++;
    }
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
  },


  // aiMove: function(){},

  // aiDecide: function(){},

}

const ViewEngine = {
  updateSpace: function(columnNum, rowNum){
    $(`.column${columnNum} .row${rowNum}`).css('backgroundColor', GameEngine.currentPlayer.pieceColor)
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
    $('#newGame').css('display', 'none')
  },

  turnIndicator: function(columnNum, color){
    $(`#addPiece .column${columnNum}`).css('backgroundColor', color)
  }
}

const Controller = {
  onClickNewGame: function(event){
    GameEngine.resetGame();
  },

  onClickBoardSpace: function(event){
    let $space = $(event.target)
    // console.log(GameEngine.validMove($space.data('column')))
    if(GameEngine.validMove($space.data('column'))){
      GameEngine.makeMove($space.data('column'))
    }
  },

  // onClickAIGame: function(event){}
}

//Connects buttons and board positions to respective actions in GameController
$(document).ready(function(){
  $('#newGame').click(function(){Controller.onClickNewGame(event)})
  // $('#AI').click(function(){GameController.onClickAIGame(event)})
  $('.space').click(function(){
    Controller.onClickBoardSpace(event);
    var columnNum = event.target.dataset.column;
    ViewEngine.turnIndicator(columnNum, GameEngine.currentPlayer.pieceColor)
  })
  $('#board > div').hover(function(event) {
      var columnNum = event.target.dataset.column;
      if(GameEngine.validMove(columnNum))
      ViewEngine.turnIndicator(columnNum, GameEngine.currentPlayer.pieceColor)
    }, function(event) {
      var columnNum = event.target.dataset.column;
      ViewEngine.turnIndicator(columnNum, '#aaa')
  });
});
