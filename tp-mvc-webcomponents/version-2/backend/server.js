const express = require('express');
const path = require('path');
const CalculatorModel = require('./WCCalculatorModel');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../'))); // Serve static files from the root directory

const model = new CalculatorModel();

app.post('/calculate', (req, res) => {
    const { expression } = req.body;
    const result = model.evaluateExpression(expression);
    res.json({ result });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html')); // Serve index.html on root
});

app.listen(port, () => {
    console.log(`Calculator backend listening at http://localhost:${port}`);
});
