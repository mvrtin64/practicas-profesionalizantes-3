export class WCCalculatorView extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        // Create styles
        const style = document.createElement('style');
        style.textContent = `
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
                width: 100%;
            }
        `;
        this.shadowRoot.appendChild(style);

        const table = document.createElement('table');
        const displayRow = document.createElement('tr');
        const displayCell = document.createElement('td');
        displayCell.colSpan = 4;
        this.display = document.createElement('input');
        this.display.className = 'displayResult';
        this.display.id = 'display';
        this.display.type = 'text';
        this.display.value = '';
        this.display.disabled = true;
        displayCell.appendChild(this.display);
        displayRow.appendChild(displayCell);
        table.appendChild(displayRow);

        const buttons = [
            ['7', '8', '9', '+'],
            ['4', '5', '6', '-'],
            ['3', '2', '1', 'x'],
            ['0', '.', '=', '/'],
            ['BORRAR']
        ];

        buttons.forEach(row => {
            const tr = document.createElement('tr');
            row.forEach(buttonText => {
                const td = document.createElement('td');
                const button = document.createElement('button');
                button.innerText = buttonText;
                if (!isNaN(buttonText) || buttonText === '.') {
                    button.className = 'numberButton';
                } else if (buttonText === 'BORRAR') {
                    button.className = 'clearButton';
                    td.colSpan = 4;
                } else if (buttonText === '=') {
                    button.className = 'calculateButton';
                } else {
                    button.className = 'operatorButton';
                }
                td.appendChild(button);
                tr.appendChild(td);
            });
            table.appendChild(tr);
        });

        this.shadowRoot.appendChild(table);
    }

    bindClickHandler(handler) {
        this.shadowRoot.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', event => {
                handler(event.target.innerText);
            });
        });
    }

    updateDisplay(value) {
        this.display.value = value;
    }
}

customElements.define('calculator-view', WCCalculatorView);
