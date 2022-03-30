const senha = document.getElementById('password');
const senhaConfirm = document.getElementById('passwordConfirm');
const criarConta = document.getElementById('submit');



criarConta.addEventListener('click', a => {
  

    if (senha.value !== senhaConfirm.value) {
        a.preventDefault();
        const small = document.createElement('small');
        const message = document.createTextNode('As senhas não são iguais!');
        small.appendChild(message);
        small.classList.add('error')
        senha.after(small);
    }
});

