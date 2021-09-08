// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../main.js';

export const Feed = () => {
  const feedDiv = document.createElement('div');

  const messageh1 = document.createElement('h1');
  messageh1.textContent = 'Este es el Feed';

  const bttn = document.createElement('button');
  bttn.textContent = 'prueba';

  feedDiv.appendChild(messageh1);
  feedDiv.appendChild(bttn);

  return feedDiv;
};
