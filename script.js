// Get references to the input fields
const expressionInput = document.getElementById('expression');
const resultInput = document.getElementById('result');

// Make variables to store the current expression and result
let currentNumber = '';
let previousNumber = '';
let operator = null;

// Update the display function
function updateDisplay() {
    if (currentNumber === '') {
        resultInput.value = '0';
    } else {
        resultInput.value = currentNumber;
    }

    if (operator !== null && previousNumber !== '') {
        // Αν έχουμε πράξη, δείξε: "5 + 3"
        expressionInput.value = `${previousNumber} ${operator} ${currentNumber}`;
     } else if (previousNumber !== '' && operator === null) {
        // Μετά το =, δείξε μόνο το προηγούμενο αποτέλεσμα
        expressionInput.value = `${previousNumber}`;
    } else {
        // Κανονικά, δείξε τον τρέχοντα αριθμό
        expressionInput.value = currentNumber;
    }
}

// Function to concat numbers or dot.
function appendNumber(number) {
    if (number === '.' && currentNumber.includes('')) return;

    currentNumber += number;

    updateDisplay();
}

const numberButtons = document.querySelectorAll('.buttons button');

numberButtons.forEach(btn => {
    const text = btn.textContent;

    if (text >= '0' && text <= '9') {
        btn.addEventListener('click', () => {
            appendNumber(text);
        });
    }
});

// Choose operation
function chooseOperation(op) {
    console.log("Pressed", op);

    if (currentNumber === '') return;

    if (previousNumber !== '' && operator !== null) {
        calculate();
    }

    operator = op;
    previousNumber = currentNumber;
    currentNumber = '';
}

const operatorButtons = document.querySelectorAll('.buttons button.special');

operatorButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const icon = btn.querySelector('i');

        if (icon) {
            const iconClass = icon.classList;

            if (iconClass.contains('fa-percent')) {
                percentage();
            } else if (iconClass.contains('fa-divide')) {
                chooseOperation('÷');
            } else if (iconClass.contains('fa-xmark')) {
                chooseOperation('×');
            } else if (iconClass.contains('fa-plus')) {
                chooseOperation('+');
            } else if (iconClass.contains('fa-minus')) {
                chooseOperation('-');
            }
        }
    })
});

function calculate() {
    if (operator === null || previousNumber === '') return;

    const prev = parseFloat(previousNumber);
    const current = parseFloat(currentNumber);

    let result;

    if (operator === '+') {
        result = prev + current;
    } else if (operator === '-') {
        result = prev - current;
    } else if (operator === '×') {
        result = prev * current;
    } else if (operator === '÷') {
        result = prev / current;
    } else {
        return;
    }

    const originalExpression = `${previousNumber}${operator}${currentNumber}`;

    currentNumber = result.toString();
    previousNumber = originalExpression;
    operator = null;

    updateDisplay();
}

const equalsButton = document.querySelector('.buttons button.equals');

if (equalsButton) {
    equalsButton.addEventListener('click', () => {
        calculate();
    });
} else {
    console.log("No equals button.")
}

const acButton = document.querySelector('.buttons button.ac');

if (acButton) {
    acButton.addEventListener('click', () => {
        currentNumber = '';
        previousNumber = '';
        operator = null;

        updateDisplay();

        });
    } else {
    console.log("There is no .sun-ac");
}

function percentage() {
    if (currentNumber === '') return;

    const num = parseFloat(currentNumber);
    currentNumber = (num / 100).toString();
    updateDisplay();
}
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
}

const changeThemeBtn = document.querySelector('.buttons button.sun');

if (changeThemeBtn) {
    changeThemeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');

        const icon = changeThemeBtn.querySelector('i');

        if (document.body.classList.contains('light-theme')) {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    });
}