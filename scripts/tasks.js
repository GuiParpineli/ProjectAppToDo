
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
                const skeleton = document.getElementById('skeleton')
                const tarefa = document.createElement('li');
                const notDone = document.createElement('div');
                const descricao = document.createElement('div');
                const id = document.createElement('p');
                const p = document.createElement('p');
                const p2 = document.createElement('p');

                const pDescription = document.createTextNode(a.description);
                const pTime = document.createTextNode(a.createdAt);
                const pId = document.createTextNode(a.id);

                id.appendChild(pId);
                p.appendChild(pDescription);
                p2.appendChild(pTime);
                descricao.appendChild(p);
                descricao.appendChild(p2);
                notDone.appendChild(descricao);
                tarefa.appendChild(notDone);
                tarefa.appendChild(descricao);
                tarefa.appendChild(id);

                descricao.classList.add("descricao");
                notDone.classList.add("not-done");
                p.classList.add("nome");
                p2.classList.add("timestamp");
                tarefa.classList.add("tarefa");
                id.style.display = 'none'

                skeleton.prepend(tarefa);
               
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
            const skeleton = document.getElementById('skeleton')
            const tarefa = document.createElement('li');
            const notDone = document.createElement('div');
            const descricao = document.createElement('div');
            const p = document.createElement('p');
            const p2 = document.createElement('p');

            const pDescription = document.createTextNode(a.description);
            const pTime = document.createTextNode(a.createdAt);

            p.appendChild(pDescription);
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

            skeleton.prepend(tarefa);
            inpuTask.value = ''
        })
}

const delTask = (jwt) => {

    const api = 'https://ctd-todo-api.herokuapp.com/v1/tasks/';
    const url = api + id;

    fetch(url, {
        method: 'DELETE',
        headers: {
            "content-type": "application/json",
            authorization: jwt
        }
    })
}









const submit = document.getElementById('btn-send');

submit.onclick = a => {
    a.preventDefault();
    makeTasks(localStorage.getItem('jwt'));
}

window.onload = () => {
    obterUsuario(localStorage.getItem('jwt'))
    obterTasks(localStorage.getItem('jwt'))
}

