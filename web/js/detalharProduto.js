let btnCalcularFrete = document.getElementById("calcularFrete");
let controles = document.getElementById("controle");
let inputcepfrete = document.getElementById("cepFrete");

btnCalcularFrete.addEventListener('click', () => {

        let frete = document.getElementById("frete");
       
        if (ehTamanho(inputcepfrete.value, 8)) {

                //frete.setAttribute('class', 'mt-2 freteSuceso');
                frete.textContent = `Receba em até  10 dias úteis
        R$200,00 `;
        
        } else {
                //frete.setAttribute('class', 'mt-2 freteErro');
                frete.textContent = `O CEP informado não foi localizado `;
        }


});

const ehTamanho = (valor, tamanho) =>{

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