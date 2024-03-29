//importar express
const express = require('express');
//iniciar express
const app = express();
//nome da pasta no dist que será feito o build
const appName = 'toca-fominha-front';
//local onde o build irá gerar os arquivos
const outputPath = `${__dirname}/dist/${appName};`

//setar o diretório de build para servir o conteudo Angular
app.use(express.static(outputPath));
//redirecionar qualquer requisição para o index.html
app.get('/*', (req, res) => {
    res.sendFile(`${outputPath}/index.html`);
});
//ouvir a porta que o Heroku disponibilizar
app.listen(process.env.PORT);