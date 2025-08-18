const axios = require('axios');
const readlineSync = require('readline-sync');


// Função para buscar informações do CEP
async function buscarCEP(cep) {
    try {
        // Remove caracteres não numéricos do CEP
        const cepLimpo = cep.replace(/\D/g, '');
        
        // Verifica se o CEP tem 8 dígitos
        if (cepLimpo.length !== 8) {
            throw new Error('CEP deve ter 8 dígitos');
        }

        console.log(`🔍 Buscando informações do CEP: ${cepLimpo}...`);
        
        // Faz a requisição para a API ViaCEP
        const response = await axios.get(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        
        // Verifica se o CEP é válido
        if (response.data.erro) {
            throw new Error('CEP não encontrado');
        }

        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error('Erro na consulta do CEP');
        }
        throw error;
    }
}

// Função para exibir as informações do CEP
function exibirInformacoes(dadosCEP) {
    console.log('\n📍 Informações do CEP:');
    console.log('========================');
    console.log(`CEP: ${dadosCEP.cep}`);
    console.log(`Logradouro: ${dadosCEP.logradouro || 'Não informado'}`);
    console.log(`Bairro: ${dadosCEP.bairro || 'Não informado'}`);
    console.log(`Cidade: ${dadosCEP.localidade}`);
    console.log(`Estado: ${dadosCEP.uf}`);
    console.log(`DDD: ${dadosCEP.ddd || 'Não informado'}`);
    console.log(`IBGE: ${dadosCEP.ibge || 'Não informado'}`);
    console.log('========================\n');
}

async function main() {
    console.log('🏠 Bem-vindo ao Consultor de CEP!');
    console.log('Digite "sair" para encerrar o programa\n');

    while (true) {
        try {
            const cep = readlineSync.question('Digite o CEP (formato: 12345-678 ou 12345678): ');
            
            if (cep.toLowerCase() === 'sair') {
                console.log('👋 Obrigado por usar o Consultor de CEP!');
                break;
            }

            const dadosCEP = await buscarCEP(cep);
            exibirInformacoes(dadosCEP);

            const continuar = readlineSync.question('Deseja consultar outro CEP? (s/n): ');
            if (continuar.toLowerCase() !== 's' && continuar.toLowerCase() !== 'sim') {
                console.log('👋 Obrigado por usar o Consultor de CEP!');
                break;
            }
            console.log('');

        } catch (error) {
            console.log(`❌ Erro: ${error.message}\n`);
        }
    }
}

main().catch(error => {
    console.error('❌ Erro inesperado:', error.message);
    process.exit(1);
});
