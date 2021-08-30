function eval() {
    // Do not use eval!!!
    return;
}

// const operators = {
//     ['+']: { priority: 0, calc: (a, b) => a + b },
//     ['-']: { priority: 0, calc: (a, b) => a - b },
//     ['*']: { priority: 1, calc: (a, b) => a * b },
//     ['/']: { priority: 1, calc: (a, b) => a / b }

// }


const operators = [
    { operat: '+', priority: 0, calc: (a, b) => b + a },
    { operat: '-', priority: 0, calc: (a, b) => b - a },
    { operat: '*', priority: 1, calc: (a, b) => b * a },
    { operat: '/', priority: 1, calc: (a, b) => b / a }

]

// const searchOperator = (element)=>operators.filter=(operant=>operant.operant==element)=>return operatn.priority
// const searchOperator = operators.filter(operant=>operant.operant==element)=>{return operatn.priority}
// const searchArr=operators.find(function(operant){return operant.operat===element})
const searchOperator = (element) => operators.find(function (operant) { return operant.operat === element })


function expressionCalculator(expr) {
    expr = expr.replace(/\s/g, '').split('')
    // console.log(expr);
    let output = []
    let stack = []
    let container1 = []
    let container2 = []
    let result = 0
    let err = ''
    let containerStack = []
    let cont = ''


    function checkOper(elem, stack, output) {
        // console.log(elem, stack, output);
        // console.log(searchOperator('+'));
        // console.log(searchOperator(stack[stack.length - 1]));

        container2 = searchOperator(elem)
        if (stack[stack.length - 1] === '(') {
            stack.push(elem)
        } else {
            if (stack.length > 0) {
                // console.log(stack);

                container1 = searchOperator(stack[stack.length - 1])


                // console.log(container1.operat + ' = ' + container1.priority);
                // console.log(container2.operat + ' = ' + container2.priority);
                // console.log(container1.priority > container2.priority);
                // console.log('container1: '+ container1.operat);
                // console.log('container2: '+ container2);
                if (container1.priority >= container2.priority) {
                    // console.log(stack);

                    // console.log('looooooooooooooooooool');
                    if (container1.operat === '/' && output[output.length - 1] == 0 || output[output.length - 2] == 0) {
                        return err = 'TypeError: Division by zero.'
                    }

                    output.push(container1.calc(+output.pop(), +output.pop()))
                    // console.log(stack);
                    stack.pop()
                    // console.log(stack);
                    // console.log(output);
                    checkOper(elem, stack, output);
                } else {
                    // console.log(elem);
                    stack.push(elem)
                }
            } else { stack.push(elem) }
        }

        // console.log(elem + ': ' + Number.isInteger(+elem));

        // console.log(stack);
        // console.log(output);
        return stack, output
    }

    // console.log(stack);
    // console.log(output);

    for (let elem of expr) {
        // console.log(elem);

        if (Number.isInteger(+elem)) {
            // console.log(elem);
            if (Number.isInteger(+cont) && output.length > 0) {
                // console.log(cont);
                output.push(+`${output.pop()}${elem}`)
                // console.log(output);
            } else {
                output.push(+elem)
            }


            // console.log(elem + ': ' + Number.isInteger(+elem));

        } else {
            // console.log('lol');
            if (elem === '(') {
                stack.push(elem)

            } else {
                if (elem === ')') {
                    do {
                        // console.log(stack);
                        containerStack.unshift(stack.pop())
                        // console.log(stack);
                            if (stack.length<1) {
                                throw new Error('ExpressionError: Brackets must be paired')
                            }
                    } while (stack[stack.length - 1] !== '(');
                    resultStack(containerStack, output)
                    stack.pop()
                } else {

                    checkOper(elem, stack, output);
                }


            }
        }
        // console.log(stack);
        cont = elem
        // console.log(cont);

        // console.log(stack);
        // console.log(output);





        // if (parseInt(elem, 10)) {
        // console.log(parseInt(elem, 10));
        // }
        //        console.log('output: ' + output);
        // console.log('stack: ' + stack);
        // console.log(output);
        // console.log(stack);
        // console.log(output);
    }
    // console.log(err);

    function resultStack(stack, output) {

        container1 = searchOperator(stack[stack.length - 1])
        if (container1.operat === '/' && output[output.length - 1] == 0 || output[output.length - 2] == 0) {
            return err = 'TypeError: Division by zero.'
        }
        output.push(container1.calc(+output.pop(), +output.pop()))
        stack.pop()
        if (stack.length > 0) { resultStack(stack, output) }
        return stack, output
    }
    // console.log(stack);
    // console.log('kek');
    for (const i of stack) {
        if (i==='('||i===')') {
            throw new Error('ExpressionError: Brackets must be paired')
        }
    }
    if (stack.length > 0) {
        // console.log('lol');
        resultStack(stack, output)

    }

    if (err !== '') {
        throw new TypeError('TypeError: Division by zero.')

    }
    // console.log(stack, output);
    // console.log('output: ' + output);
    // console.log('stack: ' + stack);

    // write your solution here
    return output[0]
}

// console.log(expressionCalculator("93 - 42 / (  80 * 45 + 46 + (  66 * 45 - 26 * 0 * 84  )  ) - (  (  20 - 59 - 18 - 62  ) / (  9 / 90 * 16 - 6  ) * 3  ) "));


module.exports = {
    expressionCalculator
}
