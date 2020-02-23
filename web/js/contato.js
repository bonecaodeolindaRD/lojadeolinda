let inputNome = document.getElementById("contatoNome");
let inputTelefone = document.getElementById("contatoTel");
let inputMensagem = document.getElementById("contatoMensagem");
let btnContato = document.getElementById("enviarContato");
let inputEmail = document.getElementById("contatoEmail");
let frmContato = document.getElementById("form-contato");
let closeModal = document.getElementById("closeModal");

const validarForm = (e) => { // pegar o evento
  e.preventDefault(); // abortando o envio

  let nomeValor = inputNome.value.trim();
  let emailValor = inputEmail.value.trim();
  let telefoneValor = inputTelefone.value.trim();
  let mensagemValor = inputMensagem.value.trim();

  if (ehNome(nomeValor) && ehMail(emailValor) && ehTel(telefoneValor) && ehMensagem(mensagemValor)) {

    abreModal();

  }

}


const enviaFormulario = () => {
  frmContato.submit();
}


const abreModal = () => {

  $("#enviarFormulario").modal({
    show: true
  });

}

const ehMensagem = (mensagem) => {

  if (ehTamanhoMinimo(mensagem.length, 5)) {
    erroCampo(inputMensagem);
    inputMensagem.focus();
    return false;
  }

  return true;

}

const ehNome = (nome) => {

  let re = /^[a-zA-ZéúíóáÉÚÍÓÁèùìòàçÇÈÙÌÒÀõãñÕÃÑêûîôâÊÛÎÔÂëÿüïöäËYÜÏÖÄ\-\ \s]+$/;
  if (!re.test(nome) || ehTamanhoMinimo(nome.length, 3)) {
    erroCampo(inputNome);
    inputNome.focus();
    return false;
  }
  return true;

};

const ehMail = (email) => {

  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (!re.test(email)) {
    erroCampo(inputEmail);
    inputEmail.focus();
    return false;
  }
  return true;

}

const maskTel = () => {
  let v = inputTelefone.value.trim();
  v = v.replace(/\D/g, "") //Remove tudo o que não é dígito
  v = v.replace(/^(\d\d)(\d)/g, "($1) $2") //Coloca parênteses em volta dos dois primeiros dígitos
  v = v.replace(/(\d{4})(\d)/, "$1-$2") //Coloca hífen entre o quarto e o quinto dígitos
  inputTelefone.value = v;
}

const ehTel = (telefone) => {

  telefone = telefone.replace('-', '');

  let re = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;

  if (!re.test(telefone)) {
    erroCampo(inputTelefone);
    inputTelefone.focus();
    return false;
  }
  return true;
}

const erroCampo = (campo) => {
  campo.setAttribute('class', 'form-control is-invalid');
}

const ehTamanhoMinimo = (campo, tamanho) => {
  return campo < tamanho;
};

frmContato.addEventListener('submit', validarForm);
closeModal.addEventListener('click', enviaFormulario);
inputTelefone.addEventListener('blur', maskTel);

inputNome.addEventListener('keyup', (e) => {

  if (inputNome.value.length >= 100) {

    inputNome.value = inputNome.value.substring(0, 100);

  }


});

inputMensagem.addEventListener('keyup', (e) => {

  if (inputMensagem.value.length >= 500) {

    inputMensagem.value = inputMensagem.value.substring(0, 500);

  }


});