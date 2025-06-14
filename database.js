/**
 * Módulo de conexão com o banco de dados
 * Uso do framework mongoose
 */

// importação do mongoose
// Não esquecer de instalar o módulo (npm i mongoose)
const mongoose = require('mongoose')

// configuração do banco de dados
// ip/link do servidor, autenticação, nome do Banco
// ao final da url definir o nome do banco de dados
// exemplo: /dbclientes
const url = 'mongodb+srv://admin:123Senac@cluster0.4cawy.mongodb.net/dbclient'

// validação (evitar a abertura de várias conexões)
let conectado = false

// método para conectar com o banco de dados
const conectar = async () => {
    // se não estiver conectado
    if (!conectado) {
        // conectar com o banco de dados
        // try catch - tratamento de exceções
        try {
            await mongoose.connect(url) // conectar
            conectado = true // setar a variável
            console.log("MongoDB Conectado")
            return true //para o main identificar a conexão estabelecida com sucesso
        } catch (error) {
            console.log(error)
            return false
        }
    }
}

// método para desconectar do banco de dados
const desconectar = async () => {
    // Validaçao (se estiver conectado, desconectar)
    if (conectado) {
        // desconectar do banco de dados
        try {
            await mongoose.disconnect(url) // desconectar
            conectado = false // setar a variável
            console.log("MongoDB Desconectado")
            return true //para o main identificar que o banco de dados foi desconectado com sucesso
        } catch (error) {
            console.log(error)
            return false
        }
    }
}

// exportar para o main os métodos conectar e desconectar
module.exports = { conectar, desconectar }