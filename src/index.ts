#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";

// animation loading
const load = async () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
};

const window = async () => {
  const check = chalkAnimation.rainbow("let the game begins");
  await load();
  check.stop();
  console.log(`
         _   _     _       _    
        | | | |   (_)     | |           
        | |_| |__  _ _ __ | | __
        | __| '_ \| | '_ \| |/ /  
        | |_| | | | | | | |   < 
         \__|_| |_|_|_| |_|_|\_\

        `);
};

await window();
// generate random number between 1 to 10
let randomNum: number = Math.floor(Math.random() * 10 + 1);

// check function to compare the values from user and random number
const checkVal = (userInput: number, ranInput: number) => {
  if (userInput === ranInput) {
    return chalk.bgCyan(`you got it ${userInput} is equal to ${ranInput} `);
  } else if (userInput > ranInput) {
    return chalk.green(`user input is heigher than random number`);
  } else if (userInput < ranInput) {
    return chalk.bgBlack(`user input is lower than random number`);
  } else if (ranInput > userInput) {
    return chalk.bgBlack(`random number is heigher than user input`);
  } else {
    return chalk.bgBlack(`random number is lower than user input`);
  }
};

//invoking the funtion
async function play() {
  for (let j = 3; j >= 0; j--) {
    if (j > 0) {
      console.log(chalk.bgBlackBright(`chance:${j}`));
      const userInput = await inquirer.prompt([
        {
          type: "number",
          name: "val1",
          message: "Enter the value between 1 to 10: ",
        },
      ]);

      const result = checkVal(userInput.val1, randomNum);
      console.log(result);
      if (result.includes("you got it")) break;
    } else {
      console.log(chalk.red(`chance:${j}:Game Over`));
    }
  }
}

await play();

// play again function user can play three more round/times
async function nextRound() {
  for (let i = 0; i < 3; i++) {
    const playAgain = await inquirer.prompt([
      {
        type: "string",
        name: "again",
        message: "Do you want to play again ? y/n",
      },
    ]);

    playAgain.again = playAgain.again.toUpperCase();
    if (playAgain.again === "Y") {
      randomNum = Math.floor(Math.random() * 10 + 1);
      await play();
    }
    if (playAgain.again === "N") {
      console.log(chalk.red("Good bye"));
      return;
    }
  }
}
await nextRound();
