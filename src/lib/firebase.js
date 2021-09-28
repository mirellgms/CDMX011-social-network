/* eslint-disable import/no-cycle */
import firebase from './secret.js';

export const registerUser = (email, password) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      console.log('prueba usuario', userCredential.user);
      userCredential.user.updateProfile(
        { displayName: document.getElementById('inputName').value },
      );
    })
    .catch((error) => {
      alert('Usuario ya registrado', error.message);
      // ..
    });
};

console.log(firebase);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
auth.language = 'es';

export async function login() {
  try {
    const response = await auth.signInWithRedirect(provider);
    console.log(response);
    return response.user;
  } catch (error) {
    throw new Error(error);
  }
}

// Login
export const loginUser = (email, password) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
    // Signed in
      const user = userCredential.user;
      console.log(user);
    // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      alert('Email o Password no valido');
    });
};

export function logout() {
  auth.signOut();
}

// POST
export const db = firebase.firestore();

export function postFeed(post) {
  const user = firebase.auth().currentUser;
  const date = new Date();
  const datePost = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

  db.collection('allPost').add({
  // displayName:
    useremail: user.email,
    first: post,
    dateP: datePost,
  })
    .then((docRef) => {
      document.getElementById('post').value = '';
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
}

// // Nombre del usuario
// //Obtener usuario con sesion activa
// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/firebase.User
//     const uid = user.uid;
//     // ...
//   } else {
//     // User is signed out
//     // ...
//   }
// });

// export function getUserProfile() {
//   // [START auth_get_user_profile]
//   const user = firebase.auth().currentUser;
//   if (user !== null) {
//     // The user object has basic properties such as display name, email, etc.
//     const displayName = user.displayName;
//     const email = user.email;
//     // const photoURL = user.photoURL;
//     // const emailVerified = user.emailVerified;

//     // The user's ID, unique to the Firebase project. Do NOT use
//     // this value to authenticate with your backend server, if
//     // you have one. Use User.getToken() instead.
//     const uid = user.uid;
//     console.log(displayName);
//   }
// }
// console.log(getUserProfile);
