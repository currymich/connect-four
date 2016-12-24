var user = require('./user')

const GameEngine = {
  gameOver: true,
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

  validMove: function(column){
    if(this.board[`column${column}`].includes(null)){
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
    GameEngine.togglePlayer();
    console.log(GameEngine.checkVictory());
    
  },

  checkVictory: function(){
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

    return false;

  },

  updateWins: function(){

  },

  resetGame: function(){

  },

  // aiMove: function(){},

  // aiDecide: function(){},

}

const ViewEngine = {
  updateSpace: function(columnNum, rowNum){
    $(`.column${columnNum} .row${rowNum}`).css('backgroundColor', GameEngine.currentPlayer.pieceColor)
  },

  flashMessage: function(msg){

  },

  resetBoard: function(){

  },
}

const Controller = {
  onClickNewGame: function(event){
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
  // $('#two_player').click(function(){GameController.onClickNewGame(event)})
  // $('#AI').click(function(){GameController.onClickAIGame(event)})
  $('.space').click(function(){Controller.onClickBoardSpace(event)})
});
