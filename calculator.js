document.addEventListener('DOMContentLoaded', function() {
  // Get the display and keys elements
  var display = document.getElementById('displayValue');
  var keys = document.getElementById('pad');

  // Initialize variables
  var operand1 = null;
  var operand2 = null;
  var operator = null;
  var decimalPressed = false;

  // Function to update the display
  function updateDisplay(value) {
    display.textContent = value;
  }

  // Function to handle number key press
  function handleNumberKey(key) {
    if (display.textContent === '0' || operator) {
      display.textContent = key;
      operator = null;
    } else {
      display.textContent += key;
    }
  }

  // Function to handle decimal key press
  function handleDecimalKey() {
    if (!decimalPressed) {
      display.textContent += '.';
      decimalPressed = true;
    }
  }

  // Function to handle operator key press
  function handleOperatorKey(selectedOperator) {
    if (operand1 === null) {
      operand1 = parseFloat(display.textContent);
      operator = selectedOperator;
      decimalPressed = false;
    } else if (operand2 === null) {
      operand2 = parseFloat(display.textContent);
      calculateResult();
      operator = selectedOperator;
      decimalPressed = false;
    }
  }

  // Function to calculate the result
  function calculateResult() {
    if (operand1 !== null && operand2 !== null && operators !== null) {
      var result;
      switch (operators) {
        case '+':
          result = operand1 + operand2;
          break;
        case '-':
          result = operand1 - operand2;
          break;
        case 'x':
          result = operand1 * operand2;
          break;
        case '/':
          result = operand1 / operand2;
          break;
      }
      operand1 = result;
      operand2 = null;
      updateDisplay(result);
    }
  }

  // Function to clear the calculator
  function clearCalculator() {
    operand1 = null;
    operand2 = null;
    operator = null;
    decimalPressed = false;
    updateDisplay('0');
  }

  // Event listener for number keys
  keys.addEventListener('click', function(event) {
    var key = event.target.textContent;
    if (!isNaN(parseFloat(key))) {
      handleNumberKey(key);
    } else if (key === '.') {
      handleDecimalKey();
    } else if (key === 'AC') {
      clearCalculator();
    }
  });

  // Event listener for operator keys
  var operators = document.querySelectorAll('.operator');
  operators.forEach(function(operator) {
    operator.addEventListener('click', function(event) {
      var selectedOperator = event.target.textContent;
      handleOperatorKey(selectedOperator);
    });
  });

  // Event listener for equals key
  var equalsKey = document.querySelector('.equal');
  equalsKey.addEventListener('click', function() {
    operand2 = parseFloat(display.textContent);
    calculateResult();
    operator = null;
    decimalPressed = false;
  });
});
