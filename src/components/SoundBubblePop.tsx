import React, { useState, useEffect } from 'react';
import { Volume2, Award, Sparkles, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { speakWord, soundEffects } from '../utils/audio';

interface BubbleItem {
  id: string;
  word: string;
  phoneme: string;
  emoji: string;
  isTarget: boolean;
  popped: boolean;
  colorClass: string;
}

interface SoundBubblePopProps {
  speechRate: number;
  onRewardStar: () => void;
}

const BUBBLE_ROUNDS = [
  {
    targetSound: 'sh',
    soundDescription: 'The quiet /sh/ sound (like in "ship" and "fish")',
    items: [
      { id: 'b1', word: 'ship', phoneme: 'sh', emoji: '🚢', isTarget: true, colorClass: 'from-sky-400 to-blue-500' },
      { id: 'b2', word: 'chip', phoneme: 'ch', emoji: '🍟', isTarget: false, colorClass: 'from-amber-400 to-orange-500' },
      { id: 'b3', word: 'fish', phoneme: 'sh', emoji: '🐟', isTarget: true, colorClass: 'from-teal-400 to-emerald-500' },
      { id: 'b4', word: 'ring', phoneme: 'ng', emoji: '💍', isTarget: false, colorClass: 'from-purple-400 to-indigo-500' },
      { id: 'b5', word: 'shop', phoneme: 'sh', emoji: '🏪', isTarget: true, colorClass: 'from-pink-400 to-rose-500' },
    ]
  },
  {
    targetSound: 'ai',
    soundDescription: 'The long /ai/ sound (like in "rain" and "snail")',
    items: [
      { id: 'b6', word: 'rain', phoneme: 'ai', emoji: '🌧️', isTarget: true, colorClass: 'from-blue-400 to-indigo-500' },
      { id: 'b7', word: 'tree', phoneme: 'ee', emoji: '🌳', isTarget: false, colorClass: 'from-emerald-400 to-green-600' },
      { id: 'b8', word: 'train', phoneme: 'ai', emoji: '🚆', isTarget: true, colorClass: 'from-cyan-400 to-blue-600' },
      { id: 'b9', word: 'boat', phoneme: 'oa', emoji: '⛵', isTarget: false, colorClass: 'from-amber-400 to-amber-600' },
      { id: 'b10', word: 'snail', phoneme: 'ai', emoji: '🐌', isTarget: true, colorClass: 'from-violet-400 to-purple-600' },
    ]
  },
  {
    targetSound: 'a_e',
    soundDescription: 'The Magic "e" /a_e/ sound (like in "cake")',
    items: [
      { id: 'b11', word: 'cake', phoneme: 'a_e', emoji: '🎂', isTarget: true, colorClass: 'from-pink-400 to-rose-500' },
      { id: 'b12', word: 'cat', phoneme: 'a', emoji: '🐱', isTarget: false, colorClass: 'from-slate-400 to-slate-600' },
      { id: 'b13', word: 'lake', phoneme: 'a_e', emoji: '🏞️', isTarget: true, colorClass: 'from-sky-400 to-blue-500' },
      { id: 'b14', word: 'bike', phoneme: 'i_e', emoji: '🚲', isTarget: false, colorClass: 'from-amber-400 to-orange-500' },
      { id: 'b15', word: 'wave', phoneme: 'a_e', emoji: '🌊', isTarget: true, colorClass: 'from-teal-400 to-cyan-600' },
    ]
  }
];

export const SoundBubblePop: React.FC<SoundBubblePopProps> = ({
  speechRate,
  onRewardStar,
}) => {
  const [currentRoundIdx, setCurrentRoundIdx] = useState(0);
  const [bubbles, setBubbles] = useState<BubbleItem[]>([]);
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'retry' | 'neutral' }>({
    message: '',
    type: 'neutral'
  });
  const [roundCompleted, setRoundCompleted] = useState(false);

  const round = BUBBLE_ROUNDS[currentRoundIdx];

  // Initialize round bubbles
  useEffect(() => {
    const freshBubbles: BubbleItem[] = round.items.map((it) => ({
      ...it,
      popped: false,
    }));
    setBubbles(freshBubbles);
    setRoundCompleted(false);
    setFeedback({
      message: `Find and pop the bubbles with the sound: /${round.targetSound}/!`,
      type: 'neutral'
    });

    // Speak prompt
    speakWord(`Find the sound /${round.targetSound}/`, speechRate);
  }, [currentRoundIdx]);

  const handlePop = (bubble: BubbleItem) => {
    if (bubble.popped) return;

    if (bubble.isTarget) {
      soundEffects.playPop();
      soundEffects.playDing();
      speakWord(bubble.word, speechRate);

      setBubbles((prev) =>
        prev.map((b) => (b.id === bubble.id ? { ...b, popped: true } : b))
      );

      setFeedback({
        message: `Super! "${bubble.word}" has the /${round.targetSound}/ sound!`,
        type: 'success'
      });
      onRewardStar();

      // Check if all targets are popped
      const remainingTargets = bubbles.filter(
        (b) => b.isTarget && b.id !== bubble.id && !b.popped
      );

      if (remainingTargets.length === 0) {
        setRoundCompleted(true);
        soundEffects.playLevelComplete();
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.6 },
        });
        setFeedback({
          message: `Hooray! You popped all /${round.targetSound}/ bubbles!`,
          type: 'success'
        });
      }
    } else {
      soundEffects.playTryAgain();
      setFeedback({
        message: `"${bubble.word}" has the /${bubble.phoneme}/ sound. Look for /${round.targetSound}/!`,
        type: 'retry'
      });
      speakWord(`That is ${bubble.word}. Let's find /${round.targetSound}/`, speechRate);
    }
  };

  const handleNextRound = () => {
    soundEffects.playPop();
    setCurrentRoundIdx((prev) => (prev + 1) % BUBBLE_ROUNDS.length);
  };

  return (
    <div className="bg-gradient-to-b from-sky-50 via-indigo-50/40 to-amber-50 rounded-3xl p-6 md:p-8 border-2 border-sky-200 shadow-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-sky-100 text-sky-700 rounded-xl text-xl">
              🫧
            </span>
            <h2 className="text-xl md:text-2xl font-bold font-['Fredoka',sans-serif] text-slate-800">
              Pop the Phonics Sound!
            </h2>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Target sound: <strong className="text-sky-700 text-sm">/{round.targetSound}/</strong> - {round.soundDescription}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => speakWord(`Listen for the sound /${round.targetSound}/`, speechRate)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer shadow-sm"
          >
            <Volume2 className="w-4 h-4 text-sky-600" />
            <span>Hear Sound</span>
          </button>

          <button
            type="button"
            onClick={handleNextRound}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-semibold cursor-pointer shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Next Sound</span>
          </button>
        </div>
      </div>

      {/* Mascot Message Banner */}
      <div
        className={`p-3.5 rounded-2xl mb-6 flex items-center gap-3 transition-colors ${
          feedback.type === 'success'
            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
            : feedback.type === 'retry'
            ? 'bg-amber-100 text-amber-900 border border-amber-300'
            : 'bg-white text-slate-700 border border-sky-200 shadow-sm'
        }`}
      >
        <span className="text-2xl">🦜</span>
        <div className="text-xs md:text-sm font-medium">
          {feedback.message}
        </div>
      </div>

      {/* Bubbles Ocean Pool */}
      <div className="min-h-[280px] bg-sky-100/50 rounded-3xl p-6 border-2 border-dashed border-sky-300 relative flex flex-wrap items-center justify-center gap-6 overflow-hidden">
        {bubbles.map((bubble) => {
          if (bubble.popped) {
            return (
              <div
                key={bubble.id}
                className="w-28 h-28 rounded-full border-2 border-dashed border-emerald-300 bg-emerald-50/60 flex flex-col items-center justify-center text-emerald-600 transition-all scale-95"
              >
                <span className="text-2xl">{bubble.emoji}</span>
                <span className="text-xs font-bold">{bubble.word}</span>
                <span className="text-[10px] font-semibold text-emerald-700">Popped! ✓</span>
              </div>
            );
          }

          return (
            <button
              key={bubble.id}
              type="button"
              onClick={() => handlePop(bubble)}
              className={`w-28 h-28 rounded-full bg-gradient-to-tr ${bubble.colorClass} text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-90 flex flex-col items-center justify-center cursor-pointer p-2 relative group animate-pulse`}
              style={{
                animationDuration: '3s'
              }}
            >
              {/* Highlight bubble glare */}
              <div className="absolute top-2 left-3 w-6 h-3 bg-white/40 rounded-full rotate-[-30deg]" />

              <span className="text-3xl mb-1 group-hover:scale-110 transition-transform">
                {bubble.emoji}
              </span>
              <span className="text-base font-bold font-['Fredoka',sans-serif] tracking-wide drop-shadow-sm">
                {bubble.word}
              </span>
              <span className="text-[10px] bg-black/20 px-2 py-0.5 rounded-full font-medium mt-0.5">
                tap to pop
              </span>
            </button>
          );
        })}
      </div>

      {/* Completion Banner */}
      {roundCompleted && (
        <div className="mt-6 p-4 bg-emerald-50 border-2 border-emerald-300 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-emerald-600" />
            <div>
              <p className="font-bold text-emerald-900 text-sm">
                Sound Completed! You earned a star! ⭐
              </p>
              <p className="text-xs text-emerald-700">
                You can move to the next Cambridge sound challenge.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleNextRound}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold cursor-pointer shadow-sm flex items-center gap-1.5"
          >
            <span>Play Next Sound</span>
            <Sparkles className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
