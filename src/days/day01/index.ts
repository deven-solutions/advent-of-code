import path from "path";

import { readFull } from "../../lib";
import { Puzzle } from "../../types";

interface Data {
  raw: string;
}

function readInput(file_path: string): Data {
  const input = readFull(file_path);

  return {
    raw: input,
  };
}

function part1(file_path: string) {
  const data = readInput(file_path);

  let current = 50;
  let password = 0;

  data.raw.split('\n').forEach((instruction) => {

    const operator = instruction.charAt(0);
    const value = parseInt(instruction.slice(1), 10);
    current += 1000;
    if (operator === "R") {
      current += value;
    } else if (operator === "L") {
      current -= value;
    }
    current %= 100;

    if (current === 0) {
      password++;
    }
  });

  return password;
}

function part2(file_path: string) {
  const data = readInput(file_path);

  let current = 50;
  let password = 0;


  data.raw.split('\n').forEach((instruction) => {

    const operator = instruction.charAt(0);
    const value = parseInt(instruction.slice(1), 10);
    console.log("value: " + operator + value + " | current: " + current);

    const rotations = Math.floor(value / 100);
    console.log("rotations: " + rotations);
    password += rotations;
    console.log("password is now: " + password);

    const remainder = value % 100;
    const alreadyAtZero = current == 0;
    console.log("remainder: " + remainder);


    if (operator === "R") {
      current += remainder;
      console.log("current + remainder: " + current);
      if (current > 99) {
        current -= 100;
        if (current != 0 && !alreadyAtZero) {
          password++;
        }
      }
    } else if (operator === "L") {
      current -= remainder;
      console.log("current - remainder: " + current);
      if (current < 0) {
        current += 100;
        if (current != 0 && !alreadyAtZero) {
          password++;
        }
      }
    }

    if (current == 0) {
      password++;
    }

    console.log("password is now: " + password);

  });

  return password;
}

export default <Puzzle>{
  part1,
  part2,
  input_file_path: path.join(__dirname, 'input.txt'),
  part1_tests: [
    {
      input_file_path: path.join(__dirname, 'input_test_1.txt'),
      expected_output: 1100,
      extra_args: [],
    },
  ],
  part2_tests: [
    {
      input_file_path: path.join(__dirname, 'input_test_2.txt'),
      expected_output: 6358,
      extra_args: [],
    },
  ],
}