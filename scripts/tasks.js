

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

var task = [];

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
            
                skeleton.appendChild(tarefa);
            }
            )
        }
        )
}






window.onload = () => {
    obterUsuario(localStorage.getItem('jwt'))
    obterTasks(localStorage.getItem('jwt'))
}

