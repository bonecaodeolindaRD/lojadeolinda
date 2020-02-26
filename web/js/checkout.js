let divCompra = document.querySelector("#produtos-compra");
let formCompra = document.querySelector("#form-compra");

//Entrega
let inputCEPEntrega = document.querySelector("#cep-entrega");
let inputRuaEntrega = document.querySelector("#rua-entrega");
let inputNumeroEntrega = document.querySelector("#numero-entrega");
let inputComplementoEntrega = document.querySelector("#complemento-entrega");
let inputEstadoEntrega = document.querySelector("#estado-entrega");
let inputCidadeEntrega = document.querySelector("#cidade-entrega");
let divEndereco = document.querySelector("#enderecos div");

//Pagamento

let inputTitularCartao = document.querySelector("#nome-titular-cartao");
let inputCPFCartao = document.querySelector("#cpf-titular-cartao");
let inputNumeroCartao = document.querySelector("#numero-cartao");
let inputCVVCartao = document.querySelector("#cvv-cartao");
let inputValidadeCartao = document.querySelector("#data-cartao");
let total = 0.00;

//Conta

let inputSenhaConta = document.querySelector("#senha-conta");

//finalizar compra

let btnFinalizar = document.querySelector("#btn-finalizar");


const addEnderecoCad = (id, rua) => {
    let labelEnderoEl = document.createElement("label");
    let radioEnderecoEl = document.createElement("input");
    radioEnderecoEl.setAttribute("id", id);
    radioEnderecoEl.setAttribute("type", "radio");
    radioEnderecoEl.setAttribute("name", "radio-endereco");
    labelEnderoEl.setAttribute("for", "radio-endereco");
    labelEnderoEl.innerText = rua + " ";
    labelEnderoEl.appendChild(radioEnderecoEl);
    radioEnderecoEl.innerText = rua;
    divEndereco.appendChild(labelEnderoEl);

}

const addItemsResume = (title, img, price, quantity) => {
    let divCardEl = document.createElement("div");
    let divRowEl = document.createElement("div");
    let divTitleEl = document.createElement("div");
    let h5TitleEl = document.createElement("h5");
    let imgItemEl = document.createElement("img");
    let divPriceEl = document.createElement("div");
    let h6PriceEl = document.createElement("h6");
    let pQuantityEl = document.createElement("p");

    divCardEl.setAttribute("class", "card col-12 mb-2");
    divRowEl.setAttribute("class", "row p-2");
    divTitleEl.setAttribute("class", "col-7");
    h5TitleEl.setAttribute("class", "card-title");
    h5TitleEl.innerHTML = title;
    imgItemEl.setAttribute("src", img);
    divPriceEl.setAttribute("class", "col-5");
    h6PriceEl.innerHTML = "R$ " + price * quantity;
    total += parseFloat(price) * quantity;
    pQuantityEl.innerHTML = "Quantidade: " + quantity;

    divCompra.appendChild(divCardEl);
    divCardEl.appendChild(divRowEl);
    divRowEl.appendChild(divTitleEl);
    divRowEl.appendChild(divPriceEl);
    divPriceEl.appendChild(h6PriceEl);
    divPriceEl.appendChild(pQuantityEl);
    divTitleEl.appendChild(h5TitleEl);
    divTitleEl.appendChild(imgItemEl);
}

const testaCPF = strCPF => {
    var soma;
    var resto;
    soma = 0;
    if (strCPF == "00000000000") return false;

    for (i = 1; i <= 9; i++) 
        soma = soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11)) 
        resto = 0;
    if (resto != parseInt(strCPF.substring(9, 10))) 
        return false;

    soma = 0;
    for (i = 1; i <= 10; i++) 
        soma = soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11)) 
        resto = 0;
    if (resto != parseInt(strCPF.substring(10, 11))) 
        return false;
    return true;
}

const isEmpty = txt => txt.value == null && txt.length <= 0;

const validCamp = obj => {
    let result = isEmpty(obj.value)
    if (result)
        obj.setAttribute("class", "form-control is-invalid");
    else
        obj.setAttribute("class", "form-control is-valid");

    return result;
}

const addTotal = (value) => {
    let h5TotalEl = document.createElement("h5");
    h5TotalEl.setAttribute("class", "p-2");
    h5TotalEl.innerHTML = "Total: R$ " + value;
    divCompra.append(h5TotalEl);
}

const addOption = (obj, value, nome) => {
    let opt = document.createElement("option");
    opt.setAttribute("value", value);
    opt.innerHTML = nome;
    obj.appendChild(opt);
}


const listarEstados = () => {
    fetch("https://br-cidade-estado-nodejs.glitch.me/estados", {
        method: "GET"
    }).
        then(param => param.json().
            then(items => items.forEach(item => {
                addOption(inputEstadoEntrega, item.id, item.estado);
            }
            ))
        );
}

const listarMunicios = (uf) => {
    inputCidadeEntrega.innerHTML = "";
    fetch("https://br-cidade-estado-nodejs.glitch.me/estados/" + uf + "/cidades", {
        method: "GET"
    }).
        then(param => param.json().
            then(items => {
                items.forEach(item => {

                    addOption(inputCidadeEntrega, item.cidade, item.cidade);
                }
                )
            })
        );
}


const validarNumerosEQuantiade = (obj, tam) => {
    if (isNaN(obj.value))
        obj.value = obj.value.substring(0, obj.value.length - 1);
    if (obj.value.length >= tam)
        obj.value = obj.value.substring(0, tam);
}


const buscarCEP = (numerocep) => {
    fetch("http://viacep.com.br/ws/" + numerocep + "/json").
        then(param => param.json().
            then(item => {
                listarMunicios(item.uf);
                inputEstadoEntrega.value = item.uf;
                inputCidadeEntrega.value = item.localidade;
                inputRuaEntrega.value = item.logradouro;
            }));
}

inputCEPEntrega.addEventListener("keyup", () => {
    validarNumerosEQuantiade(inputCEPEntrega, 8);
    if (inputCEPEntrega.value.length == 8)
        buscarCEP(inputCEPEntrega.value);
});

inputEstadoEntrega.addEventListener("change", () => listarMunicios(inputEstadoEntrega.value));

inputNumeroCartao.addEventListener("keyup", () => validarNumerosEQuantiade(inputNumeroCartao, 16)
);

inputCPFCartao.addEventListener("keyup", () => validarNumerosEQuantiade(inputCPFCartao, 11));

inputCVVCartao.addEventListener("keyup", () => validarNumerosEQuantiade(inputCVVCartao, 3));

btnFinalizar.addEventListener("click", () => {
    if (validCamp(inputCEPEntrega) ||
        validCamp(inputRuaEntrega) ||
        validCamp(inputNumeroEntrega) ||
        validCamp(inputEstadoEntrega) ||
        validCamp(inputCidadeEntrega) ||
        validCamp(inputTitularCartao) ||
        validCamp(inputCPFCartao) ||
        validCamp(inputNumeroCartao) ||
        validCamp(inputCVVCartao) ||
        validCamp(inputValidadeCartao) ||
        validCamp(inputSenhaConta)
    )
        return 0;
    if(!testaCPF(inputCPFCartao.value)){
        alert("CPF do titular do cartao invalido");
        return 0;
    }

    $("#modal-compra-finalizada").modal("show");
}
);

addItemsResume("Titulo", "img/home/produtos/item 1.webp", "999.99", 1);
addItemsResume("Titulo", "img/home/produtos/item 1.webp", "999.99", 1);
addItemsResume("Titulo", "img/home/produtos/item 1.webp", "999.99", 1);
addTotal(total);
addEnderecoCad(1, "Endereco 1");
addEnderecoCad(1, "Endereco 2");

listarEstados();