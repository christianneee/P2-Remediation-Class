import React, { useState } from 'react';
import { Sparkles, Wand2, ArrowRight, RotateCcw, Volume2, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MAGIC_E_PAIRS } from '../data/cambridgeCurriculum';
import { speakWord, soundEffects } from '../utils/audio';

interface MagicETransformerProps {
  speechRate: number;
  onRewardStar: () => void;
}

export const MagicETransformer: React.FC<MagicETransformerProps> = ({
  speechRate,
  onRewardStar,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransformed, setIsTransformed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentPair = MAGIC_E_PAIRS[currentIndex];

  const handleTransform = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    soundEffects.playMagicWand();

    setTimeout(() => {
      setIsTransformed(true);
      setIsAnimating(false);
      soundEffects.playDing();

      // Speak transformation clearly for Cambridge EAL learner
      speakWord(
        `${currentPair.shortWord}... Magic 'e'... ${currentPair.longWord}!`,
        speechRate,
        () => {
          onRewardStar();
        }
      );

      // Trigger celebratory mini confetti
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.7 },
        colors: ['#f59e0b', '#ec4899', '#8b5cf6', '#10b981'],
      });
    }, 450);
  };

  const handleReset = () => {
    setIsTransformed(false);
    soundEffects.playPop();
    speakWord(currentPair.shortWord, speechRate);
  };

  const handleNext = () => {
    setIsTransformed(false);
    const nextIdx = (currentIndex + 1) % MAGIC_E_PAIRS.length;
    setCurrentIndex(nextIdx);
    soundEffects.playPop();
  };

  const handlePrev = () => {
    setIsTransformed(false);
    const prevIdx = (currentIndex - 1 + MAGIC_E_PAIRS.length) % MAGIC_E_PAIRS.length;
    setCurrentIndex(prevIdx);
    soundEffects.playPop();
  };

  return (
    <div className="bg-gradient-to-br from-amber-50 via-white to-pink-50 rounded-3xl p-6 md:p-8 border-2 border-amber-200 shadow-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-pink-100 text-pink-700 rounded-xl">
              <Wand2 className="w-5 h-5" />
            </span>
            <h2 className="text-xl md:text-2xl font-bold font-['Fredoka',sans-serif] text-slate-800">
              Magic &lsquo;e&rsquo; Wand Lab
            </h2>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Watch how silent &lsquo;e&rsquo; gives its magic power to make the vowel say its long name!
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            Previous
          </button>
          <span className="text-xs font-semibold text-slate-500">
            {currentIndex + 1} / {MAGIC_E_PAIRS.length}
          </span>
          <button
            type="button"
            onClick={handleNext}
            className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Visual Card Display */}
        <div className="bg-white rounded-3xl p-6 border-2 border-dashed border-amber-200 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[300px]">
          {/* Magic glow effect */}
          {isTransformed && (
            <div className="absolute inset-0 bg-gradient-to-b from-amber-100/40 via-pink-100/30 to-purple-100/20 pointer-events-none" />
          )}

          {/* Morphing Emoji Visual */}
          <div className="relative mb-4">
            <div
              className={`text-7xl md:text-8xl transition-all duration-300 transform ${
                isAnimating
                  ? 'scale-75 rotate-12 opacity-50'
                  : isTransformed
                  ? 'scale-110'
                  : 'scale-100'
              }`}
              role="img"
              aria-label={isTransformed ? currentPair.longWord : currentPair.shortWord}
            >
              {isTransformed ? currentPair.longEmoji : currentPair.shortEmoji}
            </div>

            {isTransformed && (
              <span className="absolute -top-2 -right-2 text-2xl animate-bounce">
                ✨
              </span>
            )}
          </div>

          {/* Word Display with Magic 'e' connector bridge */}
          <div className="relative my-3 flex items-center justify-center">
            {/* Split Digraph Arc Bridge (Visual connection) */}
            {isTransformed && (
              <div className="absolute -top-6 left-6 right-2 h-6 border-t-2 border-dashed border-pink-500 rounded-t-full pointer-events-none flex items-center justify-center">
                <span className="bg-white px-1 text-[10px] font-bold text-pink-600 -translate-y-2">
                  Magic link!
                </span>
              </div>
            )}

            <div className="flex items-center text-4xl md:text-6xl font-bold font-['Fredoka',sans-serif] tracking-wider">
              {isTransformed ? (
                <>
                  <span className="text-slate-800">{currentPair.longWord.slice(0, 1)}</span>
                  <span className="text-pink-600 underline decoration-pink-300 decoration-wavy">
                    {currentPair.longWord.slice(1, 2)}
                  </span>
                  <span className="text-slate-800">{currentPair.longWord.slice(2, 3)}</span>
                  <span className="text-amber-500 bg-amber-100/80 px-1 rounded-md animate-pulse">
                    e
                  </span>
                </>
              ) : (
                <span className="text-slate-800">{currentPair.shortWord}</span>
              )}
            </div>
          </div>

          {/* Meaning Description for ESL kids */}
          <p className="text-sm font-semibold text-slate-800 mt-2">
            {isTransformed ? currentPair.longMeaning : currentPair.shortMeaning}
          </p>

          <div className="mt-4 flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                soundEffects.playPop();
                speakWord(
                  isTransformed ? currentPair.longWord : currentPair.shortWord,
                  speechRate
                );
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg cursor-pointer"
            >
              <Volume2 className="w-4 h-4 text-slate-600" />
              <span>Listen Sound</span>
            </button>
          </div>
        </div>

        {/* Transformer Controls & Explanation */}
        <div className="flex flex-col justify-between h-full space-y-4">
          <div className="bg-amber-100/60 rounded-2xl p-4 border border-amber-200">
            <div className="flex items-center gap-2 font-bold text-amber-900 text-sm mb-1">
              <Award className="w-4 h-4 text-amber-600" />
              <span>Cambridge Phonics Rule</span>
            </div>
            <p className="text-xs text-amber-800 leading-relaxed font-medium">
              {currentPair.ruleExplanation}
            </p>
          </div>

          {/* Step Comparison */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 space-y-3">
            <div className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Sound Transformation
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{currentPair.shortEmoji}</span>
                <div>
                  <div className="font-bold text-slate-900">{currentPair.shortWord}</div>
                  <div className="text-[11px] text-slate-500">Short vowel sound</div>
                </div>
              </div>

              <ArrowRight className="w-4 h-4 text-slate-400" />

              <div className="flex items-center gap-2">
                <span className="text-2xl">{currentPair.longEmoji}</span>
                <div>
                  <div className="font-bold text-pink-700">{currentPair.longWord}</div>
                  <div className="text-[11px] text-pink-600">Long vowel sound + silent e</div>
                </div>
              </div>
            </div>
          </div>

          {/* Big Interactive Wand Button */}
          <div className="space-y-2 pt-2">
            {!isTransformed ? (
              <button
                type="button"
                onClick={handleTransform}
                disabled={isAnimating}
                className="w-full py-4 px-6 bg-gradient-to-r from-pink-500 via-purple-500 to-amber-500 hover:from-pink-600 hover:to-amber-600 text-white font-bold text-base rounded-2xl shadow-lg hover:shadow-xl transition-all transform active:scale-98 flex items-center justify-center gap-3 cursor-pointer group"
              >
                <Wand2 className="w-6 h-6 animate-pulse group-hover:rotate-12 transition-transform" />
                <span>Tap Wand: Cast Magic &lsquo;e&rsquo;!</span>
                <Sparkles className="w-5 h-5" />
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Show Short &ldquo;{currentPair.shortWord}&rdquo;</span>
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="py-3 px-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Next Word Pair</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
