/* eslint-disable import/no-cycle */
// eslint-disable-next-line import/no-cycle
// import { onNavigate } from '../main.js';
import { logout } from '../lib/firebase.js';
// import db from './secret.js';

export const Feed = () => {
  const feedDiv = document.createElement('div');
  document.getElementById('header').style.display = 'none';

  const title = document.createElement('img');
  title.setAttribute('src', '../img/be-the-light.png');
  title.id = 'title';

  const option = document.createElement('select');

  const category = document.createElement('option');
  category.setAttribute('value', 'Select');
  const categoryText = document.createTextNode('Selecciona una categoría de tu post');
  category.appendChild(categoryText);

  const devocional = document.createElement('option');
  devocional.setAttribute('value', 'devocional');
  const devocionalText = document.createTextNode('Devocional');
  devocional.appendChild(devocionalText);

  const estudioBiblico = document.createElement('option');
  estudioBiblico.setAttribute('value', 'estudioBiblico');
  const estudioBiblicoText = document.createTextNode('Estudio Bíblico');
  estudioBiblico.appendChild(estudioBiblicoText);

  const musica = document.createElement('option');
  musica.setAttribute('value', 'musica');
  const musicaText = document.createTextNode('Música');
  musica.appendChild(musicaText);

  const eventos = document.createElement('option');
  eventos.setAttribute('value', 'eventos');
  const eventosText = document.createTextNode('Eventos');
  eventos.appendChild(eventosText);

  let post = document.createElement('input');
  post.placeholder = '¿Qué estas pensando?';
  post.id = ('post');
  const publish = document.createElement('button');
  publish.textContent = 'Publicar';
  publish.id = 'publish';

  const db = firebase.firestore();

  publish.addEventListener('click', (event) => {
    // Cloud Firestore
    post = document.getElementById('post').value;
    db.collection('allPost').add({
      first: post,
      // last: 'Lovelace',
      // born: 1815,
    })
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
        document.getElementById('post').value = '';
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  });


  const containerPostDiv = document.createElement('div');
  containerPostDiv.id = ('containerPostDiv');
  // // Leer documentos
  db.collection('allPost').get().then((querySnapshot) => {
    containerPostDiv.innerHTML = '';
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data().first);
      containerPostDiv.innerHTML += doc.data().first;
    });
  });

  const buttonLogout = document.createElement('button');
  buttonLogout.textContent = 'Cerrar Sesión';
  buttonLogout.id = 'buttonLogout';
  buttonLogout.addEventListener('click', () => {
    logout();
  });

  feedDiv.appendChild(title);
  feedDiv.appendChild(option);
  option.appendChild(category);
  option.appendChild(devocional);
  option.appendChild(estudioBiblico);
  option.appendChild(musica);
  option.appendChild(eventos);
  feedDiv.appendChild(post);
  feedDiv.appendChild(publish);
  feedDiv.appendChild(containerPostDiv);
  feedDiv.appendChild(buttonLogout);

  return feedDiv;
};

// export const containerPost = () => {
//   const containerPostDiv = document.createElement('div');
//   containerPostDiv.id = ('containerPostDiv');
//   return containerPost;
// };
