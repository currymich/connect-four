const User1 = {
  displayName: 'Player 1',
  email: null,
  pass: null,
  winCount: 0,
  lossCount: 0,
  pieceColor: 'red',
  profilePic: './img/profile_pic.jpg'
}

const User2 = {
  displayName: 'Mike',
  email: null,
  pass: 'hello',
  winCount: 0,
  lossCount: 0,
  pieceColor: 'black',
  profilePic: './img/me.jpg'
}

const AuthController = {
  onClickLogin: function(event){
  },

  onClickLogout: function(event){
  }
}

const ViewEngine = {
  updateHeader: function(){
    $('#p1_piece').css('backgroundColor', User1.pieceColor);
    $('#p2_piece').css('backgroundColor', User2.pieceColor);
    $('#p1_pic').attr('src', User1.profilePic);
    $('#p2_pic').attr('src', User2.profilePic);
    $('#p1_name').html(`${User1.displayName}`);
    $('#p2_name').html(`${User2.displayName}`);
  }
}


$(document).ready(function(){
  ViewEngine.updateHeader();

});

module.exports = {
  User1:User1,
  User2:User2
}
