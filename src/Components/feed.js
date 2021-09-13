/* eslint-disable import/no-cycle */
// eslint-disable-next-line import/no-cycle
//import { onNavigate } from '../main.js';
import { logout } from '../lib/firebase.js';

export const Feed = () => {
  const feedDiv = document.createElement('div');

  let post = document.createElement('input');
  const publish = document.createElement('button');
  publish.textContent = 'Publicar';
  publish.addEventListener('click', (event) => {
    
  });

  const buttonLogout = document.createElement('button');
  buttonLogout.textContent = 'Cerrar Sesión';
  buttonLogout.addEventListener('click', () => {
    logout();
  });

  feedDiv.appendChild(post);
  feedDiv.appendChild(publish);
  feedDiv.appendChild(buttonLogout);

  return feedDiv;
};
