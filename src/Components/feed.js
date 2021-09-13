/* eslint-disable import/no-cycle */
// eslint-disable-next-line import/no-cycle
// import { onNavigate } from '../main.js';
// import { logout } from '../lib/firebase.js';

export const Feed = () => {
  const feedDiv = document.createElement('div');

  const messageh1 = document.createElement('h1');
  messageh1.textContent = 'Este es el Feed';

  // const buttonLogout = document.createElement('button');
  // buttonLogout.textContent = 'Cerrar sesión';

  // buttonLogout.addEventListener('click', (event) => {
  // // logout();
  //   console.log('sesión cerrada');
  //   onNavigate('/');
  // });

  feedDiv.appendChild(messageh1);
  // feedDiv.appendChild(buttonLogout);

  return feedDiv;
};
