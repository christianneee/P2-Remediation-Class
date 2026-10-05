import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Volume2,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Eye,
  CheckCircle2,
  Award,
  Mic,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DecodableStory } from '../types/curriculum';
import { speakWord, stopSpeech, soundEffects } from '../utils/audio';

interface StoryReaderProps {
  stories: DecodableStory[];
  speechRate: number;
  onRewardStar: () => void;
  onStoryCompleted: (storyId: string) => void;
  onOpenVoicePractice?: (sampleText: string) => void;
}

export const StoryReader: React.FC<StoryReaderProps> = ({
  stories,
  speechRate,
  onRewardStar,
  onStoryCompleted,
  onOpenVoicePractice,
}) => {
  const [selectedStoryId, setSelectedStoryId] = useState<string>(stories[0].id);
  const [currentPageIdx, setCurrentPageIdx] = useState<number>(0);
  const [highlightPhonics, setHighlightPhonics] = useState<boolean>(true);
  const [isReadingAloud, setIsReadingAloud] = useState<boolean>(false);
  const [activeWordIndex, setActiveWordIndex] = useState<number | null>(null);

  // Comprehension quiz states
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const story = stories.find((s) => s.id === selectedStoryId) || stories[0];
  const currentPage = story.pages[currentPageIdx];
  const wordsInPage = currentPage.text.split(' ');

  // Reset page when story changes
  useEffect(() => {
    setCurrentPageIdx(0);
    setShowQuiz(false);
    setSelectedAnswers({});
    setQuizSubmitted(false);
    stopSpeech();
    setIsReadingAloud(false);
    setActiveWordIndex(null);
  }, [selectedStoryId]);

  // Read whole page aloud with karaoke word timing
  const handleReadPageAloud = async () => {
    if (isReadingAloud) {
      stopSpeech();
      setIsReadingAloud(false);
      setActiveWordIndex(null);
      return;
    }

    setIsReadingAloud(true);

    for (let i = 0; i < wordsInPage.length; i++) {
      setActiveWordIndex(i);
      const cleanWord = wordsInPage[i].replace(/[.,!?"']/g, '');
      speakWord(cleanWord, speechRate);
      // Wait proportional to word length and speech rate
      await new Promise((res) => setTimeout(res, Math.max(380, 520 / speechRate)));
    }

    setActiveWordIndex(null);
    setIsReadingAloud(false);
    soundEffects.playDing();
  };

  const handleWordTap = (word: string) => {
    soundEffects.playPop();
    const cleanWord = word.replace(/[.,!?"']/g, '');
    speakWord(cleanWord, speechRate);
  };

  const handleNextPage = () => {
    stopSpeech();
    setIsReadingAloud(false);
    setActiveWordIndex(null);
    soundEffects.playPop();

    if (currentPageIdx < story.pages.length - 1) {
      setCurrentPageIdx((prev) => prev + 1);
    } else {
      setShowQuiz(true);
    }
  };

  const handlePrevPage = () => {
    stopSpeech();
    setIsReadingAloud(false);
    setActiveWordIndex(null);
    soundEffects.playPop();

    if (showQuiz) {
      setShowQuiz(false);
    } else if (currentPageIdx > 0) {
      setCurrentPageIdx((prev) => prev - 1);
    }
  };

  const handleAnswerSelect = (qIdx: number, optIdx: number) => {
    if (quizSubmitted) return;
    soundEffects.playPop();
    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleCheckQuiz = () => {
    soundEffects.playDing();
    setQuizSubmitted(true);

    // Calculate score
    let correctCount = 0;
    story.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });

    if (correctCount === story.questions.length) {
      soundEffects.playLevelComplete();
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
      });
      onRewardStar();
      onRewardStar();
      onStoryCompleted(story.id);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-amber-200 shadow-md">
      {/* Top Bar: Story Selector & Mode */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <span className="p-2.5 bg-amber-100 text-amber-800 rounded-2xl text-2xl">
            {story.coverEmoji}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-bold text-amber-700">
                {story.level}
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs font-semibold text-slate-500">
                Phonics: /{story.targetSounds.join(', ')}/
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold font-['Fredoka',sans-serif] text-slate-800">
              {story.title}
            </h2>
          </div>
        </div>

        {/* Story Picker Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-amber-50 rounded-2xl border border-amber-200">
          {stories.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSelectedStoryId(s.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedStoryId === s.id
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'text-amber-900 hover:bg-amber-100'
              }`}
            >
              <span>{s.coverEmoji}</span>
              <span className="hidden sm:inline">{s.title.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Reader View */}
      {!showQuiz ? (
        <div>
          {/* Reader Canvas Card */}
          <div className="bg-gradient-to-b from-amber-50/40 via-white to-orange-50/30 rounded-3xl p-6 md:p-10 border-2 border-amber-100 shadow-sm relative overflow-hidden mb-6">
            {/* Top Toolbar */}
            <div className="flex items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold bg-amber-200/80 text-amber-900 px-3 py-1 rounded-full">
                  Page {currentPageIdx + 1} of {story.pages.length}
                </span>

                <button
                  type="button"
                  onClick={() => setHighlightPhonics(!highlightPhonics)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                    highlightPhonics
                      ? 'bg-indigo-100 text-indigo-800 border-indigo-300'
                      : 'bg-white text-slate-600 border-slate-300'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Phonics Glasses: {highlightPhonics ? 'ON' : 'OFF'}</span>
                </button>
              </div>

              {onOpenVoicePractice && (
                <button
                  type="button"
                  onClick={() => onOpenVoicePractice(currentPage.text)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-pink-100 text-pink-800 border border-pink-200 hover:bg-pink-200 cursor-pointer transition-all"
                >
                  <Mic className="w-3.5 h-3.5 text-pink-600" />
                  <span>Read Aloud Practice</span>
                </button>
              )}
            </div>

            {/* Story Visual Illustration */}
            <div className="flex flex-col items-center justify-center my-6">
              <div className="text-7xl md:text-8xl mb-2 drop-shadow-md animate-bounce" style={{ animationDuration: '4s' }}>
                {currentPage.imageEmoji}
              </div>
              <p className="text-xs text-slate-500 font-medium italic">
                {currentPage.caption}
              </p>
            </div>

            {/* Interactive Karaoke Text */}
            <div className="my-8 text-center max-w-2xl mx-auto">
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-3 leading-relaxed text-2xl md:text-3xl font-['Lexend',sans-serif]">
                {wordsInPage.map((word, wIdx) => {
                  const isActiveKaraoke = activeWordIndex === wIdx;
                  const clean = word.toLowerCase().replace(/[^a-z_]/g, '');

                  // Check if word contains any target sounds
                  const matchesTarget = highlightPhonics && story.targetSounds.some((ts) => clean.includes(ts));

                  return (
                    <button
                      key={wIdx}
                      type="button"
                      onClick={() => handleWordTap(word)}
                      title="Tap to hear this word spoken slowly"
                      className={`py-1 px-2 rounded-xl transition-all duration-150 transform active:scale-95 cursor-pointer font-medium ${
                        isActiveKaraoke
                          ? 'bg-amber-400 text-amber-950 font-bold scale-110 shadow-md ring-4 ring-amber-200'
                          : matchesTarget
                          ? 'bg-amber-100/90 text-amber-900 underline decoration-amber-400 decoration-wavy decoration-2 hover:bg-amber-200'
                          : 'text-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      {word}
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-slate-400 mt-4">
                💡 Tip for slow readers: Tap any word to hear it pronounced slowly.
              </p>
            </div>

            {/* Voice Read Aloud Controller */}
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleReadPageAloud}
                className={`flex items-center gap-2 py-3 px-6 rounded-2xl font-bold text-sm shadow-md transition-all cursor-pointer ${
                  isReadingAloud
                    ? 'bg-rose-500 hover:bg-rose-600 text-white'
                    : 'bg-amber-500 hover:bg-amber-600 text-white'
                }`}
              >
                <Volume2 className="w-5 h-5" />
                <span>{isReadingAloud ? 'Stop Reading' : 'Read Page to Me'}</span>
              </button>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handlePrevPage}
              disabled={currentPageIdx === 0}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 font-semibold text-xs text-slate-700 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous Page</span>
            </button>

            <button
              type="button"
              onClick={handleNextPage}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 font-bold text-xs text-white shadow-sm cursor-pointer"
            >
              <span>
                {currentPageIdx === story.pages.length - 1
                  ? 'Take Comprehension Quiz'
                  : 'Next Page'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Comprehension Quiz View */
        <div className="bg-amber-50/50 rounded-3xl p-6 md:p-8 border-2 border-amber-200">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-6 h-6 text-amber-600" />
            <h3 className="text-lg md:text-xl font-bold font-['Fredoka',sans-serif] text-slate-800">
              Story Comprehension Safari!
            </h3>
          </div>
          <p className="text-xs text-slate-600 mb-6">
            Answer these fun questions to check your reading understanding:
          </p>

          <div className="space-y-6 mb-6">
            {story.questions.map((q, qIdx) => {
              const selectedOpt = selectedAnswers[qIdx];
              const isQAnswered = selectedOpt !== undefined;

              return (
                <div key={qIdx} className="bg-white p-5 rounded-2xl border border-amber-200 shadow-sm">
                  <p className="font-bold text-sm text-slate-900 mb-3">
                    {qIdx + 1}. {q.question}
                  </p>

                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isChosen = selectedOpt === optIdx;
                      const isRight = optIdx === q.correctIndex;

                      let style = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-amber-50';

                      if (quizSubmitted) {
                        if (isRight) {
                          style = 'bg-emerald-100 border-emerald-400 text-emerald-900 font-bold';
                        } else if (isChosen) {
                          style = 'bg-rose-100 border-rose-300 text-rose-900';
                        }
                      } else if (isChosen) {
                        style = 'bg-amber-500 text-white font-bold border-amber-600';
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleAnswerSelect(qIdx, optIdx)}
                          className={`w-full text-left p-3 rounded-xl border text-xs md:text-sm transition-all cursor-pointer flex items-center justify-between ${style}`}
                        >
                          <span>{opt}</span>
                          {quizSubmitted && isRight && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <p className="text-xs text-slate-600 mt-3 italic bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      💡 {q.explanation}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quiz Actions */}
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handlePrevPage}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 font-semibold text-xs text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Story</span>
            </button>

            {!quizSubmitted ? (
              <button
                type="button"
                onClick={handleCheckQuiz}
                disabled={Object.keys(selectedAnswers).length < story.questions.length}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md disabled:opacity-40 cursor-pointer flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Submit &amp; Win 2 Stars! ⭐</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setQuizSubmitted(false);
                  setSelectedAnswers({});
                  setCurrentPageIdx(0);
                  setShowQuiz(false);
                }}
                className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Read Story Again</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
