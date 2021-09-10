// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../main.js';
import { registerUser, login, logout } from '../lib/firebase.js';
import firebase from '../lib/secret.js';

export const Register = () => {
  const registerDiv = document.createElement('div');

  const buttonLogout = document.createElement('button');

  const logo = document.createElement('img');
  logo.setAttribute('src', '../img/BeTheLight.png');

  const h1Presentation = document.createElement('h1');
  h1Presentation.textContent = 'Be the light te ayuda a comunicarte y compartir la luz que ha sido depositada en ti con las personas que forman parte de tu comunidad';

  let inputName = document.createElement('input');
  inputName.placeholder = 'Nombre';
  inputName.setAttribute('required', 'required');
  inputName.id = 'inputName';

  /* const iconName = document.createElement('div');
  iconName.classList.add = 'iconName'; */

  const iconUser = document.createElement('img');
  iconUser.setAttribute('src', '../img/user.png');
  iconUser.classList.add('icon');

  let inputEmail = document.createElement('input');
  inputEmail.id = 'inputEmail';
  inputEmail.placeholder = 'Correo';
  inputEmail.id = 'inputEmail';
  inputEmail.required = 'true';
  inputEmail.type = 'email';

  const iconEmail = document.createElement('img');
  iconEmail.setAttribute('src', '../img/email.png');
  iconEmail.classList.add('icon');

  let inputPassword = document.createElement('input');
  inputPassword.placeholder = 'Contraseña (mínimo 6 carácteres)';
  inputPassword.type = 'password';
  inputPassword.id = 'inputPassword';
  inputPassword.classList.add = 'inputs';

  // const msgPassword = document.createElement('p1');
  // msgPassword.textContent = 'Mínimo 6 caracteres';

  let confirmPassword = document.createElement('input');
  confirmPassword.placeholder = 'Confirmar contraseña';
  confirmPassword.type = 'password';
  confirmPassword.id = 'inputConfirmPassword';
  confirmPassword.classList.add = 'inputs';
  confirmPassword.id = 'confirmPassword';

  const iconOpenEye = document.createElement('img');
  iconOpenEye.setAttribute('src', '../img/openEye.png');
  iconOpenEye.classList.add('icon');
  iconOpenEye.id = 'openEye';

  const iconCloseEye = document.createElement('img');
  iconCloseEye.setAttribute('src', '../img/closeEye.png');
  iconCloseEye.classList.add('icon');
  iconCloseEye.id = 'closeEye';

  const buttonRegister = document.createElement('button');
  buttonRegister.textContent = 'REGISTRATE';
  buttonRegister.id = 'buttonRegister';

  const buttonLoginGoogle = document.createElement('button');
  buttonLoginGoogle.textContent = 'Registrate con tu cuenta Google';
  buttonLoginGoogle.id = 'buttonLoginGoogle';

  const iconGoogle = document.createElement('img');
  iconGoogle.setAttribute('src', '../img/google-logo.png');
  iconGoogle.id = 'iconGoogle';

  const buttonHome = document.createElement('button');
  buttonHome.textContent = 'Regresar al Home';
  buttonHome.id = 'buttonHome';
  buttonLogout.textContent = 'Cerrar sesión';
  buttonLogout.id = 'buttonLogout';

  buttonHome.addEventListener('click', () => onNavigate('/'));

  buttonRegister.addEventListener('click', (event) => {
    inputName = document.getElementById('inputName').value;
    inputEmail = document.getElementById('inputEmail').value;
    inputPassword = document.getElementById('inputPassword').value;
    confirmPassword = document.getElementById('confirmPassword').value;
    event.preventDefault();
    if (inputName.length === 0 || inputEmail.length === 0 || inputPassword.length === 0 || confirmPassword.length === 0) {
      alert('Completa los campos requeridos');
    } if (inputPassword !== confirmPassword) {
      alert('La contraseña no coincide');
    } else {
      registerUser(inputEmail, inputPassword);
      onNavigate('/feed');
    }
  });

  let currentUser;
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      currentUser = user;
      console.log('Usuario logueado', currentUser.displayName);
    } else {
      return ('No hay usuario logueado');
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

  iconOpenEye.addEventListener('click', () => {
    if (inputPassword.type === 'text') {
      inputPassword.type = 'password';
    } else {
      inputPassword.type = 'text';
    }
  });

  registerDiv.appendChild(logo);
  registerDiv.appendChild(h1Presentation);
  // registerDiv.appendChild(iconName);
  registerDiv.appendChild(inputName);
  registerDiv.appendChild(iconUser);
  registerDiv.appendChild(inputEmail);
  registerDiv.appendChild(iconEmail);
  registerDiv.appendChild(inputPassword);
  registerDiv.appendChild(iconOpenEye);
  // registerDiv.appendChild(msgPassword);
  registerDiv.appendChild(confirmPassword);
  registerDiv.appendChild(iconCloseEye);
  registerDiv.appendChild(buttonRegister);
  registerDiv.appendChild(buttonLoginGoogle);
  registerDiv.appendChild(iconGoogle);
  registerDiv.appendChild(buttonHome);
  // registerDiv.appendChild(buttonLogout);

  return registerDiv;
};
