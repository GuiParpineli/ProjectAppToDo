




const route = {
    users: "/users",
    login: "/users/login",
    tasks: "/tasks"
};

const createTask = () => {

    const url = api + route.tasks;

    const dataTask = {
        description: a.value,
        completed: false
    };
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataTask),
    })
        .then(function (response) { return response.json() })
        .then(function (task) {
         const task = task;
        })
        .catch(function (error) {
            console.error(error);
        });
};