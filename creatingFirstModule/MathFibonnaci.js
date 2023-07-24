class mathFibonnaci {
    constructor(value) {
        this.value = value;
    }

    Fibonacci() {
        var num1 = 0
        var num2 = 1
        var num3 = num1 + num2
        for(var i = 0; i < this.value; i++) {
            num1 = num2
            num2 = num3
            num3 = num1 + num2
        }
        const result = num1
        return `A: ${this.value} posição da sequência de Fibonnaci é: ${result}`
    }
}

module.exports = {
    mathFibonnaci, 
};