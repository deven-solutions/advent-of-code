# Advent of Code TypeScript Template

This is a TypeScript template for solving [Advent of Code](https://adventofcode.com/) challenges.

Advent of Code is an annual programming event that runs during December. Each day from December 1st through December 12th, a new two-part programming puzzle is released.

## Project Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Initialze the first day
    ```bash
    npm run new-day 1
    ```

## Recommended Workflow
1. Generate a new day using `npm run new-day <day-number>`
2. Read the puzzle on the Advent of Code website
3. Copy your own puzzle input to `src/days/dayXX/input.txt`
4. Start the tests with `npm run test` or only test a specific day using `npx vitest -t "dayXX partX"`
5. Copy the example input to `src/days/dayXX/input_test_X.txt`
6. Update the test case in `src/days/dayXX/index.ts` with the expected answer.
7. Implement your solution for the part, using the tests to verify
8. Run your solution with `npm run solve-day <day-number>` to get your answer
9. Submit your answer on the Advent of Code website
10. Repeat steps 5 – 9 for Part 2