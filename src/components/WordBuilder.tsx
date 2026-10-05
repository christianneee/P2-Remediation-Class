import React, { useState } from 'react';
import { Sparkles, Volume2, CheckCircle2, RotateCcw, Puzzle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { speakWord, soundEffects } from '../utils/audio';

interface WordBuilderProps {
  speechRate: number;
  onRewardStar: () => void;
}

interface TargetCombination {
  onset: string;
  rime: string;
  word: string;
  emoji: string;
  meaning: string;
  category: string;
}

const COMBINATIONS: TargetCombination[] = [
  { onset: 'st', rime: 'ar', word: 'star', emoji: '⭐', meaning: 'Bright light shining high up in the night sky.', category: 'nature' },
  { onset: 'sh', rime: 'ip', word: 'ship', emoji: '🚢', meaning: 'A very large boat that sails across the ocean.', category: 'vehicles' },
  { onset: 'ch', rime: 'in', word: 'chin', emoji: '🧔', meaning: 'The bottom part of your face below your mouth.', category: 'body' },
  { onset: 'tr', rime: 'ain', word: 'train', emoji: '🚆', meaning: 'Long vehicle traveling on railway tracks.', category: 'vehicles' },
  { onset: 'b', rime: 'oat', word: 'boat', emoji: '⛵', meaning: 'A small water vessel rowed across lakes.', category: 'nature' },
  { onset: 'c', rime: 'ake', word: 'cake', emoji: '🎂', meaning: 'Sweet dessert baked with frosting and candles.', category: 'food' },
  { onset: 'cl', rime: 'oud', word: 'cloud', emoji: '☁️', meaning: 'Fluffy white shape floating in the blue sky.', category: 'nature' },
  { onset: 'r', rime: 'ain', word: 'rain', emoji: '🌧️', meaning: 'Water drops falling down from grey clouds.', category: 'weather' },
];

const ONSETS = ['st', 'sh', 'ch', 'tr', 'b', 'c', 'cl', 'r'];
const RIMES = ['ar', 'ip', 'in', 'ain', 'oat', 'ake', 'oud'];

export const WordBuilder: React.FC<WordBuilderProps> = ({
  speechRate,
  onRewardStar,
}) => {
  const [selectedOnset, setSelectedOnset] = useState<string>('st');
  const [selectedRime, setSelectedRime] = useState<string>('ar');
  const [discoveredWords, setDiscoveredWords] = useState<string[]>([]);

  const combinedWord = (selectedOnset + selectedRime).toLowerCase();
  const matched = COMBINATIONS.find((c) => c.word === combinedWord);

  const handleSelectOnset = (o: string) => {
    setSelectedOnset(o);
    soundEffects.playPop();
    speakWord(o, speechRate * 0.9);
  };

  const handleSelectRime = (r: string) => {
    setSelectedRime(r);
    soundEffects.playPop();
    speakWord(r, speechRate * 0.9);
  };

  const handleCheckWord = () => {
    if (matched) {
      soundEffects.playDing();
      speakWord(matched.word, speechRate);

      if (!discoveredWords.includes(matched.word)) {
        setDiscoveredWords((prev) => [...prev, matched.word]);
        onRewardStar();
        confetti({
          particleCount: 30,
          spread: 50,
          origin: { y: 0.6 },
        });
      }
    } else {
      soundEffects.playTryAgain();
      speakWord(`${combinedWord}... That is a silly word! Try another sound combination.`, speechRate);
    }
  };

  return (
    <div className="bg-gradient-to-br from-amber-50 via-white to-emerald-50 rounded-3xl p-6 md:p-8 border-2 border-emerald-200 shadow-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
              <Puzzle className="w-5 h-5" />
            </span>
            <h2 className="text-xl md:text-2xl font-bold font-['Fredoka',sans-serif] text-slate-800">
              Word Builder: Onset &amp; Rime
            </h2>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Pick a start sound (onset) and an end sound (rime) to build real Cambridge words!
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 text-xs font-semibold text-emerald-800">
          <span>Words found:</span>
          <strong className="text-sm text-emerald-700 font-bold">
            {discoveredWords.length} / {COMBINATIONS.length}
          </strong>
        </div>
      </div>

      {/* Assembly Workstation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-8">
        {/* Visual Assembly Box */}
        <div className="bg-white rounded-3xl p-6 border-2 border-dashed border-emerald-300 flex flex-col items-center justify-center min-h-[260px] text-center relative overflow-hidden">
          {matched ? (
            <>
              <div className="text-7xl mb-3 animate-bounce" role="img" aria-label={matched.word}>
                {matched.emoji}
              </div>
              <div className="flex items-center gap-1 text-5xl font-bold font-['Fredoka',sans-serif] text-emerald-800 mb-2">
                <span className="text-indigo-600">{selectedOnset}</span>
                <span className="text-emerald-600">{selectedRime}</span>
              </div>
              <p className="text-xs font-semibold text-slate-700 max-w-xs mt-1">
                {matched.meaning}
              </p>
              <div className="mt-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => speakWord(matched.word, speechRate)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded-lg text-xs font-semibold cursor-pointer"
                >
                  <Volume2 className="w-4 h-4 text-emerald-700" />
                  <span>Pronounce Word</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="text-5xl text-slate-300 mb-3">❓</div>
              <div className="flex items-center gap-1 text-4xl font-bold font-['Fredoka',sans-serif] text-slate-400 mb-2">
                <span className="text-indigo-400">{selectedOnset}</span>
                <span className="text-emerald-400">{selectedRime}</span>
              </div>
              <p className="text-xs text-slate-500 italic max-w-xs">
                &ldquo;{combinedWord}&rdquo; is not a common English word. Try combining other sound blocks!
              </p>
            </>
          )}

          <div className="mt-4 w-full">
            <button
              type="button"
              onClick={handleCheckWord}
              className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold rounded-xl shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>Check Word: {combinedWord.toUpperCase()}</span>
            </button>
          </div>
        </div>

        {/* Selection Columns */}
        <div className="space-y-4">
          {/* Start Sound (Onset) */}
          <div className="bg-indigo-50/60 rounded-2xl p-4 border border-indigo-100">
            <div className="flex items-center justify-between text-xs font-bold text-indigo-900 mb-2">
              <span>1. Choose Start Sound (Onset)</span>
              <span className="text-[11px] text-indigo-600 font-normal">Selected: /{selectedOnset}/</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {ONSETS.map((o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => handleSelectOnset(o)}
                  className={`px-3.5 py-2 rounded-xl font-bold font-['Fredoka',sans-serif] text-base transition-all cursor-pointer ${
                    selectedOnset === o
                      ? 'bg-indigo-600 text-white shadow-md scale-105 ring-2 ring-indigo-300'
                      : 'bg-white text-indigo-900 border border-indigo-200 hover:bg-indigo-100'
                  }`}
                >
                  {o}
                </button>
              ))}
            </div>
          </div>

          {/* End Sound (Rime) */}
          <div className="bg-emerald-50/60 rounded-2xl p-4 border border-emerald-100">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-900 mb-2">
              <span>2. Choose End Sound (Rime)</span>
              <span className="text-[11px] text-emerald-600 font-normal">Selected: -{selectedRime}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {RIMES.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => handleSelectRime(r)}
                  className={`px-3.5 py-2 rounded-xl font-bold font-['Fredoka',sans-serif] text-base transition-all cursor-pointer ${
                    selectedRime === r
                      ? 'bg-emerald-600 text-white shadow-md scale-105 ring-2 ring-emerald-300'
                      : 'bg-white text-emerald-900 border border-emerald-200 hover:bg-emerald-100'
                  }`}
                >
                  -{r}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Discovered Words Shelf */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Your Word Collection
          </span>
          <span className="text-xs text-slate-500">
            Tap any discovered word to hear it again
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {COMBINATIONS.map((c) => {
            const isFound = discoveredWords.includes(c.word);
            return (
              <button
                key={c.word}
                type="button"
                onClick={() => {
                  if (isFound) {
                    soundEffects.playPop();
                    speakWord(c.word, speechRate);
                  }
                }}
                disabled={!isFound}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isFound
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 cursor-pointer hover:bg-emerald-200'
                    : 'bg-slate-100 text-slate-400 border border-slate-200 opacity-60 cursor-not-allowed'
                }`}
              >
                <span>{isFound ? c.emoji : '🔒'}</span>
                <span>{isFound ? c.word : '???'}</span>
                {isFound && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
