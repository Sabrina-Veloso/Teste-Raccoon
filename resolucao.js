//ler arquivo  
const fs = require('fs');
fs.readFile('/broken-database.json', 'utf-8', (error, data) => {
        const broken = JSON.parse(data);
        console.log(broken.nome);

    })
    //função que irá substituir as letras erradas pelas certas
function name() {
    do {
        broken.name.replace("æ", "a");
        broken.name.replace("ß", "b");
        broken.name.replace("¢", "c");
        broken.name.replace("ø", "0");
    } while (true)

}

//função para trocar string por number
function numero() {

    var numero = parseNumber(broken.price)

}