const calculator           = document.querySelector('.calculator');
const screen               = document.querySelector('.screen');
const numbers_container    = document.querySelector('.numbers');
const operations_container = document.querySelector('.operations');

const numbers = [];
const operations = ['+', '-', '*', '/', '='];
let operator_selected = false;
let firstNum = '';
let secondNum = '';
let operator = '';

for(let i = 1; i < 11; i++){
    const number = document.createElement('div');
    number.classList.add('number');
    number.innerText = i % 10;

    number.addEventListener('click', () => {
        let k = number.innerText;

        if(!operator_selected) {
            firstNum = (firstNum.length == 0 && k == 0) ? firstNum : firstNum.concat(k);
        }else{
            secondNum = (secondNum.length == 0 && k == 0) ? secondNum : secondNum.concat(k);
        }

        screen.innerText = firstNum + ' ' + operator + ' ' + secondNum;
        number.classList.add('grey-background');
    })

    number.addEventListener('transitionend', () => {
        number.classList.remove('grey-background');
    })

    numbers.push(number);

    numbers_container.appendChild(number);
}

for(let operator of operations){
    const operator_div = document.createElement('div');
    operator_div.classList.add('operator');
    operator_div.innerText = operator;

    operations_container.appendChild(operator_div);
}

document.addEventListener('keydown', (e) => {
    if(e.key in [0,1,2,3,4,5,6,7,8,9]){
        let k = e.keyCode - 48;
        
        let index = k == 0 ? numbers.length - 1 : k-1;

        numbers[index].dispatchEvent(new Event('click'));
    }else if(['+', '-', '*', '/'].includes(e.key) && firstNum.length != 0) {
        operator_selected = true;
        operator = e.key;
        screen.innerText = firstNum + ' ' + operator + ' ' + secondNum;
    }else if(e.keyCode == 13 && firstNum.length != 0 && secondNum.length != 0){
        let result = evaluate() + '';
        firstNum = result;
        secondNum = '';
        screen.innerText = firstNum;


        operator_selected = false;
        operator = '';
    }
})


function evaluate(){
    let a = parseFloat(firstNum);
    let b = parseFloat(secondNum);

    switch (operator){
        case '+':
            return a+b;
    
        case '-':
            return a-b;
        
        case '*':
            return a*b;
        
        case '/':
            return Math.round(a/b);
    }
}
