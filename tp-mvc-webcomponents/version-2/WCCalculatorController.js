export class WCCalculatorController {
    constructor(view) {
        this.view = view;
        this.view.bindClickHandler(this.handleButtonClick.bind(this));
        this.view.updateDisplay('');
    }

    handleButtonClick(value) {
        switch (value) {
            case 'BORRAR':
                this.clearDisplay();
                break;
            case '=':
                this.calculate();
                break;
            case 'x':
                this.appendOperator('*');
                break;
            default:
                this.appendValue(value);
                break;
        }
    }

    clearDisplay() {
        this.view.updateDisplay('');
    }

    appendValue(value) {
        this.view.updateDisplay(this.view.display.value + value);
    }

    appendOperator(operator) {
        this.view.updateDisplay(this.view.display.value + operator);
    }

    calculate() {
        const expression = this.view.display.value;
        try {
            const result = eval(expression);
            this.view.updateDisplay(result);
        } catch (e) {
            this.view.updateDisplay('Error');
            console.error('Error:', e);
        }
    }
}
