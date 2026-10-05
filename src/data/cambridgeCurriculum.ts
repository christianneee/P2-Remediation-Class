import { CambridgeUnit, MagicEPair, StickerReward } from '../types/curriculum';

export const CAMBRIDGE_UNITS: CambridgeUnit[] = [
  {
    id: 'unit-1-blends',
    title: 'Unit 1: Friendly Blends',
    cambridgeObjective: 'Cambridge Stage 2: Blending adjacent consonants (initial and final)',
    description: 'Listen and blend two letter sounds smoothly together without a vowel in between.',
    levelBadge: 'Stage 2.1',
    color: 'emerald',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    targetSounds: ['st', 'sp', 'cl', 'tr', 'nd', 'mp'],
    words: [
      {
        id: 'w-star',
        word: 'star',
        unitId: 'unit-1-blends',
        targetPhoneme: 'st',
        segments: [
          { letters: 'st', type: 'digraph', spokenSound: 'st' },
          { letters: 'ar', type: 'digraph', spokenSound: 'ar' }
        ],
        definition: 'A bright, shining light high in the night sky.',
        simpleMeaningEsl: 'Bright shining light in the dark sky at night.',
        category: 'nature',
        imageEmoji: '⭐',
        exampleSentence: 'Look up at the bright star tonight.'
      },
      {
        id: 'w-stop',
        word: 'stop',
        unitId: 'unit-1-blends',
        targetPhoneme: 'st',
        segments: [
          { letters: 'st', type: 'digraph', spokenSound: 'st' },
          { letters: 'o', type: 'single', spokenSound: 'o' },
          { letters: 'p', type: 'single', spokenSound: 'p' }
        ],
        definition: 'To not move anymore.',
        simpleMeaningEsl: 'Freeze! Do not move or go forward.',
        category: 'actions',
        imageEmoji: '🛑',
        exampleSentence: 'Red traffic light means stop.'
      },
      {
        id: 'w-spoon',
        word: 'spoon',
        unitId: 'unit-1-blends',
        targetPhoneme: 'sp',
        segments: [
          { letters: 'sp', type: 'digraph', spokenSound: 'sp' },
          { letters: 'oo', type: 'digraph', spokenSound: 'oo' },
          { letters: 'n', type: 'single', spokenSound: 'n' }
        ],
        definition: 'A tool we hold to eat warm soup.',
        simpleMeaningEsl: 'You use this to eat cereal, soup, or ice cream.',
        category: 'food',
        imageEmoji: '🥄',
        exampleSentence: 'Use a spoon to drink the warm soup.'
      },
      {
        id: 'w-cloud',
        word: 'cloud',
        unitId: 'unit-1-blends',
        targetPhoneme: 'cl',
        segments: [
          { letters: 'cl', type: 'digraph', spokenSound: 'cl' },
          { letters: 'ou', type: 'digraph', spokenSound: 'ow' },
          { letters: 'd', type: 'single', spokenSound: 'd' }
        ],
        definition: 'A fluffy white or grey puff in the sky.',
        simpleMeaningEsl: 'White fluffy puff high in the blue sky.',
        category: 'nature',
        imageEmoji: '☁️',
        exampleSentence: 'The white cloud looks like a fluffy sheep.'
      },
      {
        id: 'w-train',
        word: 'train',
        unitId: 'unit-1-blends',
        targetPhoneme: 'tr',
        segments: [
          { letters: 'tr', type: 'digraph', spokenSound: 'tr' },
          { letters: 'ai', type: 'digraph', spokenSound: 'ay' },
          { letters: 'n', type: 'single', spokenSound: 'n' }
        ],
        definition: 'A long vehicle that travels on tracks.',
        simpleMeaningEsl: 'A big, long vehicle that says choo-choo on rails.',
        category: 'actions',
        imageEmoji: '🚆',
        exampleSentence: 'The green train moves fast down the track.'
      },
      {
        id: 'w-hand',
        word: 'hand',
        unitId: 'unit-1-blends',
        targetPhoneme: 'nd',
        segments: [
          { letters: 'h', type: 'single', spokenSound: 'h' },
          { letters: 'a', type: 'single', spokenSound: 'a' },
          { letters: 'nd', type: 'digraph', spokenSound: 'nd' }
        ],
        definition: 'Part of your arm with five fingers.',
        simpleMeaningEsl: 'You wave hello and hold pencils with your hand.',
        category: 'school',
        imageEmoji: '✋',
        exampleSentence: 'Raise your hand when you know the answer.'
      },
      {
        id: 'w-jump',
        word: 'jump',
        unitId: 'unit-1-blends',
        targetPhoneme: 'mp',
        segments: [
          { letters: 'j', type: 'single', spokenSound: 'j' },
          { letters: 'u', type: 'single', spokenSound: 'u' },
          { letters: 'mp', type: 'digraph', spokenSound: 'mp' }
        ],
        definition: 'To push your body up into the air with your feet.',
        simpleMeaningEsl: 'Bounce high up in the air off your feet.',
        category: 'actions',
        imageEmoji: '🦘',
        exampleSentence: 'Can you jump as high as a kangaroo?'
      }
    ]
  },
  {
    id: 'unit-2-digraphs',
    title: 'Unit 2: Sound Teams (ch, sh, th, ng)',
    cambridgeObjective: 'Cambridge Stage 2: Consonant digraphs with distinct phonemes',
    description: 'Two letters that hold hands to make one brand new secret sound!',
    levelBadge: 'Stage 2.2',
    color: 'sky',
    badgeBg: 'bg-sky-100 text-sky-800 border-sky-300',
    targetSounds: ['ch', 'sh', 'th', 'ng'],
    words: [
      {
        id: 'w-ship',
        word: 'ship',
        unitId: 'unit-2-digraphs',
        targetPhoneme: 'sh',
        segments: [
          { letters: 'sh', type: 'digraph', spokenSound: 'shh' },
          { letters: 'i', type: 'single', spokenSound: 'i' },
          { letters: 'p', type: 'single', spokenSound: 'p' }
        ],
        definition: 'A large boat that sails across deep oceans.',
        simpleMeaningEsl: 'A very big boat floating on the water.',
        category: 'nature',
        imageEmoji: '🚢',
        exampleSentence: 'The big ship sailed across the blue sea.'
      },
      {
        id: 'w-chin',
        word: 'chin',
        unitId: 'unit-2-digraphs',
        targetPhoneme: 'ch',
        segments: [
          { letters: 'ch', type: 'digraph', spokenSound: 'ch' },
          { letters: 'i', type: 'single', spokenSound: 'i' },
          { letters: 'n', type: 'single', spokenSound: 'n' }
        ],
        definition: 'The bottom part of your face below your mouth.',
        simpleMeaningEsl: 'Touch the bottom part of your face under your mouth.',
        category: 'school',
        imageEmoji: '🧔',
        exampleSentence: 'He rested his chin on his hands.'
      },
      {
        id: 'w-fish',
        word: 'fish',
        unitId: 'unit-2-digraphs',
        targetPhoneme: 'sh',
        segments: [
          { letters: 'f', type: 'single', spokenSound: 'f' },
          { letters: 'i', type: 'single', spokenSound: 'i' },
          { letters: 'sh', type: 'digraph', spokenSound: 'shh' }
        ],
        definition: 'An animal that lives and swims in water.',
        simpleMeaningEsl: 'Swims in the river or sea with fins.',
        category: 'animals',
        imageEmoji: '🐟',
        exampleSentence: 'A little orange fish swims in the pond.'
      },
      {
        id: 'w-ring',
        word: 'ring',
        unitId: 'unit-2-digraphs',
        targetPhoneme: 'ng',
        segments: [
          { letters: 'r', type: 'single', spokenSound: 'r' },
          { letters: 'i', type: 'single', spokenSound: 'i' },
          { letters: 'ng', type: 'digraph', spokenSound: 'ng' }
        ],
        definition: 'A shiny circle of metal worn on a finger.',
        simpleMeaningEsl: 'Shiny jewellery circle worn on your finger.',
        category: 'home',
        imageEmoji: '💍',
        exampleSentence: 'The queen wore a sparkling gold ring.'
      },
      {
        id: 'w-thumb',
        word: 'thumb',
        unitId: 'unit-2-digraphs',
        targetPhoneme: 'th',
        segments: [
          { letters: 'th', type: 'digraph', spokenSound: 'th' },
          { letters: 'u', type: 'single', spokenSound: 'u' },
          { letters: 'mb', type: 'digraph', spokenSound: 'm' }
        ],
        definition: 'The short, thick first finger on your hand.',
        simpleMeaningEsl: 'Thumbs up when you are happy or doing great!',
        category: 'school',
        imageEmoji: '👍',
        exampleSentence: 'Give a big thumbs up to your friend!'
      },
      {
        id: 'w-chick',
        word: 'chick',
        unitId: 'unit-2-digraphs',
        targetPhoneme: 'ch',
        segments: [
          { letters: 'ch', type: 'digraph', spokenSound: 'ch' },
          { letters: 'i', type: 'single', spokenSound: 'i' },
          { letters: 'ck', type: 'digraph', spokenSound: 'k' }
        ],
        definition: 'A cute baby chicken with soft yellow feathers.',
        simpleMeaningEsl: 'A tiny baby chicken saying cheep-cheep.',
        category: 'animals',
        imageEmoji: '🐥',
        exampleSentence: 'The fluffy baby chick ran to its mother.'
      }
    ]
  },
  {
    id: 'unit-3-vowels',
    title: 'Unit 3: Long Vowel Teams (ai, ay, ee, ea, oa)',
    cambridgeObjective: 'Cambridge Stage 2: Vowel digraphs producing long vowel phonemes',
    description: 'When two vowels go walking, the first one does the talking and says its name!',
    levelBadge: 'Stage 2.3',
    color: 'violet',
    badgeBg: 'bg-violet-100 text-violet-800 border-violet-300',
    targetSounds: ['ai', 'ay', 'ee', 'ea', 'oa', 'ow'],
    words: [
      {
        id: 'w-rain',
        word: 'rain',
        unitId: 'unit-3-vowels',
        targetPhoneme: 'ai',
        segments: [
          { letters: 'r', type: 'single', spokenSound: 'r' },
          { letters: 'ai', type: 'digraph', spokenSound: 'ay' },
          { letters: 'n', type: 'single', spokenSound: 'n' }
        ],
        definition: 'Drops of water falling from the clouds in the sky.',
        simpleMeaningEsl: 'Water drops falling from dark clouds. Use an umbrella!',
        category: 'nature',
        imageEmoji: '🌧️',
        exampleSentence: 'Put on your boots to splash in the rain.'
      },
      {
        id: 'w-play',
        word: 'play',
        unitId: 'unit-3-vowels',
        targetPhoneme: 'ay',
        segments: [
          { letters: 'pl', type: 'digraph', spokenSound: 'pl' },
          { letters: 'ay', type: 'digraph', spokenSound: 'ay' }
        ],
        definition: 'To do fun activities and games with friends.',
        simpleMeaningEsl: 'Have fun with toys, ball, and friends in the playground.',
        category: 'actions',
        imageEmoji: '⚽',
        exampleSentence: 'We like to play football in the park.'
      },
      {
        id: 'w-tree',
        word: 'tree',
        unitId: 'unit-3-vowels',
        targetPhoneme: 'ee',
        segments: [
          { letters: 'tr', type: 'digraph', spokenSound: 'tr' },
          { letters: 'ee', type: 'digraph', spokenSound: 'ee' }
        ],
        definition: 'A tall plant with a wooden trunk and green leaves.',
        simpleMeaningEsl: 'A tall wooden plant with green leaves and branches.',
        category: 'nature',
        imageEmoji: '🌳',
        exampleSentence: 'Birds build their nests in the tall green tree.'
      },
      {
        id: 'w-leaf',
        word: 'leaf',
        unitId: 'unit-3-vowels',
        targetPhoneme: 'ea',
        segments: [
          { letters: 'l', type: 'single', spokenSound: 'l' },
          { letters: 'ea', type: 'digraph', spokenSound: 'ee' },
          { letters: 'f', type: 'single', spokenSound: 'f' }
        ],
        definition: 'A flat green part that grows from the branch of a tree.',
        simpleMeaningEsl: 'The flat green part on plants and trees.',
        category: 'nature',
        imageEmoji: '🍃',
        exampleSentence: 'A tiny green leaf fell softly to the ground.'
      },
      {
        id: 'w-boat',
        word: 'boat',
        unitId: 'unit-3-vowels',
        targetPhoneme: 'oa',
        segments: [
          { letters: 'b', type: 'single', spokenSound: 'b' },
          { letters: 'oa', type: 'digraph', spokenSound: 'oh' },
          { letters: 't', type: 'single', spokenSound: 't' }
        ],
        definition: 'A small vehicle made for traveling on water.',
        simpleMeaningEsl: 'A small ship floating on a river or lake.',
        category: 'nature',
        imageEmoji: '⛵',
        exampleSentence: 'We rowed the wooden boat across the lake.'
      },
      {
        id: 'w-snail',
        word: 'snail',
        unitId: 'unit-3-vowels',
        targetPhoneme: 'ai',
        segments: [
          { letters: 'sn', type: 'digraph', spokenSound: 'sn' },
          { letters: 'ai', type: 'digraph', spokenSound: 'ay' },
          { letters: 'l', type: 'single', spokenSound: 'l' }
        ],
        definition: 'A slow small creature carrying a shell on its back.',
        simpleMeaningEsl: 'A very slow, tiny creature with a spiral shell.',
        category: 'animals',
        imageEmoji: '🐌',
        exampleSentence: 'The little snail crawls slowly along the garden path.'
      }
    ]
  },
  {
    id: 'unit-4-split',
    title: "Unit 4: Magic 'e' (Split Digraphs)",
    cambridgeObjective: 'Cambridge Stage 2: Split digraphs (vowel-consonant-e)',
    description: "Magic 'e' is silent at the end, but sends its magic power to make the vowel say its own name!",
    levelBadge: 'Stage 2.4',
    color: 'amber',
    badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
    targetSounds: ['a_e', 'i_e', 'o_e', 'u_e'],
    words: [
      {
        id: 'w-cake',
        word: 'cake',
        unitId: 'unit-4-split',
        targetPhoneme: 'a_e',
        isSplitDigraph: true,
        splitIndices: [1, 3],
        segments: [
          { letters: 'c', type: 'single', spokenSound: 'k' },
          { letters: 'a_e', type: 'split-digraph', spokenSound: 'ay' },
          { letters: 'k', type: 'single', spokenSound: 'k' }
        ],
        definition: 'A sweet, delicious baked dessert with frosting.',
        simpleMeaningEsl: 'Sweet birthday treat with candles on top.',
        category: 'food',
        imageEmoji: '🎂',
        exampleSentence: 'She blew out seven candles on her birthday cake.'
      },
      {
        id: 'w-bike',
        word: 'bike',
        unitId: 'unit-4-split',
        targetPhoneme: 'i_e',
        isSplitDigraph: true,
        splitIndices: [1, 3],
        segments: [
          { letters: 'b', type: 'single', spokenSound: 'b' },
          { letters: 'i_e', type: 'split-digraph', spokenSound: 'eye' },
          { letters: 'k', type: 'single', spokenSound: 'k' }
        ],
        definition: 'A two-wheeled vehicle you ride by pedaling.',
        simpleMeaningEsl: 'You pedal with your feet to ride this in the park.',
        category: 'actions',
        imageEmoji: '🚲',
        exampleSentence: 'Wear your helmet when riding your bike.'
      },
      {
        id: 'w-bone',
        word: 'bone',
        unitId: 'unit-4-split',
        targetPhoneme: 'o_e',
        isSplitDigraph: true,
        splitIndices: [1, 3],
        segments: [
          { letters: 'b', type: 'single', spokenSound: 'b' },
          { letters: 'o_e', type: 'split-digraph', spokenSound: 'oh' },
          { letters: 'n', type: 'single', spokenSound: 'n' }
        ],
        definition: 'Hard white parts that make up animal skeletons.',
        simpleMeaningEsl: 'A puppy loves to dig up and chew on a bone.',
        category: 'animals',
        imageEmoji: '🦴',
        exampleSentence: 'The playful dog hid his bone under the tree.'
      },
      {
        id: 'w-kite',
        word: 'kite',
        unitId: 'unit-4-split',
        targetPhoneme: 'i_e',
        isSplitDigraph: true,
        splitIndices: [1, 3],
        segments: [
          { letters: 'k', type: 'single', spokenSound: 'k' },
          { letters: 'i_e', type: 'split-digraph', spokenSound: 'eye' },
          { letters: 't', type: 'single', spokenSound: 't' }
        ],
        definition: 'A toy made of light fabric flown in the wind on a string.',
        simpleMeaningEsl: 'Floats high in the sky on a windy day with a long string.',
        category: 'nature',
        imageEmoji: '🪁',
        exampleSentence: 'The colorful kite danced in the windy breeze.'
      },
      {
        id: 'w-tube',
        word: 'tube',
        unitId: 'unit-4-split',
        targetPhoneme: 'u_e',
        isSplitDigraph: true,
        splitIndices: [1, 3],
        segments: [
          { letters: 't', type: 'single', spokenSound: 't' },
          { letters: 'u_e', type: 'split-digraph', spokenSound: 'yoo' },
          { letters: 'b', type: 'single', spokenSound: 'b' }
        ],
        definition: 'A hollow cylinder pipe or container.',
        simpleMeaningEsl: 'A round cylinder, like a tube of toothpaste.',
        category: 'home',
        imageEmoji: '🧪',
        exampleSentence: 'Squeeze a little toothpaste from the tube.'
      }
    ]
  },
  {
    id: 'unit-5-tricky',
    title: 'Unit 5: Cambridge Tricky Words',
    cambridgeObjective: 'Cambridge Stage 2: High-frequency irregular sight vocabulary',
    description: 'Words with secret spellings you cannot decode with standard sound rules.',
    levelBadge: 'Stage 2.5',
    color: 'rose',
    badgeBg: 'bg-rose-100 text-rose-800 border-rose-300',
    targetSounds: ['said', 'they', 'come', 'where', 'because'],
    words: [
      {
        id: 'w-said',
        word: 'said',
        unitId: 'unit-5-tricky',
        targetPhoneme: 'said',
        segments: [
          { letters: 's', type: 'single', spokenSound: 's' },
          { letters: 'ai', type: 'digraph', spokenSound: 'eh' }, // tricky part!
          { letters: 'd', type: 'single', spokenSound: 'd' }
        ],
        definition: 'Spoke words out loud in the past.',
        simpleMeaningEsl: "The past of 'say'. Example: Teacher said 'Good job!'",
        category: 'school',
        imageEmoji: '💬',
        exampleSentence: '"Let us read together," said the teacher.'
      },
      {
        id: 'w-they',
        word: 'they',
        unitId: 'unit-5-tricky',
        targetPhoneme: 'they',
        segments: [
          { letters: 'th', type: 'digraph', spokenSound: 'th' },
          { letters: 'ey', type: 'digraph', spokenSound: 'ay' }
        ],
        definition: 'Used to talk about two or more people or things.',
        simpleMeaningEsl: 'A group of friends or people over there.',
        category: 'school',
        imageEmoji: '👫',
        exampleSentence: 'They love to read Cambridge stories together.'
      },
      {
        id: 'w-come',
        word: 'come',
        unitId: 'unit-5-tricky',
        targetPhoneme: 'come',
        segments: [
          { letters: 'c', type: 'single', spokenSound: 'k' },
          { letters: 'o', type: 'single', spokenSound: 'u' },
          { letters: 'm', type: 'single', spokenSound: 'm' },
          { letters: 'e', type: 'single', spokenSound: '' }
        ],
        definition: 'To move toward or arrive at a place.',
        simpleMeaningEsl: 'Walk or travel towards where you are.',
        category: 'actions',
        imageEmoji: '👋',
        exampleSentence: 'Come sit with me and read a story.'
      },
      {
        id: 'w-where',
        word: 'where',
        unitId: 'unit-5-tricky',
        targetPhoneme: 'where',
        segments: [
          { letters: 'wh', type: 'digraph', spokenSound: 'w' },
          { letters: 'ere', type: 'trigraph', spokenSound: 'air' }
        ],
        definition: 'A question word used to ask about a place or location.',
        simpleMeaningEsl: 'Ask this when looking for something lost: Where is it?',
        category: 'school',
        imageEmoji: '🗺️',
        exampleSentence: 'Where is my favorite storybook?'
      }
    ]
  }
];

export const MAGIC_E_PAIRS: MagicEPair[] = [
  {
    id: 'magic-cap-cape',
    shortWord: 'cap',
    shortSegments: [
      { letters: 'c', type: 'single', spokenSound: 'k' },
      { letters: 'a', type: 'single', spokenSound: 'a' },
      { letters: 'p', type: 'single', spokenSound: 'p' }
    ],
    shortEmoji: '🧢',
    shortMeaning: 'A baseball hat worn on your head.',
    longWord: 'cape',
    longSegments: [
      { letters: 'c', type: 'single', spokenSound: 'k' },
      { letters: 'a_e', type: 'split-digraph', spokenSound: 'ay' },
      { letters: 'p', type: 'single', spokenSound: 'p' }
    ],
    longEmoji: '🦸',
    longMeaning: 'A superhero cloak that flutters in the breeze!',
    ruleExplanation: "The magic 'e' lands at the end, stays silent, and makes the short 'a' (/æ/) become a long 'a' (/eɪ/)!"
  },
  {
    id: 'magic-pin-pine',
    shortWord: 'pin',
    shortSegments: [
      { letters: 'p', type: 'single', spokenSound: 'p' },
      { letters: 'i', type: 'single', spokenSound: 'i' },
      { letters: 'n', type: 'single', spokenSound: 'n' }
    ],
    shortEmoji: '📍',
    shortMeaning: 'A tiny metal needle used to pin papers.',
    longWord: 'pine',
    longSegments: [
      { letters: 'p', type: 'single', spokenSound: 'p' },
      { letters: 'i_e', type: 'split-digraph', spokenSound: 'eye' },
      { letters: 'n', type: 'single', spokenSound: 'n' }
    ],
    longEmoji: '🌲',
    longMeaning: 'A tall green pine tree that smells like the forest.',
    ruleExplanation: "Magic 'e' changes the short 'i' (/ɪ/) sound to say its own name 'I' (/aɪ/)!"
  },
  {
    id: 'magic-rob-robe',
    shortWord: 'rob',
    shortSegments: [
      { letters: 'r', type: 'single', spokenSound: 'r' },
      { letters: 'o', type: 'single', spokenSound: 'o' },
      { letters: 'b', type: 'single', spokenSound: 'b' }
    ],
    shortEmoji: '🥷',
    shortMeaning: 'To take something that is not yours.',
    longWord: 'robe',
    longSegments: [
      { letters: 'r', type: 'single', spokenSound: 'r' },
      { letters: 'o_e', type: 'split-digraph', spokenSound: 'oh' },
      { letters: 'b', type: 'single', spokenSound: 'b' }
    ],
    longEmoji: '🥋',
    longMeaning: 'A cosy, soft dressing gown worn over pyjamas.',
    ruleExplanation: "Magic 'e' transforms short 'o' (/ɒ/) into long 'o' (/əʊ/)!"
  },
  {
    id: 'magic-tap-tape',
    shortWord: 'tap',
    shortSegments: [
      { letters: 't', type: 'single', spokenSound: 't' },
      { letters: 'a', type: 'single', spokenSound: 'a' },
      { letters: 'p', type: 'single', spokenSound: 'p' }
    ],
    shortEmoji: '🚰',
    shortMeaning: 'A water tap in the kitchen or bathroom.',
    longWord: 'tape',
    longSegments: [
      { letters: 't', type: 'single', spokenSound: 't' },
      { letters: 'a_e', type: 'split-digraph', spokenSound: 'ay' },
      { letters: 'p', type: 'single', spokenSound: 'p' }
    ],
    longEmoji: '🩹',
    longMeaning: 'Sticky strip to fix paper or stick crafts together.',
    ruleExplanation: "Magic 'e' hops across 'p' to make 'a' say /eɪ/!"
  },
  {
    id: 'magic-hop-hope',
    shortWord: 'hop',
    shortSegments: [
      { letters: 'h', type: 'single', spokenSound: 'h' },
      { letters: 'o', type: 'single', spokenSound: 'o' },
      { letters: 'p', type: 'single', spokenSound: 'p' }
    ],
    shortEmoji: '🐇',
    shortMeaning: 'A little jump on one or two feet, like a bunny.',
    longWord: 'hope',
    longSegments: [
      { letters: 'h', type: 'single', spokenSound: 'h' },
      { letters: 'o_e', type: 'split-digraph', spokenSound: 'oh' },
      { letters: 'p', type: 'single', spokenSound: 'p' }
    ],
    longEmoji: '🌟',
    longMeaning: 'A big wish in your heart that something good happens.',
    ruleExplanation: "Short 'hop' becomes long 'hope' with silent magic 'e'!"
  },
  {
    id: 'magic-cub-cube',
    shortWord: 'cub',
    shortSegments: [
      { letters: 'c', type: 'single', spokenSound: 'k' },
      { letters: 'u', type: 'single', spokenSound: 'u' },
      { letters: 'b', type: 'single', spokenSound: 'b' }
    ],
    shortEmoji: '🐻',
    shortMeaning: 'A sweet baby bear or baby lion cub.',
    longWord: 'cube',
    longSegments: [
      { letters: 'c', type: 'single', spokenSound: 'k' },
      { letters: 'u_e', type: 'split-digraph', spokenSound: 'yoo' },
      { letters: 'b', type: 'single', spokenSound: 'b' }
    ],
    longEmoji: '🧊',
    longMeaning: 'A 3D square box shape, like an ice cube or dice.',
    ruleExplanation: "Short 'u' (/ʌ/) becomes long 'cube' (/juːb/)!"
  }
];

export const STICKER_COLLECTION: StickerReward[] = [
  {
    id: 'st-lion',
    name: 'Leo the Phonics Lion',
    emoji: '🦁',
    description: 'Mastered your first 3 Cambridge phonics words!',
    requiredStars: 3,
    unlocked: true
  },
  {
    id: 'st-parrot',
    name: 'Pip the Cambridge Parrot',
    emoji: '🦜',
    description: 'Read a full decodable story aloud.',
    requiredStars: 8,
    unlocked: false
  },
  {
    id: 'st-wand',
    name: 'Sparkle Magic Wand',
    emoji: '🪄',
    description: 'Transformed words in the Magic e lab.',
    requiredStars: 15,
    unlocked: false
  },
  {
    id: 'st-giraffe',
    name: 'Gemma the Tall Reader',
    emoji: '🦒',
    description: 'Popped 10 phonics bubbles correctly.',
    requiredStars: 22,
    unlocked: false
  },
  {
    id: 'st-owl',
    name: 'Professor Hoot',
    emoji: '🦉',
    description: 'Mastered 5 tricky Cambridge words.',
    requiredStars: 30,
    unlocked: false
  },
  {
    id: 'st-trophy',
    name: 'Primary 2 Cambridge Trophy',
    emoji: '🏆',
    description: 'Completed reading safari all across Stage 2!',
    requiredStars: 45,
    unlocked: false
  }
];
