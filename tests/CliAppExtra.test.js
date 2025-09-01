const CliApp = require('../src/CliApp');

describe('CliApp cenários extras', () => {
    let app;
    beforeEach(() => {
        app = new CliApp();
    });

    test('exibirInformacoes lida com campos ausentes', () => {
        const dadosCEP = {
            cep: '00000-000',
            localidade: 'Cidade',
            uf: 'XX'
        };
        expect(() => app.exibirInformacoes(dadosCEP)).not.toThrow();
    });

    test('mostrarDataHora executa sem erro', () => {
        expect(() => app.mostrarDataHora()).not.toThrow();
    });

    test('exibirInformacoes aceita todos os campos nulos', () => {
        const dadosCEP = {
            cep: null,
            logradouro: null,
            bairro: null,
            localidade: null,
            uf: null,
            ddd: null,
            ibge: null
        };
        expect(() => app.exibirInformacoes(dadosCEP)).not.toThrow();
    });
});
