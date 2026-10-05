import React, { useState, useRef } from 'react';
import { Mic, Square, Play, Sparkles, X, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { speakWord, soundEffects } from '../utils/audio';

interface VoiceRecorderModalProps {
  sampleText: string;
  isOpen: boolean;
  onClose: () => void;
  onRewardStar: () => void;
  speechRate: number;
}

export const VoiceRecorderModal: React.FC<VoiceRecorderModalProps> = ({
  sampleText,
  isOpen,
  onClose,
  onRewardStar,
  speechRate,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlobUrl, setAudioBlobUrl] = useState<string | null>(null);
  const [isPlayingBack, setIsPlayingBack] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Press the red button and read aloud!');
  const [hasRecorded, setHasRecorded] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  if (!isOpen) return null;

  const handleStartRecording = async () => {
    try {
      soundEffects.playPop();
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioBlobUrl(url);
        setIsRecording(false);
        setHasRecorded(true);
        setStatusMessage('Awesome job! Tap Play to listen to your voice.');
        soundEffects.playDing();
        onRewardStar();
        confetti({
          particleCount: 25,
          spread: 50,
          origin: { y: 0.6 },
        });

        // Stop all media tracks
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setStatusMessage('Recording... Read the text now!');
    } catch {
      setStatusMessage('Microphone access is unavailable or denied. You can still practice reading aloud!');
      setIsRecording(false);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
  };

  const handlePlayRecording = () => {
    if (!audioBlobUrl) return;
    if (!audioPlayerRef.current) {
      audioPlayerRef.current = new Audio(audioBlobUrl);
      audioPlayerRef.current.onended = () => setIsPlayingBack(false);
    }
    soundEffects.playPop();
    setIsPlayingBack(true);
    audioPlayerRef.current.play();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full border-2 border-amber-300 shadow-2xl relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="p-3 bg-pink-100 text-pink-700 rounded-2xl text-2xl">
            🎙️
          </span>
          <div>
            <h3 className="text-xl font-bold font-['Fredoka',sans-serif] text-slate-800">
              Read Aloud Voice Practice
            </h3>
            <p className="text-xs text-slate-500">
              Cambridge Primary 2 Fluency &amp; Pronunciation
            </p>
          </div>
        </div>

        {/* Target reading box */}
        <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200 mb-6 text-center">
          <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block mb-2">
            Read This Sentence Out Loud:
          </span>
          <p className="text-lg md:text-xl font-medium font-['Lexend',sans-serif] text-slate-800 leading-relaxed">
            &ldquo;{sampleText}&rdquo;
          </p>
          <button
            type="button"
            onClick={() => speakWord(sampleText, speechRate)}
            className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-amber-200/80 hover:bg-amber-300 text-amber-900 rounded-lg text-xs font-semibold cursor-pointer"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Hear Model Reading</span>
          </button>
        </div>

        {/* Mascot Prompt */}
        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl mb-6 border border-slate-200">
          <span className="text-2xl">🦜</span>
          <p className="text-xs text-slate-700 font-medium">{statusMessage}</p>
        </div>

        {/* Recorder controls */}
        <div className="flex items-center justify-center gap-4">
          {!isRecording ? (
            <button
              type="button"
              onClick={handleStartRecording}
              className="flex items-center gap-2 py-3 px-6 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-2xl shadow-lg cursor-pointer transition-all active:scale-95 text-sm"
            >
              <Mic className="w-5 h-5 animate-pulse" />
              <span>{hasRecorded ? 'Record Again' : 'Start Recording'}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleStopRecording}
              className="flex items-center gap-2 py-3 px-6 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-2xl shadow-lg cursor-pointer transition-all text-sm animate-pulse"
            >
              <Square className="w-4 h-4 text-rose-400" />
              <span>Finish &amp; Save</span>
            </button>
          )}

          {audioBlobUrl && !isRecording && (
            <button
              type="button"
              onClick={handlePlayRecording}
              disabled={isPlayingBack}
              className="flex items-center gap-2 py-3 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-lg cursor-pointer transition-all active:scale-95 text-sm"
            >
              <Play className="w-4 h-4" />
              <span>{isPlayingBack ? 'Playing...' : 'Listen to Myself'}</span>
            </button>
          )}
        </div>

        {hasRecorded && (
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Star Awarded! Great confidence building!</span>
            </span>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 bg-slate-800 text-white rounded-xl text-xs font-bold cursor-pointer"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
