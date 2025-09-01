const CepService = require('../src/CepService');

describe('CepService utilitários', () => {
    let service;
    beforeEach(() => {
        service = new CepService();
    });

    test('limparCep remove caracteres não numéricos', () => {
        expect(service.limparCep('12.345-678')).toBe('12345678');
        expect(service.limparCep('abc37540-000xyz')).toBe('37540000');
    });

    test('validarCep retorna true para CEP válido', () => {
        expect(service.validarCep('37540-000')).toBe(true);
        expect(service.validarCep('37540000')).toBe(true);
    });

    test('validarCep retorna false para CEP inválido', () => {
        expect(service.validarCep('123')).toBe(false);
        expect(service.validarCep('')).toBe(false);
        expect(service.validarCep('abc')).toBe(false);
    });

    test('formatarCep retorna CEP formatado', () => {
        expect(service.formatarCep('37540000')).toBe('37540-000');
        expect(service.formatarCep('12.345-678')).toBe('12345-678');
    });
});
