// test_menu.js
// Simple test to verify menu display

const readline = require('readline');

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
  console.log(colorize('6. ❌ Exit', 'red'));
  console.log('');
}

console.log('Testing menu display:');
console.log('='.repeat(50));
printMenu();
console.log('='.repeat(50));
console.log('Menu test complete!');
