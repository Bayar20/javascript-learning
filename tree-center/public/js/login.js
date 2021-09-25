let password = document.querySelector('#password');
let email = document.querySelector('#email');

let $login_button = document.querySelector('.login-button');
$login_button.onclick = function(){
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
    .then((userCredential) => {
        window.location.replace('register.html');
    })
    .catch((error) => {
        if(error.message != "EMAIL_NOT_FOUND"){
            alert("Бүртгэлгүй хаяг байна!!!")};
    });
}
let $register_button = document.querySelector('.register-button');
$register_button.onclick = function(){
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
    .then((userCredential) => {
        firebase.auth().signOut().then(() => {
        }).catch((error) => {
        });
        alert("Амжилттай бүртгэлээ")
    })
    .catch((error) => {
       if(error.message = "EMAIL_EXISTS"){
           alert("Хаяг бүртгэлтэй байна!!!");
       }
       if(error.message = "WEAK_PASSWORD"){
        alert("Нууц үг хэтэрхий сул байна!!!")};
    });
}

document.querySelector('.reset-password').onclick = function (){
    password.style.display = "none"
    $login_button.style.display = "none"
    $register_button.style.display = "none"
    document.querySelector('.reset-password').style.display = "none";
    document.querySelector('.reset-submit').style.display = "";
    document.querySelector('.go-back').style.display = "";
    document.querySelector('.login p').innerHTML = "Бүргэлтэй и-мэйл хаягаа оруулна уу"
}

document.querySelector('.go-back').onclick = function (){
    password.style.display = ""
    $login_button.style.display = ""
    $register_button.style.display = ""
    document.querySelector('.reset-password').style.display = "";
    document.querySelector('.reset-submit').style.display = "none";
    document.querySelector('.go-back').style.display = "none";
    document.querySelector('.login p').innerHTML = "Бүртгэлгүй бол бүртгүүлэх дарж бүртгүүлнэ үү"
}

document.querySelector('.reset-submit').onclick = function(){
    var auth = firebase.auth();
    var emailAddress = email.value;

    auth.sendPasswordResetEmail(emailAddress).then(function() {
        alert('Нууц үг сэргээх майл явуулсан');
    }).catch(function(error) {
    });
}