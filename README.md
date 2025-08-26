# Priyanshi_Elarra
# ✨ Elarra – AI Storyteller from Your Imaginationl

## 💡 Project Vision

**Elarra** is an AI-powered web app that turns your custom character ideas into engaging, personalized stories.
You describe your characters, give a vibe or genre you want — and Elarra brings them to life in a magical narrative.

> Think of it like "your own novel generator", but where you're the creative director.

---

## 🧭 Why Elarra?

* Encourages creativity for writers, students & hobbyists
* Fun way to build stories around your own characters
* Makes storytelling more accessible using AI
* Interactive, emotional, and personalized experience
* **NEW**: Multi-shot prompting for better AI story generation
* **NEW**: Terminal-based story generator for immediate use

---

## 🎨 What You'll Be Able to Do

* Define characters with traits and backstories
* Choose mood, genre, or writing style
* Let AI generate a story based on your input
* **NEW**: Get better stories with multi-shot prompting examples
* **NEW**: Generate stories directly in terminal with interactive prompts
* Save or share the story (planned)

---

## 🧱 Tech Stack (Planned)

* **Frontend**: React, Tailwind CSS, Framer Motion
* **Backend**: Node.js, Express
* **AI API**: OpenAI GPT API
* **Database**: MongoDB (for storing stories & characters)

---

## 🚀 Multi-Shot Prompting Features

### What is Multi-Shot Prompting?
Multi-shot prompting provides the AI with example stories to learn from, resulting in:
- **Better story quality** - AI learns from high-quality examples
- **Consistent style** - Stories follow similar patterns and tone
- **Genre-specific guidance** - Different examples for different genres
- **Improved creativity** - AI understands story structure better

### Available Features:
1. **Example Stories**: Pre-written high-quality stories for different genres
2. **Genre-Specific Prompting**: Tailored examples based on your chosen genre
3. **Flexible Character Input**: Support for multiple characters with detailed traits
4. **Custom Plot Directions**: Optional plot guidance for more specific stories

### Example Genres Supported:
- **Fantasy**: Magical adventures with whimsical tones
- **Science Fiction**: Futuristic stories with inspiring themes
- **Romance**: Heartwarming love stories with sweet tones
- **Mystery**: Suspenseful detective stories with intrigue
- **Adventure**: Exciting journeys and discoveries
- **Comedy**: Humorous stories with lighthearted fun

---

## 🖥️ Terminal-Based Story Generator

### Quick Start
Run the interactive story generator in your terminal:

```bash
node storyGenerator.js
```

### Features:
- **🎭 Interactive Menu**: Choose from multiple options
- **🚀 Quick Story Generator**: Fast story creation with default character
- **🎨 Detailed Story Creator**: Full character customization
- **🧪 Multi-Shot Testing**: Test the prompting system
- **📖 Genre Information**: View available genres and examples
- **🌈 Colored Output**: Beautiful terminal interface with colors

### How to Use:
1. Run `node storyGenerator.js`
2. Choose your option (1-5)
3. Follow the prompts to input character details
4. Get your generated story instantly!

---

## 📁 Project Structure

```
Priyanshi_Elarra/
├── promptBuilder.js      # Core multi-shot prompting logic
├── storyGenerator.js     # Terminal-based interactive generator
├── multiShotDemo.js      # Demonstration and testing
├── USAGE_GUIDE.md        # Comprehensive usage guide
└── README.md            # Project documentation
```

### Key Files:

#### `promptBuilder.js`
- **`generateStoryPrompts(input)`**: Creates prompts with multi-shot examples
- **`generateGenreSpecificPrompts(input)`**: Genre-specific prompting
- **`EXAMPLE_STORIES`**: Pre-written example stories for different genres

#### `storyGenerator.js`
- **`main()`**: Main interactive application
- **`quickStoryGenerator()`**: Fast story creation
- **`detailedStoryCreator()`**: Full customization
- **`generateAndDisplayStory()`**: Story generation and display

#### `multiShotDemo.js`
- **`demonstrateMultiShotPrompting()`**: Shows how multi-shot prompting works
- **`testPromptGeneration()`**: Tests different input scenarios
- **`showAPIIntegration()`**: Example API integration code

---

## 🚧 Status: Development Phase

Current progress:
* ✅ Multi-shot prompting system implemented
* ✅ Example stories for 6 genres (Fantasy, Sci-Fi, Romance, Mystery, Adventure, Comedy)
* ✅ Genre-specific prompt generation
* ✅ Terminal-based story generator
* ✅ Interactive character input system
* ✅ Demonstration and testing framework
* [ ] Build prompt-based story generator (LRI – Language Response Interface)
* [ ] Create character input form
* [ ] Integrate OpenAI GPT for dynamic storytelling
* [ ] Polish frontend interactions
* [ ] Add feature to save/share story

---

## 🧪 Testing & Usage

### Terminal Generator:
```bash
node storyGenerator.js
```

### Multi-Shot Demo:
```bash
node multiShotDemo.js
```

### What You'll See:
- Interactive menus with colored output
- Character input prompts
- Story generation with multi-shot examples
- Prompt analysis and statistics
- Sample stories based on your input

---

## 📚 Available Genres & Examples

### ✅ Multi-Shot Examples Available:
1. **Fantasy** - "Luna's Magical Forest Adventure" (whimsical)
2. **Science Fiction** - "The Invention That Changed Everything" (inspiring)
3. **Romance** - "The Sweetest Love Story" (heartwarming)
4. **Mystery** - "The Case of the Vanishing Clock" (suspenseful)
5. **Adventure** - "The Lost Temple of the Sun" (exciting)
6. **Comedy** - "The Great Cake Catastrophe" (humorous)

### 🎭 Character Types Supported:
- **Protagonists** - Main characters with detailed traits
- **Love Interests** - Romantic partners
- **Mentors** - Wise guides and teachers
- **Villains** - Antagonists and challenges
- **Supporting Characters** - Friends and allies

### 🎨 Tone Options:
- **Whimsical** - Magical and playful
- **Inspiring** - Motivational and uplifting
- **Heartwarming** - Sweet and emotional
- **Suspenseful** - Mysterious and thrilling
- **Exciting** - Action-packed and adventurous
- **Humorous** - Funny and lighthearted

---

## ✅ Upcoming Steps

* [ ] Build prompt-based story generator (LRI – Language Response Interface)
* [ ] Create character input form
* [ ] Integrate OpenAI GPT for dynamic storytelling
* [ ] Polish frontend interactions
* [ ] Add feature to save/share story
* [ ] Add more example stories for additional genres
* [ ] Implement story quality metrics
* [ ] Add story export functionality (PDF, TXT)

---

## 📝 Author

Made with ☕, 💡, and ✨ by Priyanshi Chittora


