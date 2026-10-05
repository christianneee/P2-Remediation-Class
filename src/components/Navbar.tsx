import React from 'react';
import { Star, Sliders, Mic, Award, Volume2 } from 'lucide-react';
import { speakWord, soundEffects } from '../utils/audio';

interface NavbarProps {
  stars: number;
  speechRate: number;
  onToggleSpeed: () => void;
  onOpenPassport: () => void;
  onOpenTeacher: () => void;
  onOpenVoice: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  stars,
  speechRate,
  onToggleSpeed,
  onOpenPassport,
  onOpenTeacher,
  onOpenVoice,
}) => {
  const handleMascotClick = () => {
    soundEffects.playPop();
    const greetings = [
      'Hello little reader! Let us sound out words together!',
      'You are doing brilliant work! Keep shining!',
      'Press the sound buttons under each letter to hear its sound!',
      'Magic e makes the vowel say its long name!',
    ];
    const pick = greetings[Math.floor(Math.random() * greetings.length)];
    speakWord(pick, speechRate);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-amber-200 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
        {/* Brand & Mascot */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleMascotClick}
            title="Tap Pip the Parrot for encouragement!"
            className="w-11 h-11 rounded-2xl bg-amber-100 hover:bg-amber-200 border-2 border-amber-300 flex items-center justify-center text-2xl transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
          >
            🦜
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold tracking-wider uppercase text-amber-800 bg-amber-100/90 px-2 py-0.5 rounded-md border border-amber-200">
                Cambridge Primary 2
              </span>
              <span className="text-[11px] text-slate-500 hidden sm:inline">
                ESL &amp; Emerging Readers
              </span>
            </div>
            <h1 className="text-base sm:text-lg font-bold font-['Fredoka',sans-serif] text-slate-800 leading-tight">
              Phonics &amp; Reading Safari
            </h1>
          </div>
        </div>

        {/* Right Tools & Badges */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Audio Speed Switcher */}
          <button
            type="button"
            onClick={onToggleSpeed}
            title="Toggle between Slow (for non/slow readers) and Normal speech speed"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-semibold cursor-pointer transition-all"
          >
            <span className="text-sm">{speechRate <= 0.7 ? '🐢' : '🚶'}</span>
            <span className="hidden md:inline">
              {speechRate <= 0.7 ? 'Slow Audio' : 'Normal Audio'}
            </span>
          </button>

          {/* Voice Aloud Practice */}
          <button
            type="button"
            onClick={onOpenVoice}
            title="Practice reading aloud with the microphone"
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl border border-pink-200 bg-pink-50 hover:bg-pink-100 text-pink-800 text-xs font-semibold cursor-pointer flex items-center gap-1.5 transition-all"
          >
            <Mic className="w-4 h-4 text-pink-600" />
            <span className="hidden sm:inline">Read Aloud</span>
          </button>

          {/* Stars & Passport */}
          <button
            type="button"
            onClick={onOpenPassport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-sm cursor-pointer transition-all active:scale-95"
          >
            <Star className="w-4 h-4 fill-amber-200 text-amber-200" />
            <span>{stars}</span>
            <span className="hidden sm:inline font-normal text-amber-100">Passport</span>
          </button>

          {/* Teacher Settings */}
          <button
            type="button"
            onClick={onOpenTeacher}
            title="Teacher & Parent Dashboard"
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer transition-colors"
          >
            <Sliders className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
