import React from 'react';
import { X, Award, Sparkles, Star, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { STICKER_COLLECTION } from '../data/cambridgeCurriculum';
import { soundEffects, speakWord } from '../utils/audio';

interface StickerPassportProps {
  isOpen: boolean;
  onClose: () => void;
  stars: number;
  speechRate: number;
}

export const StickerPassport: React.FC<StickerPassportProps> = ({
  isOpen,
  onClose,
  stars,
  speechRate,
}) => {
  if (!isOpen) return null;

  const handleStickerClick = (name: string, unlocked: boolean, desc: string) => {
    soundEffects.playPop();
    if (unlocked) {
      soundEffects.playStar();
      confetti({
        particleCount: 20,
        spread: 40,
        origin: { y: 0.6 },
      });
      speakWord(`${name}! ${desc}`, speechRate);
    } else {
      speakWord(`Earn more stars to unlock ${name}!`, speechRate);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-amber-50 via-white to-amber-100/50 rounded-3xl p-6 md:p-8 max-w-2xl w-full border-2 border-amber-300 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Passport Title */}
        <div className="flex items-center gap-3 mb-4">
          <span className="p-3 bg-amber-200 text-amber-900 rounded-2xl text-2xl">
            🛂
          </span>
          <div>
            <h3 className="text-xl md:text-2xl font-bold font-['Fredoka',sans-serif] text-slate-800">
              Primary 2 Reading Safari Passport
            </h3>
            <p className="text-xs text-slate-600">
              Collect stars by decoding words, popping bubbles, and reading stories!
            </p>
          </div>
        </div>

        {/* Current Balance */}
        <div className="bg-amber-100/80 border border-amber-300 rounded-2xl p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="w-6 h-6 fill-amber-400 text-amber-500 animate-spin" style={{ animationDuration: '8s' }} />
            <span className="text-base font-bold text-amber-950 font-['Fredoka',sans-serif]">
              {stars} Stars Collected
            </span>
          </div>
          <span className="text-xs font-semibold text-amber-800">
            Keep reading to unlock all safari animals!
          </span>
        </div>

        {/* Stickers Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          {STICKER_COLLECTION.map((sticker) => {
            const isUnlocked = stars >= sticker.requiredStars;

            return (
              <button
                key={sticker.id}
                type="button"
                onClick={() => handleStickerClick(sticker.name, isUnlocked, sticker.description)}
                className={`p-4 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-between relative min-h-[160px] ${
                  isUnlocked
                    ? 'bg-white border-amber-300 shadow-sm hover:scale-102 hover:shadow-md'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                {/* Stamp visual */}
                <div className="text-5xl my-2">
                  {isUnlocked ? sticker.emoji : '🔒'}
                </div>

                <div>
                  <div className="font-bold text-xs text-slate-800 font-['Fredoka',sans-serif]">
                    {sticker.name}
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1 leading-tight">
                    {sticker.description}
                  </p>
                </div>

                <div className="mt-2 text-[10px] font-bold">
                  {isUnlocked ? (
                    <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Unlocked ✨
                    </span>
                  ) : (
                    <span className="text-slate-500 flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      {sticker.requiredStars} Stars
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Close footer */}
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer"
          >
            Back to Safari
          </button>
        </div>
      </div>
    </div>
  );
};
