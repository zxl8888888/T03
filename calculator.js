document.addEventListener('DOMContentLoaded', function() {
  // Get the display element
  const display = document.getElementById('displayValue');
  
  // Initialize variables
  let currentNumber = '0';
  let operators = '';
  let previousNumber = '';
  
  // Function to update the display
  function updateDisplay() {
    display.textContent = currentNumber;
  }
  
  // Function to handle number key presses
  function handleNumberClick(number) {
    if (currentNumber === '0') {
      currentNumber = number;
    } else {
      currentNumber += number;
    }
    updateDisplay();
  }
  
  // Function to handle decimal key press
  function handleDecimalClick() {
    if (!currentNumber.includes('.')) {
      currentNumber += '.';
    }
    updateDisplay();
  }
  
  // Function to handle operator key presses
  function handleOperatorClick(operatorKey) {
    if (operator !== '') {
      calculate();
    }
    operator = operatorKey;
    previousNumber = currentNumber;
    currentNumber = '';
    updateDisplay();
    highlightOperatorButton(operatorKey);
  }
  
  // Function to calculate the result
  function calculate() {
    const num1 = parseFloat(previousNumber);
    const num2 = parseFloat(currentNumber);
    let result;
    
    switch (operators) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case 'x':
        result = num1 * num2;
        break;
      case '/':
        result = num1 / num2;
        break;
    }
    
    currentNumber = result.toString();
    operators = '';
    previousNumber = '';
    updateDisplay();
  }
  
  // Function to handle equals key press
  function handleEqualsClick() {
    calculate();
    highlightOperatorButton('');
  }
  
  // Function to handle clear key press
  function handleClearClick() {
    currentNumber = '0';
    operator = '';
    previousNumber = '';
    updateDisplay();
    highlightOperatorButton('');
  }
  
  // Function to highlight the active operator button
  function highlightOperatorButton(operatorKey) {
    const operatorButtons = document.querySelectorAll('.operator');
    operatorButtons.forEach(button => {
      if (button.textContent === operatorKey) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
  }
  
  // Add event listeners to number buttons
  const numberButtons = document.querySelectorAll('.number');
  numberButtons.forEach(button => {
    button.addEventListener('click', function() {
      const number = button.textContent;
      handleNumberClick(number);
    });
  });
  
  // Add event listener to decimal button
  const decimalButton = document.getElementById('decimal');
  decimalButton.addEventListener('click', handleDecimalClick);
  
  // Add event listeners to operator buttons
  const operatorButtons = document.querySelectorAll('.operator');
  operatorButtons.forEach(button => {
    const operatorKey = button.textContent;
    button.addEventListener('click', function() {
      handleOperatorClick(operatorKey);
    });
  });
  
  // Add event listener to equals button
  const equalsButton = document.getElementById('equals');
  equalsButton.addEventListener('click', handleEqualsClick);
  
  // Add event listener to clear button
  const clearButton = document.getElementById('clear');
  clearButton.addEventListener('click', handleClearClick);
});
