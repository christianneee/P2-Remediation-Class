import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  BookOpen,
  Volume2,
  Wand2,
  Puzzle,
  Target,
  Key,
  Layers,
  ChevronRight,
  Filter
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Navbar } from './components/Navbar';
import { SoundButtonWord } from './components/SoundButtonWord';
import { MagicETransformer } from './components/MagicETransformer';
import { SoundBubblePop } from './components/SoundBubblePop';
import { WordBuilder } from './components/WordBuilder';
import { PictureWordMatch } from './components/PictureWordMatch';
import { StoryReader } from './components/StoryReader';
import { TrickyWordVault } from './components/TrickyWordVault';
import { StickerPassport } from './components/StickerPassport';
import { TeacherDashboardModal } from './components/TeacherDashboardModal';
import { VoiceRecorderModal } from './components/VoiceRecorderModal';

import { CAMBRIDGE_UNITS } from './data/cambridgeCurriculum';
import { DECODABLE_STORIES } from './data/decodableStories';
import { soundEffects, speakWord } from './utils/audio';

type ActivityStation =
  | 'sound-buttons'
  | 'magic-e'
  | 'bubble-pop'
  | 'word-builder'
  | 'picture-match'
  | 'stories'
  | 'tricky-words';

export default function App() {
  // Saved state
  const [stars, setStars] = useState<number>(() => {
    const saved = localStorage.getItem('cambridge_p2_stars');
    return saved ? parseInt(saved, 10) : 5;
  });

  const [masteredWordIds, setMasteredWordIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('cambridge_p2_mastered');
    return saved ? JSON.parse(saved) : ['w-star'];
  });

  const [readStoryIds, setReadStoryIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('cambridge_p2_stories');
    return saved ? JSON.parse(saved) : [];
  });

  const [speechRate, setSpeechRate] = useState<number>(() => {
    const saved = localStorage.getItem('cambridge_p2_speech_rate');
    return saved ? parseFloat(saved) : 0.75; // gentle default for ESL slow readers
  });

  // Active view states
  const [activeStation, setActiveStation] = useState<ActivityStation>('sound-buttons');
  const [selectedUnitId, setSelectedUnitId] = useState<string>('all');

  // Modals
  const [isPassportOpen, setIsPassportOpen] = useState(false);
  const [isTeacherOpen, setIsTeacherOpen] = useState(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [voiceSampleText, setVoiceSampleText] = useState('Look up at the bright star tonight.');

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('cambridge_p2_stars', stars.toString());
  }, [stars]);

  useEffect(() => {
    localStorage.setItem('cambridge_p2_mastered', JSON.stringify(masteredWordIds));
  }, [masteredWordIds]);

  useEffect(() => {
    localStorage.setItem('cambridge_p2_stories', JSON.stringify(readStoryIds));
  }, [readStoryIds]);

  useEffect(() => {
    localStorage.setItem('cambridge_p2_speech_rate', speechRate.toString());
  }, [speechRate]);

  // Star Reward Handler
  const handleRewardStar = () => {
    soundEffects.playStar();
    setStars((prev) => prev + 1);
  };

  const handleWordMastered = (wordId: string) => {
    if (!masteredWordIds.includes(wordId)) {
      setMasteredWordIds((prev) => [...prev, wordId]);
      handleRewardStar();
      confetti({
        particleCount: 25,
        spread: 40,
        origin: { y: 0.7 },
      });
    }
  };

  const handleStoryCompleted = (storyId: string) => {
    if (!readStoryIds.includes(storyId)) {
      setReadStoryIds((prev) => [...prev, storyId]);
    }
  };

  const handleToggleSpeed = () => {
    soundEffects.playPop();
    const nextSpeed = speechRate <= 0.7 ? 0.9 : 0.65;
    setSpeechRate(nextSpeed);
    speakWord(nextSpeed <= 0.7 ? 'Slow speech mode on' : 'Normal speech mode on', nextSpeed);
  };

  const handleResetProgress = () => {
    setStars(0);
    setMasteredWordIds([]);
    setReadStoryIds([]);
    localStorage.removeItem('cambridge_p2_stars');
    localStorage.removeItem('cambridge_p2_mastered');
    localStorage.removeItem('cambridge_p2_stories');
    soundEffects.playDing();
  };

  // Open microphone practice with custom phrase
  const handleOpenVoicePractice = (sample: string) => {
    setVoiceSampleText(sample);
    setIsVoiceOpen(true);
  };

  // Filter words for Sound Button Studio
  const filteredWords = CAMBRIDGE_UNITS.flatMap((unit) => {
    if (selectedUnitId !== 'all' && unit.id !== selectedUnitId) return [];
    return unit.words;
  });

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/40 text-slate-800">
      {/* Top Navbar */}
      <Navbar
        stars={stars}
        speechRate={speechRate}
        onToggleSpeed={handleToggleSpeed}
        onOpenPassport={() => {
          soundEffects.playPop();
          setIsPassportOpen(true);
        }}
        onOpenTeacher={() => {
          soundEffects.playPop();
          setIsTeacherOpen(true);
        }}
        onOpenVoice={() => {
          soundEffects.playPop();
          setIsVoiceOpen(true);
        }}
      />

      {/* Main Body Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6">
        {/* Child-Friendly Welcome Banner */}
        <section className="bg-gradient-to-r from-amber-400 via-amber-500 to-orange-400 rounded-3xl p-5 md:p-6 text-white shadow-md mb-6 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <span className="text-5xl md:text-6xl animate-bounce" role="img" aria-label="Mascot parrot">
                🦜
              </span>
              <div>
                <span className="text-xs uppercase tracking-wider font-bold bg-white/20 px-2.5 py-0.5 rounded-full inline-block mb-1">
                  Cambridge Primary English · Stage 2
                </span>
                <h2 className="text-xl md:text-2xl font-bold font-['Fredoka',sans-serif]">
                  Ready to Read, Safari Explorer?
                </h2>
                <p className="text-xs md:text-sm text-amber-50 font-medium max-w-lg mt-0.5">
                  Listen to the sound buttons, transform words with Magic &lsquo;e&rsquo;, and read exciting Cambridge stories!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  soundEffects.playPop();
                  speakWord(
                    'Welcome! Let us learn sounds together. Tap the sound buttons to hear each letter!',
                    speechRate
                  );
                }}
                className="px-4 py-2 bg-white hover:bg-amber-50 text-amber-900 rounded-2xl text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5 transition-transform active:scale-95"
              >
                <Volume2 className="w-4 h-4 text-amber-600" />
                <span>Hear Pip&apos;s Tip</span>
              </button>
            </div>
          </div>

          {/* Background decorative circles */}
          <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-white/10 rounded-full pointer-events-none" />
          <div className="absolute top-0 right-1/4 w-28 h-28 bg-white/5 rounded-full pointer-events-none" />
        </section>

        {/* Activity Stations Tab Navigation */}
        <nav className="mb-6">
          <div className="flex items-center justify-start gap-2 overflow-x-auto pb-2 scrollbar-none">
            {[
              { id: 'sound-buttons', label: 'Sound Buttons', icon: '●━', color: 'emerald' },
              { id: 'magic-e', label: "Magic 'e' Wand", icon: '🪄', color: 'pink' },
              { id: 'bubble-pop', label: 'Bubble Sound Pop', icon: '🫧', color: 'sky' },
              { id: 'word-builder', label: 'Word Builder', icon: '🧩', color: 'indigo' },
              { id: 'picture-match', label: 'Picture Safari', icon: '🎯', color: 'amber' },
              { id: 'stories', label: 'Decodable Stories', icon: '📖', color: 'purple' },
              { id: 'tricky-words', label: 'Tricky Words', icon: '🗝️', color: 'rose' },
            ].map((station) => {
              const isActive = activeStation === station.id;
              return (
                <button
                  key={station.id}
                  type="button"
                  onClick={() => {
                    soundEffects.playPop();
                    setActiveStation(station.id as ActivityStation);
                  }}
                  className={`px-4 py-2.5 rounded-2xl font-bold font-['Fredoka',sans-serif] text-sm shrink-0 transition-all flex items-center gap-2 cursor-pointer shadow-xs ${
                    isActive
                      ? 'bg-amber-600 text-white shadow-md scale-102 ring-2 ring-amber-300'
                      : 'bg-white text-slate-700 hover:bg-amber-100/60 border border-amber-200/80'
                  }`}
                >
                  <span className="text-base">{station.icon}</span>
                  <span>{station.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Station Views */}
        <div>
          {/* Station 1: Sound Buttons Studio */}
          {activeStation === 'sound-buttons' && (
            <div className="space-y-6">
              {/* Unit Filter Bar */}
              <div className="bg-white rounded-2xl p-4 border border-amber-200 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-amber-700" />
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Cambridge Stage 2 Units:
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      soundEffects.playPop();
                      setSelectedUnitId('all');
                    }}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedUnitId === 'all'
                        ? 'bg-amber-500 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    All Units ({CAMBRIDGE_UNITS.flatMap((u) => u.words).length})
                  </button>

                  {CAMBRIDGE_UNITS.map((unit) => (
                    <button
                      key={unit.id}
                      type="button"
                      onClick={() => {
                        soundEffects.playPop();
                        setSelectedUnitId(unit.id);
                      }}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedUnitId === unit.id
                          ? 'bg-amber-500 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {unit.title.split(':')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Informational Guidance for EAL / Primary 2 Readers */}
              <div className="bg-amber-100/50 rounded-2xl p-4 border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
                <span className="text-2xl shrink-0">💡</span>
                <div>
                  <strong className="font-bold">Cambridge Phonics Sound Button Guide:</strong>
                  <p className="mt-0.5 leading-relaxed text-amber-950">
                    Non-readers can press the <strong>dot buttons</strong> under single letters or the <strong>dash buttons</strong> under sound teams. Then press &ldquo;Blend &amp; Read&rdquo; to hear how the sounds combine into the complete spoken word!
                  </p>
                </div>
              </div>

              {/* Grid of Sound Button Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredWords.map((word) => (
                  <SoundButtonWord
                    key={word.id}
                    word={word}
                    speechRate={speechRate}
                    isMastered={masteredWordIds.includes(word.id)}
                    onMastered={() => handleWordMastered(word.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Station 2: Magic 'e' Transformer */}
          {activeStation === 'magic-e' && (
            <MagicETransformer
              speechRate={speechRate}
              onRewardStar={handleRewardStar}
            />
          )}

          {/* Station 3: Bubble Pop */}
          {activeStation === 'bubble-pop' && (
            <SoundBubblePop
              speechRate={speechRate}
              onRewardStar={handleRewardStar}
            />
          )}

          {/* Station 4: Word Builder */}
          {activeStation === 'word-builder' && (
            <WordBuilder
              speechRate={speechRate}
              onRewardStar={handleRewardStar}
            />
          )}

          {/* Station 5: Picture Match */}
          {activeStation === 'picture-match' && (
            <PictureWordMatch
              speechRate={speechRate}
              onRewardStar={handleRewardStar}
            />
          )}

          {/* Station 6: Decodable Stories */}
          {activeStation === 'stories' && (
            <StoryReader
              stories={DECODABLE_STORIES}
              speechRate={speechRate}
              onRewardStar={handleRewardStar}
              onStoryCompleted={handleStoryCompleted}
              onOpenVoicePractice={handleOpenVoicePractice}
            />
          )}

          {/* Station 7: Tricky Words */}
          {activeStation === 'tricky-words' && (
            <TrickyWordVault
              speechRate={speechRate}
              onRewardStar={handleRewardStar}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 bg-white border-t border-amber-200 py-6 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="text-xl">🦜</span>
            <span className="font-semibold text-slate-700">
              Cambridge Phonics &amp; Reading Safari · Primary 2
            </span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">Designed for non-native English &amp; emerging readers</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => {
                soundEffects.playPop();
                setIsPassportOpen(true);
              }}
              className="text-amber-700 hover:underline font-semibold cursor-pointer"
            >
              Safari Passport ({stars} ⭐)
            </button>
            <button
              type="button"
              onClick={() => {
                soundEffects.playPop();
                setIsTeacherOpen(true);
              }}
              className="text-indigo-700 hover:underline font-semibold cursor-pointer"
            >
              Teacher Companion
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <StickerPassport
        isOpen={isPassportOpen}
        onClose={() => setIsPassportOpen(false)}
        stars={stars}
        speechRate={speechRate}
      />

      <TeacherDashboardModal
        isOpen={isTeacherOpen}
        onClose={() => setIsTeacherOpen(false)}
        speechRate={speechRate}
        onUpdateSpeechRate={(rate) => {
          soundEffects.playPop();
          setSpeechRate(rate);
        }}
        masteredWords={masteredWordIds}
        readStoryIds={readStoryIds}
        stars={stars}
        onResetProgress={handleResetProgress}
      />

      <VoiceRecorderModal
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        sampleText={voiceSampleText}
        onRewardStar={handleRewardStar}
        speechRate={speechRate}
      />
    </div>
  );
}
