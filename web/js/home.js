let carrouselItems = document.querySelector("#corrossel-bonecos .carousel-inner");
let first = true;

const addItemsCarousel = (img, link, altImg) => {
    let divEl = document.createElement("div");
    let linkEl = document.createElement("a");
    let imgEl = document.createElement("img");
    linkEl.setAttribute("href", link);
    if(first){
        divEl.setAttribute("class", "carousel-item active");
        first = false;
    }
    else
        divEl.setAttribute("class", "carousel-item activ");
    imgEl.setAttribute("src", img);
    imgEl.setAttribute("class", "d-block w-100");
    imgEl.setAttribute("alt", altImg);
    divEl.appendChild(linkEl);
    linkEl.appendChild(imgEl);
    carrouselItems.appendChild(divEl);
}

addItemsCarousel("img/home/bonec-selecao-1.png", "#", "selecao");
addItemsCarousel("img/home/bonec-selecao-2.png", "#", "selecao");
addItemsCarousel("img/home/boneco-palhaco.png", "#", "selecao");