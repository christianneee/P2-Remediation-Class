import React, { useState } from 'react';
import { Volume2, Sparkles, CheckCircle2 } from 'lucide-react';
import { PhonicsWord } from '../types/curriculum';
import { speakWord, soundEffects } from '../utils/audio';

interface SoundButtonWordProps {
  word: PhonicsWord;
  speechRate: number;
  onMastered?: () => void;
  isMastered?: boolean;
}

export const SoundButtonWord: React.FC<SoundButtonWordProps> = ({
  word,
  speechRate,
  onMastered,
  isMastered = false,
}) => {
  const [activeSegmentIndex, setActiveSegmentIndex] = useState<number | null>(null);
  const [isBlending, setIsBlending] = useState(false);

  // Play isolated phoneme sound
  const handleSoundButtonClick = (index: number) => {
    soundEffects.playPop();
    setActiveSegmentIndex(index);
    const seg = word.segments[index];
    speakWord(seg.spokenSound || seg.letters, Math.max(0.6, speechRate * 0.9), () => {
      // Keep highlight briefly
      setTimeout(() => setActiveSegmentIndex(null), 350);
    });
  };

  // Sequential Blend & Read
  const handleBlendWord = async () => {
    if (isBlending) return;
    setIsBlending(true);

    // Step through each sound button
    for (let i = 0; i < word.segments.length; i++) {
      setActiveSegmentIndex(i);
      soundEffects.playPop();
      const seg = word.segments[i];
      speakWord(seg.spokenSound || seg.letters, 0.75);
      await new Promise((res) => setTimeout(res, 550));
    }

    setActiveSegmentIndex(null);
    await new Promise((res) => setTimeout(res, 200));

    // Now speak the blended full word with fanfare
    speakWord(word.word, speechRate, () => {
      setIsBlending(false);
      soundEffects.playDing();
      if (onMastered && !isMastered) {
        onMastered();
      }
    });
  };

  return (
    <div className="bg-white rounded-3xl p-6 border-2 border-amber-200/80 shadow-sm transition-all hover:shadow-md">
      {/* Top Banner: Meaning & Category */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-3xl" role="img" aria-label={word.word}>
            {word.imageEmoji}
          </span>
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-amber-700 block">
              Phonics Sound: /{word.targetPhoneme}/
            </span>
            <p className="text-xs text-slate-500 font-medium">
              Category: {word.category}
            </p>
          </div>
        </div>

        {isMastered && (
          <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Mastered</span>
          </div>
        )}
      </div>

      {/* Main Phonics Display with Cambridge Sound Buttons */}
      <div className="flex flex-col items-center justify-center py-6 px-4 bg-amber-50/50 rounded-2xl border border-amber-100 mb-5">
        {/* Letters Row */}
        <div className="flex items-end justify-center gap-2 mb-3">
          {word.segments.map((seg, idx) => {
            const isActive = activeSegmentIndex === idx;
            return (
              <span
                key={idx}
                className={`text-4xl md:text-5xl font-bold font-['Fredoka',sans-serif] tracking-wide transition-all duration-200 transform ${
                  isActive
                    ? 'text-amber-600 scale-110 -translate-y-1'
                    : seg.type === 'digraph' || seg.type === 'trigraph'
                    ? 'text-indigo-600'
                    : seg.type === 'split-digraph'
                    ? 'text-pink-600'
                    : 'text-slate-800'
                }`}
              >
                {seg.letters}
              </span>
            );
          })}
        </div>

        {/* Cambridge Sound Buttons Row: Dots for single, Dash/Pills for digraphs */}
        <div className="flex items-center justify-center gap-3">
          {word.segments.map((seg, idx) => {
            const isActive = activeSegmentIndex === idx;
            const isDigraph = seg.type === 'digraph' || seg.type === 'trigraph';
            const isSplit = seg.type === 'split-digraph';

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSoundButtonClick(idx)}
                title={`Press to hear sound: ${seg.spokenSound || seg.letters}`}
                className={`transition-all duration-150 transform active:scale-95 flex items-center justify-center cursor-pointer shadow-sm ${
                  isDigraph
                    ? 'h-5 w-14 rounded-full'
                    : isSplit
                    ? 'h-5 w-16 rounded-full border-2 border-dashed border-pink-400'
                    : 'h-6 w-6 rounded-full'
                } ${
                  isActive
                    ? 'bg-amber-500 scale-125 ring-4 ring-amber-200'
                    : isDigraph
                    ? 'bg-indigo-400 hover:bg-indigo-500'
                    : isSplit
                    ? 'bg-pink-300 hover:bg-pink-400'
                    : 'bg-emerald-400 hover:bg-emerald-500'
                }`}
              >
                <span className="sr-only">Sound: {seg.letters}</span>
              </button>
            );
          })}
        </div>

        <p className="text-[11px] text-slate-500 mt-3 font-medium flex items-center gap-1">
          <span>● Dot = 1 sound</span>
          <span className="text-slate-300">|</span>
          <span>━ Bar = 2 letters 1 sound</span>
        </p>
      </div>

      {/* Action Controls */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <button
          type="button"
          onClick={handleBlendWord}
          disabled={isBlending}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold rounded-xl shadow-sm transition-all transform active:scale-98 cursor-pointer disabled:opacity-70 text-sm"
        >
          <Sparkles className="w-4 h-4" />
          <span>{isBlending ? 'Blending...' : 'Blend & Read'}</span>
        </button>

        <button
          type="button"
          onClick={() => {
            soundEffects.playPop();
            speakWord(word.word, speechRate);
          }}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-amber-100 hover:bg-amber-200/80 text-amber-900 font-semibold rounded-xl transition-all active:scale-98 cursor-pointer text-sm"
        >
          <Volume2 className="w-4 h-4 text-amber-700" />
          <span>Say Word</span>
        </button>
      </div>

      {/* ESL Friendly Meaning & Context */}
      <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-xs">
        <div className="text-slate-700 font-medium mb-1">
          <span className="font-semibold text-slate-900">Meaning: </span>
          {word.simpleMeaningEsl}
        </div>
        <div className="text-slate-600 italic">
          &ldquo;{word.exampleSentence}&rdquo;
        </div>
      </div>
    </div>
  );
};
