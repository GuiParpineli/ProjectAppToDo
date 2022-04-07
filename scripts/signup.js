const api = "https://ctd-todo-api.herokuapp.com/v1";
var key = '';
const route = {
    users: "/users",
    login: "/users/login",
    tasks: "/tasks"
};

const valor = a => a.value.trim();

const cadastro = () => {

    const url = api + route.users;

    const data = {
        firstName: valor(nome),
        lastName: valor(sobrenome),
        email: valor(email),
        password: valor(password),
    };

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (usuario) {
            return key = usuario;
        }).then(function (key) {
            return localStorage.setItem('chave', key.jwt);
        })
};

