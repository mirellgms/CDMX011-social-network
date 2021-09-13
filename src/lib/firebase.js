/* eslint-disable import/no-cycle */
import firebase from './secret.js';
import { onNavigate } from '../main.js';

const userState = () => {
  firebase.auth().onAuthStateChanged((user) => {
    console.log(user);
    if (user) {
      //location.hash = "#/feed";
      console.log('Usuario logueado', user);
      onNavigate('/feed');
    } else {
      //location.hash = "#/";
      console.log('No hay Usuario logueado');
      onNavigate('/');
    }
  });
}
 userState();

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

// console.log(firebase);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
auth.language = 'es';

export async function login() {
  const response = await auth.signInWithRedirect(provider);
  return response;
  // try {
  //   const response = await auth.signInWithRedirect(provider);
  //   console.log(response);
  //   return response.user;
  // } catch (error) {
  //   throw new Error(error);
  // }
}

export function logout() {
  auth.signOut();
}
