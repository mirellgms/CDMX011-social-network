/* eslint-disable import/no-cycle */
// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../main.js';
import { login, loginUser } from '../lib/firebase.js';

export const Home = () => {
  const HomeDiv = document.createElement('div');
  HomeDiv.id = ('homeDiv');
  document.getElementById('header').style.display = 'block';

  let inputEmail = document.createElement('input');
  inputEmail.placeholder = 'Correo Electrónico';
  inputEmail.id = ('inputEmail');

  const iconEmail = document.createElement('img');
  iconEmail.setAttribute('src', '../img/email.png');
  iconEmail.classList.add('icon');

  let inputPassword = document.createElement('input');
  inputPassword.placeholder = 'Contraseña (mínimo 6 carácteres)🔑';
  inputPassword.type = 'password';
  inputPassword.id = ('inputPassword');

  const iconOpenEye = document.createElement('img');
  iconOpenEye.setAttribute('src', '../img/openEye.png');
  iconOpenEye.classList.add('icon');
  iconOpenEye.id = 'openEye';

  const buttonLogin = document.createElement('button');
  buttonLogin.textContent = 'Iniciar sesión 😇';
  buttonLogin.id = 'buttonLogin';

  const buttonLoginGoogle = document.createElement('button');
  buttonLoginGoogle.textContent = 'Ingresa con tu cuenta de Google';
  buttonLoginGoogle.id = 'buttonLoginGoogle';

  const line1 = document.createElement('div');
  line1.id = ('line1');
  const or = document.createElement('text');
  or.textContent = 'O';
  or.id = 'or';
  const line2 = document.createElement('div');
  line2.id = ('line2');

  const iconGoogle = document.createElement('img');
  iconGoogle.setAttribute('src', '../img/google-logo.png');
  iconGoogle.id = 'iconGoogle';

  const buttonGoToRegister = document.createElement('button');
  buttonGoToRegister.textContent = '¿No tienes cuenta? Registrate';
  buttonGoToRegister.id = 'buttonGotoRegister';

  // const buttonLogout = document.createElement('button');
  // buttonLogout.textContent = 'Cerrar sesión';
  // buttonLogout.id = 'buttonLogout';

  buttonGoToRegister.addEventListener('click', () => onNavigate('/register'));

  buttonLogin.addEventListener('click', (event) => {
    inputEmail = document.getElementById('inputEmail').value;
    inputPassword = document.getElementById('inputPassword').value;
    event.preventDefault();
    if (inputEmail.length === 0 || inputPassword.length === 0) {
      alert('Completa los campos requeridos');
    } else {
      // invocar funcion para login con correo y contraseñá
      loginUser(inputEmail, inputPassword);
    }
  });

  //Login con Google

  buttonLoginGoogle.addEventListener('click', async (event) => {
    try {
      currentUser = await login();
    } catch (error) { }
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

  HomeDiv.appendChild(inputEmail);
  HomeDiv.appendChild(iconEmail);
  HomeDiv.appendChild(inputPassword);
  HomeDiv.appendChild(iconOpenEye);
  HomeDiv.appendChild(buttonLogin);
  HomeDiv.appendChild(line1);
  HomeDiv.appendChild(or);
  HomeDiv.appendChild(line2);
  HomeDiv.appendChild(buttonLoginGoogle);
  HomeDiv.appendChild(iconGoogle);
  HomeDiv.appendChild(buttonGoToRegister);
  // HomeDiv.appendChild(buttonLogout);
  return HomeDiv;
};
