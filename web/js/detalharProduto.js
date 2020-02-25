let btnCalcularFrete = document.getElementById("calcularFrete");
let controles = document.getElementById("controle");
let inputcepfrete = document.getElementById("cepFrete");

btnCalcularFrete.addEventListener('click', () => {

        buscarCep();
   
});

const ehTamanho = (valor, tamanho) => {

        return valor.length == tamanho;
}


inputcepfrete.addEventListener('keyup', (e) => {

        if (isNaN(inputcepfrete.value)) {

                inputcepfrete.value = inputcepfrete.value.substring(0, (inputcepfrete.value.length - 1));

        }

        if (inputcepfrete.value.length >= 8) {

                inputcepfrete.value = inputcepfrete.value.substring(0, 8);

        }

});


const  buscarCep = () =>{

        let frete = document.getElementById("frete");

        if (ehTamanho(inputcepfrete.value, 8)) {

        let resposta = fetch('https://viacep.com.br/ws/' + inputcepfrete.value +'/json/')
            .then((resposta) => {
                return resposta.json()
            })
            .then((dados) => {
    
               console.log(dados);
    
               if(!dados.erro){
    
                frete.setAttribute('class', 'form-control mt-2 is-valid');
                frete.textContent = `Receba em até 10 dias úteis - R$200,00 `;

               }else{
    
                frete.setAttribute('class', 'form-control mt-2 is-invalid');
                frete.textContent = `O CEP informado não foi localizado `;

               }
    
              
            });

        }else{

             frete.setAttribute('class', 'form-control mt-2 is-invalid');
             frete.textContent = `Um CEP é composto por oito dígitos`;

        }

     }