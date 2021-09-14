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

  let option = document.createElement('select');

  let category = document.createElement('option');
  category.setAttribute('value', 'Select');
  let categoryText = document.createTextNode('Selecciona una categoría de tu post');
  category.appendChild(categoryText);

  let devocional = document.createElement('option');
  devocional.setAttribute('value', 'devocional');
  let devocionalText = document.createTextNode('Devocional');
  devocional.appendChild(devocionalText);

  let estudioBiblico = document.createElement('option');
  estudioBiblico.setAttribute('value', 'estudioBiblico');
  let estudioBiblicoText = document.createTextNode('Estudio Bíblico');
  estudioBiblico.appendChild(estudioBiblicoText);

  let  musica= document.createElement('option');
  musica.setAttribute('value', 'musica');
  let musicaText = document.createTextNode('Música');
  musica.appendChild(musicaText);

  let eventos = document.createElement('option');
  eventos.setAttribute('value', 'eventos');
  let eventosText = document.createTextNode('Eventos');
  eventos.appendChild(eventosText);

  const post = document.createElement('input');
  post.placeholder = '¿Qué estas pensando?';
  post.id = 'post';
  const publish = document.createElement('button');
  publish.textContent = 'Publicar';
  publish.id = 'publish';
  publish.addEventListener('click', (event) => {

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
  feedDiv.appendChild(buttonLogout);

  return feedDiv;
};
