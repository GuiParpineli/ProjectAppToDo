var usuario = '';
var account = '';
const emailLogin = document.getElementById('inputEmail');
const passwordLogin = document.getElementById('inputPassword');
const api = "https://ctd-todo-api.herokuapp.com/v1";
const errorListUl = document.querySelector('.errorlist ul');
const errorList = document.querySelector('.errorlist');

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

const route = {
    users: "/users",
    login: "/users/login",
    tasks: "/tasks"
};
const login = () => {

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
        .then(function (user) { return usuario = user })
        .then(function (key) {
            localStorage.setItem('authorization', key.jwt)
            account = key;
        })
        .catch(function (error) {
            localStorage.setItem('authorization', '');
            account = '';
        });
};



let button = document.getElementById('btn-login');

button.onclick = a => {
    login();
    errorList.hidden = '';
    errorListUl.innerHTML = '';
    a.preventDefault()
    limparcamp() 
    setTimeout(function () {
        if (account.jwt != undefined) {
            console.log(account)
            window.location.href = 'tarefas.html'
        }
        else if (account == 'Contraseña incorrecta') {
            a.preventDefault();
            errorMessage('<b>Senha</b> incorreta')
        } else if (account == 'El usuario no existe') {
            a.preventDefault();
            errorMessage('<b>Email</b> não cadastrado');
        } else {
            a.preventDefault();
            errorMessage('<b>Email</b> ou <b>Senha</b> incorretos');
        }
    }, 500)

};
