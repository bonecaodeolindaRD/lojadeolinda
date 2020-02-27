let inputSenha = document.getElementById("passUsuario");
let inputConfSenha = document.getElementById("confSenhaUsuario");

inputConfSenha.addEventListener('blur', (e) => {
    if (inputConfSenha.value != inputSenha.value) {
        inputConfSenha.setAttribute('class', 'form-control is-invalid');
    } else
        inputConfSenha.setAttribute('class', 'form-control is-valid');
});