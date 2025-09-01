const CepService = require('../src/CepService');
const axios = require('axios');
jest.mock('axios');

describe('CepService', () => {
    let service;
    beforeEach(() => {
        service = new CepService();
    });

    test('deve retornar dados válidos para CEP correto', async () => {
        axios.get.mockResolvedValue({ data: { cep: '37540-000', localidade: 'Itajubá', uf: 'MG' } });
        const result = await service.buscar('37540-000');
        expect(result.cep).toBe('37540-000');
        expect(result.localidade).toBe('Itajubá');
        expect(result.uf).toBe('MG');
    });

    test('deve lançar erro para CEP com menos de 8 dígitos', async () => {
        await expect(service.buscar('123')).rejects.toThrow('CEP deve ter 8 dígitos');
    });

    test('deve lançar erro para CEP não encontrado', async () => {
        axios.get.mockResolvedValue({ data: { erro: true } });
        await expect(service.buscar('00000000')).rejects.toThrow('CEP não encontrado');
    });

    test('deve lançar erro de requisição', async () => {
        axios.get.mockRejectedValue({ response: true });
        await expect(service.buscar('37540000')).rejects.toThrow('Erro na consulta do CEP');
    });

    test('deve aceitar CEP sem traço', async () => {
        axios.get.mockResolvedValue({ data: { cep: '37540-000', localidade: 'Itajubá', uf: 'MG' } });
        const result = await service.buscar('37540000');
        expect(result.cep).toBe('37540-000');
    });
});
