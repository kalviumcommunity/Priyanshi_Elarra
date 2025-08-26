// storyGenerator.js
// Terminal-based story generator with multi-shot prompting

const readline = require('readline');
const { generateStoryPrompts, generateGenreSpecificPrompts } = require('./promptBuilder');
const { buildDynamicPrompt, validateMood, validateStoryLength, getAvailableMoods, getAvailableStoryLengths } = require('./dynamicPrompt');

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

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

function printHeader() {
  console.log('\n');
  console.log(colorize('╔══════════════════════════════════════════════════════════════╗', 'cyan'));
  console.log(colorize('║                    ✨ ELARRA STORY GENERATOR ✨              ║', 'cyan'));
  console.log(colorize('║              AI-Powered Story Creator with Multi-Shot       ║', 'cyan'));
  console.log(colorize('╚══════════════════════════════════════════════════════════════╝', 'cyan'));
  console.log(colorize('🎭 Create amazing stories with your custom characters!', 'yellow'));
  console.log(colorize('📝 Multi-shot prompting for better story quality', 'yellow'));
  console.log('');
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

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(colorize(question, 'yellow'), (answer) => {
      resolve(answer.trim());
    });
  });
}

async function getCharacterInput() {
  console.log(colorize('\n👤 Character Information:', 'bright'));
  
  const name = await askQuestion('Character name: ');
  const traits = await askQuestion('Traits (comma separated, e.g., brave, curious, kind): ');
  const backstory = await askQuestion('Backstory: ');
  const role = await askQuestion('Role (protagonist, mentor, villain, love interest, etc.): ');
  
  return {
    name: name,
    traits: traits.split(',').map(trait => trait.trim()),
    backstory: backstory,
    role: role
  };
}

async function getStoryDetails() {
  console.log(colorize('\n📚 Story Details:', 'bright'));
  
  const genre = await askQuestion('Genre (fantasy, sci-fi, romance, mystery, adventure, comedy): ');
  const tone = await askQuestion('Tone (whimsical, inspiring, heartwarming, suspenseful, exciting, humorous): ');
  const plotDirection = await askQuestion('Plot direction (optional): ');
  
  return {
    genre: genre.toLowerCase(),
    tone: tone.toLowerCase(),
    plotDirection: plotDirection || ''
  };
}

async function getDynamicStoryDetails() {
  console.log(colorize('\n📚 Dynamic Story Details:', 'bright'));
  
  const genre = await askQuestion('Genre (fantasy, sci-fi, romance, mystery, adventure, comedy): ');
  const tone = await askQuestion('Tone (whimsical, inspiring, heartwarming, suspenseful, exciting, humorous): ');
  
  // Show available moods
  const availableMoods = getAvailableMoods();
  console.log(colorize(`\nAvailable moods: ${availableMoods.join(', ')}`, 'cyan'));
  const mood = await askQuestion('Mood: ');
  
  // Show available story lengths
  const availableLengths = getAvailableStoryLengths();
  console.log(colorize(`\nAvailable story lengths: ${availableLengths.join(', ')}`, 'cyan'));
  const storyLength = await askQuestion('Story length: ');
  
  const plotDirection = await askQuestion('Plot direction (optional): ');
  
  return {
    genre: genre.toLowerCase(),
    tone: tone.toLowerCase(),
    mood: validateMood(mood),
    storyLength: validateStoryLength(storyLength),
    plotDirection: plotDirection || ''
  };
}

async function quickStoryGenerator() {
  console.log(colorize('\n🚀 Quick Story Generator', 'bright'));
  console.log(colorize('Creating a story with default character...', 'cyan'));
  
  const character = {
    name: "Hero",
    traits: ["brave", "adventurous", "kind"],
    backstory: "A courageous hero on a quest",
    role: "protagonist"
  };
  
  const storyDetails = await getStoryDetails();
  
  const input = {
    characters: [character],
    ...storyDetails
  };
  
  await generateAndDisplayStory(input);
}

async function detailedStoryCreator() {
  console.log(colorize('\n🎨 Detailed Story Creator', 'bright'));
  
  const characters = [];
  let addMore = true;
  
  while (addMore) {
    const character = await getCharacterInput();
    characters.push(character);
    
    const more = await askQuestion('\nAdd another character? (y/n): ');
    addMore = more.toLowerCase() === 'y' || more.toLowerCase() === 'yes';
  }
  
  const storyDetails = await getStoryDetails();
  
  const input = {
    characters: characters,
    ...storyDetails
  };
  
  await generateAndDisplayStory(input);
}

async function dynamicStoryGenerator() {
  console.log(colorize('\n🎭 Generate Story with Dynamic Prompting', 'bright'));
  console.log(colorize('✨ Enhanced story generation with mood and length control', 'cyan'));
  
  const characters = [];
  let addMore = true;
  
  while (addMore) {
    const character = await getCharacterInput();
    characters.push(character);
    
    const more = await askQuestion('\nAdd another character? (y/n): ');
    addMore = more.toLowerCase() === 'y' || more.toLowerCase() === 'yes';
  }
  
  const storyDetails = await getDynamicStoryDetails();
  
  const input = {
    characters: characters,
    ...storyDetails
  };
  
  await generateAndDisplayDynamicStory(input);
}

async function generateAndDisplayStory(input) {
  console.log(colorize('\n🔄 Generating your story...', 'cyan'));
  console.log(colorize('Using multi-shot prompting for better quality...', 'cyan'));
  
  try {
    // Generate prompts
    const prompts = generateStoryPrompts(input);
    
    console.log(colorize('\n📊 Prompt Information:', 'bright'));
    console.log(`System Prompt Length: ${prompts.systemPrompt.length} characters`);
    console.log(`User Prompt Length: ${prompts.userPrompt.length} characters`);
    console.log(`Total Prompt Length: ${prompts.systemPrompt.length + prompts.userPrompt.length} characters`);
    
    // Simulate story generation (replace with actual API call)
    console.log(colorize('\n📖 Generated Story:', 'bright'));
    console.log(colorize('═'.repeat(60), 'cyan'));
    
    // For demo purposes, show a sample story
    const sampleStory = generateSampleStory(input);
    console.log(sampleStory);
    
    console.log(colorize('═'.repeat(60), 'cyan'));
    
    // Show the actual prompts for reference
    console.log(colorize('\n🔍 Generated Prompts (for reference):', 'bright'));
    console.log(colorize('System Prompt (first 200 chars):', 'yellow'));
    console.log(prompts.systemPrompt.substring(0, 200) + '...');
    console.log(colorize('\nUser Prompt:', 'yellow'));
    console.log(prompts.userPrompt);
    
  } catch (error) {
    console.log(colorize('\n❌ Error generating story:', 'red'));
    console.log(error.message);
  }
}

async function generateAndDisplayDynamicStory(input) {
  console.log(colorize('\n🔄 Generating your dynamic story...', 'cyan'));
  console.log(colorize('✨ Using enhanced prompting with mood and length control...', 'cyan'));
  
  try {
    // Generate base prompts
    const basePrompts = generateStoryPrompts(input);
    
    // Build dynamic prompt
    const dynamicPrompt = buildDynamicPrompt(input, basePrompts.userPrompt);
    
    console.log(colorize('\n📊 Dynamic Prompt Information:', 'bright'));
    console.log(`Base Prompt Length: ${basePrompts.userPrompt.length} characters`);
    console.log(`Dynamic Prompt Length: ${dynamicPrompt.length} characters`);
    console.log(`Enhancement: +${dynamicPrompt.length - basePrompts.userPrompt.length} characters`);
    console.log(`Mood: ${colorize(input.mood, 'magenta')}`);
    console.log(`Story Length: ${colorize(input.storyLength, 'magenta')}`);
    
    // Simulate story generation (replace with actual API call)
    console.log(colorize('\n📖 Generated Dynamic Story:', 'bright'));
    console.log(colorize('═'.repeat(60), 'cyan'));
    
    // For demo purposes, show a sample story with mood/length awareness
    const sampleStory = generateDynamicSampleStory(input);
    console.log(sampleStory);
    
    console.log(colorize('═'.repeat(60), 'cyan'));
    
    // Show the dynamic prompt for reference
    console.log(colorize('\n🔍 Dynamic Prompt (for reference):', 'bright'));
    console.log(colorize('Enhanced User Prompt:', 'yellow'));
    console.log(dynamicPrompt);
    
  } catch (error) {
    console.log(colorize('\n❌ Error generating dynamic story:', 'red'));
    console.log(error.message);
  }
}

function generateSampleStory(input) {
  const { characters, genre, tone, plotDirection } = input;
  
  let story = '';
  
  if (genre === 'fantasy') {
    story = `The Enchanted Quest of ${characters[0].name}

${characters[0].name} stood at the edge of the mystical forest, their heart pounding with excitement. The ancient trees whispered secrets of forgotten magic, and the air itself seemed to shimmer with possibility.

"Are you ready for this adventure?" a voice echoed from the shadows.

${characters[0].name} nodded, their ${characters[0].traits.join(', ')} nature guiding them forward. "I've been waiting for this moment my whole life," they replied, thinking of their ${characters[0].backstory}.

As they ventured deeper into the forest, the magic grew stronger. ${plotDirection || 'Their quest would test their courage and reveal secrets beyond imagination.'}

Through trials and tribulations, ${characters[0].name} discovered that true magic wasn't in spells or potions, but in the strength of their character and the bonds they formed along the way.

The story of ${characters[0].name} became legend, inspiring others to believe in the magic that lives within us all.`;
  } else if (genre === 'science fiction') {
    story = `The Future Beckons: ${characters[0].name}'s Discovery

In the year 2157, ${characters[0].name} worked tirelessly in their laboratory, surrounded by holographic displays and floating data streams. Their ${characters[0].traits.join(', ')} personality had always driven them to push the boundaries of what was possible.

"Dr. ${characters[0].name}, the quantum processor is ready for testing," announced the AI assistant.

${characters[0].name} smiled, remembering their ${characters[0].backstory}. This breakthrough could change everything. ${plotDirection || 'Their invention would revolutionize how humanity interacts with technology.'}

As the experiment began, reality itself seemed to bend around them. The quantum processor didn't just compute—it created possibilities that had never existed before.

Through this discovery, ${characters[0].name} realized that the future wasn't something to fear, but something to create. Their work would inspire generations to come, proving that human ingenuity combined with compassion could solve any challenge.

The legacy of ${characters[0].name} lived on, not just in their inventions, but in the hope they gave to humanity.`;
  } else if (genre === 'romance') {
    story = `A Love Story: ${characters[0].name}'s Heart

${characters[0].name} had always believed in love, even when it seemed impossible. Their ${characters[0].traits.join(', ')} nature made them see beauty in the simplest moments, and their ${characters[0].backstory} had taught them that the best things in life were worth waiting for.

One ordinary day, everything changed. ${plotDirection || 'A chance encounter would lead to the most beautiful love story they had ever known.'}

As the story unfolded, ${characters[0].name} discovered that love wasn't about grand gestures or perfect moments—it was about finding someone who made every day feel like a new adventure, someone who saw the world the same way they did.

Through laughter and tears, challenges and triumphs, ${characters[0].name} learned that the greatest love stories weren't written in books—they were written in the quiet moments, the shared smiles, and the simple joy of being together.

The love story of ${characters[0].name} became a reminder that sometimes the most beautiful things in life happen when we least expect them, and that love, in all its forms, is the greatest adventure of all.`;
  } else if (genre === 'mystery') {
    story = `The Case of ${characters[0].name}

Detective ${characters[0].name} was known throughout the department for their ${characters[0].traits.join(', ')} approach to solving cases. Their ${characters[0].backstory} had prepared them for this moment, though they didn't know it yet.

The case began with a simple phone call, but ${characters[0].name} knew that nothing was ever as simple as it seemed. ${plotDirection || 'A mysterious event would test their skills and lead them down a path they never expected.'}

As the investigation deepened, ${characters[0].name} discovered that the truth was often hidden in plain sight, and that the most important clues were the ones that seemed insignificant at first.

Through careful observation and logical deduction, ${characters[0].name} pieced together the puzzle, proving that even the most complex mysteries could be solved with patience, persistence, and a keen eye for detail.

The case of ${characters[0].name} became legend in the department, a reminder that every mystery had an answer, and that the truth was always worth pursuing.`;
  } else if (genre === 'adventure') {
    story = `The Great Adventure of ${characters[0].name}

${characters[0].name} had always dreamed of adventure, and now their chance had finally come. Their ${characters[0].traits.join(', ')} spirit had prepared them for this moment, and their ${characters[0].backstory} had given them the courage to take the first step.

The journey began with a simple decision, but ${characters[0].name} knew that every great adventure started with a single step. ${plotDirection || 'An incredible journey would test their limits and reveal strengths they never knew they had.'}

As they ventured into the unknown, ${characters[0].name} discovered that the greatest adventures weren't about the destination—they were about the journey itself, the people they met along the way, and the lessons they learned.

Through challenges and triumphs, ${characters[0].name} proved that courage wasn't the absence of fear, but the willingness to face it head-on. Their adventure became a testament to the human spirit and the endless possibilities that awaited those brave enough to seek them out.

The story of ${characters[0].name}'s adventure inspired others to follow their own dreams, proving that every person had the power to be the hero of their own story.`;
  } else if (genre === 'comedy') {
    story = `The Hilarious Misadventures of ${characters[0].name}

${characters[0].name} was the kind of person who could turn a simple trip to the store into a comedy of errors. Their ${characters[0].traits.join(', ')} personality made every day an adventure, and their ${characters[0].backstory} had taught them that laughter was the best medicine.

One ordinary day, ${characters[0].name} decided to try something new. ${plotDirection || 'A series of hilarious misunderstandings would lead to the most entertaining day of their life.'}

As the day unfolded, ${characters[0].name} found themselves in one ridiculous situation after another, each more entertaining than the last. But through it all, they never lost their sense of humor or their ability to find joy in the most unexpected places.

Through laughter and chaos, ${characters[0].name} discovered that sometimes the best stories come from the most unexpected mishaps, and that life was too short to take everything seriously.

The hilarious adventures of ${characters[0].name} became a reminder that laughter truly is the best medicine, and that sometimes the most memorable moments come from the things that go hilariously wrong.`;
  } else {
    story = `The Story of ${characters[0].name}

${characters[0].name} was known throughout the land for their ${characters[0].traits.join(', ')} qualities. Their ${characters[0].backstory} had prepared them for this moment, though they didn't know it yet.

The day began like any other, but fate had other plans. ${plotDirection || 'A mysterious event would change everything they thought they knew.'}

As the story unfolded, ${characters[0].name} discovered that being a ${characters[0].role} wasn't about having all the answers, but about having the courage to ask the right questions.

Through challenges and triumphs, ${characters[0].name} learned that the greatest adventures aren't found in distant lands, but within the human heart.

The tale of ${characters[0].name} became a reminder that every person has the power to be the hero of their own story.`;
  }
  
  return story;
}

function generateDynamicSampleStory(input) {
  const { characters, genre, tone, mood, storyLength, plotDirection } = input;
  
  // Adjust story based on mood and length
  let story = '';
  const isShort = storyLength === 'short';
  const isLong = storyLength === 'long';
  
  // Mood-specific language patterns
  const moodPatterns = {
    mysterious: {
      intro: "shadows danced",
      description: "whispered secrets",
      atmosphere: "enigmatic"
    },
    hopeful: {
      intro: "light shimmered",
      description: "promising possibilities",
      atmosphere: "uplifting"
    },
    dark: {
      intro: "shadows deepened",
      description: "weighty atmosphere",
      atmosphere: "somber"
    },
    uplifting: {
      intro: "energy surged",
      description: "inspiring moments",
      atmosphere: "empowering"
    },
    whimsical: {
      intro: "magic sparkled",
      description: "delightful wonders",
      atmosphere: "enchanting"
    },
    melancholic: {
      intro: "soft light filtered",
      description: "gentle reflections",
      atmosphere: "contemplative"
    },
    intense: {
      intro: "tension crackled",
      description: "riveting moments",
      atmosphere: "dramatic"
    }
  };
  
  const patterns = moodPatterns[mood] || moodPatterns.hopeful;
  
  if (genre === 'fantasy') {
    if (isShort) {
      story = `The ${patterns.atmosphere} tale of ${characters[0].name}

${characters[0].name} stood where ${patterns.intro}, their ${characters[0].traits.join(', ')} nature guiding them forward. The ancient forest held ${patterns.description} that called to their ${characters[0].backstory}.

"Are you ready?" a voice echoed from the shadows.

${characters[0].name} nodded, their heart filled with determination. ${plotDirection || 'Their quest would reveal the magic within.'}

Through trials and discovery, ${characters[0].name} learned that true power lay not in spells, but in the strength of their character. The story of ${characters[0].name} became legend, inspiring others to believe in the ${patterns.atmosphere} magic that lives within us all.`;
    } else if (isLong) {
      story = `The ${patterns.atmosphere} Chronicles of ${characters[0].name}

In a world where ${patterns.intro} through the ancient trees, ${characters[0].name} had always felt a connection to the mystical forces that surrounded their village. Their ${characters[0].traits.join(', ')} personality had set them apart from others, and their ${characters[0].backstory} had prepared them for a destiny they couldn't yet imagine.

The morning began like any other, with the soft light filtering through the canopy of the Enchanted Forest. But today felt different. The air itself seemed to hum with ${patterns.description}, and ${characters[0].name} knew that something extraordinary was about to happen.

"${characters[0].name}," called the village elder, their voice carrying the weight of centuries of wisdom, "the time has come for you to discover your true purpose."

${characters[0].name} approached the elder, their heart pounding with anticipation. "What do you mean, Elder?"

"The ancient prophecies speak of one who will bridge the gap between our world and the realm of pure magic," the elder explained, their eyes glowing with an otherworldly light. "Your ${characters[0].traits.join(', ')} nature makes you the perfect candidate for this sacred quest."

As ${characters[0].name} ventured deeper into the forest, they encountered creatures of legend—whispering spirits, talking animals, and ancient guardians who tested their resolve. Each challenge revealed new aspects of their character and strengthened their connection to the magical forces around them.

"${plotDirection || 'Your journey will take you to the heart of magic itself, where you must face the ultimate test of character and courage.'}" the forest spirits whispered in unison.

Through valleys of mist and mountains of crystal, ${characters[0].name} discovered that the greatest magic wasn't in the spells they could cast or the powers they could wield, but in the bonds they formed with the magical beings they encountered. Each friendship, each moment of understanding, brought them closer to their true potential.

The climax of their journey came at the Crystal Heart of the Forest, where the ancient magic of the world pulsed with ${patterns.atmosphere} energy. Here, ${characters[0].name} faced their greatest challenge—not a battle of strength, but a test of wisdom and compassion.

"You have proven yourself worthy," the Crystal Heart spoke, its voice resonating through the very air. "You understand that true magic lies in the connections we make and the love we share."

As ${characters[0].name} returned to their village, they carried with them not just the knowledge of ancient spells, but the wisdom that the most powerful magic in the world was the magic of friendship, courage, and believing in oneself.

The story of ${characters[0].name} became legend throughout the land, inspiring generations to come. Their ${patterns.atmosphere} journey proved that sometimes the greatest adventures are the ones that lead us to discover the magic within our own hearts.`;
    } else {
      story = `The ${patterns.atmosphere} Quest of ${characters[0].name}

${characters[0].name} stood at the edge of the mystical forest, where ${patterns.intro} between the ancient trees. Their ${characters[0].traits.join(', ')} nature had always drawn them to this place, and their ${characters[0].backstory} had prepared them for this moment.

"Are you ready for this adventure?" a voice echoed from the shadows, carrying ${patterns.description} that made ${characters[0].name}'s heart race with excitement.

${characters[0].name} nodded, their determination shining in their eyes. "I've been waiting for this moment my whole life," they replied, thinking of all the stories they'd heard about the magical realm that lay beyond the forest's edge.

As they ventured deeper into the enchanted woods, the magic grew stronger. ${plotDirection || 'Their quest would test their courage and reveal secrets beyond imagination.'} The air itself seemed to shimmer with possibility, and every step brought new wonders and challenges.

Through trials and tribulations, ${characters[0].name} discovered that true magic wasn't in spells or potions, but in the strength of their character and the bonds they formed along the way. Each obstacle they overcame revealed new depths of their ${characters[0].traits.join(', ')} nature.

The story of ${characters[0].name} became legend, inspiring others to believe in the ${patterns.atmosphere} magic that lives within us all. Their journey proved that sometimes the greatest adventures are the ones that lead us to discover our true selves.`;
    }
  } else if (genre === 'science fiction') {
    if (isShort) {
      story = `The ${patterns.atmosphere} Discovery of ${characters[0].name}

In the year 2157, ${characters[0].name} worked where ${patterns.intro} around their laboratory. Their ${characters[0].traits.join(', ')} personality had driven them to push boundaries.

"Dr. ${characters[0].name}, the quantum processor is ready," announced the AI assistant.

${characters[0].name} smiled, remembering their ${characters[0].backstory}. ${plotDirection || 'This breakthrough would revolutionize technology.'}

As the experiment began, reality itself seemed to bend. The quantum processor created ${patterns.description} that had never existed before.

Through this discovery, ${characters[0].name} realized that the future wasn't something to fear, but something to create. Their work would inspire generations, proving that human ingenuity combined with compassion could solve any challenge.`;
    } else {
      story = `The ${patterns.atmosphere} Future: ${characters[0].name}'s Revolution

In the year 2157, ${characters[0].name} worked tirelessly in their advanced laboratory, surrounded by holographic displays and floating data streams where ${patterns.intro} with every calculation. Their ${characters[0].traits.join(', ')} personality had always driven them to push the boundaries of what was possible, and their ${characters[0].backstory} had prepared them for this momentous day.

"Dr. ${characters[0].name}, the quantum processor is ready for testing," announced the AI assistant, its voice carrying ${patterns.description} that made the air itself seem to vibrate with possibility.

${characters[0].name} smiled, remembering the years of research and the countless nights spent perfecting their theories. This breakthrough could change everything. ${plotDirection || 'Their invention would revolutionize how humanity interacts with technology and each other.'}

As the experiment began, reality itself seemed to bend around them. The quantum processor didn't just compute—it created possibilities that had never existed before, opening doors to ${patterns.atmosphere} discoveries that would reshape the future of human civilization.

Through this discovery, ${characters[0].name} realized that the future wasn't something to fear, but something to create. Their work would inspire generations to come, proving that human ingenuity combined with compassion could solve any challenge and create a world filled with ${patterns.description}.

The legacy of ${characters[0].name} lived on, not just in their inventions, but in the hope they gave to humanity—a reminder that the most ${patterns.atmosphere} future is one we build together.`;
    }
  } else {
    // Generic story for other genres
    if (isShort) {
      story = `The ${patterns.atmosphere} Story of ${characters[0].name}

${characters[0].name} was known for their ${characters[0].traits.join(', ')} qualities. Their ${characters[0].backstory} had prepared them for this moment.

The day began where ${patterns.intro}, but fate had other plans. ${plotDirection || 'A mysterious event would change everything.'}

As the story unfolded, ${characters[0].name} discovered that being a ${characters[0].role} wasn't about having all the answers, but about having the courage to ask the right questions.

Through challenges and triumphs, ${characters[0].name} learned that the greatest adventures aren't found in distant lands, but within the human heart. The tale of ${characters[0].name} became a reminder that every person has the power to be the hero of their own ${patterns.atmosphere} story.`;
    } else {
      story = `The ${patterns.atmosphere} Tale of ${characters[0].name}

${characters[0].name} was known throughout the land for their ${characters[0].traits.join(', ')} qualities. Their ${characters[0].backstory} had prepared them for this moment, though they didn't know it yet.

The day began where ${patterns.intro}, creating an atmosphere of ${patterns.description} that seemed to whisper of changes to come. Fate had other plans for ${characters[0].name}, plans that would test their character and reveal their true potential.

As the story unfolded, ${characters[0].name} discovered that being a ${characters[0].role} wasn't about having all the answers, but about having the courage to ask the right questions and the wisdom to learn from every experience. ${plotDirection || 'A mysterious event would change everything they thought they knew about themselves and the world around them.'}

Through challenges and triumphs, moments of doubt and flashes of insight, ${characters[0].name} learned that the greatest adventures aren't found in distant lands, but within the human heart. Each obstacle overcome and each lesson learned brought them closer to understanding their true purpose.

The tale of ${characters[0].name} became a reminder that every person has the power to be the hero of their own story, and that the most ${patterns.atmosphere} journeys are the ones that lead us to discover the strength and beauty within ourselves.`;
    }
  }
  
  return story;
}

async function testMultiShotExamples() {
  console.log(colorize('\n🧪 Testing Multi-Shot Examples', 'bright'));
  
  const testCases = [
    {
      name: "Fantasy Test",
      input: {
        characters: [
          {
            name: "Luna",
            traits: ["curious", "brave", "imaginative"],
            backstory: "A young girl who loves stargazing and believes in magic",
            role: "protagonist"
          }
        ],
        genre: "fantasy",
        tone: "whimsical",
        plotDirection: "A magical adventure in a forest"
      }
    },
    {
      name: "Romance Test",
      input: {
        characters: [
          {
            name: "Emma",
            traits: ["romantic", "optimistic", "creative"],
            backstory: "A baker who believes in the magic of love",
            role: "protagonist"
          }
        ],
        genre: "romance",
        tone: "heartwarming",
        plotDirection: "Finding love in unexpected circumstances"
      }
    },
    {
      name: "Mystery Test",
      input: {
        characters: [
          {
            name: "Sarah",
            traits: ["observant", "logical", "persistent"],
            backstory: "A detective who solves impossible cases",
            role: "protagonist"
          }
        ],
        genre: "mystery",
        tone: "suspenseful",
        plotDirection: "Solving a case that defies logic"
      }
    }
  ];
  
  for (const testCase of testCases) {
    console.log(colorize(`\n📝 ${testCase.name}:`, 'bright'));
    const prompts = generateStoryPrompts(testCase.input);
    console.log(`Genre: ${testCase.input.genre}`);
    console.log(`Tone: ${testCase.input.tone}`);
    console.log(`System Prompt Length: ${prompts.systemPrompt.length} characters`);
    console.log(`User Prompt Length: ${prompts.userPrompt.length} characters`);
  }
}

function showAvailableGenres() {
  console.log(colorize('\n📖 Available Genres & Examples:', 'bright'));
  console.log(colorize('═'.repeat(50), 'cyan'));
  
  const genres = [
    { name: 'Fantasy', examples: 'whimsical, mystical, epic', available: '✅' },
    { name: 'Science Fiction', examples: 'inspiring, futuristic, technological', available: '✅' },
    { name: 'Romance', examples: 'heartwarming, romantic, sweet', available: '✅' },
    { name: 'Mystery', examples: 'suspenseful, intriguing, mysterious', available: '✅' },
    { name: 'Adventure', examples: 'exciting, thrilling, daring', available: '✅' },
    { name: 'Comedy', examples: 'funny, humorous, lighthearted', available: '✅' },
    { name: 'Drama', examples: 'emotional, intense, serious', available: '🔄' }
  ];
  
  genres.forEach(genre => {
    console.log(`${genre.available} ${colorize(genre.name, 'green')}: ${genre.examples}`);
  });
  
  console.log(colorize('\n✅ = Multi-shot examples available', 'green'));
  console.log(colorize('🔄 = Basic support (no examples yet)', 'yellow'));
}

async function main() {
  printHeader();
  
  while (true) {
    printMenu();
    
    const choice = await askQuestion('Enter your choice (1-6): ');
    
    switch (choice) {
      case '1':
        await quickStoryGenerator();
        break;
      case '2':
        await detailedStoryCreator();
        break;
      case '3':
        await dynamicStoryGenerator();
        break;
      case '4':
        await testMultiShotExamples();
        break;
      case '5':
        showAvailableGenres();
        break;
      case '6':
        console.log(colorize('\n👋 Thank you for using Elarra Story Generator!', 'green'));
        console.log(colorize('✨ Happy storytelling!', 'cyan'));
        rl.close();
        return;
      default:
        console.log(colorize('\n❌ Invalid choice. Please try again.', 'red'));
    }
    
    console.log(colorize('\n' + '─'.repeat(60), 'cyan'));
  }
}

// Handle graceful exit
process.on('SIGINT', () => {
  console.log(colorize('\n\n👋 Goodbye! Thanks for using Elarra!', 'green'));
  rl.close();
  process.exit(0);
});

// Start the application
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  main,
  generateAndDisplayStory,
  getDynamicStoryDetails,
  dynamicStoryGenerator
};

