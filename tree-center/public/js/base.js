var firebaseConfig = {
    apiKey: "AIzaSyCTK1Cq0PXHxInvl3Hd0-5A9XJNCJExnRM",
    authDomain: "the-tree-project-59356.firebaseapp.com",
    projectId: "the-tree-project-59356",
    storageBucket: "the-tree-project-59356.appspot.com",
    messagingSenderId: "922366638718",
    appId: "1:922366638718:web:1c21dc2ddbd8cef364f62f"
  };
  firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();
let auth = firebase.auth();