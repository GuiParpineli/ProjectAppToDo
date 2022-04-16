
var account = '';
const emailLogin = document.getElementById('inputEmail');
const passwordLogin = document.getElementById('inputPassword');
const errorListUl = document.querySelector('.errorlist ul');
const errorList = document.querySelector('.errorlist');
const button = document.getElementById('btn-login');

import { animation, cleanAnimation, route, errorMessage, limparcamp, api, empty } from './utils.js'

const login = () => {

    animation();
    const url = api + route.login;

    const dataLogin = {
        email: emailLogin.value,
        password: passwordLogin.value
    };

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataLogin)
    })
        .then(function (response) { return response.json() })
        .then(function (key) {
            localStorage.setItem('jwt', key.jwt)
            account = key;
        })
        .catch(function (error) {
            localStorage.setItem('jwt', '');
            account = '';
        });
};



button.onclick = a => {
    login();
    errorList.hidden = '';
    errorListUl.innerHTML = '';
    a.preventDefault()
    limparcamp()
    if (empty(emailLogin)) {

        errorMessage('Campo <b>Email</b> não preenchido');
        emailLogin.classList.add('error-input');
        cleanAnimation();
    }
    if (empty(passwordLogin)) {

        errorMessage('Campo <b>Senha</b> não preenchido');
        passwordLogin.classList.add('error-input')
        cleanAnimation();
    } else {
        setTimeout(function () {
            if (account.jwt != undefined) {
                window.location.href = 'tarefas.html'
            }
            else if (account == 'Contraseña incorrecta') {
                cleanAnimation();
                a.preventDefault();
                errorMessage('<b>Senha</b> incorreta')

            } else if (account == 'El usuario no existe') {
                a.preventDefault();
                cleanAnimation();
                errorMessage('<b>Email</b> não cadastrado');
            } else {
                a.preventDefault();
                cleanAnimation();
                errorMessage('<b>Email</b> ou <b>Senha</b> incorretos');
            }
        }, 2000)

    }
};