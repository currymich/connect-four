(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var user = require('./user')

const GameEngine = {
  gameOver: true,
  ai: false,
  currentPlayer: user.User1,
  board: {
    column0: Array(6).fill('red'),
    column1: Array(6).fill(null),
    column2: Array(6).fill(null),
    column3: Array(6).fill(null),
    column4: Array(6).fill(null),
    column5: Array(6).fill(null),
    column6: Array(6).fill(null)
  },

  togglePlayer: function(){

  },

  validMove: function(column){
    if(this.board[`column${column}`].includes(null)){
      return true;
    } else {
      return false;
    }
  },

  makeMove: function(column) {
    for(var i = 0; i < 6; i++){
      if(this.board[`column${column}`][i] == null){
        this.board[`column${column}`][i] = this.currentPlayer.pieceColor;
        $(`.column${column} .row${i}`).css('backgroundColor', this.currentPlayer.pieceColor)
        console.log(this.board)
        break;
      }
    }
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

},{"./user":2}],2:[function(require,module,exports){
const User1 = {
  displayName: null,
  email: null,
  pass: null,
  winCount: 0,
  lossCount: 0,
  pieceColor: 'red'
}

const User2 = {
  displayName: null,
  email: null,
  pass: 'hello',
  winCount: 0,
  lossCount: 0,
  pieceColor: 'black'
}

const AuthController = {
  onClickLogin: function(event){
  },

  onClickLogout: function(event){
  }
}

module.exports = {
  User1:User1,
  User2:User2,
  AuthController:AuthController
}

},{}]},{},[1]);
