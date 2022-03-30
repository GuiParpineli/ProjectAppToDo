const senha = document.getElementById('password');
const senhaConfirm = document.getElementById('passwordConfirm');
const criarConta = document.getElementById('submit');

const limparcamp = () => {
    const small = document.querySelectorAll('.error');
    small.forEach((a) => {
        a.classList.remove('error');
    })
};


criarConta.addEventListener('click', a => {
    limparcamp()
    if (senha.value !== senhaConfirm.value) {
        a.preventDefault();
        const small = document.createElement('small');
        const message = document.createTextNode('As senhas não são iguais!');
        small.appendChild(message);
        small.classList.add('error')
        senha.after(small);
    }
});

senha.addEventListener('keyup', () => limparcamp());
