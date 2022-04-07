var usuario = '';
var account = '';
const emailLogin = document.getElementById('inputEmail');
const passwordLogin = document.getElementById('inputPassword');
console.log(account)
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

login();
let button = document.getElementById('btn-login');

button.onclick = a => {
    login();
    errorList.hidden = '';
    errorListUl.innerHTML = '';
   
    if (account.jwt != undefined) {
        console.log(account)
        window.location.href = 'tarefas.html'
    }
    if (account == 'Contraseña incorrecta') {
        a.preventDefault();
        errorMessage('<b>Senha</b> incorreta')
    } else {
        a.preventDefault();
        errorMessage('<b>Usuario</b> ou <b>Senha</b> não Cadastrados');
    }
};

passwordLogin.addEventListener('keyup', a => login())
emailLogin.keyup = a => login()