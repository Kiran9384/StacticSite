function findFactorial (number){
    let total = 1
    for(let index = 1; index <= number; index++) {
        total = total * index
    }
     return total
}
console.log(findFactorial(4))