/* eslint-disable import/no-cycle */
// eslint-disable-next-line import/no-cycle
// import { onNavigate } from '../main.js';
import {
  logout, postFeed, db, deletePost, editPost,
} from '../lib/firebase.js';
// import db from './secret.js';

export const Feed = () => {
  const feedDiv = document.createElement('div');
  document.getElementById('header').style.display = 'none';

  const title = document.createElement('img');
  title.setAttribute('src', '../img/be-the-light.png');
  title.id = 'title';

  const barraDiv = document.createElement('div');
  barraDiv.id = 'barraDiv';

  // feedDiv.appendChild(title);
  // const barraDiv = document.createElement('div');
  // barraDiv.id = 'barraDiv';

  const iconHome = document.createElement('img');
  iconHome.setAttribute('src', '../img/iconHome.png');
  iconHome.id = 'iconHome';
  iconHome.classList.add('icon');

  const iconLight = document.createElement('img');
  iconLight.setAttribute('src', '../img/iconosinfondo.png');
  iconLight.id = 'iconLight';
  iconLight.classList.add('icon');

  const iconProfile = document.createElement('img');
  iconProfile.setAttribute('src', '../img/iconUserBlack.png');
  iconProfile.id = 'iconProfile';
  iconProfile.classList.add('icon');

  const selectOption = document.createElement('select');
  selectOption.id = 'selectOption';
  // const categoryOption = document.getElementById('selectOption').value;

  const category = document.createElement('option');
  category.setAttribute('value', 'Select');
  category.id = 'category';
  const categoryText = document.createTextNode('Selecciona una categoría');
  category.appendChild(categoryText);

  const devocional = document.createElement('option');
  devocional.setAttribute('value', 'devocional');
  devocional.id = 'devocional';

  const devocionalText = document.createTextNode('Devocional 🙏');
  devocional.appendChild(devocionalText);

  const estudioBiblico = document.createElement('option');
  estudioBiblico.setAttribute('value', 'estudioBiblico');
  estudioBiblico.id = 'estudioBiblico';
  const estudioBiblicoText = document.createTextNode('Estudio Bíblico 📖');
  estudioBiblico.appendChild(estudioBiblicoText);

  const musica = document.createElement('option');
  musica.setAttribute('value', 'musica');
  musica.id = 'musica';
  const musicaText = document.createTextNode('Música 🎵');
  musica.appendChild(musicaText);

  const eventos = document.createElement('option');
  eventos.setAttribute('value', 'eventos');
  eventos.id = 'eventos';
  const eventosText = document.createTextNode('Eventos 🎤🔥');
  eventos.appendChild(eventosText);

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
      querySnapshot.forEach((doc) => {
        const printPost = `<div class= 'post_history' data-postid='${doc.id}' data-post='${doc.data().first}'>
      <h1 id=userName>${doc.data().useremail}</h1> 
      <div id='p_texts'> ${doc.data().first}</div>
      <div class= actions> 
      <button id = "btn_like" class= "btn_like" title = "Me gusta">❤️Like</button> 
      ${doc.data().idUser === uid ? '<button id = "btn_edit" class= "btn_edit" title = "Editar"> 🖊️Editar </button>' : '<p></p>'}
      ${doc.data().idUser === uid ? '<button id = "btn_delete" class= "btn_delete" title = "Eliminar"> 🗑️Borrar</button>' : '<p></p>'}
      <br>
      </div></div> `;
        containerPostDiv.innerHTML += printPost;
        console.log(`${doc.id}  =>  ${doc.data().first}`);
      });

      containerPostDiv.querySelectorAll('.btn_delete').forEach((button) => {
        button.addEventListener('click', (e) => {
          const answer = confirm('¿Eliminar publicación?');
          if (answer == true) {
            const currElem = e.target; // referencia a un objeto que lanzo el evento
            const postId = currElem.closest('.post_history').dataset.postid; //
            deletePost(postId);
          }
          else {
            return false;
          }
        });
      });

      containerPostDiv.querySelectorAll('.btn_edit').forEach((button) => {
        button.addEventListener('click', (e) => {
          modalDiv.style.display = 'block';
          const currElem = e.target;
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
  barraDiv.appendChild(iconHome);
  barraDiv.appendChild(iconLight);
  barraDiv.appendChild(iconProfile);
  feedDiv.appendChild(selectOption);
  selectOption.appendChild(category);
  selectOption.appendChild(devocional);
  selectOption.appendChild(estudioBiblico);
  selectOption.appendChild(musica);
  selectOption.appendChild(eventos);
  feedDiv.appendChild(post);
  feedDiv.appendChild(publish);
  feedDiv.appendChild(modalDiv);
  feedDiv.appendChild(containerPostDiv);
  feedDiv.appendChild(buttonLogout);
  return feedDiv;
};
