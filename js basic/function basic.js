function printname() {
    console.log("kiran");
}
printname();

function printname(name,age,city){
    console.log("my name is" + name + ",I am" + age + "years old, and I live in" + city);
}
 printname("Kiran", 20, "Kanchipuram")

 function printname(name,age,city){
    return(" my name is " + name + ", I am " + age + " years old, and I live in " + city);
}
 const result=printname("Kiran", 20, "Kanchipuram");
 console.log(result);