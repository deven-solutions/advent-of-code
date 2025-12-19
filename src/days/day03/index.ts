import path from "path";

import {readFull} from "../../lib";
import {Puzzle} from "../../types";

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

  // Read line by line
  let result = 0;
  data.raw.split('\n').forEach(bank => {
    let joltage = '';
    let max = 0;
    let j = 0;
    // Take max int from all except last digit
    for (let i = 0; i < bank.length - 1; i++) {
      const current = Number.parseInt(bank[i]);
      if (current > max) {
        max = current;
        j = i;
      }
    }
    joltage += max;
    max = 0;
    // Take max int from all digits after
    for (let i = j + 1; i < bank.length; i++) {
      const current = Number.parseInt(bank[i]);
      if (current > max) {
        max = current;
      }
    }
    joltage += max;
    result += Number.parseInt(joltage);
  });
  // Combine result from all lines
  return result;
}

function part2(file_path: string) {
  const data = readInput(file_path);

  // TODO: Implement solution
  let result = 0;
  data.raw.split('\n').forEach(bank => {
    let number = Number.parseInt(getMax(bank, 11))
    result += number;
  });

  return result;
}

function getMax(bank: string, n: number, joltage: string = ''): string {
  // Calculate the max, then call method again and add the current joltage
  let max = 0;
  let j = 0;
  for (let i = 0; i < bank.length - n; i++) {
    const current = Number.parseInt(bank[i]);
    if (current > max) {
      max = current;
      j = i;
    }
  }
  if (n <= 0) {
    return joltage += max;
  }
  return getMax(bank.substring(j + 1), n - 1, joltage += max);
}

export default <Puzzle> {
  part1,
  part2,
  input_file_path: path.join(__dirname, 'input.txt'),
  part1_tests: [
    {
      input_file_path: path.join(__dirname, 'input_test_1.txt'),
      expected_output: 357,
      extra_args: [],
    },
  ],
  part2_tests: [
    {
      input_file_path: path.join(__dirname, 'input_test_2.txt'),
      expected_output: 3121910778619,
      extra_args: [],
    },
  ],
}