var display = document.getElementById('display');
var fValue;
var lastKey;
var lastOperator;

function handleClear(value) {
    if (value.length === 1) {
        return '0';
    }

    return value.slice(0, -1); // value.substr(0, value.length - 1);
}

function handleNumber(value, key) {
    if (value === '0' || '+-×÷=%'.indexOf(lastKey) >= 0) {
        return key;
    }

    if (key === '.' && value.indexOf('.') >= 0) {
        return value;
    }

    return value + key;
}

function handleOperator(value, key) {
    if ('+-×÷=%'.indexOf(lastKey) === -1) {
        var num1 = parseFloat(fValue);
        var num2 = parseFloat(value);
        switch (lastOperator) {
            case '+':
                value = num1 + num2;
                break;
            case '-':
                value = num1 - num2;
                break;
            case '×':
                value = num1 * num2;
                break;
            case '÷':
                value = num1 / num2;
                break;
        }
    }

    fValue = value;

    lastOperator = key;
    return value;
}

function handleKey(key) {
    var oldDisplayValue = display.innerHTML;
    var newValue;
    if (key === 'C') {
        newValue = handleClear(oldDisplayValue);
    }

    if ('.0123456789'.indexOf(key) >= 0) {
        newValue = handleNumber(oldDisplayValue, key);
    }

    if ('+-×÷=%'.indexOf(key) >= 0) {
        newValue = handleOperator(oldDisplayValue, key);
    }

    lastKey = key;
    display.innerHTML = newValue;
}

// Middleware
function onClickButton() {
    handleKey(this.innerHTML);
}

function onKeyPress(e) {
    handleKey(e.key);
}

// Event attach
document.onkeypress = onKeyPress;
var buttons = document.getElementsByTagName('button');
for (var index = 0; index < buttons.length; index ++) {
    buttons[index].onclick = onClickButton;
}