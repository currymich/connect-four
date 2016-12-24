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

  makeMove: function(column) {
    for(var row = 0; row < 6; row++){
      if(this.board[`column${column}`][row] == null){
        this.board[`column${column}`][row] = this.currentPlayer.pieceColor;
        ViewEngine.updateSpace(column, row);
        break;
      }
    }
    GameEngine.togglePlayer();
  },

  checkVictory: function(){

  },

  updateWins: function(){

  },

  resetGame: function(){

  },

  // aiMove: function(){},

  // aiDecide: function(){},

}

const ViewEngine = {
  updateSpace: function(column, row){
    $(`.column${column} .row${row}`).css('backgroundColor', GameEngine.currentPlayer.pieceColor)
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
