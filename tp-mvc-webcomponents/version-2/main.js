import { WCCalculatorView } from './WCCalculatorView.js';
import { WCCalculatorController } from './WCCalculatorController.js';

document.addEventListener('DOMContentLoaded', () => {
    const view = document.createElement('calculator-view');
    document.body.appendChild(view);
    new WCCalculatorController(view);
});
