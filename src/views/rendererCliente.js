const cepInput = document.getElementById('inputCEPClient')
const cepError = document.getElementById('cepErrorMessage')

cepInput.addEventListener('input', (e) => {
    let cep = e.target.value.replace(/\D/g, '')
    if (cep.length > 5) {
        cep = cep.slice(0, 5) + '-' + cep.slice(5, 8)
    }
    e.target.value = cep
    cepError.style.display = 'none'
})

cepInput.addEventListener('input', buscarCEP)

function buscarCEP() {
    const cep = cepInput.value.replace(/\D/g, '')

    if (cep.length !== 8) {
        cepError.innerText = 'Deve conter 8 números.'
        cepError.style.display = 'block'
        limparCamposEndereco()
        return
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(dados => {
            if (dados.erro) {
                cepError.innerText = 'CEP não encontrado.'
                cepError.style.display = 'block'
                limparCamposEndereco()
                return
            }

            document.getElementById('inputAddressClient').value = dados.logradouro
            document.getElementById('inputNeighborhoodClient').value = dados.bairro
            document.getElementById('inputCityClient').value = dados.localidade
            document.getElementById('inputUFClient').value = dados.uf

            cepError.style.display = 'none'
        })
        .catch(() => {
            cepError.innerText = 'Erro ao buscar o CEP. Verifique sua conexão.'
            cepError.style.display = 'block'
            limparCamposEndereco()
        })
}

function limparCamposEndereco() {
    document.getElementById('inputAddressClient').value = ''
    document.getElementById('inputNeighborhoodClient').value = ''
    document.getElementById('inputCityClient').value = ''
    document.getElementById('inputUFClient').value = ''
}


// Criar um vetor globar para manipular os dados do cliente
let arrayClient = []

// Iniciar a janela de clientes alterando as propriedades de alguns elementos
document.addEventListener('DOMContentLoaded', () => {
    // Desativar os botões editar e excluir
    btnUpdate.disabled = true
    btnDelete.disabled = true
    // Ativar o botão adicionar
    btnCreate.disabled = false
    
})

//captura dos dados dos inputs do formulário (Passo 1: Fluxo)
let frmClient = document.getElementById('frmClient')
let nameClient = document.getElementById('inputNameClient')
let cpfClient = document.getElementById('inputCPFClient')
let emailClient = document.getElementById('inputEmailClient')
let phoneClient = document.getElementById('inputPhoneClient')
let cepClient = document.getElementById('inputCEPClient')
let addressClient = document.getElementById('inputAddressClient')
let numberClient = document.getElementById('inputNumberClient')
let complementClient = document.getElementById('inputComplementClient')
let neighborhoodClient = document.getElementById('inputNeighborhoodClient')
let cityClient = document.getElementById('inputCityClient')
let ufClient = document.getElementById('inputUFClient')
// Uso do ID para o delete e update
let idClient = document.getElementById('inputIdClient')

// ============================================================
// == CRUD Create/Update ======================================

//Evento associado ao botão submit (uso das validações do html)
frmClient.addEventListener('submit', async (event) => {
    //evitar o comportamento padrão do submit que é enviar os dados do formulário e reiniciar o documento html
    event.preventDefault()
    // Teste importante (recebimento dos dados do formuláro - passo 1 do fluxo)
    //console.log(nameClient.value, cpfClient.value, emailClient.value, phoneClient.value, cepClient.value, addressClient.value, numberClient.value, complementClient.value, neighborhoodClient.value, cityClient.value, ufClient.value)
    //Criar um objeto para armazenar os dados do cliente antes de enviar ao main

    // Estratégia para usar o submit para cadastrar um novo Cliente ou editar os dados de um Cliente ja existe
    // verificar se existe o id do cliente
    if (idClient.value === "") {
        // cadastrar um novo cliente
        const client = {
            nameCli: nameClient.value,
            cpfCli: cpfClient.value,
            emailCli: emailClient.value,
            phoneCli: phoneClient.value,
            cepCli: cepClient.value,
            addressCli: addressClient.value,
            numberCli: numberClient.value,
            complementCli: complementClient.value,
            neighborhoodCli: neighborhoodClient.value,
            cityCli: cityClient.value,
            ufCli: ufClient.value
        }
        // Enviar ao main o objeto client - (Passo 2: )
        // uso do preload.js
        api.newClient(client)
    } else {
        // alterar os dados de um cliente existente
        // teste de validação do id
        // console.log(idClient.value)
        // editar um cliente existente
        const client = {
            idCli: idClient.value,
            nameCli: nameClient.value,
            cpfCli: cpfClient.value,
            emailCli: emailClient.value,
            phoneCli: phoneClient.value,
            cepCli: cepClient.value,
            addressCli: addressClient.value,
            numberCli: numberClient.value,
            complementCli: complementClient.value,
            neighborhoodCli: neighborhoodClient.value,
            cityCli: cityClient.value,
            ufCli: ufClient.value
        }
        // enviar ao main o objeto client - (passo 2: fluxo)
        // uso preload.js
        api.updateClient(client)
    }
});

// == Fim CRUD Create/Update ==================================
// ============================================================

// ============================================================
// == Reset Form ==============================================
function resetForm() {
    location.reload()
}

api.resetForm((args) => {
    resetForm()
})
// == Fim Reset Form ==========================================
// ============================================================

// Máscara de CPF
document.getElementById('inputCPFClient').addEventListener('input', function (e) {
    let cpf = e.target.value.replace(/\D/g, ''); // remove tudo que não for número
    if (cpf.length > 11) cpf = cpf.slice(0, 11); // limita em 11 dígitos
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    e.target.value = cpf;
});

// Máscara de Telefone
document.getElementById('inputPhoneClient').addEventListener('input', function (e) {
    let phone = e.target.value.replace(/\D/g, ''); // remove tudo que não for número
    if (phone.length > 11) phone = phone.slice(0, 11); // limita em 11 dígitos
    if (phone.length <= 10) {
        phone = phone.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else {
        phone = phone.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }
    e.target.value = phone;
});
