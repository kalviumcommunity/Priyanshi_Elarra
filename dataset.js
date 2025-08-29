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
 * Example stories for multi-shot prompting
 * These serve as few-shot examples to guide the AI
 */
const EXAMPLE_STORIES = [
  {
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
    plotDirection: "A magical adventure in a forest",
    story: `Luna's Magical Forest Adventure

Luna sat by her bedroom window, her nose pressed against the cool glass as she gazed at the twinkling stars above. The moonlight cast silvery shadows across her room, and she couldn't help but wonder what secrets the night held.

"Mommy, do you think there are magical creatures in the forest?" Luna asked, her eyes wide with wonder.

Her mother smiled warmly. "If anyone could find them, it would be you, sweetheart."

The next morning, Luna packed her small backpack with a flashlight, a notebook, and her favorite teddy bear. She tiptoed out of the house and made her way to the edge of the mysterious forest that bordered their backyard.

As she stepped beneath the canopy of ancient trees, something magical happened. The forest seemed to come alive with gentle whispers and soft, glowing lights that danced between the branches.

"Hello?" Luna called out softly, her voice filled with excitement rather than fear.

To her delight, a tiny creature with translucent wings emerged from behind a flower. It was no bigger than her thumb, with eyes that sparkled like morning dew.

"Hello, little human," the fairy said with a musical voice. "I'm Willow. What brings you to our forest?"

Luna's heart soared. "I'm Luna! I came to find magic, and I think I just did!"

Willow giggled and fluttered around Luna's head. "You have a pure heart, Luna. That's why the forest revealed itself to you. Would you like to meet my friends?"

Throughout the day, Luna met talking animals, friendly tree spirits, and even a wise old owl who shared stories of the forest's history. Each creature taught her something special about friendship, courage, and the magic that exists when you believe.

As the sun began to set, Luna knew it was time to return home. But before she left, Willow gave her a small crystal that glowed with a soft, warm light.

"This will help you remember that magic is always around you, Luna," Willow said. "You just have to look for it with your heart."

Luna hugged her new friend and promised to return. As she walked back home, the crystal in her pocket pulsed gently, reminding her that her magical adventure was real and that she would always be welcome in the enchanted forest.

That night, as Luna gazed at the stars again, she smiled knowing that magic wasn't just in stories—it was everywhere, waiting for those brave enough to believe.`
  },
  {
    characters: [
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
    ],
    genre: "science fiction",
    tone: "inspiring",
    plotDirection: "A young inventor creates something amazing",
    story: `The Invention That Changed Everything

Alex's bedroom was a chaotic laboratory of dreams. Wires snaked across the desk, circuit boards lay scattered like puzzle pieces, and a half-built robot sat patiently in the corner. At fifteen, Alex had already built more inventions than most people create in a lifetime.

"Another late night, Alex?" Mom called from the hallway.

"Just finishing up, Mom!" Alex replied, adjusting the tiny solar panel on what looked like a small, metallic bird.

The next morning, Alex rushed to the community center where the annual Young Inventors Fair was being held. This year's theme was "Technology for Good," and Alex had been working on something special.

"Alex! Over here!" called Dr. Chen, the retired physicist who had been mentoring Alex for the past year. Dr. Chen's eyes twinkled behind his round glasses as he approached.

"Dr. Chen, I think I've finally got it working!" Alex exclaimed, carefully placing the metallic bird on the display table.

"What does it do?" Dr. Chen asked, leaning in with interest.

Alex pressed a small button on the bird's back. Suddenly, the bird's wings began to glow with a soft, blue light, and it started to hover gently above the table.

"It's a pollution detector!" Alex explained excitedly. "The wings change color based on air quality—blue for clean air, yellow for moderate pollution, and red for dangerous levels. It can fly around and map pollution hotspots in real-time!"

Dr. Chen's face lit up with pride. "Alex, this is remarkable! You've combined environmental science with robotics in a way that could actually help communities."

As the judges made their rounds, Alex's invention drew crowds. People were fascinated by the little bird that could help protect the environment. The local news even came to cover the story.

"Alex, where did you get the idea for this?" asked a reporter.

Alex thought for a moment. "I wanted to create something that could make a real difference. We talk about pollution all the time, but what if we could actually see it and track it? Maybe then we could do something about it."

By the end of the day, Alex's invention had won first place, but more importantly, several environmental organizations had expressed interest in developing the technology further.

As Alex packed up the bird, Dr. Chen put a hand on their shoulder. "You know, Alex, the best inventions aren't just about technology—they're about solving real problems with heart. You've done that today."

Alex smiled, looking at the little bird that had started as a dream and was now a reality. "Thanks, Dr. Chen. I think this is just the beginning."

That night, as Alex lay in bed, the metallic bird sat on the nightstand, its wings glowing softly. It was a reminder that sometimes the smallest inventions can spark the biggest changes, and that science, when guided by kindness, can truly make the world a better place.`
  },
  {
    characters: [
      {
        name: "Emma",
        traits: ["romantic", "optimistic", "creative"],
        backstory: "A baker who believes in the magic of love and creates beautiful cakes",
        role: "protagonist"
      },
      {
        name: "James",
        traits: ["reserved", "kind", "hardworking"],
        backstory: "A carpenter who keeps to himself but has a heart of gold",
        role: "love interest"
      }
    ],
    genre: "romance",
    tone: "heartwarming",
    plotDirection: "Two people finding love in unexpected circumstances",
    story: `The Sweetest Love Story

Emma's bakery was a haven of warmth and sweetness. Every morning, she woke up before dawn to create magical confections that made people smile. Her cakes weren't just desserts—they were edible works of art that told stories of love, hope, and joy.

"Another masterpiece, Emma," her regular customer, Mrs. Thompson, said as she admired the wedding cake Emma had just finished. "You have such a gift for making people happy."

Emma smiled, her heart full. "That's what baking is all about, isn't it? Spreading a little sweetness in the world."

That afternoon, a tall, quiet man walked into her bakery. He had calloused hands and kind eyes that seemed to hold a thousand stories.

"I need a cake," he said simply. "For my sister's birthday. She loves flowers."

Emma's eyes lit up. "I'd love to make something special for her! What's her favorite flower?"

"Sunflowers," he replied, and for the first time, Emma saw a hint of a smile. "She says they're the happiest flowers."

Over the next few days, Emma poured her heart into creating the most beautiful sunflower cake she'd ever made. When James came to pick it up, his eyes widened in amazement.

"This is... incredible," he whispered. "How did you make the petals look so real?"

Emma blushed. "It's all about patience and love. Every petal is handcrafted with care."

As James left with the cake, Emma couldn't help but notice how his presence had filled the bakery with a different kind of warmth.

The next week, James returned with a small wooden box. "I made this for you," he said, opening it to reveal a beautiful cake stand carved with delicate flowers. "I thought you might like it for displaying your creations."

Emma's heart skipped a beat. "It's perfect," she whispered. "You made this by hand?"

James nodded, his cheeks tinged with pink. "I wanted to thank you for making my sister's birthday so special. She was over the moon about that cake."

From that day on, James became a regular visitor to Emma's bakery. He'd come in the evenings, when the shop was quiet, and they'd talk about everything from their dreams to their favorite books. Emma discovered that behind his reserved exterior was a man with a heart as big as the sky.

One rainy evening, as Emma was closing up, James appeared at the door with a bouquet of sunflowers.

"Emma," he said, his voice gentle but sure, "I've been coming here every day not just for the coffee, but because I can't imagine my day without seeing you. You make everything sweeter, just like your cakes."

Emma's heart soared. "James, I feel the same way. You've brought so much warmth into my life."

As they stood there in the soft glow of the bakery lights, surrounded by the sweet scent of vanilla and the gentle patter of rain, Emma knew she had found something precious—a love as sweet and enduring as the cakes she created.

Their love story became the stuff of local legend, a reminder that sometimes the sweetest things in life come from the most unexpected places, and that love, like a perfectly baked cake, requires patience, care, and a whole lot of heart.`
  },
  {
    characters: [
      {
        name: "Detective Sarah",
        traits: ["observant", "logical", "persistent"],
        backstory: "A seasoned detective with a knack for solving impossible cases",
        role: "protagonist"
      },
      {
        name: "Inspector Mike",
        traits: ["experienced", "supportive", "intuitive"],
        backstory: "A veteran police officer who trusts Sarah's instincts",
        role: "mentor"
      }
    ],
    genre: "mystery",
    tone: "suspenseful",
    plotDirection: "Solving a case that seems to defy logic",
    story: `The Case of the Vanishing Clock

Detective Sarah Chen stood in the middle of the antique shop, her sharp eyes scanning every detail. The owner, Mr. Thompson, was nearly in tears as he explained the impossible situation.

"It was here yesterday, I swear!" he said, pointing to an empty space on the wall. "The grandfather clock has been in my family for three generations. It's worth a fortune, and now it's just... gone!"

Sarah examined the wall carefully. There were no marks, no signs of forced entry, and the security system hadn't been triggered. It was as if the clock had simply vanished into thin air.

"Tell me about this clock," Sarah said, her analytical mind already working overtime.

"It's a beautiful piece from the 1800s," Mr. Thompson explained. "Solid oak, brass pendulum, and it chimes every hour. But here's the strange thing—it stopped working exactly at midnight last night, and this morning, it was gone."

Sarah's partner, Inspector Mike Rodriguez, joined her at the scene. "What do you think, Sarah? This one's got me stumped."

Sarah's eyes narrowed as she noticed something on the floor—a single brass gear, no bigger than a dime, lying in the corner.

"Mike, look at this," she said, carefully picking up the gear. "This doesn't belong to a grandfather clock. It's too small, too modern."

As Sarah examined the gear more closely, she noticed tiny markings that looked like circuit patterns. Her mind raced with possibilities.

"Mr. Thompson," she asked, "has anyone shown unusual interest in the clock recently?"

The shop owner thought for a moment. "Well, there was a man yesterday. He seemed very interested in the clock's mechanism, asked a lot of technical questions. Said he was a collector."

Sarah's instincts were tingling. "What did he look like?"

"Tall, well-dressed, had a briefcase. Oh, and he had a very distinctive watch—it was digital but looked antique somehow."

Sarah and Mike exchanged glances. This was no ordinary theft.

Over the next few days, Sarah pieced together the puzzle. The "collector" was actually Dr. Marcus Reed, a brilliant but eccentric inventor who had been working on a revolutionary time-keeping device. He had stolen the clock not for its monetary value, but for its unique mechanical properties.

"The grandfather clock had a perfect pendulum system," Sarah explained to Mike as they prepared to raid Reed's laboratory. "He needed it to calibrate his quantum time device."

The case took an even more mysterious turn when they discovered that Reed's invention wasn't just about telling time—it was about manipulating it. The clock hadn't been stolen; it had been transported to a different time.

Sarah's logical mind struggled with the implications, but her persistence paid off. She tracked Reed to an abandoned warehouse where he was attempting his final experiment.

"Dr. Reed," Sarah called out as she and Mike entered the warehouse, "you're under arrest for grand theft and... temporal manipulation."

Reed looked up from his device, his eyes wild with excitement. "You don't understand! I was so close to unlocking the secrets of time itself!"

But Sarah's careful investigation had revealed the truth—Reed's device was dangerous and unstable. With Mike's help, she managed to shut it down and recover the grandfather clock, which was miraculously unharmed.

As the clock was returned to Mr. Thompson's shop, it began chiming again, as if it had never left. The case was closed, but Sarah knew that some mysteries were better left unsolved.

"Sometimes," she said to Mike as they left the shop, "the most logical explanation is that some things are beyond our understanding."

Mike smiled. "That's why you're the best detective I know, Sarah. You know when to trust your instincts and when to accept that some puzzles don't have simple answers."

The case of the vanishing clock became legend in the police department, a reminder that even the most impossible mysteries could be solved with patience, logic, and a little bit of faith in the unexplained.`
  },
  {
    characters: [
      {
        name: "Jake",
        traits: ["adventurous", "resourceful", "optimistic"],
        backstory: "A young explorer who dreams of discovering ancient treasures",
        role: "protagonist"
      },
      {
        name: "Professor Elena",
        traits: ["intelligent", "cautious", "knowledgeable"],
        backstory: "An archaeologist who has dedicated her life to uncovering history's secrets",
        role: "mentor"
      }
    ],
    genre: "adventure",
    tone: "exciting",
    plotDirection: "A journey to find a hidden treasure",
    story: `The Lost Temple of the Sun

Jake Martinez had always dreamed of adventure. Growing up reading stories of Indiana Jones and ancient civilizations, he knew that somewhere out there, incredible discoveries were waiting to be made. Now, at twenty-five, he was finally getting his chance.

"Are you sure about this, Jake?" his friend Maria asked as he packed his backpack with supplies. "The Amazon rainforest is dangerous, and no one has found this temple in hundreds of years."

Jake grinned, his adventurous spirit undimmed. "That's exactly why I have to go. Imagine finding something that's been lost to time!"

His journey led him to Professor Elena Rodriguez, a renowned archaeologist who had spent decades studying ancient maps and texts. She was skeptical at first, but Jake's enthusiasm was infectious.

"You have the heart of an explorer," she said, examining the ancient map Jake had discovered in his grandfather's attic. "But do you have the patience? Archaeology isn't just about finding treasure—it's about preserving history."

Together, they set out for the heart of the Amazon, following clues that had been hidden for centuries. The journey was grueling—trekking through dense jungle, crossing treacherous rivers, and facing challenges that tested their limits.

"Look at this," Elena said one evening, pointing to strange markings on a rock face. "These symbols match the ones on your map. We're getting close."

As they ventured deeper into the jungle, they discovered ancient stone steps leading up a hidden mountain. The air grew thick with anticipation as they climbed higher, each step bringing them closer to their goal.

Finally, they reached a massive stone door, covered in intricate carvings that told the story of an ancient civilization that had worshipped the sun.

"According to the legends," Elena explained, her voice filled with wonder, "this temple was built to honor the sun god and protect a sacred artifact that could control the weather."

Jake's heart raced as they carefully opened the door. Inside, they found themselves in a magnificent chamber, its walls covered in gold and precious stones that glittered in the light of their torches.

But the real treasure wasn't the gold—it was the knowledge they discovered. Ancient texts told the story of a people who had lived in harmony with nature, using advanced technology that was far ahead of its time.

"This is incredible," Jake whispered, his adventurous spirit fulfilled beyond his wildest dreams. "We're not just finding treasure—we're uncovering a lost chapter of human history."

As they documented their findings, Jake realized that the greatest adventure wasn't about the treasure they found, but about the journey they had taken together. The temple had been waiting for someone with the courage to seek it out, and the patience to understand its secrets.

When they finally emerged from the jungle, their discovery made headlines around the world. But for Jake, the real reward was knowing that he had followed his dreams and discovered something that would change how people understood the past.

"Every adventure begins with a single step," he said to Elena as they prepared to return to the temple for further study. "And every discovery starts with believing that the impossible is possible."

The lost temple of the sun became Jake's legacy, a reminder that the world is full of wonders waiting to be discovered by those brave enough to seek them out.`
  },
  {
    characters: [
      {
        name: "Lily",
        traits: ["funny", "clumsy", "well-meaning"],
        backstory: "A young woman who always tries to help but ends up in hilarious situations",
        role: "protagonist"
      },
      {
        name: "Mr. Johnson",
        traits: ["grumpy", "kind-hearted", "patient"],
        backstory: "A retired teacher who secretly enjoys Lily's antics",
        role: "mentor"
      }
    ],
    genre: "comedy",
    tone: "humorous",
    plotDirection: "A series of funny misunderstandings and mishaps",
    story: `The Great Cake Catastrophe

Lily Thompson was the kind of person who could turn a simple trip to the grocery store into an adventure. Her heart was always in the right place, but her coordination seemed to have other plans.

"Today is going to be different," Lily told herself as she walked into the community center. "I'm going to help with the bake sale and nothing is going to go wrong."

Famous last words.

The bake sale was being organized to raise money for the local library, and Lily had volunteered to help set up the tables. Simple enough, right? Wrong.

As she carried a tray of cupcakes to the display table, Lily's foot caught on an invisible obstacle (probably air, knowing her luck), and she went flying. The cupcakes launched into the air like tiny, delicious missiles.

"Look out!" she shouted, but it was too late. The cupcakes rained down on the unsuspecting crowd, creating a scene that would be talked about for years to come.

One cupcake landed perfectly on Mayor Wilson's head, the frosting creating an impromptu hat. Another splattered against the wall, creating a modern art masterpiece. And one particularly adventurous cupcake somehow ended up in Mrs. Henderson's purse.

"I'm so sorry!" Lily cried, trying to clean up the mess while simultaneously creating new ones. "I didn't mean to—oh no!"

In her attempt to help, she knocked over a pitcher of lemonade, which created a small river that flowed directly toward the electrical outlet. The lights flickered ominously.

"Lily, dear," said Mr. Johnson, the retired teacher who was supervising the event, "maybe you should take a break and let us handle the cleanup."

But Lily was determined to make things right. "No, I can fix this! I just need to—"

She reached for a mop, but her hand slipped, and the mop handle swung around like a medieval weapon, knocking over a stack of plates that had miraculously survived the cupcake incident.

The sound of breaking china echoed through the hall, and for a moment, everything was silent. Then, to everyone's surprise, Mr. Johnson started laughing.

"Lily," he said, wiping tears from his eyes, "you are absolutely the most entertaining person I've ever met. You've turned a simple bake sale into the most memorable event of the year!"

The crowd, initially shocked, began to laugh too. Even Mayor Wilson, who was still wearing his cupcake hat, couldn't help but smile.

"You know what?" said Mrs. Henderson, pulling the cupcake out of her purse, "this is actually quite delicious. Maybe we should have a cupcake fight next year!"

The bake sale, despite (or perhaps because of) Lily's antics, was a huge success. People came from all over town to see the "girl who could turn anything into an adventure," and the library received more donations than ever before.

As the day ended, Lily sat with Mr. Johnson, feeling a mix of embarrassment and pride.

"You know, Lily," he said kindly, "sometimes the best help isn't about being perfect. It's about being real, and bringing joy to people's lives. You did that today."

Lily smiled, realizing that maybe her clumsiness wasn't a curse—it was a gift. She had a way of making people laugh and bringing communities together, even if it wasn't always intentional.

The Great Cake Catastrophe became a beloved local legend, and Lily became known as the town's unofficial entertainment coordinator. Every event she helped with was guaranteed to be memorable, and people started looking forward to her "special touch."

As she walked home that evening, Lily couldn't help but laugh at herself. Life was too short to be perfect, and sometimes the best stories come from the most unexpected mishaps.

"Tomorrow," she said to herself, "I'm going to try to help with the gardening club. What could possibly go wrong?"

The answer, of course, was everything. But that's a story for another day.`
  }
];

/**
 * Builds the system prompt for the AI model with multi-shot examples.
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
    "Never break character as the storyteller.",
    "Study the examples provided to understand the style and structure expected."
  ].join(' ');
}

/**
 * Builds multi-shot examples for the prompt.
 * @returns {string}
 */
function buildMultiShotExamples() {
  let examples = "\n\nHere are some examples of the type of stories I create:\n\n";
  
  EXAMPLE_STORIES.forEach((example, index) => {
    examples += `Example ${index + 1}:\n`;
    examples += `Characters: ${example.characters.map(char => 
      `${char.name} (${char.role}) - ${char.traits.join(', ')}`
    ).join('; ')}\n`;
    examples += `Genre: ${example.genre}, Tone: ${example.tone}\n`;
    if (example.plotDirection) {
      examples += `Plot Direction: ${example.plotDirection}\n`;
    }
    examples += `Story:\n${example.story}\n\n`;
  });
  
  return examples;
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
 * Generates system and user prompts for the story generator with multi-shot examples.
 * @param {Object} input - Story prompt input
 * @param {Character[]} input.characters
 * @param {string} input.genre
 * @param {string} input.tone
 * @param {string} [input.plotDirection]
 * @returns {{ systemPrompt: string, userPrompt: string }}
 */
function generateStoryPrompts(input) {
  const systemPrompt = buildSystemPrompt() + buildMultiShotExamples();
  
  return {
    systemPrompt: systemPrompt,
    userPrompt: buildUserPrompt(input)
  };
}

/**
 * Generates a prompt with custom multi-shot examples based on genre.
 * @param {Object} input - Story prompt input
 * @param {string} input.genre - Target genre for examples
 * @returns {{ systemPrompt: string, userPrompt: string }}
 */
function generateGenreSpecificPrompts(input) {
  // Filter examples by genre if available
  const relevantExamples = EXAMPLE_STORIES.filter(example => 
    example.genre.toLowerCase() === input.genre.toLowerCase()
  );
  
  let systemPrompt = buildSystemPrompt();
  
  if (relevantExamples.length > 0) {
    systemPrompt += "\n\nHere are examples specifically for " + input.genre + " stories:\n\n";
    relevantExamples.forEach((example, index) => {
      systemPrompt += `Example ${index + 1}:\n`;
      systemPrompt += `Characters: ${example.characters.map(char => 
        `${char.name} (${char.role}) - ${char.traits.join(', ')}`
      ).join('; ')}\n`;
      systemPrompt += `Genre: ${example.genre}, Tone: ${example.tone}\n`;
      if (example.plotDirection) {
        systemPrompt += `Plot Direction: ${example.plotDirection}\n`;
      }
      systemPrompt += `Story:\n${example.story}\n\n`;
    });
  } else {
    systemPrompt += buildMultiShotExamples();
  }
  
  return {
    systemPrompt: systemPrompt,
    userPrompt: buildUserPrompt(input)
  };
}

// Export the functions for use in your ap