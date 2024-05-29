export class CalculatorModel {
    constructor() {
        this.value = '';
    }

    append(char) {
        this.value += char;
    }

    clear() {
        this.value = '';
    }

    calculate() {
        try {
            this.value = eval(this.value);
        } catch (e) {
            this.value = 'Error';
        }
    }
}

export class CalculatorView extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .numberButton {
                    background-color: blue;
                    color: #FFFFFF;
                    border-color: #FFFFFF;
                    border-radius: 6px;
                    width: 100%;
                }
                .operatorButton {
                    background-color: #00FF04;
                    color: #FFFFFF;
                    border-color: #FFFFFF;
                    border-radius: 6px;
                    width: 100%;
                }
                .clearButton {
                    background-color: #FF0000;
                    color: #FFFFFF;
                    border-color: #FFFFFF;
                    width: 100%;
                    border-radius: 6px;
                }
                .calculateButton {
                    background-color: #FFB900;
                    color: #FFFFFF;
                    border-color: #FFFFFF;
                    width: 100%;
                    border-radius: 6px;
                }
                .displayResult {
                    border-radius: 6px;
                }
            </style>
            <table>
                <tr>
                    <td colspan="4">
                        <input class="displayResult" id="display" type="text" value="" disabled></input>
                    </td>
                </tr>
                <tr>
                    <td><button class="numberButton">7</button></td>
                    <td><button class="numberButton">8</button></td>
                    <td><button class="numberButton">9</button></td>
                    <td><button class="operatorButton">+</button></td>
                </tr>
                <tr>
                    <td><button class="numberButton">4</button></td>
                    <td><button class="numberButton">5</button></td>
                    <td><button class="numberButton">6</button></td>
                    <td><button class="operatorButton">-</button></td>
                </tr>
                <tr>
                    <td><button class="numberButton">3</button></td>
                    <td><button class="numberButton">2</button></td>
                    <td><button class="numberButton">1</button></td>
                    <td><button class="operatorButton">x</button></td>
                </tr>
                <tr>
                    <td><button class="numberButton">0</button></td>
                    <td><button class="numberButton">.</button></td>
                    <td><button class="calculateButton">=</button></td>
                    <td><button class="operatorButton">/</button></td>
                </tr>
                <tr>
                    <td colspan="4">
                        <button class="clearButton">BORRAR</button>
                    </td>
                </tr>
            </table>
        `;
    }

    bindClickHandler(handler) {
        this.shadowRoot.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', event => {
                handler(event.target.innerText);
            });
        });
    }

    updateDisplay(value) {
        this.shadowRoot.querySelector('#display').value = value;
    }
}

customElements.define('calculator-view', CalculatorView);

export class CalculatorController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.bindClickHandler(this.handleButtonClick.bind(this));
        this.view.updateDisplay(this.model.value);
    }

    handleButtonClick(value) {
        if (value === 'BORRAR') {
            this.model.clear();
        } else if (value === '=') {
            this.model.calculate();
        } else if (value === 'x') {
            this.model.append('*');
        } else {
            this.model.append(value);
        }

        this.view.updateDisplay(this.model.value);
    }
}
 

customElements.define('calculator-app', class extends HTMLElement {
    constructor() {
        super();
        const model = new CalculatorModel();
        const view = new CalculatorView();
        this.appendChild(view);
        new CalculatorController(model, view);
    }
});
