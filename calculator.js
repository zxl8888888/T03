document.addEventListener('DOMContentLoaded', function() {
  // Get the display and keys elements
  var display = document.getElementById('displayValue');
  var keys = document.getElementById('pad');
  var numbers = document.querySelectorAll('.number');

  // Initialize variables
  var operand1 = null;
  var operand2 = null;
  var operator = null;
  var operator1 = null;
  var decimalPressed = false;
  let end = false

  // Function to update the display
  function updateDisplay(value) {
    display.textContent = value;
  }

  // Function to handle number key press
  function handleNumberKey(key) {
    if (display.textContent === '0' || operator1) {
      display.textContent = key;
      operator1 = null;
    } else {
      display.textContent += key;
    }
  }

  // Function to handle decimal key press
  function handleDecimalKey() {
    // if (!decimalPressed) {
    //   display.textContent += '.';
    //   decimalPressed = true;
    // }
    if (display.textContent.indexOf('.') === -1) {
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
    if (operand1 !== null && operand2 !== null && operator !== null) {
      var result;
      switch (operator) {
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
    let temp = 0
    console.log(operand1);
    console.log(operand2);
    console.log(operator);
    console.log(operator1);
    var key = event.target.textContent;
    if (!isNaN(parseFloat(key)) && key.length === 1) {
      handleNumberKey(key);
      if(operator){
        // operand1 = temp
        operand2 = parseFloat(display.textContent);
      }
      if (!operand2) {
        // temp = operand1
        operand1 = parseFloat(display.textContent);
      }
      if (end) {
        display.textContent = key;
        operator1 = null;
      }
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
      console.log(operand1);
      console.log(operand2);
      console.log(operator);
      console.log(operator1);
      var selectedOperator = event.target.textContent;
      if (selectedOperator !== '=') {
        if (operand1) {
          operand2 = null;
        }
        handleOperatorKey(selectedOperator);
        operator1 = selectedOperator;
      }
    });
  });
  const allButtons = [...operators, ...document.querySelectorAll('.number')];
  allButtons.forEach(item => {
    item.addEventListener('click', function(event) {
      allButtons.forEach(function(key) {
        key.classList.remove("active")
      });
      event.target.classList.add("active");
    });
  });

  // Event listener for equals key
  var equalsKey = document.querySelector('.equal');
  equalsKey.addEventListener('click', function() {
    operand2 = parseFloat(display.textContent);
    calculateResult();
    operator = null;
    decimalPressed = false;
    end = true;
  });
});
