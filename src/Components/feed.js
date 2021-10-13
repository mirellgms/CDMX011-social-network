/* eslint-disable import/no-cycle */
// eslint-disable-next-line import/no-cycle
import {
  logout, postFeed, db, deletePost, editPost, likeAdd, likeRemove,
} from '../lib/firebase.js';

export const Feed = () => {
  const feedDiv = document.createElement('div');
  document.getElementById('header').style.display = 'none';

  // Title
  const title = document.createElement('img');
  title.setAttribute('src', '../img/be-the-light.png');
  title.id = 'title';
  feedDiv.appendChild(title);

  // Barra div
  const barraDiv = document.createElement('div');
  barraDiv.id = 'barraDiv';
  feedDiv.appendChild(barraDiv);

  // Iconos
  const iconLight = document.createElement('img');
  iconLight.setAttribute('src', '../img/iconosinfondo.png');
  iconLight.id = 'iconLight';
  iconLight.classList.add('icon');
  barraDiv.appendChild(iconLight);

  // Post
  let post = document.createElement('textArea');
  post.placeholder = '¿Qué estas pensando?';
  post.id = 'post';
  feedDiv.appendChild(post);

  // Publish
  const publish = document.createElement('button');
  publish.textContent = 'Publicar';
  publish.id = 'publish';
  feedDiv.appendChild(publish);

  publish.addEventListener('click', (event) => {
    // Cloud Firestore
    post = document.getElementById('post').value;
    if (post.length === 0 || post === ' ') {
      alert('Escribe un post');
    } else {
      postFeed(post);
    }
  });
  // Modal
  const modalDiv = document.createElement('div');
  modalDiv.classList.add('modalContainer');
  modalDiv.id = 'Modal';
  feedDiv.appendChild(modalDiv);

  // Container Post
  const containerPostDiv = document.createElement('div');
  feedDiv.appendChild(containerPostDiv);

  const printModal = `<div class= 'modalContent'>
<h2 class = 'close'> Edita tu post </h2>
<div id= "changePost"></div>
<button id = 'save' class = 'savePost'> Guardar </button>
</div>`;
  modalDiv.innerHTML += printModal;
  modalDiv.style.display = 'none';
  console.log(modalDiv);

  // Estructura Post
  firebase.auth().onAuthStateChanged((user) => {
    const uid = user.uid;
    // Leer documentos
    db.collection('allPost').orderBy('dateHour', 'desc').onSnapshot((querySnapshot) => {
      containerPostDiv.innerHTML = '';
      querySnapshot.forEach((doc) => {
        const Likes = doc.data().likes;
        const printPost = `<div class= 'post_history'
         data-postid='${doc.id}' 
         data-post='${doc.data().first}'  
         data-likes='${doc.data().likes}' 
         data-idUser='${doc.data().idUser}'>
      <h1 id=userName>${doc.data().useremail}</h1>
      <div id='p_texts'> ${doc.data().first}</div>
      <div class= actions>
      <p id=contador> ${doc.data().likes.length} Me gusta </p>
      ${Likes.indexOf(uid) === -1 ? '<button class= "btn_like" title = "Me gusta">🤍</button>'
    : '<button  class= "btn_like" title = "Me gusta">❤️</button>'} 
      ${doc.data().idUser === uid ? '<button id = "btn_edit" class= "btn_edit" title = "Editar"> 🖊️ </button>' : '<p></p>'}
      ${doc.data().idUser === uid ? '<button id = "btn_delete" class= "btn_delete" title = "Eliminar"> 🗑️</button>' : '<p></p>'}
      <br>
      </div></div> `;
        containerPostDiv.innerHTML += printPost;
      });

      // Like - Dislike
      containerPostDiv.querySelectorAll('.btn_like').forEach((button) => {
        button.addEventListener('click', (e) => {
          const Likes = e.target.closest('.post_history').dataset.likes;
          const postId = e.target.closest('.post_history').dataset.postid;
          console.log(postId);
          if (Likes.indexOf(uid) === -1) {
            console.log(Likes.indexOf(uid));
            likeAdd(postId, uid);
            console.log('like');
          } else if (Likes.indexOf(uid) >= 0) {
            console.log(Likes.indexOf(uid));
            likeRemove(postId, uid);
            console.log('dislike');
          }
        });
      });
      // Eliminar Post
      containerPostDiv.querySelectorAll('.btn_delete').forEach((button) => {
        button.addEventListener('click', (e) => {
          const answer = confirm('¿Eliminar publicación?');
          if (answer == true) {
            const currElem = e.target; // referencia a un objeto que lanzo el evento
            const postId = currElem.closest('.post_history').dataset.postid; //
            deletePost(postId);
          } else {
            return false;
          }
        });
      });
      // Editar Post
      containerPostDiv.querySelectorAll('.btn_edit').forEach((button) => {
        button.addEventListener('click', (e) => {
          modalDiv.style.display = 'block';
          const currElem = e.target;
          console.log(currElem);
          const postId = currElem.closest('.post_history').dataset.postid;
          const Post = currElem.closest('.post_history').dataset.post;
          editPost(postId, Post);
        });
      });
    });
  });

  // Cerrar sesión
  const buttonLogout = document.createElement('button');
  buttonLogout.textContent = 'Cerrar Sesión';
  buttonLogout.id = 'buttonLogout';
  feedDiv.appendChild(buttonLogout);
  buttonLogout.addEventListener('click', () => {
    logout();
  });
  return feedDiv;
};
