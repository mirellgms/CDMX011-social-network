/* eslint-disable import/no-cycle */
import firebase from './secret.js';
import { onNavigate } from '../main.js';

export const registerUser = (email, password) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      console.log(userCredential.user);
      onNavigate('/feed');
      // ...
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

export async function login() {
  try {
    const response = await auth.signInWithRedirect(provider);
    console.log(response);
    return response.user;
  } catch (error) {
    throw new Error(error);
  }
}

export function logout() {
  auth.signOut();
  onNavigate('/');
}
