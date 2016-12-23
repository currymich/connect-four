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
    console.log('this works too')
  },

  onClickLogout: function(event){
    console.log('does this')
  }
}

module.exports = {
  User1:User1,
  User2:User2,
  AuthController:AuthController
}
