// oneShotDemo.js
// Demonstration of one-shot prompting for Elarra

const readline = require('readline');
const { generateStoryPrompts } = require('./promptBuilder');

/**
 * Builds the system instruction for one-shot prompting (no embedded examples).
 * @returns {string}
 */
function buildOneShotSystemPrompt() {
  return [
    'You are a creative, engaging, and safe AI storyteller.',
    'Your job is to write original, coherent, and imaginative stories based on user input.',
    'Always avoid violent, explicit, or harmful content.',
    'Stories should be appropriate for a general audience and foster creativity.',
    'If the user provides specific characters, genre, or tone, follow those closely.',
    'If plot direction is given, use it as a guiding thread.',
    'If not, invent a compelling plot that fits the characters and genre.',
    'Write in clear, vivid prose. Use dialogue and description as appropriate.',
    'Never break character as the storyteller.'
  ].join(' ');
}

/**
 * Promisified question helper for readline.
 * @param {import('readline').Interface} rl
 * @param {string} query
 * @returns {Promise<string>}
 */
function askQuestion(rl, query) {
  return new Promise(resolve => rl.question(query, answer => resolve(answer)));
}

/**
 * Runs a one-shot prompting demo: shows a single example, then a real request.
 * - Logs the example prompt
 * - Logs the final one-shot prompt (system + user message)
 * - Logs a mock generated story
 */
async function runOneShotDemo() {
  console.log('📖 One-Shot Prompting Demo for Elarra Story Generator\n');

  // One-shot training example (example input + example output)
  const exampleInput = {
    characters: [
      {
        name: 'Nora',
        traits: ['curious', 'brave', 'empathetic'],
        backstory: 'A librarian who loves uncovering hidden histories',
        role: 'protagonist'
      }
    ],
    genre: 'mystery',
    tone: 'gentle',
    plotDirection: 'A quiet town secret slowly comes to light'
  };

  const exampleOutput = `The Whispering Stacks\n\nNora had always believed that stories remembered the hands that held them. So when a note slipped from a century-old diary in the town library, she felt it like a tap on the shoulder—soft, but insistent. The message was simple: "Not all truths were buried, some were shelved."\n\nFollowing the faint trail of penciled margins and forgotten donor names, Nora uncovered a kindness long mistaken for scandal, and a promise kept in silence. By closing time, the library felt lighter, as if the books themselves were relieved. And Nora smiled, knowing that sometimes mysteries asked not to be solved, but to be understood.`;

  // Compose the example prompt section shown to the model
  const exampleSection = [
    '=== ONE-SHOT EXAMPLE ===',
    'Example Input:',
    `- Genre: ${exampleInput.genre}`,
    `- Tone: ${exampleInput.tone}`,
    `- Characters: ${exampleInput.characters.map(c => `${c.name} (${c.role}) - ${c.traits.join(', ')}`).join('; ')}`,
    exampleInput.plotDirection ? `- Plot Direction: ${exampleInput.plotDirection}` : '',
    '',
    'Example Output:',
    exampleOutput,
  ].filter(Boolean).join('\n');

  console.log('--- Example Prompt Section ---');
  console.log(exampleSection);
  console.log('\n');

  // Collect new input from the user
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  try {
    console.log('Please provide details for the REAL request. Press Enter to accept sensible defaults.');

    const name = (await askQuestion(rl, 'Character name (default: Aria): ')).trim() || 'Aria';
    const role = (await askQuestion(rl, 'Character role (default: protagonist): ')).trim() || 'protagonist';
    const traitsRaw = (await askQuestion(rl, 'Traits, comma-separated (default: inventive, kind, resilient): ')).trim() || 'inventive, kind, resilient';
    const backstory = (await askQuestion(rl, 'Backstory (default: A tinkerer who fixes what others abandon): ')).trim() || 'A tinkerer who fixes what others abandon';
    const genre = (await askQuestion(rl, 'Genre (default: adventure): ')).trim() || 'adventure';
    const tone = (await askQuestion(rl, 'Tone (default: uplifting): ')).trim() || 'uplifting';
    const plotDirection = (await askQuestion(rl, 'Plot direction (optional, default: A journey sparked by a found map): ')).trim() || 'A journey sparked by a found map';

    const newInput = {
      characters: [
        {
          name,
          traits: traitsRaw.split(',').map(s => s.trim()).filter(Boolean),
          backstory,
          role
        }
      ],
      genre,
      tone,
      plotDirection
    };

    // Use the exported generator to build a clear user prompt (we only use userPrompt, not its system part)
    const { userPrompt } = generateStoryPrompts(newInput);

    // Build final one-shot prompt: system + a single example + real request
    const systemPrompt = buildOneShotSystemPrompt();
    const userMessage = [
      exampleSection,
      '=== REAL REQUEST ===',
      userPrompt
    ].join('\n\n');

    console.log('--- Final One-Shot Prompt (to the model) ---');
    console.log('[System Prompt]');
    console.log(systemPrompt);
    console.log('\n[User Message]');
    console.log(userMessage);
    console.log('\n');

    // Mock model response (demonstration only)
    const mockStory = `The Map That Sang\n\n${name} kept a workshop where broken things learned to hope again. On an ordinary morning, tucked between a cracked compass and a jar of mismatched screws, ${name.toLowerCase()} found a folded map that hummed when touched—soft as a lullaby, certain as a heartbeat.\n\nIt led not to treasure, but to places forgotten by hurry: a bridge that listened, a garden that glowed after rain, a lighthouse whose keeper wrote letters to the moon. With every step, ${name.toLowerCase()} fixed more than hinges and gears. People followed, then believed, then remembered how to mend what mattered.\n\nBy journey’s end, the map fell quiet. It did not need to sing anymore. ${name} had learned its song.`;

    console.log('--- Generated Story (mock) ---');
    console.log(mockStory);
    console.log('');
  } finally {
    rl.close();
  }
}

if (require.main === module) {
  runOneShotDemo();
}

module.exports = {
  runOneShotDemo
};



