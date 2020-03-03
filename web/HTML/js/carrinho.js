let removerItem = document.querySelectorAll("#removeItem");

removerItem.forEach(btn => btn.addEventListener("click", () => {
    
let node = event.target.parentNode.parentNode.parentNode.parentNode;

node.remove();

})); 
