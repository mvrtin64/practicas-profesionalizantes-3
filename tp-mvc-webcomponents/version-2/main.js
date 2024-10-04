import { WCCalculatorView } from './WCCalculatorView.js';
import { WCCalculatorController } from './WCCalculatorController.js';

document.addEventListener('DOMContentLoaded', () => {
    const view = new WCCalculatorView(); 
    document.body.appendChild(view);
    new WCCalculatorController(view);
});
