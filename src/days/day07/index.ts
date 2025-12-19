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

class Coordinates {
  row: number = 0;
  column: number = 0;

  constructor(row: number, column: number) {
    this.row = row;
    this.column = column;
  }

  equals(o: Coordinates): boolean {
    return this.row == o.row && this.column == o.column;
  }
}

function part1(file_path: string) {
  const data = readInput(file_path);

  // Count the number of splitters, saving the index
  // Skip the splitters who are on the same row as another, higher splitter

  let count: number = 0;
  let beamCoordinates: Coordinates[] = [];

  let rows = data.raw.split('\n');
  for (let row: number = 0; row < rows.length; row++) {
    for (let column: number = 0; column < rows[row].length; column++) {
      // Emitter
      if (rows[row][column] === 'S') {
        beamCoordinates.push(new Coordinates(row, column));
        continue;
      } 
      // Splitter
      if (rows[row][column] === '^' && !beamCoordinates.every(beam => beam.column != column && beam.row != row - 1)) {
        // We have split the beam!
        count++;
        // Create a beam on either side, ignoring duplicates
        const leftBeam = new Coordinates(row, column - 1);
        const rightBeam = new Coordinates(row, column + 1);
        if (!beamCoordinates.includes(leftBeam)) {
          beamCoordinates.push(leftBeam);
        }
        if (!beamCoordinates.includes(rightBeam)) {
          beamCoordinates.push(rightBeam);
        }
        continue;
      }
      if (!beamCoordinates.every(beam => beam.column != column && beam.row != row - 1)) {
        // Continue the beam downward
        beamCoordinates.push(new Coordinates(row, column));
      }
    }
  }

  return count;
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