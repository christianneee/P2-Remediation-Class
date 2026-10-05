import React from 'react';
import { X, Sliders, CheckCircle2, RotateCcw, BookOpen, Volume2, ShieldCheck, Heart } from 'lucide-react';
import { CAMBRIDGE_UNITS } from '../data/cambridgeCurriculum';

interface TeacherDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  speechRate: number;
  onUpdateSpeechRate: (rate: number) => void;
  masteredWords: string[];
  readStoryIds: string[];
  stars: number;
  onResetProgress: () => void;
}

export const TeacherDashboardModal: React.FC<TeacherDashboardModalProps> = ({
  isOpen,
  onClose,
  speechRate,
  onUpdateSpeechRate,
  masteredWords,
  readStoryIds,
  stars,
  onResetProgress,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 md:p-8 max-w-2xl w-full border-2 border-slate-200 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
          <span className="p-3 bg-indigo-100 text-indigo-700 rounded-2xl">
            <Sliders className="w-6 h-6" />
          </span>
          <div>
            <h3 className="text-xl font-bold font-['Fredoka',sans-serif] text-slate-900">
              Teacher &amp; Parent Companion
            </h3>
            <p className="text-xs text-slate-500">
              Cambridge Primary English Stage 2 Fluency Analytics &amp; Accessibility
            </p>
          </div>
        </div>

        {/* Speed Controls for Slow Readers */}
        <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-amber-700" />
              <span className="text-xs font-bold text-amber-950 uppercase tracking-wider">
                Pronunciation Speech Speed
              </span>
            </div>
            <span className="text-xs font-bold text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-md">
              {speechRate === 0.65 ? 'Slow (0.65x)' : speechRate === 0.8 ? 'Normal (0.8x)' : 'Standard (1.0x)'}
            </span>
          </div>

          <p className="text-xs text-amber-900/80 mb-3">
            Slow speed is strongly recommended for Primary 2 non-native English learners and non-readers to hear individual phoneme blending clearly.
          </p>

          <div className="grid grid-cols-3 gap-2">
            {[
              { label: '🐢 Slow (0.65x)', value: 0.65 },
              { label: '🚶 Gentle (0.80x)', value: 0.8 },
              { label: '🏃 Standard (1.0x)', value: 1.0 },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => onUpdateSpeechRate(option.value)}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  speechRate === option.value
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-amber-200 hover:bg-amber-100'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cambridge Stage 2 Units Mastery Checklist */}
        <div className="mb-6">
          <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-600" />
            <span>Cambridge Stage 2 Objectives Mastery</span>
          </h4>

          <div className="space-y-3">
            {CAMBRIDGE_UNITS.map((unit) => {
              const unitWords = unit.words.map((w) => w.id);
              const masteredInUnit = unitWords.filter((id) => masteredWords.includes(id)).length;
              const percent = Math.round((masteredInUnit / unitWords.length) * 100);

              return (
                <div
                  key={unit.id}
                  className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="max-w-md">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{unit.title}</span>
                      <span className="text-[10px] font-semibold bg-slate-200 px-1.5 py-0.5 rounded text-slate-700">
                        {unit.levelBadge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {unit.cambridgeObjective}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-xs font-bold text-slate-800">
                        {masteredInUnit} / {unitWords.length} Words
                      </div>
                      <div className="w-24 bg-slate-200 h-2 rounded-full overflow-hidden mt-1">
                        <div
                          className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                    {percent === 100 && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ESL Pedagogical Guidance Note */}
        <div className="bg-sky-50 rounded-2xl p-4 border border-sky-200 mb-6 text-xs text-sky-900 space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-sky-950">
            <Heart className="w-4 h-4 text-sky-600" />
            <span>Cambridge EAL (English as Additional Language) Best Practice:</span>
          </div>
          <p className="leading-relaxed">
            • Always link phonics to meaning using the picture anchors before drilling reading.
          </p>
          <p className="leading-relaxed">
            • Celebrate small blends. Non-readers benefit greatly from the &ldquo;Sound Button&rdquo; tactile dots and bars.
          </p>
          <p className="leading-relaxed">
            • Encourage the child to touch the screen under each sound button as they verbalize the phoneme.
          </p>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Reset student stars and mastered words to start fresh?')) {
                onResetProgress();
              }
            }}
            className="flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-700 font-semibold cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Progress for New Student</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold cursor-pointer"
          >
            Save &amp; Return
          </button>
        </div>
      </div>
    </div>
  );
};
