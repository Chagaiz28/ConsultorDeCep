const axios = require('axios');
const readlineSync = require('readline-sync');


// Função para buscar informações do CEP


const CliApp = require('./src/CliApp');

(async () => {
    const app = new CliApp();
    await app.executar();
})();
            console.log('');
