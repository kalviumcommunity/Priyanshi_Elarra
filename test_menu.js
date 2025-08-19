// test_menu.js
// Simple menu with an option to run the One-shot demo

const readline = require('readline');
const { runOneShotDemo } = require('./oneShotDemo');

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

function colorize(text, color) {
  return `${colors[color]}${text}${colors.reset}`;
}

function printMenu() {
  console.log(colorize('📋 Available Options:', 'bright'));
  console.log(colorize('1. 🚀 Quick Story Generator', 'green'));
  console.log(colorize('2. 🎨 Detailed Story Creator', 'green'));
  console.log(colorize('3. 🎭 Generate Story with Dynamic Prompting', 'green'));
  console.log(colorize('4. 🧪 Test Multi-Shot Examples', 'green'));
  console.log(colorize('5. 📖 View Available Genres', 'green'));
  console.log(colorize('6. 📖 Generate Story with One-shot Prompting', 'green'));
  console.log(colorize('7. ❌ Exit', 'red'));
  console.log('');
}

function promptSelection() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  rl.question('Select an option (1-7): ', async (answer) => {
    const choice = (answer || '').trim();
    try {
      switch (choice) {
        case '6':
          await runOneShotDemo();
          break;
        case '7':
          console.log('Exiting.');
          rl.close();
          process.exit(0);
          return;
        default:
          console.log('This option is a placeholder in this test menu.');
      }
    } catch (err) {
      console.error('An error occurred:', err);
    } finally {
      rl.close();
    }
  });
}

const interactive = process.argv.includes('--interactive') || process.env.DEMO_MENU === '1';

if (interactive) {
  console.log('Interactive menu:');
  console.log('='.repeat(50));
  printMenu();
  promptSelection();
} else {
  // Default behavior: mirror the original test-only static display and exit
  console.log('Testing menu display:');
  console.log('='.repeat(50));
  printMenu();
  console.log('='.repeat(50));
  console.log('Menu test complete!');
}
