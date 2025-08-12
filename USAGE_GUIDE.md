# Multi-Shot Prompting Usage Guide

## 🎯 What is Multi-Shot Prompting?

Multi-shot prompting is a technique where we provide the AI with example stories (called "shots") to help it understand the desired style, structure, and quality. This results in much better story generation!

## 📚 How It Works

1. **Examples**: We provide high-quality example stories for different genres
2. **Learning**: The AI learns from these examples to understand story patterns
3. **Generation**: When you request a story, the AI uses what it learned to create better content

## 🚀 Quick Start

### Basic Usage

```javascript
const { generateStoryPrompts } = require('./promptBuilder');

const input = {
  characters: [
    {
      name: "Alice",
      traits: ["brave", "curious", "kind"],
      backstory: "A young adventurer who loves exploring",
      role: "protagonist"
    }
  ],
  genre: "fantasy",
  tone: "whimsical",
  plotDirection: "A magical journey through an enchanted forest"
};

const prompts = generateStoryPrompts(input);
console.log(prompts.systemPrompt); // Contains examples + instructions
console.log(prompts.userPrompt);   // Your specific story request
```

### Genre-Specific Usage

```javascript
const { generateGenreSpecificPrompts } = require('./promptBuilder');

const input = {
  characters: [
    {
      name: "Dr. Sarah",
      traits: ["intelligent", "determined", "compassionate"],
      backstory: "A scientist working on breakthrough technology",
      role: "protagonist"
    }
  ],
  genre: "science fiction", // Will use sci-fi examples
  tone: "inspiring",
  plotDirection: "Creating technology that helps humanity"
};

const prompts = generateGenreSpecificPrompts(input);
// This will include only science fiction examples in the system prompt
```

## 📖 Character Structure

Each character should have:

```javascript
{
  name: "Character Name",           // Required
  traits: ["trait1", "trait2"],    // Array of personality traits
  backstory: "Character history",   // Brief background story
  role: "protagonist"              // Role in the story
}
```

### Example Characters

```javascript
// Single Character
{
  name: "Luna",
  traits: ["curious", "brave", "imaginative"],
  backstory: "A young girl who loves stargazing and believes in magic",
  role: "protagonist"
}

// Multiple Characters
[
  {
    name: "Alex",
    traits: ["determined", "kind", "resourceful"],
    backstory: "A teenager who loves science and wants to help others",
    role: "protagonist"
  },
  {
    name: "Dr. Chen",
    traits: ["wise", "patient", "encouraging"],
    backstory: "A retired scientist who mentors young minds",
    role: "mentor"
  }
]
```

## 🎨 Supported Genres & Tones

### Currently Available Examples:
- **Fantasy** (whimsical, mystical, epic)
- **Science Fiction** (inspiring, futuristic, technological)

### Other Genres You Can Use:
- **Adventure** (exciting, thrilling, daring)
- **Mystery** (suspenseful, intriguing, mysterious)
- **Romance** (heartwarming, romantic, sweet)
- **Comedy** (funny, humorous, lighthearted)
- **Drama** (emotional, intense, serious)

## 🔧 API Integration

### With OpenAI API

```javascript
const OpenAI = require('openai');
const { generateStoryPrompts } = require('./promptBuilder');

const openai = new OpenAI({
  apiKey: 'your-api-key-here'
});

async function generateStory(storyInput) {
  const prompts = generateStoryPrompts(storyInput);
  
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: prompts.systemPrompt
      },
      {
        role: "user",
        content: prompts.userPrompt
      }
    ],
    max_tokens: 1000,
    temperature: 0.8
  });
  
  return response.choices[0].message.content;
}

// Usage
const storyInput = {
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

generateStory(storyInput).then(story => {
  console.log("Generated Story:", story);
});
```

## 🧪 Testing Your Prompts

Run the demo to see multi-shot prompting in action:

```bash
node multiShotDemo.js
```

This will show you:
- How prompts are generated
- Different examples for different genres
- API integration examples
- Prompt length information

## 📊 Prompt Structure

### System Prompt Contains:
1. **Instructions** - How to behave as a storyteller
2. **Safety guidelines** - Content restrictions
3. **Multi-shot examples** - Sample stories to learn from
4. **Style guidance** - Writing style expectations

### User Prompt Contains:
1. **Genre and tone** - Story type and mood
2. **Character descriptions** - Detailed character information
3. **Plot direction** - Optional story guidance
4. **Request** - Clear instruction to begin the story

## 🎯 Best Practices

### 1. Character Development
- Give characters distinct personalities
- Include meaningful backstories
- Use specific, descriptive traits

### 2. Genre Selection
- Choose genres that match your story idea
- Use genre-specific prompting for better results
- Consider tone when selecting genre

### 3. Plot Direction
- Be specific but not too restrictive
- Allow room for AI creativity
- Include key story elements you want

### 4. API Settings
- Use `temperature: 0.8` for creative stories
- Set `max_tokens` based on desired story length
- Consider using `top_p: 0.9` for variety

## 🔍 Troubleshooting

### Common Issues:

1. **Stories too generic**
   - Use more specific character traits
   - Provide clearer plot direction
   - Try genre-specific prompting

2. **Stories too short**
   - Increase `max_tokens` in API call
   - Add more plot direction details
   - Include more characters

3. **Wrong tone/style**
   - Check genre and tone match
   - Use genre-specific examples
   - Adjust character traits

## 📈 Advanced Features

### Custom Examples
You can add your own example stories to `EXAMPLE_STORIES` in `promptBuilder.js`:

```javascript
const customExample = {
  characters: [...],
  genre: "your-genre",
  tone: "your-tone",
  plotDirection: "your-plot",
  story: "Your complete example story..."
};
```

### Multiple Genres
For stories that blend genres, use the basic `generateStoryPrompts()` function which includes all examples.

## 🎉 Success Tips

1. **Start simple** - Use basic prompting first
2. **Experiment** - Try different genres and tones
3. **Iterate** - Refine your inputs based on results
4. **Test** - Use the demo to understand how it works
5. **Customize** - Add your own examples for specific needs

---

Happy storytelling! 🚀✨

