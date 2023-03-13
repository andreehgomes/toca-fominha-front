const express = require('express');
const path = require('path');
const appName = 'toca-fominha-front';
const app = express();

app.use(express.static(`${__dirname}/dist/${appName}`));

app.get('/*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/dist/${appName}/index.html`));
});

//ouvir a porta que o Heroku disponibilizar
app.listen(process.env.PORT);