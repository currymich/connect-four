const User1 = {
  displayName: null,
  email: null,
  pass: null,
  winCount: 0,
  lossCount: 0,
  pieceColor: '#ccffcc'
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

$(document).ready(function(){
  $('#p1_piece').css('backgroundColor', User1.pieceColor)
  $('#p2_piece').css('backgroundColor', User2.pieceColor)
});

module.exports = {
  User1:User1,
  User2:User2
}
