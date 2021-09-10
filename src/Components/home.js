// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../main.js';
import { login } from '../lib/firebase.js';

export const Home = () => {
  const HomeDiv = document.createElement('div');

  const logo = document.createElement('img');
  logo.setAttribute('src', '../img/BeTheLight.png');

  const h1Presentation = document.createElement('h1');
  h1Presentation.textContent = 'Be the light te ayuda a comunicarte y compartir la luz que ha sido depositada en ti con las personas que forman parte de tu comunidad';

  const inputEmail = document.createElement('input');
  inputEmail.placeholder = 'Correo';

  const iconEmail = document.createElement('img');
  iconEmail.setAttribute('src', '../img/email.png');
  iconEmail.classList.add('icon');

  const inputPassword = document.createElement('input');
  inputPassword.placeholder = 'Contraseña';
  inputPassword.type = 'password';

  const iconOpenEye = document.createElement('img');
  iconOpenEye.setAttribute('src', '../img/openEye.png');
  iconOpenEye.classList.add('icon');
  iconOpenEye.id = 'openEye';

  const iconCloseEye = document.createElement('img');
  iconCloseEye.setAttribute('src', '../img/closeEye.png');
  iconCloseEye.classList.add('icon');
  iconCloseEye.id = 'closeEye';

  const buttonLogin = document.createElement('button');
  buttonLogin.textContent = 'INGRESAR';
  buttonLogin.id = 'buttonLogin';

  const buttonLoginGoogle = document.createElement('button');
  buttonLoginGoogle.textContent = 'Ingresa con tu cuenta de Google';
  buttonLoginGoogle.id = 'buttonLoginGoogle';

  const iconGoogle = document.createElement('img');
  iconGoogle.setAttribute('src', '../img/google-logo.png');
  iconGoogle.id = 'iconGoogle';

  const buttonGoToRegister = document.createElement('button');
  buttonGoToRegister.textContent = '¿No tienes cuenta?  Registrate';
  buttonGoToRegister.id = 'buttonGotoRegister';

  // const buttonLogout = document.createElement('button');
  // buttonLogout.textContent = 'Cerrar sesión';
  // buttonLogout.id = 'buttonLogout';

  buttonGoToRegister.addEventListener('click', () => onNavigate('/register'));

  //Login con Google
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
    } catch (error) {}
  });

  // Ocultar/Mostrar contraseña
  iconOpenEye.addEventListener('click', () => {
    if (inputPassword.type === 'text') {
      inputPassword.type = 'password';
    } else {
      inputPassword.type = 'text';
    }
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
