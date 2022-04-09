//variaveis dos campos
const api = "https://ctd-todo-api.herokuapp.com/v1";
const senha = document.getElementById('password');
const senhaConfirm = document.getElementById('passwordConfirm');
const criarConta = document.getElementById('submit');
const nome = document.getElementById('nome');
const sobrenome = document.getElementById('sobrenome');
const email = document.getElementById('email');
const errorListUl = document.querySelector('.errorlist ul');
const errorList = document.querySelector('.errorlist');
const loadingDiv = document.querySelector('.loading');
const loadingDiv2 = document.querySelector('.loading2');
const loadingDiv3 = document.querySelector('.loading3');

const loading = document.getElementById('loading-container');
var account = '';

var animation = () => {
    loading.classList.add('loading-box')
    loadingDiv.hidden = '';
    loadingDiv2.hidden = '';
    loadingDiv3.hidden = '';
    criarConta.classList.add('button-loading')
}

var cleanAnimation = () => {
    loading.classList.remove('loading-box')
    loadingDiv.hidden = 'hidden';
    loadingDiv2.hidden = 'hidden';
    loadingDiv3.hidden = 'hidden';
    criarConta.classList.remove('button-loading')
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

const valor = a => a.value.trim();

const cadastro = () => {

    const url = api + route.users;

    if (empty(nome)) {

        errorMessage('Campo <b>Nome</b> não preenchido');
        nome.classList.add('error-input')
    }
    if (empty(sobrenome)) {

        errorMessage('Campo <b>Sobrenome</b> não preenchido');
        sobrenome.classList.add('error-input');
    }
    if (empty(email)) {

        errorMessage('Campo <b>Email</b> não preenchido');
        email.classList.add('error-input')
    }
    if (empty(senha)) {

        errorMessage('Campo <b>Senha</b> não preenchido');
        senha.classList.add('error-input')
    }

    else if (!email.value.includes('@')) {

        const small = document.createElement('small');
        const message = document.createTextNode('Email precisa ter @!');
        small.appendChild(message);
        small.classList.add('error')
        email.after(small);
    }
    else if (empty(senhaConfirm)) {

        errorMessage('Campo <b>Repetir senha</b> não preenchido');
        senhaConfirm.classList.add('error-input')

    }
    else if (senha.value !== senhaConfirm.value) {

        const small = document.createElement('small');
        const message = document.createTextNode('As senhas não são iguais!');
        small.appendChild(message);
        small.classList.add('error')
        senha.after(small);

    }
    else {
        animation();
        const data = {
            firstName: valor(nome),
            lastName: valor(sobrenome),
            email: valor(email),
            password: valor(password)
        }

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
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
};


//logica ao clicar no botao
criarConta.onclick = a => {
    errorListUl.innerHTML = '';
    errorList.hidden = '';
    a.preventDefault()
    limparcamp()
    cadastro();

    setTimeout(function () {
        cleanAnimation();
        if (account === 'El usuario ya se encuentra registrado') {
            a.preventDefault();
            errorMessage('Usuario ja cadastrado');
        }
    }, 1200);
    setInterval(function () {
        if (account.jwt != undefined) {
            window.location.href = 'tarefas.html'
        }
    }, 1200);


    window.scrollBy({ top: 200, behavior: 'smooth' });

};

//limpar erros no keyup
const cleanKeyup = a => a.addEventListener('keyup', () => limparcamp());

cleanKeyup(senha);
cleanKeyup(nome);
cleanKeyup(sobrenome);
cleanKeyup(email);
cleanKeyup(senha);
cleanKeyup(senhaConfirm);




