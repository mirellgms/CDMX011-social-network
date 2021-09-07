// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../main.js';
import { registerUser, login } from '../lib/firebase.js';
import firebase from '../lib/secret.js';

export const Register = () => {
  const registerDiv = document.createElement('div');
  const logo = document.createElement('img');
  const h1Presentation = document.createElement('h1');
  const inputName = document.createElement('input');
  let inputEmail = document.createElement('input');
  let inputPassword = document.createElement('input');
  const buttonRegister = document.createElement('button');
  const buttonLoginGoogle = document.createElement('button');
  const buttonHome = document.createElement('button');
  const buttonLogout = document.createElement('button');

  logo.setAttribute('src', '../img/BeTheLight.png');
  h1Presentation.textContent = 'Be the light te ayuda a comunicarte y compartir la luz que ha sido depositada en ti con las personas que forman parte de tu comunidad';
  inputName.placeholder = 'Nombre';
  inputEmail.placeholder = 'Correo';
  inputEmail.id = 'inputEmail';
  inputPassword.placeholder = 'Contraseña';
  inputPassword.type = 'password';
  inputPassword.id = 'inputPassword';
  buttonRegister.textContent = 'REGISTRATE';
  buttonRegister.id = 'buttonRegister';
  buttonLoginGoogle.textContent = 'Registrate con tu cuenta Google';
  buttonLoginGoogle.id = 'buttonLoginGoogle';
  buttonHome.textContent = 'Regresar al Home';
  buttonHome.id = 'buttonHome';
  buttonLogout.textContent = 'Cerrar sesión';
  buttonLogout.id = 'buttonLogout';

  buttonHome.addEventListener('click', () => onNavigate('/'));

  buttonRegister.addEventListener('click', (event) => {
    inputEmail = document.getElementById('inputEmail').value;
    inputPassword = document.getElementById('inputPassword').value;
    event.preventDefault();
    registerUser(inputEmail, inputPassword);
  });
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
  buttonLogout.addEventListener('click', (event) => {
    logout();
  });

  registerDiv.appendChild(logo);
  registerDiv.appendChild(h1Presentation);
  registerDiv.appendChild(inputName);
  registerDiv.appendChild(inputEmail);
  registerDiv.appendChild(inputPassword);
  registerDiv.appendChild(buttonRegister);
  registerDiv.appendChild(buttonLoginGoogle);
  registerDiv.appendChild(buttonHome);
  registerDiv.appendChild(buttonLogout);

  return registerDiv;
};
