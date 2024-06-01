class CalculatorModel {
    evaluateExpression(expression) {
        try {
            return eval(expression);
        } catch (e) {
            return 'Error';
        }
    }
}

module.exports = CalculatorModel;
