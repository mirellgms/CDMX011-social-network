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

  const barraDiv = document.createElement('div');
  barraDiv.id = 'barraDiv';

  // feedDiv.appendChild(title);
  // const barraDiv = document.createElement('div');
  // barraDiv.id = 'barraDiv';

  const iconHome = document.createElement('img');
  iconHome.setAttribute('src', '../img/user.png');
  iconHome.id = 'iconHome';
  iconHome.classList.add('icon');

  const iconLight = document.createElement('img');
  iconLight.setAttribute('src', '../img/iconosinfondo.png');
  iconLight.id = 'iconLight';
  iconLight.classList.add('icon');

  const iconProfile = document.createElement('img');
  iconProfile.setAttribute('src', '../img/user.png');
  iconProfile.id = 'iconProfile';
  iconProfile.classList.add('icon');

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

  const post = document.createElement('input');
  post.placeholder = '¿Qué estas pensando?';
  post.id = ('post');
  const publish = document.createElement('button');
  publish.textContent = 'Publicar';
  publish.id = 'publish';

  const db = firebase.firestore();
  const containerPostDiv = document.createElement('div');
  containerPostDiv.id = ('containerPostDiv');
  // // Leer documentos

  db.collection('allPost').onSnapshot((querySnapshot) => {
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

  // let option = document.createElement('select');
  // option.id = 'select';

  // let category = document.createElement('option');
  // category.setAttribute('value', 'Select');
  // let categoryText = document.createTextNode('Selecciona una categoría de tu post');
  // category.appendChild(categoryText);

  // let devocional = document.createElement('option');
  // devocional.setAttribute('value', 'devocional');
  // let devocionalText = document.createTextNode('Devocional');
  // devocional.appendChild(devocionalText);

  // let estudioBiblico = document.createElement('option');
  // estudioBiblico.setAttribute('value', 'estudioBiblico');
  // let estudioBiblicoText = document.createTextNode('Estudio Bíblico');
  // estudioBiblico.appendChild(estudioBiblicoText);

  // let  musica= document.createElement('option');
  // musica.setAttribute('value', 'musica');
  // let musicaText = document.createTextNode('Música');
  // musica.appendChild(musicaText);

  // let eventos = document.createElement('option');
  // eventos.setAttribute('value', 'eventos');
  // let eventosText = document.createTextNode('Eventos');
  // eventos.appendChild(eventosText);

  // let post = document.createElement('textArea');
  // post.placeholder = '¿Qué estas pensando?';
  // post.id = 'post';
  // const publish = document.createElement('button');
  // publish.textContent = 'Publicar';
  // publish.id = 'publish';
  // const db = firebase.firestore();

  // publish.addEventListener('click', (event) => {
  //   // Cloud Firestore
  //   post = document.getElementById('post').value;
  //   db.collection('allPost').add({
  //     first: post,
  //     // last: 'Lovelace',
  //     // born: 1815,
  //   })
  //     .then((docRef) => {
  //       console.log('Document written with ID: ', docRef.id);
  //       document.getElementById('post').value = '';
  //     })
  //     .catch((error) => {
  //       console.error('Error adding document: ', error);
  //     });
  // });

  // const buttonLogout = document.createElement('button');
  // buttonLogout.textContent = 'Cerrar Sesión';
  // buttonLogout.id = 'buttonLogout';
  // buttonLogout.addEventListener('click', () => {
  //   logout();
  // });

  feedDiv.appendChild(title);
  feedDiv.appendChild(barraDiv);
  barraDiv.appendChild(iconHome);
  barraDiv.appendChild(iconLight);
  barraDiv.appendChild(iconProfile);
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
