// Initialize Firebase
var config = {
  apiKey: "AIzaSyBI6sUQ6PCxQrvWGpAp8TKsO9FYi_iULCI",
  authDomain: "connect-four-780e9.firebaseapp.com",
  databaseURL: "https://connect-four-780e9.firebaseio.com",
  storageBucket: "connect-four-780e9.appspot.com",
  messagingSenderId: "857718574300"
};
firebase.initializeApp(config);

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

//https://youtu.be/-OKrloDzGpU?list=PLl-K7zZEsYLmnJ_FpMOZgyg6XcIGBu2OX
  $('#loginBtn').click(function(event){
    const email = $('#emailAddr').val();
    const pass = $('#password').val();
    const auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(function(error){console.log(error.message)});
  });

  $('#signUpBtn').click(function(event){
    const email = $('#emailAddr').val();
    const pass = $('#password').val();
    const auth = firebase.auth();

    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(function(error){console.log(error.message)});
  });

  $('#logoutBtn').click(function(event){
    firebase.auth().signOut();
  });

  firebase.auth().onAuthStateChanged(function(firebaseUser){
    if(firebaseUser){
      console.log(firebaseUser);
      $('#logoutBtn').removeClass('hide');
    } else {
      console.log('not logged in')
      $('#logoutBtn').addClass('hide');
    }
  });

});

module.exports = {
  User1:User1,
  User2:User2
}
