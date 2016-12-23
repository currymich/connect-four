var user = require('./user')

console.log(user.User2['pass'])
console.log(user.AuthController.onClickLogin(event))
console.log(user.AuthController.onClickLogout(event))

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

  },

  validMove: function(position){

  },

  makeMove: function(position) {

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
  updateSpace: function(){

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

  },

  // onClickAIGame: function(event){}
}
