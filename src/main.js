// eslint-disable-next-line import/no-cycle
import { Home } from './Components/home.js';
// eslint-disable-next-line import/no-cycle
import { Register } from './Components/register.js';
import { Feed } from './Components/feed.js';
// import { ProfilePost } from './Components/profile.js';
import firebase from './lib/secret.js';

const rootDiv = document.getElementById('root');

const routes = {
  '/': Home,
  '/register': Register,
  '/feed': Feed,
  // '/profile': ProfilePost,

};
export const onNavigate = (pathname) => {
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname,
  );
  while (rootDiv.firstChild) {
    rootDiv.removeChild(rootDiv.firstChild);
  }
  rootDiv.appendChild(routes[pathname]());
};

const component = routes[window.location.pathname];
window.onpopstate = () => {
  rootDiv.appendChild(component());
};

rootDiv.appendChild(component());

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    onNavigate('/feed');
  } else {
    onNavigate('/');
  }
});
