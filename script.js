const number = document.querySelectorAll("[data-number]")
const operation = document.querySelectorAll("[data-operation]")
const previousOperandTextElement = document.querySelector(".previous-operand")
const currentOperandTextElement = document.querySelector(".current-operand")
const deleteNumber = document.querySelector("[data-delete]")
const clearNumber = document.querySelector("[data-clear]")
const numberEquals = document.querySelector("[data-equals]")
const date = document.querySelector("[data-date]")
const time = document.querySelector("[data-time]")


class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear(){
        this.currentOperand = ""
        this.previousOperand = ""
        this.operation = undefined
    }

    delete(){
       this.currentOperand =  this.currentOperand.slice(0, -1)
    }

    chooseOperation(operation){
        if(this.currentOperand === "") return
        if(this.previousOperand !== ""){
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ""
    }

    compute(){
        let computation
        let prevNum = parseFloat(this.previousOperand)
        let currNum = parseFloat(this.currentOperand)
        if(isNaN(prevNum) || isNaN(currNum)) return
        switch(this.operation){
            case "+":
                computation = prevNum + currNum
                break
            case "-":
                computation = prevNum - currNum
                break
            case "*":
                computation = prevNum * currNum
                break
            case "/":
                computation = prevNum / currNum
                break
            default:
                return
        }
        this.currentOperand = computation.toFixed(1)
        this.operation = undefined
        this.previousOperand = ""
    }
    appendNumber(number){
        if(number === "." && this.currentOperand.includes(".")) return
        this.currentOperand = this.currentOperand.toString() +  number.toString()
    }

    updateDisplay(){
        this.currentOperandTextElement.textContent = this.currentOperand
        if(this.operation !== undefined){
            this.previousOperandTextElement.innerHTML = `${this.previousOperand} ${this.operation}`
        } else{
            this.previousOperandTextElement.innerHTML = this.previousOperand
        }
    }
}
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

number.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.textContent)
        calculator.updateDisplay()
    })
})

operation.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.textContent)
        calculator.updateDisplay()
    })
})

numberEquals.addEventListener("click", () => {
    calculator.compute()
    calculator.updateDisplay()
})

clearNumber.addEventListener("click", () => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteNumber.addEventListener("click", () => {
    calculator.delete()
    calculator.updateDisplay()
})

setInterval(() => {
    time.textContent = (new Date).toLocaleTimeString()
    date.textContent = (new Date).toLocaleDateString()
}, 1000)
