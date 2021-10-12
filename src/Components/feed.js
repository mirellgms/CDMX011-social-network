/* eslint-disable import/no-cycle */
// eslint-disable-next-line import/no-cycle
import {
  logout, postFeed, db, deletePost, editPost, likeAdd, likeRemove
} from '../lib/firebase.js';

export const Feed = () => {
  const feedDiv = document.createElement('div');
  document.getElementById('header').style.display = 'none';

  const title = document.createElement('img');
  title.setAttribute('src', '../img/be-the-light.png');
  title.id = 'title';

  const barraDiv = document.createElement('div');
  barraDiv.id = 'barraDiv';

  const iconLight = document.createElement('img');
  iconLight.setAttribute('src', '../img/iconosinfondo.png');
  iconLight.id = 'iconLight';
  iconLight.classList.add('icon');
  let post = document.createElement('textArea');
  post.placeholder = '¿Qué estas pensando?';
  post.id = 'post';
  const publish = document.createElement('button');
  publish.textContent = 'Publicar';
  publish.id = 'publish';

  publish.addEventListener('click', (event) => {
    // Cloud Firestore
    post = document.getElementById('post').value;
    if (post.length === 0 || post === ' ') {
      alert('Escribe un post');
    } else {
      postFeed(post);
    }
  });

  const containerPostDiv = document.createElement('div');

  const modalDiv = document.createElement('div');
  modalDiv.classList.add('modalContainer');
  modalDiv.id = 'Modal';
  // alert('¿Editar publicación?');
  const printModal = `<div class= 'modalContent'>
<h2 class = 'close'> Edita tu post </h2>
<div id= "changePost"></div>
<button id = 'save' class = 'savePost'> Guardar </button>
</div>`;
  modalDiv.innerHTML += printModal;
  modalDiv.style.display = 'none';
  console.log(modalDiv);

  firebase.auth().onAuthStateChanged((user) => {
    const uid = user.uid;
    // Leer documentos
    db.collection('allPost').orderBy('dateHour', 'desc').onSnapshot((querySnapshot) => {
      containerPostDiv.innerHTML = '';
      /* ${doc.data().likes.includes(uid) ? 
        '<button id = "btn_like" class= "btn_like" title = "Me gusta">❤️</button>' 
        : '<button class= "btn_like">🤍</button>'} */
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
      <button id = "btn_like" class= "btn_like" title = "Me gusta">❤️</button>
      ${doc.data().idUser === uid ? '<button id = "btn_edit" class= "btn_edit" title = "Editar"> 🖊️ </button>' : '<p></p>'}
      ${doc.data().idUser === uid ? '<button id = "btn_delete" class= "btn_delete" title = "Eliminar"> 🗑️</button>' : '<p></p>'}
      <br>
      </div></div> `;
        //  btn_dislikecontainerPostDiv.querySelectorAll('.btn_dislike');
        containerPostDiv.innerHTML += printPost;
        console.log(`${doc.id}  =>  ${doc.data().first}`);
        // containerPostDiv.getElementById('btn_like');
        containerPostDiv.querySelectorAll('.btn_like').forEach((button) => {
          // refactorizar el queryselector y el for each
          button.addEventListener('click', (e) => {
            const userId = firebase.auth().currentUser.uid;
            const currElem = e.target;
            const postId = currElem.closest('.post_history').dataset.postid;
            if (Likes.includes(userId)) {
              likeRemove(postId, userId);
              const whiteHeart = '🤍';
              document.getElementById('btn_like').innerHTML = (whiteHeart);
              document.getElementById('btn_like').innerHTML = '🤍';
            } else {
              likeAdd(postId, userId);
              const redHeart = '❤️';
              document.getElementById('btn_like').innerHTML = '❤️';
              document.getElementById('btn_like').innerHTML = (redHeart);
            }
          });
        });
      });

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

      containerPostDiv.querySelectorAll('.btn_edit').forEach((button) => {
        button.addEventListener('click', (e) => {
        //   console.log('llamada de boton editar');
        // console.log(modalDiv.innerHTML += printModal);
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

  const buttonLogout = document.createElement('button');
  buttonLogout.textContent = 'Cerrar Sesión';
  buttonLogout.id = 'buttonLogout';
  buttonLogout.addEventListener('click', () => {
    logout();
  });

  feedDiv.appendChild(title);
  feedDiv.appendChild(barraDiv);
  barraDiv.appendChild(iconLight);
  feedDiv.appendChild(post);
  feedDiv.appendChild(publish);
  feedDiv.appendChild(modalDiv);
  feedDiv.appendChild(containerPostDiv);
  feedDiv.appendChild(buttonLogout);
  return feedDiv;
};
