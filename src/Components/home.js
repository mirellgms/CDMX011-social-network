// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../main.js';
import { login } from '../lib/firebase.js';

export const Home = () => {
  const HomeDiv = document.createElement('div');
  const logo = document.createElement('img');
  const h1Presentation = document.createElement('h1');
  const inputEmail = document.createElement('input');
  const inputPassword = document.createElement('input');
  const buttonLogin = document.createElement('button');
  const buttonLoginGoogle = document.createElement('button');
  const buttonGoToRegister = document.createElement('button');
  // const buttonLogout = document.createElement('button');
  buttonGoToRegister.id = 'buttonGotoRegister';
  // buttonLogout.textContent = 'Cerrar sesión';
  // buttonLogout.id = 'buttonLogout';

  logo.setAttribute('src', '../img/BeTheLight.png');
  h1Presentation.textContent = 'Be the light te ayuda a comunicarte y compartir la luz que ha sido depositada en ti con las personas que forman parte de tu comunidad';
  inputEmail.placeholder = 'Correo';
  inputPassword.placeholder = 'Contraseña';
  inputPassword.type = 'password';
  buttonLogin.textContent = 'INGRESAR';
  buttonLogin.id = 'buttonLogin';
  buttonLoginGoogle.textContent = 'Ingresa con tu cuenta de Google';
  buttonLoginGoogle.id = 'buttonLoginGoogle';
  buttonGoToRegister.textContent = '¿No tienes cuenta?  Registrate';

  buttonGoToRegister.addEventListener('click', () => onNavigate('/register'));

  let currentUser;
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      currentUser = user;
      console.log('Usuario logueado', currentUser.displayName);
    } else {
      console.log('No hay usuario logueado');
    }
  });
  buttonLoginGoogle.addEventListener('click', async (event) => {
    try {
      currentUser = await login();
    } catch (error) { }
  });

  // buttonLogout.addEventListener('click', (event) => {
  //   logout();
  // });

  HomeDiv.appendChild(logo);
  HomeDiv.appendChild(h1Presentation);
  HomeDiv.appendChild(inputEmail);
  HomeDiv.appendChild(inputPassword);
  HomeDiv.appendChild(buttonLogin);
  HomeDiv.appendChild(buttonLoginGoogle);
  HomeDiv.appendChild(buttonGoToRegister);
  // HomeDiv.appendChild(buttonLogout);
  return HomeDiv;
};
