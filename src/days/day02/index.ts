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

function isInvalidIdPart1(id: string): boolean {
  // if is odd -> return false
  // Split string in equal parts
  // return 'is the parts equals'

  if (id.length % 2 == 1) {
    return false;
  }

  const middle = (id.length / 2);
  const firstNumber = id.substring(0, middle);
  const secondNumber = id.substring(middle, id.length);
  const isEqual = firstNumber == secondNumber;
  return isEqual;
}

// 1188511885
// 11885 11885

function part1(file_path: string) {
  const data = readInput(file_path);
  let result = 0;

  data.raw.split(',').forEach((id_range) => {
    const ids = id_range.split('-');
    const minRange: number = Number.parseInt(ids[0]);
    const maxRange: number = Number.parseInt(ids[1]);
    for (let i: number = minRange; i <= maxRange; i++) {
      if (isInvalidIdPart1(i.toString())) {
        console.log('Id ' + i + ' is invalid');
        result += i;
      }
    }
  });

  return result;
}

function isInvalidIdPart2(id: string, n: number = 2): boolean {
  // Split string in n parts
  // if 'is the parts equals', return true
  // otherwise call same method with n + 1

  const part_size = (id.length / n);
  const strings: String[] = [];
  for (let i: number = 0; i < id.length; i += part_size) {
    const string = id.substring(i, i + part_size);
    strings.push(string);
  }
  if (strings.every((string) =>
    strings.every((string_2) =>
      string == string_2
    )
  )) {
    return true;
  }
  if (n + 1 > id.length) {
    return false;
  }
  return isInvalidIdPart2(id, n + 1);
}

function part2(file_path: string) {
  const data = readInput(file_path);

  let result = 0;

  data.raw.split(',').forEach((id_range) => {
    const ids = id_range.split('-');
    const minRange: number = Number.parseInt(ids[0]);
    const maxRange: number = Number.parseInt(ids[1]);
    for (let i: number = minRange; i <= maxRange; i++) {
      if (isInvalidIdPart2(i.toString())) {
        console.log('Id ' + i + ' is invalid');
        result += i;
      }
    }
  });

  return result;
}

export default <Puzzle>{
  part1,
  part2,
  input_file_path: path.join(__dirname, 'input.txt'),
  part1_tests: [
    {
      input_file_path: path.join(__dirname, 'input_test_1.txt'),
      expected_output: 19605500130,
      extra_args: [],
    },
  ],
  part2_tests: [
    {
      input_file_path: path.join(__dirname, 'input_test_2.txt'),
      expected_output: 36862281418,
      extra_args: [],
    },
  ],
}