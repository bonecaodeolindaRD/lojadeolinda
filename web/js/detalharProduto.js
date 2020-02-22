let btnCalcularFrete = document.getElementById("calcularFrete");
let controles = document.getElementById("controle");
let inputcepfrete = document.getElementById("cepFrete");


btnCalcularFrete.addEventListener('click', () => {

        let valor = inputcepfrete.value;
        
        let calcularFrete = ` <p class="mt-2">
        <em> Receba em até  10 dias úteis 
        <br> R$200,00
        </em> 
        </p>`;  

        controles.innerHTML += calcularFrete;
    
});