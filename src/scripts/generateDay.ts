import { existsSync, mkdirSync, copyFileSync, writeFileSync, readFileSync } from "fs"
import path from "path";
import { parseDayArgument } from "src/scripts/util";

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('Please provide a day number as an argument. Example: npm run new-day 1');
  process.exit(1);
}

const {dayNumber, dayDirectory} = parseDayArgument(args[0]);
const dayDirectoryPath = path.join(__dirname, `../days/${dayDirectory}`);

if (existsSync(dayDirectoryPath)) {
  console.error(`${dayDirectoryPath} already exists.`);
  process.exit(1);
}

let launchJson = path.join(__dirname, '../../.vscode/launch.json');
if (!existsSync(launchJson)) {
  console.warn('No .vscode/launch.json found, skipping launch.json update.');
} else {
  const launchJsonContent = JSON.parse(readFileSync(launchJson, 'utf-8'));
  launchJsonContent.configurations.push({
    "type": "node",
    "request": "launch",
    "name": `Day ${dayNumber}`,
    "cwd": "${workspaceFolder}",
    "runtimeExecutable": "npm",
    "runtimeArgs": ["run", "solve-day", `${dayNumber}`],
    "console": "integratedTerminal",
    "skipFiles": ["<node_internals>/**"]
  });
  writeFileSync(launchJson, JSON.stringify(launchJsonContent, null, 2), 'utf-8');
  console.log(`Updated ${launchJson} with new launch configuration for Day ${dayNumber}`);
}

console.log(`Generating ${dayDirectoryPath}`);
mkdirSync(dayDirectoryPath);
copyFileSync(path.join(__dirname, 'template.ts.tpl'), path.join(dayDirectoryPath, 'index.ts'));
writeFileSync(path.join(dayDirectoryPath, 'input.txt'), '');
writeFileSync(path.join(dayDirectoryPath, 'input_test_1.txt'), '');
writeFileSync(path.join(dayDirectoryPath, 'input_test_2.txt'), '');



