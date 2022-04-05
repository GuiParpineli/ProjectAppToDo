const senha = document.getElementById('password');
const senhaConfirm = document.getElementById('passwordConfirm');
const criarConta = document.getElementById('submit');
const nome = document.getElementById('nome');
const sobrenome = document.getElementById('sobrenome');
const email = document.getElementById('email');
const errorListUl = document.querySelector('.errorlist ul');
const errorList = document.querySelector('.errorlist');

const empty = a => a.value.trim() === '';

var errorMessage = a => errorListUl.innerHTML += '<li>' + a + '</li>';

const limparcamp = () => {
    const small = document.querySelectorAll('.error');
    small.forEach( a => a.classList.remove('error'));
    const inputError = document.querySelectorAll('.error-input');
    inputError.forEach( a => a.classList.remove('error-input'));
};


criarConta.addEventListener('click', a => {
    errorListUl.innerHTML = '';
    errorList.hidden = ''; 
    a.preventDefault()
    limparcamp() 

    if (senha.value !== senhaConfirm.value) {
        a.preventDefault();
        const small = document.createElement('small');
        const message = document.createTextNode('As senhas não são iguais!');
        small.appendChild(message);
        small.classList.add('error')
        senha.after(small);
    }
    if (empty(nome)) {
        a.preventDefault();
        errorMessage('Campo <b>Nome</b> não preenchido');
        nome.classList.add('error-input')
    }
    if (empty(sobrenome)) {
        a.preventDefault();
        errorMessage('Campo <b>Sobrenome</b> não preenchido');
        sobrenome.classList.add('error-input');
    }
    if (empty(email)) {
        a.preventDefault();
        errorMessage('Campo <b>Email</b> não preenchido');
        email.classList.add('error-input')
    }
    if (empty(senha)) {
        a.preventDefault();
        errorMessage('Campo <b>Senha</b> não preenchido');
        senha.classList.add('error-input')
    }
    if (empty(senhaConfirm)) {
        a.preventDefault();
        errorMessage('Campo <b>Repetir senha</b> não preenchido');
        senhaConfirm.classList.add('error-input')
    }else{
        cadastro()
    }

    window.scrollBy({top:200, behavior:'smooth'});
    
});

senha.addEventListener('keyup', () => limparcamp());
nome.addEventListener('keyup', () => limparcamp());
sobrenome.addEventListener('keyup', () => limparcamp());
email.addEventListener('keyup', () => limparcamp());
senha.addEventListener('keyup', () => limparcamp());
senhaConfirm.addEventListener('keyup', () => limparcamp());



