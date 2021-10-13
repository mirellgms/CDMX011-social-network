/* eslint-disable import/no-cycle */
// eslint-disable-next-line import/no-cycle
import { onNavigate } from '../main.js';
import { registerUser, login } from '../lib/firebase.js';
import firebase from '../lib/secret.js';

export const Register = () => {
  const registerDiv = document.createElement('div');
  registerDiv.id = ('registerDiv');
  document.getElementById('header').style.display = 'block';
  const buttonLogout = document.createElement('button');

  let inputName = document.createElement('input');
  inputName.placeholder = 'Nombre';
  inputName.setAttribute('required', 'required');
  inputName.id = 'inputName';
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

  const iconEye = document.createElement('img');
  iconEye.setAttribute('src', '../img/openEye.png');
  iconEye.classList.add('icon');
  iconEye.id = 'Eye';

  const buttonRegister = document.createElement('button');
  buttonRegister.textContent = 'REGISTRATE';
  buttonRegister.id = 'buttonRegister';

  const buttonLoginGoogle = document.createElement('button');
  buttonLoginGoogle.textContent = 'Registrate con tu cuenta Google';
  buttonLoginGoogle.id = 'buttonLoginGoogle';

  const iconGoogle = document.createElement('img');
  iconGoogle.setAttribute('src', '../img/google-logo.png');
  iconGoogle.id = 'iconGoogle';

  const line1 = document.createElement('div');
  line1.id = ('line1');
  const or = document.createElement('text');
  or.textContent = 'O';
  or.id = 'or';
  const line2 = document.createElement('div');
  line2.id = ('line2');

  const buttonHome = document.createElement('button');
  buttonHome.textContent = 'Regresar al Home';
  buttonHome.id = 'buttonHome';
  buttonLogout.textContent = 'Cerrar sesión';
  buttonLogout.id = 'buttonLogout';

  buttonHome.addEventListener('click', () => onNavigate('/'));
  let currentUser;
  const usuarioLogueado = (user) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        currentUser = user;
        console.log('Usuario logueado', currentUser.displayName);
      } else {
        return ('No hay usuario logueado');
      }
    });
  };

  buttonRegister.addEventListener('click', (event) => {
    inputName = document.getElementById('inputName').value;
    inputEmail = document.getElementById('inputEmail').value;
    inputPassword = document.getElementById('inputPassword').value;
    confirmPassword = document.getElementById('confirmPassword').value;
    event.preventDefault();
    // eslint-disable-next-line max-len
    if (inputName.length === 0 || inputEmail.length === 0 || inputPassword.length === 0 || confirmPassword.length === 0) {
      alert('Completa los campos requeridos');
    } else if (inputPassword !== confirmPassword) {
      alert('La contraseña no coincide');
    } else {
      registerUser(inputEmail, inputPassword);
    }
  });

  buttonLoginGoogle.addEventListener('click', async (event) => {
    try {
      currentUser = await login();
    } catch (error) {}
  });

  // Mostrar / Ocultar contraseña
  iconOpenEye.addEventListener('click', () => {
    if (inputPassword.type === 'text') {
      inputPassword.type = 'password';
    } else {
      inputPassword.type = 'text';
    }
  });

  iconEye.addEventListener('click', () => {
    if (confirmPassword.type === 'text') {
      confirmPassword.type = 'password';
    } else {
      confirmPassword.type = 'text';
    }
  });

  registerDiv.appendChild(inputName);
  registerDiv.appendChild(iconUser);
  registerDiv.appendChild(inputEmail);
  registerDiv.appendChild(iconEmail);
  registerDiv.appendChild(inputPassword);
  registerDiv.appendChild(iconOpenEye);
  registerDiv.appendChild(confirmPassword);
  registerDiv.appendChild(iconEye);
  registerDiv.appendChild(buttonRegister);
  registerDiv.appendChild(line1);
  registerDiv.appendChild(or);
  registerDiv.appendChild(line2);
  registerDiv.appendChild(buttonLoginGoogle);
  registerDiv.appendChild(iconGoogle);
  registerDiv.appendChild(buttonHome);

  return registerDiv;
};
