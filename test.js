// function waitforme(ms) {
//     return new Promise( resolve => {
//         setTimeout(()=> {resolve('')}, ms );
//     })
// }

// async function printy() {
//     for (let i = 0; i < 10; i++) {
//         await waitforme(1000);
//         console.log(i);
//     }
// }
// printy();

let initialNumber = [];

let firstArray = [];

function randomNumber() {
    let firstArray = [];
    for (let i = 0; i < 5; i++) {
        let rando = Math.floor(Math.random() * 12);
        firstArray.push(rando);
    }
    console.log(firstArray);
    return firstArray;
}

randomNumber()

function show() {
    console.log(firstArray);
}


// function timesTwo(random) {

//     return (random * 2);
// }

// console.log("random2 "+ timesTwo(initialNumber));