export class WCCalculatorController {
    constructor(view) {
        this.view = view;

        this.view.bindClickHandler(this.handleButtonClick.bind(this));
        this.view.updateDisplay('');
    }

    handleButtonClick(value) {
        if (value === 'BORRAR') {
            this.view.updateDisplay('');
        } else if (value === '=') {
            const expression = this.view.display.value;
            this.calculate(expression);
        } else if (value === 'x') {
            this.view.updateDisplay(this.view.display.value + '*');
        } else {
            this.view.updateDisplay(this.view.display.value + value);
        }
    }

    calculate(expression) {
        try {
            const result = eval(expression);
            this.view.updateDisplay(result);
        } catch (e) {
            this.view.updateDisplay('Error');
            console.error('Error:', e);
        }
    }
}
