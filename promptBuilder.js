// promptBuilder.js

/**
 * Character object structure
 * @typedef {Object} Character
 * @property {string} name - Character's name
 * @property {string[]} traits - List of personality traits
 * @property {string} backstory - Short backstory
 * @property {string} role - Role in the story (e.g., protagonist)
 */

/**
 * Builds the system prompt for the AI model.
 * Instructs the model to act as a creative, safe storyteller.
 * @returns {string}
 */
function buildSystemPrompt() {
  return [
    "You are a creative, engaging, and safe AI storyteller.",
    "Your job is to write original, coherent, and imaginative stories based on user input.",
    "Always avoid violent, explicit, or harmful content.",
    "Stories should be appropriate for a general audience and foster creativity.",
    "If the user provides specific characters, genre, or tone, follow those closely.",
    "If plot direction is given, use it as a guiding thread.",
    "If not, invent a compelling plot that fits the characters and genre.",
    "Write in clear, vivid prose. Use dialogue and description as appropriate.",
    "Never break character as the storyteller."
  ].join(' ');
}

/**
 * Builds the user prompt describing the characters and user preferences.
 * @param {Object} input - Story prompt input
 * @param {Character[]} input.characters - List of characters
 * @param {string} input.genre - Story genre
 * @param {string} input.tone - Story tone
 * @param {string} [input.plotDirection] - Optional plot direction or story idea
 * @returns {string}
 */
function buildUserPrompt(input) {
  const { characters, genre, tone, plotDirection } = input;

  // Format character descriptions
  const characterDescriptions = characters.map((char, idx) => {
    return (
      `Character ${idx + 1}: ${char.name}\n` +
      `  - Role: ${char.role}\n` +
      `  - Traits: ${char.traits.join(', ')}\n` +
      `  - Backstory: ${char.backstory}`
    );
  }).join('\n\n');

  // Compose the user prompt
  let prompt = `Please write a ${genre} story with a(n) ${tone} tone.\n\n`;
  prompt += `Here are the main characters:\n${characterDescriptions}\n\n`;

  if (plotDirection && plotDirection.trim()) {
    prompt += `Story direction: ${plotDirection}\n\n`;
  } else {
    prompt += `Feel free to invent a creative plot that fits the above.\n\n`;
  }

  prompt += "The story should be engaging, safe, and suitable for all audiences. Please begin the story.";

  return prompt;
}

/**
 * Generates system and user prompts for the story generator.
 * @param {Object} input - Story prompt input
 * @param {Character[]} input.characters
 * @param {string} input.genre
 * @param {string} input.tone
 * @param {string} [input.plotDirection]
 * @returns {{ systemPrompt: string, userPrompt: string }}
 */
function generateStoryPrompts(input) {
  return {
    systemPrompt: buildSystemPrompt(),
    userPrompt: buildUserPrompt(input)
  };
}

// Export the main function for use in your app
module.exports = {
  generateStoryPrompts
};