#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import figlet from "figlet";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import { createSpinner } from "nanospinner";

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function handleAnswer(isCorrect) {
  const spinner = createSpinner("Checking answer...").start();
  await sleep();

  if (isCorrect) {
    spinner.success({ text: `Nice work ${playerName}. That's a legit answer` });
  } else {
    spinner.error({ text: `💀💀💀 Game over, you lose ${playerName}!` });
    process.exit(1);
  }
}

async function welcome() {
  const title = chalkAnimation.rainbow("Are you ready for an Interview? \n");

  await sleep();
  title.stop();

  console.log(`
    ${chalk.bgBlue("HOW TO PLAY")}
    I am a process in your computer.
    If you any questions wrong ${chalk.bgGreen("YOU")} will get ${chalk.bgRed(
    "killed!"
  )} 
    So get all the questions right...
    `);
}

async function askName() {
  const answers = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "What is your name?",
    default() {
      return "Player";
    },
  });

  playerName = answers.player_name;
}

async function question1() {
  const answers = await inquirer.prompt({
    name: "question_1",
    type: "list",
    message: `What will the following code output?\n\n console.log(0.1 + 0.2 === 0.3);\n`,
    choices: ["true", "false", "undefined", "NaN"],
  });

  return handleAnswer(answers.question_1 == "false");
}

async function question2() {
  const answers = await inquirer.prompt({
    name: "question_2",
    type: "list",
    message: `Which of the following is NOT a primitive data type in JavaScript?\n\n`,
    choices: ["String", "Number", "Boolean", "Array"],
  });

  return handleAnswer(answers.question_2 == "Array");
}

async function question3() {
  const answers = await inquirer.prompt({
    name: "question_3",
    type: "list",
    message: `What will be the output of the following code?\n\n 
    let a = [1, 2, 3];
    let b = a;
    b.push(4);
    console.log(a);
    `,
    choices: ["[1, 2, 3]", "[1, 2, 3, 4]", "[4, 1, 2, 3]", "undefined"],
  });

  return handleAnswer(answers.question_3 == "[1, 2, 3, 4]");
}

async function question4() {
  const answers = await inquirer.prompt({
    name: "question_4",
    type: "list",
    message: `What is the output of the following code?\n\n
    (function() {
    var a = b = 3;
    })();
    console.log(typeof a);
    console.log(typeof b);
    `,
    choices: [
      "undefined, number",
      "number, undefined",
      "undefined, undefined",
      "number, number",
    ],
  });

  return handleAnswer(answers.question_4 == "undefined, number");
}

async function question5() {
  const answers = await inquirer.prompt({
    name: "question_5",
    type: "list",
    message: `Which method can be used to merge two or more arrays in JavaScript?\n\n`,
    choices: ["Array.push()", "Array.pop()", "Array.concat()", "Array.merge()"],
  });

  return handleAnswer(answers.question_5 == "Array.concat()");
}

async function question6() {
  const answers = await inquirer.prompt({
    name: "question_6",
    type: "list",
    message: `What will the following code output?\n\n console.log(typeof NaN);\n`,
    choices: ["number", "string", "undefined", "object"],
  });

  return handleAnswer(answers.question_6 == "number");
}

async function question7() {
  const answers = await inquirer.prompt({
    name: "question_7",
    type: "list",
    message: `What does the 'this' keyword refer to in JavaScript?\n\n`,
    choices: [
      "The global object",
      "The object that called the method",
      "The parent object",
      "The previous object",
    ],
  });

  return handleAnswer(
    answers.question_7 == "The object that called the method"
  );
}

async function question8() {
  const answers = await inquirer.prompt({
    name: "question_8",
    type: "list",
    message: `Which of the following is a correct way to create a new object in JavaScript?\n\n`,
    choices: [
      "var obj = {};",
      "var obj = Object.create();",
      "var obj = new Object();",
      "Both a and c",
    ],
  });

  return handleAnswer(answers.question_8 == "Both a and c");
}

async function question9() {
  const answers = await inquirer.prompt({
    name: "question_9",
    type: "list",
    message: `What is the purpose of the Array.prototype.map() method?\n\n`,
    choices: [
      "To create a new array with the results of calling a provided function on every element in the calling array",
      "To filter out elements from an array based on a provided function",
      "To reduce the array to a single value",
      "To sort the elements of an array",
    ],
  });

  return handleAnswer(
    answers.question_9 ==
      "To create a new array with the results of calling a provided function on every element in the calling array"
  );
}

async function question10() {
  const answers = await inquirer.prompt({
    name: "question_10",
    type: "list",
    message: `What will the following code output?\n\n
    let x = 10;
    x += (x > 10) ? 5 : -5;
    console.log(x);
    `,
    choices: ["5", "10", "15", "20"],
  });

  return handleAnswer(answers.question_10 == "5");
}

function winner() {
  console.clear();
  const msg = `Congrats , ${playerName} !`;

  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
}

await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
await question6();
await question7();
await question8();
await question9();
await question10();
await winner();
