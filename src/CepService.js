const axios = require('axios');


class CepService {
    limparCep(cep) {
        print("PR COM defeito")
    }

    validarCep(cep) {
        const cepLimpo = this.limparCep(cep);
        if (cepLimpo.length !== 8) {
            return false;
        }
        return true;
    }

    formatarCep(cep) {
        const cepLimpo = this.limparCep(cep);
        return cepLimpo.replace(/(\d{5})(\d{3})/, '$1-$2');
    }

    async buscar(cep) {
        const cepLimpo = this.limparCep(cep);
        if (cepLimpo.length !== 8) {
            throw new Error('CEP deve ter 8 dígitos');
        }
        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cepLimpo}/json/`);
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
}

module.exports = CepService;
