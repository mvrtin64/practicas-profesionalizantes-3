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

        this.createButtons(table);
        this.shadowRoot.appendChild(table);
    }

    createButtons(table) {
        const buttons = {
            '7': 'numberButton',
            '8': 'numberButton',
            '9': 'operatorButton',
            '/': 'operatorButton',
            '4': 'numberButton',
            '5': 'numberButton',
            '6': 'operatorButton',
            'x': 'operatorButton',
            '1': 'numberButton',
            '2': 'numberButton',
            '3': 'operatorButton',
            '-': 'operatorButton',
            '0': 'numberButton',
            '.': 'numberButton',
            '=': 'calculateButton',
            '+': 'operatorButton',
            'BORRAR': 'clearButton'
        };

        let row = document.createElement('tr');
        let count = 0;

        for (const [text, className] of Object.entries(buttons)) {
            const td = document.createElement('td');
            const button = document.createElement('button');
            button.innerText = text;
            button.className = className;

            if (text === 'BORRAR') {
                td.colSpan = 4; // Make the clear button span across all columns
                row.appendChild(td);
                row.appendChild(button);
                table.appendChild(row);
                row = document.createElement('tr'); // Start a new row
                count = 0; // Reset count for new row
            } else {
                td.appendChild(button);
                row.appendChild(td);
                count++;
                if (count === 4) { // After 4 buttons, create a new row
                    table.appendChild(row);
                    row = document.createElement('tr'); // Start a new row
                    count = 0; // Reset count for new row
                }
            }
        }

        // Append any remaining buttons in the last row
        if (count > 0) {
            table.appendChild(row);
        }
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