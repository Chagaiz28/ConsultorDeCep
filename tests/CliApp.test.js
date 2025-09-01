const CliApp = require('../src/CliApp');

describe('CliApp utilitários', () => {
    let app;
    beforeEach(() => {
        app = new CliApp();
    });

    test('exibirInformacoes deve mostrar dados formatados', () => {
        const dadosCEP = {
            cep: '37540-000',
            logradouro: 'Rua Teste',
            bairro: 'Centro',
            localidade: 'Itajubá',
            uf: 'MG',
            ddd: '35',
            ibge: '3132404'
        };
        // Apenas verifica se não lança erro
        expect(() => app.exibirInformacoes(dadosCEP)).not.toThrow();
    });

    test('mostrarDataHora deve mostrar data/hora sem erro', () => {
        expect(() => app.mostrarDataHora()).not.toThrow();
    });
});
