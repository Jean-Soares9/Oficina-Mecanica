/**
 *  Processo de renderização do documento index.html
 */

console.log("Processo de renderização")

// Envio de uma mensagem para o main abrir a janela clinte
function client() {
    //console.log("teste do botão cliente")
    //uso da api(autorizada no preload.js)
    api.clientWindow()
}

// inserção da data no rodapé
function obterData() {
    const data = new Date()
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    return data.toLocaleDateString('pt-BR', options)
}

document.getElementById('dataAtual').innerHTML = obterData()

// Troca do ícone do banco de dados (status de conexão)
// Uso de api do preload.js
api.dbStatus((event, message) => {
    // Teste de recebimento da mensagem
    console.log(message)
    if (message === "conectar") {
        document.getElementById('statusdb').src = "../public/img/dbon.png"
    } else {
        document.getElementById('statusdb').src = "../public/img/dboff.png"
    }
})