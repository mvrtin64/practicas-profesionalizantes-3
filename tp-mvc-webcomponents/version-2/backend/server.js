const express = require('express');
const CalculatorModel = require('./WCCalculatorModel');
const app = express();
const port = 3000;

app.use(express.json());

const model = new CalculatorModel();

app.post('/calculate', (req, res) => {
    const { expression } = req.body;
    const result = model.evaluateExpression(expression);
    res.json({ result });
});

app.listen(port, () => {
    console.log(`Calculator backend listening at http://localhost:${port}`);
});
