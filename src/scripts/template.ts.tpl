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

  // TODO: Implement solution

  return 'TODO';
}

function part2(file_path: string) {
  const data = readInput(file_path);

  // TODO: Implement solution

  return 'TODO';
}

export default <Puzzle> {
  part1,
  part2,
  input_file_path: path.join(__dirname, 'input.txt'),
  part1_tests: [
    {
      input_file_path: path.join(__dirname, 'input_test_1.txt'),
      expected_output: 'TODO',
      extra_args: [],
    },
  ],
  part2_tests: [
    {
      input_file_path: path.join(__dirname, 'input_test_2.txt'),
      expected_output: 'TODO',
      extra_args: [],
    },
  ],
}