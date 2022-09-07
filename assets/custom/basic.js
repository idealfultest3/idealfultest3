var firebaseConfig = {
  apiKey: 'AIzaSyBK3aa9YsE-wFD2LnNajrZut0f1FkK_XAA',
  authDomain: 'prj-idealful.firebaseapp.com',
  projectId: 'prj-idealful',
  storageBucket: 'prj-idealful.appspot.com',
  messagingSenderId: '998791546161',
  appId: '1:998791546161:web:86f421167b8994353f5c10',
  measurementId: 'G-1729P7M5X1',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

$(document).ready(function ($) {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log('login : ', user);
      $('#profile').css('display', 'block');
      $('#profile_img').attr('src', user.photoURL);
      $('#profile_info').css('display', 'block');
      $('#profile_name').text(user.displayName);
      $('#login').css('display', 'none');
      $('#logout').css('display', 'block');
    } else {
      console.log('not login');
      $('#profile').css('display', 'none');
      $('#profile_img').attr('src', '');
      $('#profile_info').css('display', 'none');
      $('#profile_name').text('');
      $('#login').css('display', 'block');
      $('#logout').css('display', 'none');
    }
  });
});

function googlelogIn() {
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/plus.login');
  provider.setCustomParameters({
    prompt: 'select_account',
  });
  firebase
    .auth()
    .signInWithRedirect(provider)
    .then(function (result) {
      firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          // The email of the user's account used.
          var email = error.email;
        });
    });
}

function logout() {
  firebase
    .auth()
    .signOut()
    .then(
      function () {},
      function (error) {
        //DO
      }
    );
}
