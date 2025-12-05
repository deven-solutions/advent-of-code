import { readdirSync } from 'fs';
import path from 'path';

export const findDayDirectories = () => {
  return readdirSync(path.join(__dirname, '../days'), { withFileTypes: true })
      .filter(dirent => dirent.isDirectory() && dirent.name.match(/^day\d{2}$/))
      .map(dirent => dirent.name)
      .sort((a, b) => {
        const dayA = parseInt(a.replace('day', ''), 10);
        const dayB = parseInt(b.replace('day', ''), 10);
        return dayA - dayB;
      });
};

export const parseDayArgument = (argument: string): {dayNumber: number, dayDirectory: string} => {
  const dayNumber = parseInt(argument);
  if (Number.isNaN(dayNumber) || !Number.isInteger(dayNumber)) {
    console.error('Invalid day number. Should be between 1 and 25.');
    process.exit(1);
  }

  if (dayNumber < 1) {
    console.error(`Could not find December ${dayNumber} on the calendar? I think it starts at 1.`);
    process.exit(1);
  }

  if (dayNumber > 25) {
    console.error('You missed christmas! Advent of Code only goes up to day 25.');
    process.exit(1);
  }

  return {
    dayNumber,
    dayDirectory: `day${dayNumber.toString().padStart(2, '0')}`
  };
};