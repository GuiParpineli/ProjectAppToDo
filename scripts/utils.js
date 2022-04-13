
const emailLogin = document.getElementById('inputEmail');
const passwordLogin = document.getElementById('inputPassword');
const api = "https://ctd-todo-api.herokuapp.com/v1";
const errorListUl = document.querySelector('.errorlist ul');
const loadingDiv = document.querySelector('.loading');
const loading = document.getElementById('loading-container');
const button = document.getElementById('btn-login');



var animation = () => {
    loading.classList.add('loading-box')
    loadingDiv.hidden = '';
    button.classList.add('button-loading')
    emailLogin.setAttribute('disabled', true);
    passwordLogin.setAttribute('disabled', true);
}

var cleanAnimation = () => {
    loading.classList.remove('loading-box')
    loadingDiv.hidden = 'hidden';
    button.classList.remove('button-loading')
    emailLogin.removeAttribute('disabled');
    passwordLogin.removeAttribute('disabled');
}

const route = {
    users: "/users",
    login: "/users/login",
    tasks: "/tasks"
};

//variavel para retirar os espacos brancos dos inputs
const empty = a => a.value.trim() === '';

//func para acrescentar uma msgem na ul com os erros
var errorMessage = a => errorListUl.innerHTML += '<li>' + a + '</li>';
//limpar os erros
const limparcamp = () => {
    const small = document.querySelectorAll('.error');
    small.forEach(a => a.classList.remove('error'));
    const inputError = document.querySelectorAll('.error-input');
    inputError.forEach(a => a.classList.remove('error-input'));
};

export { animation, cleanAnimation, route, errorMessage, limparcamp, api, empty }