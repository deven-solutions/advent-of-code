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

class Range {
  max: number = 0;
  min: number = 0;

  constructor(aMin: number, aMax: number) {
    this.min = aMin;
    this.max = aMax;
  }

  inRange(aNumber: number): boolean {
    return aNumber >= this.min && aNumber <= this.max;
  }

  getIdCount(): number {
    return this.max + 1 - this.min;
  }

  equals(range: Range): boolean {
    return this.min == range.min && this.max == range.max;
  }

  toString(): string {
    return this.min + '-' + this.max;
  }
}

function part1(file_path: string) {
  const data = readInput(file_path);
  
  let isProcessingRanges: boolean = true;
  let ranges: Range[] = [];
  let freshCount = 0;

  data.raw.split('\n').forEach(element => {
    if (isProcessingRanges && element === '') {
      // Ranges have passed
      isProcessingRanges = false;
      return;
    } else if (isProcessingRanges) {
      // Save ranges
      const range: string[] = element.split('-');
      ranges.push(new Range(Number.parseInt(range[0]), Number.parseInt(range[1])));
    } else {
      // Process numbers against the ranges to check if they are fresh
      if (!ranges.every(range => !range.inRange(Number.parseInt(element)))) {
        freshCount++;
      }
    }
  });

  return freshCount;
}

function part2(file_path: string) {
  const data = readInput(file_path);

  let ranges: Range[] = [];
  //let validIds: Set<number> = new Set<number>();

  for (let element of data.raw.split('\n')) {
    if (element === '') {
      break;
    } else {
      const rangeString: string[] = element.split('-');
      const range: Range = new Range(Number.parseInt(rangeString[0]), Number.parseInt(rangeString[1]));
      console.log(range.toString());
      ranges.push(range);
    }
  }

  // Combine ranges that overlap (i.e. 301-304 and 299-302,
  // remove those ranges and create a new range with min at 200 and max at 304)

  // Loop through each range and check the min and max against every other range

  let nonDuplicateRanges: Range[] = [];

  if (extendRanges(ranges, nonDuplicateRanges)) {
    let stillExtending: boolean = true;
    while (stillExtending) {
      let copyArray = Object.assign([], nonDuplicateRanges);
      nonDuplicateRanges = [];
      stillExtending = extendRanges(copyArray, nonDuplicateRanges);
    }
  }

  let idCount = 0;

  nonDuplicateRanges.forEach(range => {
    idCount += range.getIdCount();
    console.log(range.toString());
  });

  return idCount;
}

export default <Puzzle> {
  part1,
  part2,
  input_file_path: path.join(__dirname, 'input.txt'),
  part1_tests: [
    {
      input_file_path: path.join(__dirname, 'input_test_1.txt'),
      expected_output: 3,
      extra_args: [],
    },
  ],
  part2_tests: [
    {
      input_file_path: path.join(__dirname, 'input_test_2.txt'),
      expected_output: 11921101472165,
      extra_args: [],
    },
  ],
}

function extendRanges(ranges: Range[], nonDuplicateRanges: Range[]): boolean {
  let rangesWereExtended: boolean = false;
  let extendedRanges: number[] = [];
  for (let i: number = 0; i < ranges.length; i++) {
    if (arrayContains(i, extendedRanges)) {
      // We have processed and extended this one already, skip it
      continue;
    }
    let range = ranges[i];
    let wasExtended: boolean = false;
    for (let j: number = 0; j < ranges.length; j++) {
      if (j == i) {
        continue;
      }
      if (ranges[j].inRange(range.min) || ranges[j].inRange(range.max)) {
        const min: number = Math.min(range.min, ranges[j].min);
        const max: number = Math.max(range.max, ranges[j].max);
        const newRange = new Range(min, max);
        if (nonDuplicateRanges.every(r => {
          return !r.equals(newRange);
        })) {
          nonDuplicateRanges.push(newRange);
          console.log("range extended: " + newRange);
          wasExtended = true;
          rangesWereExtended = true;
          extendedRanges.push(j);
        }
      }
    }
    if (!wasExtended) {
      nonDuplicateRanges.push(range);
      console.log("range was not extended: " + range);
    }
  }
  return rangesWereExtended;
}

function arrayContains<T>(n: T, array: T[]): boolean {
  for (let e of array) {
    if (e == n) {
      return true;
    }
  }
  return false;
}
