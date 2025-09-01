const readlineSync = require('readline-sync');
const CepService = require('./CepService');

class CliApp {
    constructor() {
        this.cepService = new CepService();
    }

    exibirInformacoes(dadosCEP) {
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

    mostrarDataHora() {
        const agora = new Date();
        console.log(`🕒 Data e hora atual: ${agora.toLocaleString()}`);
        console.log('');
    }

    async executar() {
        console.log('🏠 Bem-vindo ao Consultor de CEP!');
        console.log('Digite "sair" para encerrar o programa\n');
        while (true) {
            try {
                const entrada = readlineSync.question('Digite o CEP (formato: 12345-678 ou 12345678) ou "data" para ver a data/hora: ');
                if (entrada.toLowerCase() === 'sair') {
                    console.log('👋 Obrigado por usar o Consultor de CEP!');
                    break;
                }
                if (entrada.toLowerCase() === 'data') {
                    this.mostrarDataHora();
                    continue;
                }
                const dadosCEP = await this.cepService.buscar(entrada);
                this.exibirInformacoes(dadosCEP);
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
}

module.exports = CliApp;
