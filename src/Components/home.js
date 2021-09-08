// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../main.js';
import { login } from '../lib/firebase.js';

export const Home = () => {
  const HomeDiv = document.createElement('div');
  const logo = document.createElement('img');
  const h1Presentation = document.createElement('h1');
  const inputEmail = document.createElement('input');
  const iconEmail = document.createElement('img');
  const inputPassword = document.createElement('input');
  const iconOpenEye = document.createElement('img');
  const iconCloseEye = document.createElement('img');
  const buttonLogin = document.createElement('button');
  const buttonLoginGoogle = document.createElement('button');
  const iconGoogle = document.createElement('img');
  const buttonGoToRegister = document.createElement('button');
  // const buttonLogout = document.createElement('button');
  buttonGoToRegister.id = 'buttonGotoRegister';
  // buttonLogout.textContent = 'Cerrar sesión';
  // buttonLogout.id = 'buttonLogout';

  logo.setAttribute('src', '../img/BeTheLight.png');
  h1Presentation.textContent = 'Be the light te ayuda a comunicarte y compartir la luz que ha sido depositada en ti con las personas que forman parte de tu comunidad';
  inputEmail.placeholder = 'Correo';
  iconEmail.setAttribute('src', '../img/email.png');
  iconEmail.classList.add('icon');
  inputPassword.placeholder = 'Contraseña';
  inputPassword.type = 'password';
  iconOpenEye.setAttribute('src', '../img/openEye.png');
  iconOpenEye.classList.add('icon');
  iconOpenEye.id = 'openEye';
  iconCloseEye.setAttribute('src', '../img/closeEye.png');
  iconCloseEye.classList.add('icon');
  iconCloseEye.id = 'closeEye';
  buttonLogin.textContent = 'INGRESAR';
  buttonLogin.id = 'buttonLogin';
  buttonLoginGoogle.textContent = 'Ingresa con tu cuenta de Google';
  buttonLoginGoogle.id = 'buttonLoginGoogle';
  iconGoogle.setAttribute('src', '../img/google-logo.png');
  iconGoogle.id = 'iconGoogle';
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
  HomeDiv.appendChild(iconEmail);
  HomeDiv.appendChild(inputPassword);
  HomeDiv.appendChild(iconOpenEye);
  HomeDiv.appendChild(iconCloseEye);
  HomeDiv.appendChild(buttonLogin);
  HomeDiv.appendChild(buttonLoginGoogle);
  HomeDiv.appendChild(iconGoogle);
  HomeDiv.appendChild(buttonGoToRegister);
  // HomeDiv.appendChild(buttonLogout);
  return HomeDiv;
};
