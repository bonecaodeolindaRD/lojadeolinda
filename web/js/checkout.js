let divCompra = document.querySelector("#produtos-compra");
let formCompra = document.querySelector("#form-compra");

//Entrega
let inputCEPEntrega = document.querySelector("#cep-entrega");
let inputRuaEntrega = document.querySelector("#rua-entrega");
let inputNumeroEntrega = document.querySelector("#numero-entrega");
let inputComplementoEntrega = document.querySelector("#complemento-entrega");
let inputEstadoEntrega = document.querySelector("#estado-entrega");
let inputCidadeEntrega = document.querySelector("#cidade-entrega");

//Pagamento

// let inputTitularCartao = document.querySelector();
// let inputCPFCartao = document.querySelector();
// let inputnumeroCartao = document.querySelector();
// let inputCVVCartao = document.querySelector();
// let inputValidadeCartao = document.querySelector();
let total = 0.00;

//Conta

//let inputSenhaConta = document.querySelector();



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
    total += parseFloat(price);
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

inputEstadoEntrega.addEventListener("change", () => {
    listarMunicios(inputEstadoEntrega.value);
});

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

addItemsResume("Titulo", "img/home/produtos/item 1.webp", "999.99", 1);
addItemsResume("Titulo", "img/home/produtos/item 1.webp", "999.99", 1);
addItemsResume("Titulo", "img/home/produtos/item 1.webp", "999.99", 1);
addTotal(total);

listarEstados();