
if ((localStorage.getItem('jwt') === null) || (localStorage.getItem('jwt') === '') || (localStorage.getItem('jwt') === undefined)) {
    location.href = 'index.html';
};

const logout = document.getElementById('closeApp');

logout.onclick = () => {
    localStorage.removeItem('jwt');
    location.href = 'index.html'
}

const obterUsuario = (jwt) => {

    fetch("https://ctd-todo-api.herokuapp.com/v1/users/getMe", {
        headers: {
            method: 'GET',
            "Content-type": "application/json",
            authorization: jwt
        }
    })
        .then((resposta) => resposta.json())

        .then((usuario) => {
            const nameUser = document.getElementById('nameUser');
            nameUser.innerHTML = `${usuario.firstName} ${usuario.lastName}`;
        });
};

const terminadas = a => {
    const tarefasTerminadas = document.querySelector('.tarefas-terminadas')
    const tarefa = document.createElement('li');
    const notDone = document.createElement('div');
    const descricao = document.createElement('div');
    const id = document.createElement('p');
    const p = document.createElement('p');
    const p2 = document.createElement('p');
    const data = new Date(a.createdAt)


    const pDescription = document.createTextNode(a.description);
    const pTime = document.createTextNode(data.toLocaleDateString('pt-BR'));
    const pId = document.createTextNode(a.id);

    p.appendChild(pDescription);
    id.appendChild(pId);
    p2.appendChild(pTime);
    descricao.appendChild(p);
    descricao.appendChild(p2);
    notDone.appendChild(descricao);
    tarefa.appendChild(notDone);
    tarefa.appendChild(id);
    tarefa.appendChild(descricao);

    descricao.classList.add("descricao");
    notDone.classList.add("done");
    p.classList.add("nome");
    p2.classList.add("timestamp");
    tarefa.classList.add("tarefa");
    id.classList.add('task-id')

    tarefasTerminadas.prepend(tarefa);
}
const naoTerminadas = a => {

    const skeleton = document.getElementById('skeleton')
    const tarefa = document.createElement('li');
    const notDone = document.createElement('div');
    const descricao = document.createElement('div');
    const id = document.createElement('p');
    const p = document.createElement('p');
    const p2 = document.createElement('p');
    const data = new Date(a.createdAt)


    const pDescription = document.createTextNode(a.description);
    const pTime = document.createTextNode(data.toLocaleDateString('pt-BR'));

    const pId = document.createTextNode(a.id);

    p.appendChild(pDescription);
    id.appendChild(pId);
    p2.appendChild(pTime);
    descricao.appendChild(p);
    descricao.appendChild(p2);
    notDone.appendChild(descricao);
    tarefa.appendChild(notDone);

    tarefa.appendChild(descricao);

    descricao.classList.add("descricao");
    notDone.classList.add("not-done");
    p.classList.add("nome");
    p2.classList.add("timestamp");
    tarefa.classList.add("tarefa");
    notDone.setAttribute('id', a.id)

    skeleton.prepend(tarefa);
}

const obterTasks = (jwt) => {
    fetch('https://ctd-todo-api.herokuapp.com/v1/tasks', {
        headers: {
            method: 'GET',
            "Content-type": "application/json",
            authorization: jwt
        }
    })
        .then((resposta) => resposta.json())
        .then((tasks) => {
            tasks.forEach(a => {
                if (a.completed !== true) {
                    naoTerminadas(a);
                } else {
                    terminadas(a);
                }
            }
            )
        }
        )
}


const makeTasks = (jwt) => {

    const inpuTask = document.getElementById('novaTarefa')

    const dataTask = {
        description: inpuTask.value,
        completed: false
    };

    fetch('https://ctd-todo-api.herokuapp.com/v1/tasks', {
        method: 'POST',
        headers: {
            "Content-type": "application/json",
            authorization: jwt
        },
        body: JSON.stringify(dataTask)
    })
        .then(function (response) { return response.json() })
        .then(a => {
            naoTerminadas(a)
        })
    inpuTask.value = '';
}

/* const delTask = (jwt) => {

    const api = 'https://ctd-todo-api.herokuapp.com/v1/tasks/'
    const url = api + id;

    fetch(url, {
        method: 'DELETE',
        headers: {
            "content-type": "application/json",
            authorization: jwt
        }
    })
} */
var target = ''
var idElement = ''
var classElement = ''

const completeTask = jwt => {

    if (classElement === 'not-done') {

        const id = idElement
        const api = 'https://ctd-todo-api.herokuapp.com/v1/tasks/'
        const url = api + id;
        const completed = {
            completed: true
        }

        document.getElementById(idElement).parentElement.remove();

        fetch(url, {
            method: 'PUT',
            headers: {
                "content-type": "application/json",
                authorization: jwt
            },
            body: JSON.stringify(completed)
        })
            .then(function (a) { return a.json() })
            .then(function (a) {
                terminadas(a)

            });

    }
}

window.addEventListener("click", function (event) {
    if (event.target.className === 'not-done') {
        target = event.target;
        idElement = target.id
    }
    classElement = event.target.className;
    completeTask(localStorage.getItem('jwt'));
});


const submit = document.getElementById('btn-send');

submit.onclick = a => {
    a.preventDefault();
    makeTasks(localStorage.getItem('jwt'));
}


window.onload = () => {

    obterUsuario(localStorage.getItem('jwt'))
    obterTasks(localStorage.getItem('jwt'))
};










