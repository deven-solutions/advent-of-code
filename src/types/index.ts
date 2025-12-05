export interface TestCase {
  // Path to the input file for this test case.
  input_file_path: string;

  // Expected output given the input file.
  expected_output: number|string;

  // Add any extra arguments you need for your tests here.
  // They will be passed to the solution function.
  extra_args?: any[];
}

export interface Puzzle {
  // Solution functions
  part1: (file_path: string, ...args: any[]) => number|string;
  part2: (file_path: string, ...args: any[]) => number|string;

  // Path to your own input file
  input_file_path: string;

  // Test cases for part 1 and part 2.
  // Here you can add the examples given in the puzzle description.
  part1_tests: TestCase[];
  part2_tests: TestCase[];
}