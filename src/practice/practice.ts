// import "./app.css";

// class App {
//   constructor() {
//     console.log("App constructor loaded");
//   }
// }

// export default App;

import './app.css';

interface User {
  name: string;
  id: number;
}

class UserAccount {
  name: string;
  id: number;

  constructor(name: string, id: number){
    this.name = name;
    this.id = id;
  }
}
const user: User = new UserAccount('Mike', 10)
console.log(user);


type MyBool = true | false;
type WindowStates = "open" | "closed" | "minimized";
type OddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;


function wrapInArray(obj: string | number[]){
  if(typeof obj === "string"){
    return [obj]
  }
  return obj;
}
console.log(wrapInArray([1,2,3]))


type StringArray = Array<string>
type NumberArray = Array<number>
type ObjectWithNameArray = Array<{ name: string }>
const myArr: StringArray = ['1','2','3'];
// const myArr2: StringArray = [1,2,3]

// interface Backpack<Type> {
//   add: (obj: Type) => void;
//   get: () => Type;
// }

// declare const backpack: Backpack<string>
// const object = backpack.get();
// backpack.add(23);


function greet(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}
greet('Mike', new Date());


function printCoord(pt: { x: number; y: number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7 });


function printName(obj: {first: string, last?: string}){
  if(!obj.last){
    console.log("Person's first name is " + obj.first);
  } else {
    console.log("Person's full name is " + obj.first + " " + obj.last);
  }
}
printName({ first: "Bob" });
printName({ first: "Alice", last: "Alisson" });


function printId(id: number | string) {
  console.log("Your ID is: " + id);
}
printId(101);
printId("202");
// Error
// printId({ myID: 22342 });


function printID(id: number | string) {
  if (typeof id === "string") {
    // In this branch, id is of type 'string'
    console.log(id.toUpperCase());
  } else {
    // Here, id is of type 'number'
    console.log(id);
  }
}
printID('id: 10');
printID(10);


function welcomePeople(x: string[] | string) {
  if (Array.isArray(x)) {
    // Here: 'x' is 'string[]'
    console.log("Hello, " + x.join(" and "));
  } else {
    // Here: 'x' is 'string'
    console.log("Welcome lone traveler " + x);
  }
}
welcomePeople(['Mike', 'Justine']);
welcomePeople('Mike');

//Wyjątek stanowią podtypy, które mają takie same metody:
function getFirstThree(x: number[] | string) {
  console.log(x.slice(0, 3));
}
getFirstThree([1,2,3,4,5]);
getFirstThree('12345');

//Narrowing
function padLeft(padding: number | string, input: string){
  if(typeof padding === "number"){
  console.log(new Array(padding + 1).join(" ") + input);
  }
  console.log(padding + input);
}
padLeft(2, '2');

