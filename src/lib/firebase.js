import firebase from './secret.js';

export const registerUser = (email, password) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      console.log(userCredential.user);
      // ...
    })
    .catch((error) => {
      console.log('error', error.message);
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
export function logout() {
  auth.signOut();
}
