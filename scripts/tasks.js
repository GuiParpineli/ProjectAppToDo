
if ((localStorage.getItem('jwt') === null) || (localStorage.getItem('jwt') === '') || (localStorage.getItem('jwt') === undefined)) {
    location.href = 'index.html';
};

const logout = document.getElementById('closeApp');
const tasks = document.querySelector('.tasks');

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
    const del = document.createElement('div');
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
    tarefa.appendChild(del);

    descricao.classList.add("descricao");
    notDone.classList.add("done");
    del.classList.add("delTask");
    p.classList.add("nome");
    p2.classList.add("timestamp");
    tarefa.classList.add("tarefa");
    id.classList.add('task-id')
    del.setAttribute('id', a.id)

    tarefasTerminadas.prepend(tarefa);
}
const naoTerminadas = a => {

  
    const tarefa = document.createElement('li');
    const notDone = document.createElement('div');
    const descricao = document.createElement('div');
    const del = document.createElement('div');

    const p = document.createElement('p');
    const p2 = document.createElement('p');
    const data = new Date(a.createdAt)


    const pDescription = document.createTextNode(a.description);
    const pTime = document.createTextNode(data.toLocaleDateString('pt-BR'));



    p.appendChild(pDescription);

    p2.appendChild(pTime);
    descricao.appendChild(p);
    descricao.appendChild(p2);
    notDone.appendChild(descricao);
    tarefa.appendChild(notDone);
    tarefa.appendChild(descricao);
    tarefa.appendChild(del);

    descricao.classList.add("descricao");
    notDone.classList.add("not-done");
    del.classList.add("delTask");
    p.classList.add("nome");
    p2.classList.add("timestamp");
    tarefa.classList.add("tarefa");
    notDone.setAttribute('id', a.id)
    del.setAttribute('id', a.id)
    tasks.prepend(tarefa);
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

window.addEventListener("click", function (event) {
    if ((event.target.className === 'not-done') || (event.target.className === 'delTask')) {
        target = event.target;
        idElement = target.id
    }
    classElement = event.target.className;
    completeTask(localStorage.getItem('jwt'));
    delTask(localStorage.getItem('jwt'));
});

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
const delTask = (jwt) => {

    if (classElement === 'delTask') {

        const id = idElement
        const api = 'https://ctd-todo-api.herokuapp.com/v1/tasks/'
        const url = api + id;


        document.getElementById(idElement).parentElement.remove();

        fetch(url, {
            method: 'DELETE',
            headers: {
                "content-type": "application/json",
                authorization: jwt
            },

        })
            .then(function (a) { return a.json() })
    }
}


const submit = document.getElementById('btn-send');

submit.onclick = a => {
    a.preventDefault();
    makeTasks(localStorage.getItem('jwt'));
}


window.onload = () => {
    obterUsuario(localStorage.getItem('jwt'))
    obterTasks(localStorage.getItem('jwt'))
    setTimeout(function(a)  {
    tasks.hidden = '';
    const skeleton = document.getElementById('skeleton')
    skeleton.hidden = 'hidden'
    },1500)
};










