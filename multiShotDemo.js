// multiShotDemo.js
// Demonstration of multi-shot prompting functionality

const { generateStoryPrompts, generateGenreSpecificPrompts, EXAMPLE_STORIES } = require('./promptBuilder');

/**
 * Demo function to show how multi-shot prompting works
 */
function demonstrateMultiShotPrompting() {
  console.log("🎭 Multi-Shot Prompting Demo for Elarra Story Generator\n");
  
  // Example 1: Basic multi-shot prompting
  console.log("=== Example 1: Basic Multi-Shot Prompting ===");
  const basicInput = {
    characters: [
      {
        name: "Maya",
        traits: ["adventurous", "curious", "kind"],
        backstory: "A young explorer who loves discovering new places",
        role: "protagonist"
      }
    ],
    genre: "adventure",
    tone: "exciting",
    plotDirection: "A journey to find a hidden treasure"
  };
  
  const basicPrompts = generateStoryPrompts(basicInput);
  console.log("System Prompt Length:", basicPrompts.systemPrompt.length, "characters");
  console.log("User Prompt:", basicPrompts.userPrompt);
  console.log("\n");
  
  // Example 2: Genre-specific prompting
  console.log("=== Example 2: Genre-Specific Multi-Shot Prompting ===");
  const fantasyInput = {
    characters: [
      {
        name: "Zara",
        traits: ["brave", "magical", "wise"],
        backstory: "A young witch learning to control her powers",
        role: "protagonist"
      }
    ],
    genre: "fantasy",
    tone: "mystical",
    plotDirection: "Learning to master ancient magic"
  };
  
  const fantasyPrompts = generateGenreSpecificPrompts(fantasyInput);
  console.log("Fantasy-specific prompts generated!");
  console.log("System Prompt Length:", fantasyPrompts.systemPrompt.length, "characters");
  console.log("\n");
  
  // Example 3: Science fiction example
  console.log("=== Example 3: Science Fiction Multi-Shot Prompting ===");
  const scifiInput = {
    characters: [
      {
        name: "Kai",
        traits: ["intelligent", "determined", "innovative"],
        backstory: "A robotics engineer working on AI development",
        role: "protagonist"
      }
    ],
    genre: "science fiction",
    tone: "futuristic",
    plotDirection: "Creating the first truly conscious AI"
  };
  
  const scifiPrompts = generateGenreSpecificPrompts(scifiInput);
  console.log("Science Fiction-specific prompts generated!");
  console.log("System Prompt Length:", scifiPrompts.systemPrompt.length, "characters");
  console.log("\n");
  
  // Show available examples
  console.log("=== Available Multi-Shot Examples ===");
  EXAMPLE_STORIES.forEach((example, index) => {
    console.log(`Example ${index + 1}:`);
    console.log(`  Genre: ${example.genre}`);
    console.log(`  Tone: ${example.tone}`);
    console.log(`  Characters: ${example.characters.map(char => char.name).join(', ')}`);
    console.log(`  Plot: ${example.plotDirection}`);
    console.log("");
  });
}

/**
 * Function to test prompt generation with different inputs
 */
function testPromptGeneration() {
  console.log("🧪 Testing Prompt Generation\n");
  
  const testCases = [
    {
      name: "Mystery Story",
      input: {
        characters: [
          {
            name: "Detective Sarah",
            traits: ["observant", "logical", "persistent"],
            backstory: "A seasoned detective with a knack for solving impossible cases",
            role: "protagonist"
          }
        ],
        genre: "mystery",
        tone: "suspenseful",
        plotDirection: "Solving a case that seems to defy logic"
      }
    },
    {
      name: "Romance Story",
      input: {
        characters: [
          {
            name: "Emma",
            traits: ["romantic", "optimistic", "creative"],
            backstory: "A baker who believes in the magic of love",
            role: "protagonist"
          },
          {
            name: "James",
            traits: ["reserved", "kind", "hardworking"],
            backstory: "A carpenter who keeps to himself",
            role: "love interest"
          }
        ],
        genre: "romance",
        tone: "heartwarming",
        plotDirection: "Two people finding love in unexpected circumstances"
      }
    }
  ];
  
  testCases.forEach((testCase, index) => {
    console.log(`Test Case ${index + 1}: ${testCase.name}`);
    const prompts = generateStoryPrompts(testCase.input);
    console.log(`  System Prompt Length: ${prompts.systemPrompt.length} characters`);
    console.log(`  User Prompt Length: ${prompts.userPrompt.length} characters`);
    console.log(`  Total Prompt Length: ${prompts.systemPrompt.length + prompts.userPrompt.length} characters`);
    console.log("");
  });
}

/**
 * Function to show how to integrate with AI API
 */
function showAPIIntegration() {
  console.log("🔌 API Integration Example\n");
  
  const sampleInput = {
    characters: [
      {
        name: "Leo",
        traits: ["courageous", "loyal", "determined"],
        backstory: "A young knight in training",
        role: "protagonist"
      }
    ],
    genre: "fantasy",
    tone: "epic",
    plotDirection: "A quest to save the kingdom"
  };
  
  const prompts = generateStoryPrompts(sampleInput);
  
  console.log("Example API call structure:");
  console.log(`
// Using OpenAI API
const response = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [
    {
      role: "system",
      content: "${prompts.systemPrompt.substring(0, 100)}..." // Truncated for display
    },
    {
      role: "user", 
      content: "${prompts.userPrompt}"
    }
  ],
  max_tokens: 1000,
  temperature: 0.8
});

const story = response.choices[0].message.content;
  `);
}

// Run the demonstrations
if (require.main === module) {
  demonstrateMultiShotPrompting();
  testPromptGeneration();
  showAPIIntegration();
}

module.exports = {
  demonstrateMultiShotPrompting,
  testPromptGeneration,
  showAPIIntegration
};

