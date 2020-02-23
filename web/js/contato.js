let inputNome = document.getElementById("contatoNome");
let inputTelefone = document.getElementById("contatoTel");
let inputMensagem = document.getElementById("contatoMensagem");
let btnContato = document.getElementById("enviarContato");
let inputEmail = document.getElementById("contatoEmail");
let frmContato = document.getElementById("form-contato"); 


const validarForm = (e) => { // pegar o evento
    e.preventDefault(); // abortando o envio

    let nomeValor = inputNome.value.trim();
    let emailValor = inputEmail.value.trim();
    let telefoneValor = inputTelefone.value.trim();

    if(ehNome(nomeValor) && ehMail(emailValor) && ehTel(telefoneValor)){
        frmContato.submit();
    }
}

const ehNome = (nome) =>{

    let re = /^[a-zA-ZéúíóáÉÚÍÓÁèùìòàçÇÈÙÌÒÀõãñÕÃÑêûîôâÊÛÎÔÂëÿüïöäËYÜÏÖÄ\-\ \s]+$/;
    if (!re.test(nome) || ehTamanho(nome.length, 3)) {
      alert("erro");
      erroCampo(inputNome);
      inputNome.focus();
      return false;
    }
    return true;
  
};

const ehMail = (email)=>{

    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!re.test(email)) {
        erroCampo(inputEmail);
        inputEmail.focus();
        return false;
      }
      return true;

}


function ehTel(telefone) {

    let re = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;
    
    if (!re.test(telefone)) {
      erroCampo(inputTelefone);
      inputTelefone.focus();
      return false;
    }
    return true;
  }


const erroCampo = (campo) =>{
    campo.setAttribute('class', 'form-control is-invalid');
}

const ehTamanho = (campo, tamanho) =>{
    return campo < tamanho;
};

frmContato.addEventListener("submit", validarForm);


