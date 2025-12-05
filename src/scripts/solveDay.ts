import {Puzzle} from "../types";
import { findDayDirectories, parseDayArgument } from "src/scripts/util";

async function solveDay(dayDirectory: string) {
  console.log("-------------------------------");
  console.log(dayDirectory);
  console.log("-------------------------------");
  const puzzle: Puzzle = (await import(`../days/${dayDirectory}`)).default;

  console.group('Part 1');
  console.time('Runtime');
  const part1Result = puzzle.part1(puzzle.input_file_path);
  console.log('Result:', part1Result);
  console.timeEnd('Runtime');
  console.groupEnd();

  console.group('Part 2');
  console.time('Runtime');
  const part2Result = puzzle.part2(puzzle.input_file_path);
  console.log('Result:', part2Result);
  console.timeEnd('Runtime');
  console.groupEnd();
  console.log("-------------------------------\n");
}

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('Please provide a day number as an argument. Example: npm run solve-day 1');
  process.exit(1);
}

if (args[0] === 'all') {
  const days = findDayDirectories();

  (async () => {
    console.time('Total Runtime');
    for (const day of days) {
      await solveDay(day);
    }
    console.timeEnd('Total Runtime');
  })();
} else {
  const {dayDirectory} = parseDayArgument(args[0]);
  solveDay(dayDirectory);
}
