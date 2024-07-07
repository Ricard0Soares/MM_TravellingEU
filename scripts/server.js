const express = require('express');
const app = express();
const port = 3000;

// Serve arquivos estáticos do diretório atual
app.use(express.static('.'));

// Rota padrão para servir o index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/home.html');
});

app.listen(port, () => {
    console.log(`Servidor local rodando em http://localhost:${port}`);
});

