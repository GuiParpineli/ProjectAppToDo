var usuario = '';
var account = '';
const emailLogin = document.getElementById('inputEmail');
const passwordLogin = document.getElementById('inputPassword');
const api = "https://ctd-todo-api.herokuapp.com/v1";
const errorListUl = document.querySelector('.errorlist ul');
const errorList = document.querySelector('.errorlist');
const loadingDiv = document.querySelector('.loading');
const loadingDiv2 = document.querySelector('.loading2');
const loadingDiv3 = document.querySelector('.loading3');
const loading = document.getElementById('loading-container');
const button = document.getElementById('btn-login');

var animation = () => {
    loading.classList.add('loading-box')
    loadingDiv.hidden = '';
    button.classList.add('button-loading')
}

var cleanAnimation = () => {
    loading.classList.remove('loading-box')
    loadingDiv.hidden = 'hidden';
    button.classList.remove('button-loading')
}



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
            localStorage.setItem('authorization', key.jwt)
            account = key;
        })
        .catch(function (error) {
            localStorage.setItem('authorization', '');
            account = '';
        });
};



button.onclick = a => {
    login();
    errorList.hidden = '';
    errorListUl.innerHTML = '';
    a.preventDefault()
    limparcamp()
    
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
    }, 1000)

};
