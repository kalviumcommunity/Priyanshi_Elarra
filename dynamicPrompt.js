// dynamicPrompt.js
// Dynamic prompt builder that adjusts story generation based on mood, length, and other parameters

/**
 * Character object structure
 * @typedef {Object} Character
 * @property {string} name - Character's name
 * @property {string[]} traits - List of personality traits
 * @property {string} backstory - Short backstory
 * @property {string} role - Role in the story (e.g., protagonist)
 */

/**
 * Dynamic prompt input structure
 * @typedef {Object} DynamicPromptInput
 * @property {Character[]} characters - Array of characters
 * @property {string} genre - Story genre
 * @property {string} tone - Story tone
 * @property {string} mood - Story mood (hopeful, mysterious, dark, uplifting, etc.)
 * @property {string} storyLength - Story length (short, medium, long)
 */

/**
 * Mood-specific language adjustments
 * Maps different moods to specific language patterns and descriptions
 */
const MOOD_ADJUSTMENTS = {
  mysterious: {
    language: "suspenseful and enigmatic",
    descriptions: "shadowy, whispered, hidden, veiled, cryptic",
    pacing: "slow and deliberate",
    atmosphere: "filled with secrets and unanswered questions"
  },
  hopeful: {
    language: "warm and optimistic",
    descriptions: "bright, promising, glowing, radiant, uplifting",
    pacing: "steady and encouraging",
    atmosphere: "filled with possibility and light"
  },
  dark: {
    language: "somber and atmospheric",
    descriptions: "shadowed, heavy, weighty, brooding, intense",
    pacing: "measured and contemplative",
    atmosphere: "filled with depth and complexity"
  },
  uplifting: {
    language: "inspiring and energizing",
    descriptions: "vibrant, dynamic, soaring, triumphant, empowering",
    pacing: "energetic and flowing",
    atmosphere: "filled with energy and inspiration"
  },
  whimsical: {
    language: "playful and imaginative",
    descriptions: "sparkling, magical, fanciful, delightful, enchanting",
    pacing: "light and bouncy",
    atmosphere: "filled with wonder and charm"
  },
  melancholic: {
    language: "gentle and reflective",
    descriptions: "soft, wistful, tender, contemplative, peaceful",
    pacing: "gentle and flowing",
    atmosphere: "filled with quiet beauty and introspection"
  },
  intense: {
    language: "powerful and gripping",
    descriptions: "sharp, focused, compelling, riveting, dramatic",
    pacing: "fast and engaging",
    atmosphere: "filled with tension and excitement"
  }
};

/**
 * Story length adjustments
 * Maps different lengths to specific writing guidelines
 */
const LENGTH_ADJUSTMENTS = {
  short: {
    wordLimit: "under 300 words",
    focus: "concise and impactful",
    description: "Keep descriptions brief but vivid. Focus on key moments and emotions.",
    pacing: "fast-paced with clear progression"
  },
  medium: {
    wordLimit: "500-800 words",
    focus: "balanced and engaging",
    description: "Include moderate detail and character development. Build atmosphere gradually.",
    pacing: "steady pace with room for development"
  },
  long: {
    wordLimit: "1000+ words",
    focus: "detailed and immersive",
    description: "Allow for rich world-building, character development, and dialogue. Create depth and complexity.",
    pacing: "varied pacing with room for exploration"
  }
};

/**
 * Builds mood-specific language instructions
 * @param {string} mood - The story mood
 * @returns {string} - Language instructions for the mood
 */
function buildMoodInstructions(mood) {
  const moodLower = mood.toLowerCase();
  const adjustment = MOOD_ADJUSTMENTS[moodLower];
  
  if (!adjustment) {
    return "Use language that matches the overall tone and atmosphere of the story.";
  }
  
  return [
    `Use ${adjustment.language} language throughout the story.`,
    `Incorporate ${adjustment.descriptions} descriptions to create a ${adjustment.atmosphere}.`,
    `Maintain ${adjustment.pacing} pacing that enhances the ${moodLower} mood.`,
    `Choose words and phrases that evoke feelings of ${moodLower} and create an immersive atmosphere.`
  ].join(' ');
}

/**
 * Builds length-specific writing instructions
 * @param {string} storyLength - The desired story length
 * @returns {string} - Writing instructions for the length
 */
function buildLengthInstructions(storyLength) {
  const lengthLower = storyLength.toLowerCase();
  const adjustment = LENGTH_ADJUSTMENTS[lengthLower];
  
  if (!adjustment) {
    return "Write a story of appropriate length for the content and pacing.";
  }
  
  return [
    `Write a ${lengthLower} story (approximately ${adjustment.wordLimit}).`,
    `Focus on being ${adjustment.focus}.`,
    adjustment.description,
    `Maintain ${adjustment.pacing}.`
  ].join(' ');
}

/**
 * Builds character-specific instructions based on mood and length
 * @param {Character[]} characters - Array of characters
 * @param {string} mood - Story mood
 * @param {string} storyLength - Story length
 * @returns {string} - Character development instructions
 */
function buildCharacterInstructions(characters, mood, storyLength) {
  const characterCount = characters.length;
  const isShort = storyLength.toLowerCase() === 'short';
  
  let instructions = [];
  
  if (characterCount === 1) {
    instructions.push("Focus deeply on the protagonist's journey and personal growth.");
  } else if (characterCount <= 3) {
    instructions.push("Develop each character's unique voice and role in the story.");
  } else {
    instructions.push("Introduce characters gradually and focus on key interactions.");
  }
  
  if (isShort) {
    instructions.push("Keep character introductions concise but memorable.");
  } else {
    instructions.push("Allow space for character development and meaningful interactions.");
  }
  
  // Add mood-specific character instructions
  const moodLower = mood.toLowerCase();
  if (moodLower === 'mysterious') {
    instructions.push("Use character actions and dialogue to build suspense and intrigue.");
  } else if (moodLower === 'hopeful') {
    instructions.push("Show characters' growth and positive transformations.");
  } else if (moodLower === 'uplifting') {
    instructions.push("Emphasize characters' strengths and inspiring moments.");
  }
  
  return instructions.join(' ');
}

/**
 * Builds dynamic context to append to the base prompt
 * @param {DynamicPromptInput} input - The dynamic prompt input
 * @returns {string} - Dynamic context to append
 */
function buildDynamicContext(input) {
  const { characters, genre, tone, mood, storyLength } = input;
  
  const moodInstructions = buildMoodInstructions(mood);
  const lengthInstructions = buildLengthInstructions(storyLength);
  const characterInstructions = buildCharacterInstructions(characters, mood, storyLength);
  
  return [
    "\n\n=== DYNAMIC STORY REQUIREMENTS ===",
    `Mood: ${mood}`,
    `Story Length: ${storyLength}`,
    "",
    "LANGUAGE AND STYLE:",
    moodInstructions,
    "",
    "STORY STRUCTURE:",
    lengthInstructions,
    "",
    "CHARACTER DEVELOPMENT:",
    characterInstructions,
    "",
    "SPECIAL CONSIDERATIONS:",
    `- Ensure the ${mood} mood is consistently maintained throughout`,
    `- Adapt the ${genre} genre conventions to match the ${mood} atmosphere`,
    `- Use the ${tone} tone while incorporating the ${mood} mood`,
    `- Keep the story engaging and appropriate for the target length`,
    "=== END DYNAMIC REQUIREMENTS ===\n"
  ].join('\n');
}

/**
 * Builds a dynamic prompt that adjusts based on mood, length, and other parameters
 * @param {DynamicPromptInput} input - The dynamic prompt input
 * @param {string} basePrompt - The base prompt from generateStoryPrompts()
 * @returns {string} - The enhanced dynamic prompt
 */
function buildDynamicPrompt(input, basePrompt) {
  // Validate input parameters
  if (!input.characters || !Array.isArray(input.characters) || input.characters.length === 0) {
    throw new Error('Characters array is required and must not be empty');
  }
  
  if (!input.genre || !input.tone || !input.mood || !input.storyLength) {
    throw new Error('Genre, tone, mood, and storyLength are all required parameters');
  }
  
  // Build the dynamic context
  const dynamicContext = buildDynamicContext(input);
  
  // Append the dynamic context to the base prompt
  const enhancedPrompt = basePrompt + dynamicContext;
  
  return enhancedPrompt;
}

/**
 * Validates mood input and suggests alternatives if invalid
 * @param {string} mood - The mood to validate
 * @returns {string} - The validated mood or a default
 */
function validateMood(mood) {
  const validMoods = Object.keys(MOOD_ADJUSTMENTS);
  const moodLower = mood.toLowerCase();
  
  if (validMoods.includes(moodLower)) {
    return moodLower;
  }
  
  // Try to find a similar mood
  const similarMoods = validMoods.filter(validMood => 
    validMood.includes(moodLower) || moodLower.includes(validMood)
  );
  
  if (similarMoods.length > 0) {
    return similarMoods[0];
  }
  
  // Return a default mood
  return 'hopeful';
}

/**
 * Validates story length input
 * @param {string} storyLength - The story length to validate
 * @returns {string} - The validated story length
 */
function validateStoryLength(storyLength) {
  const validLengths = Object.keys(LENGTH_ADJUSTMENTS);
  const lengthLower = storyLength.toLowerCase();
  
  if (validLengths.includes(lengthLower)) {
    return lengthLower;
  }
  
  // Return default length
  return 'medium';
}

/**
 * Gets available moods for user reference
 * @returns {string[]} - Array of available moods
 */
function getAvailableMoods() {
  return Object.keys(MOOD_ADJUSTMENTS);
}

/**
 * Gets available story lengths for user reference
 * @returns {string[]} - Array of available story lengths
 */
function getAvailableStoryLengths() {
  return Object.keys(LENGTH_ADJUSTMENTS);
}

// Export the functions for use in the story generator
module.exports = {
  buildDynamicPrompt,
  validateMood,
  validateStoryLength,
  getAvailableMoods,
  getAvailableStoryLengths,
  MOOD_ADJUSTMENTS,
  LENGTH_ADJUSTMENTS
};
