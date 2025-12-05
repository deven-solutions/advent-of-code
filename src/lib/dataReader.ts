import { readFileSync } from 'fs';

export function readFull(file_path: string): string {
  return readFileSync(file_path, { encoding: 'utf-8', flag: 'r' });
}

export function readLines(file_path: string): string[] {
  return readFull(file_path).split('\n');
}

// Add other useful read-in functions here