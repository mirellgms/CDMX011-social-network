/* eslint-disable import/no-cycle */
// eslint-disable-next-line import/no-cycle
// import { onNavigate } from '../main.js';
import { logout } from '../lib/firebase.js';

export const Feed = () => {
  const feedDiv = document.createElement('div');
  document.getElementById('header').style.display = 'none';

  const title = document.createElement('img');
  title.setAttribute('src', '../img/be-the-light.png');
  title.id = 'title';

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
  feedDiv.appendChild(post);
  feedDiv.appendChild(publish);
  feedDiv.appendChild(buttonLogout);

  return feedDiv;
};
