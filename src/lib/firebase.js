/* eslint-disable import/no-cycle */
import firebase from './secret.js';

// Función de registro
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
  const uid = user.uid;
  console.log(uid);

  db.collection('allPost').add({
    useremail: user.email,
    first: post,
    dateP: datePost,
    dateHour: date,
    idUser: uid,
    likes: [],
  })
    .then((docRef) => {
      document.getElementById('post').value = '';
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
}

// Eliminar Post
export function deletePost(postid) {
  db.collection('allPost').doc(postid).delete().then(() => {
    console.log('Document successfully deleted!');
  })
    .catch((error) => {
      console.error('Error removing document: ', error);
    });
}

// Editar Post
export function editPost(postid, Post) {
  const edition = db.collection('allPost').doc(postid);
  const changePost = document.getElementById('changePost');
  changePost.innerHTML = '';
  const newElement = document.createElement('textarea');
  newElement.value = Post;
  document.getElementById('changePost').appendChild(newElement);
  const btnSave = document.getElementById('save');
  btnSave.addEventListener('click', (e) => {
    const modalDiv = document.getElementById('Modal');
    modalDiv.style.display = 'none';
    const postNew = newElement.value;
    // first: "hola",
    edition.update({
      first: postNew,

    })
      .then(() => {
        console.log('Document successfully updated!');
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error('Error updating document: ', error);
      });
  });
}

// Función Like
export function likeAdd(postid, uid) {
  return db.collection('allPost').doc(postid).update({
    likes: firebase.firestore.FieldValue.arrayUnion(uid),
  });
}
// Función dislike
export function likeRemove(postid, uid) {
  return db.collection('allPost').doc(postid).update({
    likes: firebase.firestore.FieldValue.arrayRemove(uid),
  });
}
