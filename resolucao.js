/**Essa função irá trocar os caracteres especiais pelos caracteres certos */
function normalizarNome(nome) {
    var dicionario_caracteres = {
        "æ": "a",
        "ß": "b",
        "¢": "c",
        "ø": "o"
    }
    return nome.replace(/æ|ß|¢|ø/g, function(char_invalido) {
        return dicionario_caracteres[char_invalido];
    });

}

/**função que trocar string por number*/
function normalizarPreco(preco) {
    return parseFloat(preco);
}

/** Normaliza a quantidade returnando o valor 0 caso não existaColoca um novo elemento */
function normalizarQuantidade(quantidade) {
    if (quantidade == null) {
        return 0;
    } else {
        return quantidade;
    }
}

/** Função responsável por passar por todos itens do banco de dados e normalizar todos atributos  */
function normalizarBancoDeDados(broken) {
    for (let i = 0; i < broken.length; i++) {
        broken[i].name = normalizarNome(broken[i].name);
        broken[i].price = normalizarPreco(broken[i].price);
        broken[i].quantity = normalizarQuantidade(broken[i].quantity)
    }
}

/**Função que irá imprimir a lista por ordem alfabetica e ordenados por ID 
 
 */
function ordenarLista(broken) {
    let resultado = broken.sort(function(broken1, broken2) {
        let resultado2 = broken1["category"].localeCompare(broken2["category"]);
        if (resultado2 == 0) {
            return broken1["id"] - broken2["id"];
        }
        return resultado2;
    })
}

/**Função responsável por somar o estoque
 */

function calcularValorTotalEmEstoque(broken) {

    let totalPorCategoria = broken.reduce((totalPorCategoria, produto) => {
        let categoriaProdutoAtual = produto['category']
        let totalCategoriaAtual = totalPorCategoria[categoriaProdutoAtual]
        let totalProduto = produto["price"] * produto["quantity"]

        if (totalCategoriaAtual) {
            totalPorCategoria[categoriaProdutoAtual] = totalPorCategoria[categoriaProdutoAtual] + totalProduto;

        } else {
            totalPorCategoria[categoriaProdutoAtual] = totalProduto
        }
        return totalPorCategoria
    }, [])

    for (var categoria in totalPorCategoria) {
        console.log("O total da categoria " + categoria + " é " + totalPorCategoria[categoria])
    }
}


const fs = require('fs');

/**Lê o arquivo e normaliza o json */
fs.readFile('broken-database.json', 'utf-8', (error, data) => {
    var broken = JSON.parse(data);

    normalizarBancoDeDados(broken);
    console.log(broken);
    ordenarLista(broken);
    console.log(broken);
    calcularValorTotalEmEstoque(broken);

})