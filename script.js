document.addEventListener('DOMContentLoaded', function() {
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const operationSelect = document.getElementById('operation');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultField = document.getElementById('result');
    const previousOperations = document.getElementById('previousOperations');
    const error1 = document.getElementById('error1');
    const error2 = document.getElementById('error2');
    const generalError = document.getElementById('generalError');

    let history = [];

    function validateInput(e) {
        this.value = this.value.replace(/[^0-9.-]/g, '');
        
        if (this.value.split('-').length > 2) {
            this.value = this.value.replace(/-/g, '');
        }
        
        let parts = this.value.split('.');
        if (parts.length > 2) {
            this.value = parts[0] + '.' + parts.slice(1).join('').replace(/\./g, '');
        }
    }

    function showError(input, message) {
        input.classList.add('error');
        if (input === num1Input) {
            error1.textContent = message;
        } else {
            error2.textContent = message;
        }
    }

    function clearErrors() {
        num1Input.classList.remove('error');
        num2Input.classList.remove('error');
        error1.textContent = '';
        error2.textContent = '';
        generalError.textContent = '';
    }

    function validateNumber(input) {
        const value = input.value.trim();
        
        if (value === '') {
            showError(input, 'Введите число');
            return false;
        }
        
        const num = Number(value);
        if (isNaN(num)) {
            showError(input, 'Введите число');
            return false;
        }
        
        return true;
    }

    function updateHistory() {
        if (history.length === 0) {
            previousOperations.innerHTML = '';
        } else {
            previousOperations.innerHTML = history
                .map(item => item)
                .join('<br>');
        }
    }

    function calculate() {
        clearErrors();
        
        const isValid1 = validateNumber(num1Input);
        const isValid2 = validateNumber(num2Input);
        
        if (!isValid1 || !isValid2) return;
        
        const num1 = Number(num1Input.value);
        const num2 = Number(num2Input.value);
        const operation = operationSelect.value;
        
        let result;
        
        switch(operation) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                if (num2 === 0) {
                    generalError.textContent = 'Ошибка: деление на ноль';
                    return;
                }
                result = num1 / num2;
                break;
            default:
                return;
        }
        
        if (!Number.isInteger(result)) {
            result = result.toFixed(2);
        }
        
        const resultString = `${num1} ${operation} ${num2} = ${result}`;
        
        history.push(resultString);
        if (history.length > 5) {
            history.shift();
        }
        
        updateHistory();
        resultField.textContent = resultString;
    }

    num1Input.addEventListener('input', validateInput);
    num2Input.addEventListener('input', validateInput);
    
    num1Input.addEventListener('input', function() {
        this.classList.remove('error');
        error1.textContent = '';
    });
    
    num2Input.addEventListener('input', function() {
        this.classList.remove('error');
        error2.textContent = '';
    });
    
    calculateBtn.addEventListener('click', calculate);
    
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calculate();
    });

    resultField.textContent = '0';
    updateHistory();
});