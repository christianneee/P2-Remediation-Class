export type PhonicsType = 'single' | 'digraph' | 'trigraph' | 'split-digraph';

export interface SoundSegment {
  letters: string;
  soundIpa?: string;
  type: PhonicsType;
  spokenSound: string; // phonetic prompt for speech
}

export interface PhonicsWord {
  id: string;
  word: string;
  unitId: string;
  targetPhoneme: string;
  segments: SoundSegment[];
  isSplitDigraph?: boolean;
  splitIndices?: [number, number]; // e.g. [1, 3] for c-a-k-e
  definition: string;
  simpleMeaningEsl: string; // easy explanation for non-native learners
  category: 'animals' | 'school' | 'nature' | 'food' | 'actions' | 'home';
  imageEmoji: string;
  imageUrl?: string;
  exampleSentence: string;
  rhymesWith?: string[];
}

export interface MagicEPair {
  id: string;
  shortWord: string;
  shortSegments: SoundSegment[];
  shortEmoji: string;
  shortMeaning: string;
  longWord: string;
  longSegments: SoundSegment[];
  longEmoji: string;
  longMeaning: string;
  ruleExplanation: string;
}

export interface CambridgeUnit {
  id: string;
  title: string;
  cambridgeObjective: string;
  description: string;
  levelBadge: string;
  color: string;
  badgeBg: string;
  targetSounds: string[];
  words: PhonicsWord[];
}

export interface DecodablePage {
  text: string;
  targetHighlights: string[]; // graphemes to highlight
  imageEmoji: string;
  caption: string;
}

export interface DecodableStory {
  id: string;
  title: string;
  subtitle: string;
  coverEmoji: string;
  targetSounds: string[];
  level: string;
  summary: string;
  pages: DecodablePage[];
  questions: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface StickerReward {
  id: string;
  name: string;
  emoji: string;
  description: string;
  requiredStars: number;
  unlocked: boolean;
}

export interface StudentProgress {
  stars: number;
  completedWordIds: string[];
  completedGameLevels: Record<string, number>;
  readStoryIds: string[];
  unlockedStickers: string[];
  audioSpeed: number; // 0.65 (slow) to 1.0 (normal)
  volumeOn: boolean;
}
