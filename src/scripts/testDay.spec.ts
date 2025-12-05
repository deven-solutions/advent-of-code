import { describe, test, expect } from 'vitest'
import {Puzzle} from "../types";
import { findDayDirectories } from 'src/scripts/util';

const days = findDayDirectories();

for (const day of days) {
  describe(day, async () => {
    const puzzle: Puzzle = (await import(`../days/${day}/index.ts`)).default;

    if (puzzle.part1_tests.length) {
      describe('part1', () => {
        for (const [i, testCase] of puzzle.part1_tests.entries()) {
          test(`case${i + 1}`, () => {
            expect(puzzle.part1(testCase.input_file_path, ...(testCase.extra_args ?? [])).toString()).toBe(
              testCase.expected_output.toString()
            );
          });
        }
      });
    }

    if (puzzle.part2_tests.length) {
      describe('part2', () => {
        for (const [i, testCase] of puzzle.part2_tests.entries()) {
          test(`case${i + 1}`, () => {
            expect(puzzle.part2(testCase.input_file_path, ...(testCase.extra_args ?? [])).toString()).toBe(
              testCase.expected_output.toString()
            );
          });
        }
      });
    }
  });
}