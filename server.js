const path = require('path');
const express = require('express');
const app = express();
const port = 3000;

// Serve arquivos estáticos do diretório atual
app.use(express.static('.'));

const filePath = path.join(__dirname, 'project','screens', 'home.html');


// Rota padrão para servir o home.html
app.get('/', (req, res) => {
    res.redirect('/screens/home.html');
});

app.get('/screens/home.html', (req, res) => {
    res.sendFile(filePath);
});

app.listen(port, () => {
    console.log(`Servidor local rodando em http://localhost:${port}`);
});

