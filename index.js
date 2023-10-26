#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow("Welcome to Jurassic Quest \n");
  await sleep();
  rainbowTitle.stop();

  console.log(`
    ${chalk.bgBlue("HOW TO NAVIGATE")} 
    You are a new park ranger at Jurassic Park.
    Answer the questions correctly to safely navigate through the park.
    One wrong answer and... well, let's just say the dinosaurs might get too close for comfort...

  `);
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner("Checking your knowledge...").start();
  await sleep();

  if (isCorrect) {
    spinner.success({
      text: `Well done, Ranger ${playerName}. The dinosaurs are pleased!`,
    });
  } else {
    spinner.error({
      text: `Uh-oh! Wrong answer, Ranger ${playerName}. Better run!`,
    });
    process.exit(1);
  }
}

async function askName() {
  const answers = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "What is your name, Ranger?",
    default() {
      return "Ranger";
    },
  });

  playerName = answers.player_name;
}

function winner() {
  console.clear();
  figlet(
    `Bravo, Ranger ${playerName}!\n 🦖 You've mastered Jurassic Park!`,
    (err, data) => {
      console.log(gradient.pastel.multiline(data) + "\n");
      console.log(
        chalk.green(`You've proven your expertise and kept the park safe!`)
      );
      process.exit(0);
    }
  );
}

async function question1() {
  const answers = await inquirer.prompt({
    name: "question_1",
    type: "list",
    message: "Which of these is a herbivorous dinosaur?\n",
    choices: ["Tyrannosaurus", "Velociraptor", "Triceratops", "Spinosaurus"],
  });

  return handleAnswer(answers.question_1 === "Triceratops");
}

async function question2() {
  const answers = await inquirer.prompt({
    name: "question_2",
    type: "list",
    message: "In which period did the Velociraptors live?\n",
    choices: ["Triassic", "Jurassic", "Cretaceous", "Permian"],
  });
  return handleAnswer(answers.question_2 === "Cretaceous");
}

async function question3() {
  const answers = await inquirer.prompt({
    name: "question_3",
    type: "list",
    message: "Which of these dinosaurs had a long neck?\n",
    choices: ["Stegosaurus", "Pterodactyl", "Brachiosaurus", "Allosaurus"],
  });

  return handleAnswer(answers.question_3 === "Brachiosaurus");
}

async function question4() {
  const answers = await inquirer.prompt({
    name: "question_4",
    type: "list",
    message: "Which of these is NOT a real dinosaur?\n",
    choices: [
      "Triceratops",
      "Brontosaurus",
      "Raptorex",
      "Megasaurus", // This is not a real dinosaur name
    ],
  });
  return handleAnswer(answers.question_4 === "Megasaurus");
}

async function question5() {
  const answers = await inquirer.prompt({
    name: "question_5",
    type: "list",
    message: "Which of these dinosaurs is known for the plates on its back?\n",
    choices: ["Tyrannosaurus", "Stegosaurus", "Pterodactyl", "Velociraptor"],
  });

  return handleAnswer(answers.question_5 === "Stegosaurus");
}

// Run it with top-level await
console.clear();
await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
winner();
