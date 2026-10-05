import { DecodableStory } from '../types/curriculum';

export const DECODABLE_STORIES: DecodableStory[] = [
  {
    id: 'story-snail-rain',
    title: 'The Snail in the Rain',
    subtitle: 'Focus: Long Vowel /aɪ/ as "ai" & "ay"',
    coverEmoji: '🐌',
    targetSounds: ['ai', 'ay'],
    level: 'Cambridge Stage 2 - Level 1',
    summary: 'A tiny snail named Ray wants to play, but the grey clouds bring cold rain. Can Ray find a dry way?',
    pages: [
      {
        text: 'Ray is a tiny snail. He loves to go out and play in the green grass.',
        targetHighlights: ['ay', 'ai'],
        imageEmoji: '🐌',
        caption: 'Ray the snail starts his journey.'
      },
      {
        text: 'The sky turns grey. Big drops of rain fall down on Ray the snail. Splash!',
        targetHighlights: ['ai', 'ay'],
        imageEmoji: '🌧️',
        caption: 'Dark grey clouds bring cool rain drops.'
      },
      {
        text: 'Ray says, "Oh no, I cannot run fast. I must wait on this dry trail under a green leaf."',
        targetHighlights: ['ai', 'ay'],
        imageEmoji: '🍃',
        caption: 'Ray crawls under a broad green leaf.'
      },
      {
        text: 'The rain stops. The bright sun smiles today. Ray is safe and ready to play all day!',
        targetHighlights: ['ai', 'ay'],
        imageEmoji: '☀️',
        caption: 'The sun comes out and Ray smiles!'
      }
    ],
    questions: [
      {
        question: 'Who is the main animal character in the story?',
        options: ['A dog named Max', 'A snail named Ray', 'A bird named Pip'],
        correctIndex: 1,
        explanation: 'The story is about Ray, a little snail with a shell.'
      },
      {
        question: 'Where does Ray wait while the rain falls?',
        options: ['Under a big tree', 'Inside a deep box', 'Under a green leaf'],
        correctIndex: 2,
        explanation: 'Ray rests safely under a green leaf to stay dry.'
      }
    ]
  },
  {
    id: 'story-queen-tree',
    title: "The Queen's Green Tree",
    subtitle: 'Focus: Long Vowel /iː/ as "ee" & "ea"',
    coverEmoji: '👑',
    targetSounds: ['ee', 'ea'],
    level: 'Cambridge Stage 2 - Level 2',
    summary: 'A kind queen has three little sheep who love to sleep beneath a sweet green beech tree.',
    pages: [
      {
        text: 'Queen Jean wears a shiny golden crown. She walks in her sweet green garden each week.',
        targetHighlights: ['ee', 'ea'],
        imageEmoji: '👑',
        caption: 'Queen Jean walks through the garden.'
      },
      {
        text: 'Under a tall green tree, Queen Jean sees three fluffy sheep fast asleep.',
        targetHighlights: ['ee', 'ea'],
        imageEmoji: '🐑',
        caption: 'Three fluffy white sheep are resting.'
      },
      {
        text: 'A little bee buzzes by the green leaf. "Bzz," says the bee to the sweet Queen.',
        targetHighlights: ['ee', 'ea'],
        imageEmoji: '🐝',
        caption: 'A friendly bee flies near the tree.'
      },
      {
        text: 'Queen Jean smiles. "Eat your sweet green tea treat," she tells the bee and sheep.',
        targetHighlights: ['ee', 'ea'],
        imageEmoji: '🫖',
        caption: 'A peaceful afternoon in the palace garden.'
      }
    ],
    questions: [
      {
        question: 'How many sheep does Queen Jean see under the tree?',
        options: ['Two sheep', 'Three sheep', 'Five sheep'],
        correctIndex: 1,
        explanation: 'She sees three fluffy sheep fast asleep.'
      },
      {
        question: 'What little creature buzzes near the green leaf?',
        options: ['A bee', 'A duck', 'A cat'],
        correctIndex: 0,
        explanation: 'A friendly bee buzzes near the green leaf.'
      }
    ]
  },
  {
    id: 'story-jake-bike',
    title: "Jake's Brave Bike Ride",
    subtitle: 'Focus: Magic "e" (Split Digraphs a_e, i_e)',
    coverEmoji: '🚲',
    targetSounds: ['a_e', 'i_e'],
    level: 'Cambridge Stage 2 - Level 3',
    summary: 'Jake puts on his red helmet and rides his fine silver bike down the wide lane to the lake.',
    pages: [
      {
        text: 'Jake has a shiny bike with five silver spokes. He smiles with a wide grin.',
        targetHighlights: ['a_e', 'i_e'],
        imageEmoji: '🚲',
        caption: 'Jake prepares his bike for a ride.'
      },
      {
        text: 'Jake rides down the stone lane. He waves his hand at his pal Mike by the gate.',
        targetHighlights: ['a_e', 'i_e'],
        imageEmoji: '👋',
        caption: 'Waving to Mike on the lane.'
      },
      {
        text: 'They ride to a quiet lake. Mike has a big kite that flies high in the sky.',
        targetHighlights: ['a_e', 'i_e'],
        imageEmoji: '🪁',
        caption: 'Flying a kite near the sunny lake.'
      },
      {
        text: 'Jake and Mike share a slice of sweet homemade cake. What a fine day!',
        targetHighlights: ['a_e', 'i_e'],
        imageEmoji: '🎂',
        caption: 'Enjoying cake after a great bike adventure.'
      }
    ],
    questions: [
      {
        question: 'What vehicle does Jake ride to the lake?',
        options: ['A red train', 'A shiny bike', 'A fast boat'],
        correctIndex: 1,
        explanation: 'Jake rides his shiny bike down the wide lane.'
      },
      {
        question: 'What delicious treat do Jake and Mike share?',
        options: ['Sweet cake', 'An apple', 'A bowl of soup'],
        correctIndex: 0,
        explanation: 'They share a delicious slice of cake!'
      }
    ]
  },
  {
    id: 'story-pip-lost-boat',
    title: 'Pip and the Little Boat',
    subtitle: 'Focus: Long Vowel /əʊ/ as "oa" & "ow"',
    coverEmoji: '⛵',
    targetSounds: ['oa', 'ow'],
    level: 'Cambridge Stage 2 - Level 4',
    summary: 'Pip the parrot spots a wooden boat floating on the slow river. Follow the gentle flow!',
    pages: [
      {
        text: 'Pip the bright green parrot flies low over the slow river road.',
        targetHighlights: ['ow', 'oa'],
        imageEmoji: '🦜',
        caption: 'Pip flies above the winding river.'
      },
      {
        text: 'Look below! A yellow wooden boat floats softly down the stream.',
        targetHighlights: ['ow', 'oa'],
        imageEmoji: '⛵',
        caption: 'A yellow boat drifts in the current.'
      },
      {
        text: 'A friendly goat stands on the shore in a warm brown coat.',
        targetHighlights: ['oa', 'ow'],
        imageEmoji: '🐐',
        caption: 'A goat in a coat spots the boat.'
      },
      {
        text: 'The goat uses a rope to tow the floating boat safely to the home dock. Hooray!',
        targetHighlights: ['oa', 'ow'],
        imageEmoji: '⚓',
        caption: 'The boat is tied safely to the wooden dock.'
      }
    ],
    questions: [
      {
        question: 'What animal flies low over the slow river?',
        options: ['A brown goat', 'Pip the parrot', 'A sleepy frog'],
        correctIndex: 1,
        explanation: 'Pip the green parrot flies low over the river.'
      },
      {
        question: 'What does the goat wear in the story?',
        options: ['A warm brown coat', 'A blue hat', 'A yellow shoe'],
        correctIndex: 0,
        explanation: 'The goat stands on the shore in a warm brown coat.'
      }
    ]
  }
];
