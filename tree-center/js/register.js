console.log('register js');

let $sitems = document.querySelector('.sitems');
let $orders = document.querySelector('.orders');
let $myacc = document.querySelector('.myacc');
let $user_email = document.querySelectorAll('.user-email');
let $ovog = document.querySelector('#ovog');
let $ner = document.querySelector('#ner');
let $hot = document.querySelector('select');
let $hayag = document.querySelector('#hayag');
let $saveprofile = document.querySelector('#save-profile');
let $changepassword = document.querySelector('.change-password');
let $deleteacc = document.querySelector('.delete-account-button');

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    document.querySelector('.greetings-name p').textContent = 'Сайн байна уу';
    $user_email[0].innerHTML = firebase.auth().currentUser.email;
    $user_email[1].querySelector('#email').innerHTML = firebase.auth().currentUser.email;
    $user_email[2].innerHTML = firebase.auth().currentUser.email;
  } else {
  }
  db.collection("users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        if(`${doc.id}` === auth.currentUser.uid){
          $ner.value = (doc.data().fname);
          $ovog.value = (doc.data().lname);
          $hot.value = (doc.data().city);
          $hayag.value = (doc.data().address);
        }
    });
});
});

$saveprofile.onclick = function(){
  db.collection('users').doc(auth.currentUser.uid).set({
    fname: $ner.value,
    lname: $ovog.value,
    address: $hayag.value,  
    city: $hot.value,
  })
  .then(() => {
    console.log("Document successfully written!");
  })
  .catch((error) => {
      console.error("Error writing document: ", error);
  });
}

document.querySelector('.logout-button').onclick = function(){
  console.log('logout clicked');
  firebase.auth().signOut().then(() => {
    console.log('log-out clicked');
    window.location.replace('../html/index.html');
  }).catch((error) => {
    console.log('log-out error');
  });
}

$changepassword.onclick = function(){
  var user = firebase.auth().currentUser;
  var newPassword = document.querySelector('#changepass').value;

  user.updatePassword(newPassword).then(function() {
    console.log("changed");
  }).catch(function(error) {
    console.log("error");
  });
}
$deleteacc.onclick = function(){
  var user = firebase.auth().currentUser;
  if(db.collection('users').doc(auth.currentUser.uid)){
  db.collection('users').doc(auth.currentUser.uid).delete();
  user.delete().then(function() {
    console.log("User deleted");
    window.location.replace('login.html');
  }).catch(function(error) {
    console.log("error");
  });}
  else{
  user.delete().then(function() {
    console.log("User deleted");
    window.location.replace('login.html');
  }).catch(function(error) {
    console.log("error");
  });
  }
}
if(1){
  $myacc.style.backgroundColor = "#1f8fc5";
  $myacc.style.color = "white";
}