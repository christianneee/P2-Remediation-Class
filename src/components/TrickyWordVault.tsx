import React, { useState } from 'react';
import { Volume2, Sparkles, AlertCircle, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { speakWord, soundEffects } from '../utils/audio';

interface TrickyWordVaultProps {
  speechRate: number;
  onRewardStar: () => void;
}

interface TrickyWordItem {
  id: string;
  word: string;
  regularLetters: string;
  trickyPart: string;
  trickyExplanation: string;
  exampleSentence: string;
  emoji: string;
  distractors: string[];
}

const TRICKY_WORDS: TrickyWordItem[] = [
  {
    id: 'tw-said',
    word: 'said',
    regularLetters: 's - - d',
    trickyPart: 'ai',
    trickyExplanation: 'The letters "ai" do not say /eɪ/. They make a short /e/ sound like in "bed"!',
    exampleSentence: '"Come and read," said Mum.',
    emoji: '💬',
    distractors: ['sed', 'sayed', 'seid']
  },
  {
    id: 'tw-they',
    word: 'they',
    regularLetters: 'th - -',
    trickyPart: 'ey',
    trickyExplanation: 'The letters "ey" make the long /eɪ/ sound, like in "day"!',
    exampleSentence: 'They are playing football in the garden.',
    emoji: '👫',
    distractors: ['thay', 'thei', 'thayy']
  },
  {
    id: 'tw-come',
    word: 'come',
    regularLetters: 'c - m e',
    trickyPart: 'o',
    trickyExplanation: 'The letter "o" makes a short /ʌ/ "uh" sound like in "cup"!',
    exampleSentence: 'Please come to my birthday party.',
    emoji: '👋',
    distractors: ['cum', 'kome', 'coom']
  },
  {
    id: 'tw-where',
    word: 'where',
    regularLetters: 'wh - - -',
    trickyPart: 'ere',
    trickyExplanation: 'The "ere" letters sound like /eə/ "air" (like hair or bear)!',
    exampleSentence: 'Where did you put your school bag?',
    emoji: '🗺️',
    distractors: ['ware', 'were', 'wair']
  },
  {
    id: 'tw-because',
    word: 'because',
    regularLetters: 'b e - - - - e',
    trickyPart: 'cau',
    trickyExplanation: 'Big Elephants Can Always Understand Small Elephants! The "au" sounds like /ɒ/ or /ɔː/.',
    exampleSentence: 'I wear a coat because it is raining.',
    emoji: '🐘',
    distractors: ['becos', 'becaws', 'bekoze']
  }
];

export const TrickyWordVault: React.FC<TrickyWordVaultProps> = ({
  speechRate,
  onRewardStar,
}) => {
  const [selectedWordIdx, setSelectedWordIdx] = useState(0);
  const [isCovered, setIsCovered] = useState(false);
  const [quizChoice, setQuizChoice] = useState<string | null>(null);
  const [isMasteredWord, setIsMasteredWord] = useState<Record<string, boolean>>({});

  const currentWord = TRICKY_WORDS[selectedWordIdx];

  const handleSpeakWord = () => {
    soundEffects.playPop();
    speakWord(currentWord.word, speechRate);
  };

  const handleSpeakTip = () => {
    soundEffects.playPop();
    speakWord(currentWord.trickyExplanation, speechRate);
  };

  const handleQuizSelection = (choice: string) => {
    setQuizChoice(choice);
    if (choice === currentWord.word) {
      soundEffects.playDing();
      speakWord(`Spot on! "${currentWord.word}" is spelled correctly!`, speechRate);
      setIsMasteredWord((prev) => ({ ...prev, [currentWord.id]: true }));
      onRewardStar();
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.6 },
      });
    } else {
      soundEffects.playTryAgain();
      speakWord(`Not quite! Remember: ${currentWord.trickyExplanation}`, speechRate);
    }
  };

  // Build 3 spelling choices
  const spellingOptions = [currentWord.word, ...currentWord.distractors.slice(0, 2)].sort();

  return (
    <div className="bg-gradient-to-br from-rose-50 via-white to-amber-50 rounded-3xl p-6 md:p-8 border-2 border-rose-200 shadow-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-rose-100 text-rose-700 rounded-xl text-xl">
              🗝️
            </span>
            <h2 className="text-xl md:text-2xl font-bold font-['Fredoka',sans-serif] text-slate-800">
              Cambridge Tricky Word Vault
            </h2>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Learn words that don&apos;t follow normal sound rules. Uncover their secret tricky parts!
          </p>
        </div>

        {/* Word Tabs */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-white rounded-xl border border-rose-200">
          {TRICKY_WORDS.map((tw, idx) => (
            <button
              key={tw.id}
              type="button"
              onClick={() => {
                soundEffects.playPop();
                setSelectedWordIdx(idx);
                setIsCovered(false);
                setQuizChoice(null);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                selectedWordIdx === idx
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'text-rose-900 hover:bg-rose-50'
              }`}
            >
              <span>{tw.word}</span>
              {isMasteredWord[tw.id] && <CheckCircle2 className="w-3 h-3 text-emerald-300" />}
            </button>
          ))}
        </div>
      </div>

      {/* Main Flashcard Stage */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-6">
        {/* Visual Flashcard */}
        <div className="bg-white rounded-3xl p-6 border-2 border-dashed border-rose-200 flex flex-col items-center justify-center text-center relative min-h-[260px] shadow-sm">
          <div className="text-6xl mb-3" role="img" aria-label={currentWord.word}>
            {currentWord.emoji}
          </div>

          {/* Word display or covered */}
          {!isCovered ? (
            <div className="text-5xl md:text-6xl font-bold font-['Fredoka',sans-serif] mb-2 tracking-wide text-slate-800">
              {currentWord.word}
            </div>
          ) : (
            <div className="text-5xl md:text-6xl font-bold font-['Fredoka',sans-serif] mb-2 tracking-wide text-slate-300 select-none">
              ? ? ? ?
            </div>
          )}

          <div className="flex items-center gap-2 mt-2">
            <button
              type="button"
              onClick={handleSpeakWord}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-100 hover:bg-rose-200 text-rose-900 rounded-xl text-xs font-semibold cursor-pointer"
            >
              <Volume2 className="w-4 h-4 text-rose-700" />
              <span>Listen Word</span>
            </button>

            <button
              type="button"
              onClick={() => setIsCovered(!isCovered)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
            >
              {isCovered ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              <span>{isCovered ? 'Reveal Word' : 'Cover Word'}</span>
            </button>
          </div>

          <p className="text-xs text-slate-500 italic mt-3">
            &ldquo;{currentWord.exampleSentence}&rdquo;
          </p>
        </div>

        {/* Tricky Part Detective Box */}
        <div className="space-y-4">
          <div className="bg-rose-100/70 rounded-2xl p-4 border border-rose-200">
            <div className="flex items-center gap-2 text-rose-900 font-bold text-xs uppercase tracking-wider mb-2">
              <AlertCircle className="w-4 h-4 text-rose-600" />
              <span>Watch Out! Tricky Part: &ldquo;{currentWord.trickyPart}&rdquo;</span>
            </div>
            <p className="text-xs text-rose-950 leading-relaxed font-medium">
              {currentWord.trickyExplanation}
            </p>
            <div className="mt-2">
              <button
                type="button"
                onClick={handleSpeakTip}
                className="text-[11px] font-semibold text-rose-700 underline cursor-pointer hover:text-rose-800"
              >
                🔊 Hear teacher explain why it is tricky
              </button>
            </div>
          </div>

          {/* Quick Spelling Memory Check */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200">
            <div className="text-xs font-bold text-slate-700 mb-2">
              Spot the correct Cambridge spelling:
            </div>

            <div className="grid grid-cols-3 gap-2">
              {spellingOptions.map((opt) => {
                const isSelected = quizChoice === opt;
                const isRight = opt === currentWord.word;

                let btnClass = 'bg-slate-50 border border-slate-200 text-slate-800 hover:bg-rose-50';
                if (quizChoice) {
                  if (isRight) {
                    btnClass = 'bg-emerald-100 border-emerald-400 text-emerald-900 font-bold';
                  } else if (isSelected) {
                    btnClass = 'bg-rose-100 border-rose-400 text-rose-900';
                  }
                }

                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleQuizSelection(opt)}
                    className={`py-2 px-3 rounded-xl text-center text-sm font-['Fredoka',sans-serif] font-bold transition-all cursor-pointer ${btnClass}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
