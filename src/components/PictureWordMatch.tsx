import React, { useState } from 'react';
import { Volume2, Sparkles, Check, HelpCircle, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CAMBRIDGE_UNITS } from '../data/cambridgeCurriculum';
import { speakWord, soundEffects } from '../utils/audio';

interface PictureWordMatchProps {
  speechRate: number;
  onRewardStar: () => void;
}

// Flatten words from Cambridge units for the quiz pool
const ALL_WORDS = CAMBRIDGE_UNITS.flatMap((u) => u.words);

export const PictureWordMatch: React.FC<PictureWordMatchProps> = ({
  speechRate,
  onRewardStar,
}) => {
  const [questionIdx, setQuestionIdx] = useState(0);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Generate question
  const currentTarget = ALL_WORDS[questionIdx % ALL_WORDS.length];

  // Distractors
  const distractors = ALL_WORDS
    .filter((w) => w.id !== currentTarget.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  // 4 choices shuffled deterministically for current target
  const choices = [currentTarget, ...distractors].sort((a, b) => a.word.localeCompare(b.word));

  const handleSelect = (wordObj: typeof currentTarget) => {
    if (isAnswered) return;
    setSelectedWord(wordObj.word);
    setIsAnswered(true);

    if (wordObj.word === currentTarget.word) {
      setIsCorrect(true);
      soundEffects.playDing();
      speakWord(`Yes! ${currentTarget.word}. ${currentTarget.simpleMeaningEsl}`, speechRate);
      onRewardStar();
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.65 },
      });
    } else {
      setIsCorrect(false);
      soundEffects.playTryAgain();
      speakWord(`That is ${wordObj.word}. Look closely at the picture!`, speechRate);
    }
  };

  const handleNext = () => {
    soundEffects.playPop();
    setIsAnswered(false);
    setSelectedWord(null);
    setIsCorrect(false);
    setQuestionIdx((prev) => prev + 1);
  };

  return (
    <div className="bg-gradient-to-br from-amber-50 via-orange-50/30 to-amber-100/50 rounded-3xl p-6 md:p-8 border-2 border-amber-300 shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-amber-200 text-amber-800 rounded-xl text-xl">
              🎯
            </span>
            <h2 className="text-xl md:text-2xl font-bold font-['Fredoka',sans-serif] text-slate-800">
              Picture &amp; Word Safari
            </h2>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Look at the picture and tap the matching Cambridge decodable word!
          </p>
        </div>

        <button
          type="button"
          onClick={() => speakWord(currentTarget.simpleMeaningEsl, speechRate)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-amber-300 rounded-xl text-xs font-semibold text-amber-900 hover:bg-amber-50 cursor-pointer shadow-sm"
        >
          <HelpCircle className="w-4 h-4 text-amber-600" />
          <span>Need a Hint?</span>
        </button>
      </div>

      {/* Main Picture Stage */}
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl border-2 border-amber-200 mb-6 shadow-sm">
        <div className="text-8xl md:text-9xl mb-3 drop-shadow-md animate-pulse" role="img" aria-label="Target visual">
          {currentTarget.imageEmoji}
        </div>
        <p className="text-xs md:text-sm font-medium text-slate-600 text-center max-w-sm">
          {currentTarget.simpleMeaningEsl}
        </p>
      </div>

      {/* 4 Word Choices */}
      <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6">
        {choices.map((choice) => {
          const isThisSelected = selectedWord === choice.word;
          const isThisTarget = choice.word === currentTarget.word;

          let btnStyle = 'bg-white border-2 border-slate-200 text-slate-800 hover:border-amber-400 hover:bg-amber-50/50';

          if (isAnswered) {
            if (isThisTarget) {
              btnStyle = 'bg-emerald-100 border-2 border-emerald-500 text-emerald-900 shadow-sm';
            } else if (isThisSelected) {
              btnStyle = 'bg-rose-100 border-2 border-rose-400 text-rose-900';
            } else {
              btnStyle = 'bg-slate-50 border-2 border-slate-200 text-slate-400 opacity-60';
            }
          }

          return (
            <button
              key={choice.id}
              type="button"
              onClick={() => handleSelect(choice)}
              disabled={isAnswered}
              className={`p-4 md:p-5 rounded-2xl font-bold font-['Fredoka',sans-serif] text-xl md:text-2xl transition-all transform active:scale-95 cursor-pointer flex flex-col items-center justify-center relative shadow-sm ${btnStyle}`}
            >
              <span>{choice.word}</span>
              <span className="text-[11px] font-normal text-slate-500 mt-1">
                Sound: /{choice.targetPhoneme}/
              </span>

              {isAnswered && isThisTarget && (
                <div className="absolute top-2 right-2 text-emerald-600 bg-white rounded-full p-1 shadow-sm">
                  <Check className="w-4 h-4" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Answer Feedback & Next Action */}
      {isAnswered && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-white rounded-2xl border border-amber-200 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{isCorrect ? '🌟' : '💡'}</span>
            <div className="text-xs md:text-sm">
              <strong className={isCorrect ? 'text-emerald-700' : 'text-amber-800'}>
                {isCorrect ? 'Brilliant reading! ' : 'Good try! '}
              </strong>
              <span className="text-slate-700">
                &ldquo;{currentTarget.word}&rdquo; means {currentTarget.definition}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => speakWord(currentTarget.word, speechRate)}
              className="p-2.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl cursor-pointer"
              title="Hear word"
            >
              <Volume2 className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>Next Picture</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
