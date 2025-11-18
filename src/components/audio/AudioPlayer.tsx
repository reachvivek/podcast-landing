'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { Episode } from '@/types/podcast';

interface AudioPlayerProps {
  episode: Episode;
}

export function AudioPlayer({ episode }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const formatTime = (time: number) => {
    if (isNaN(time)) return '00:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 5);
    }
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(duration, audioRef.current.currentTime + 5);
    }
  };

  return (
    <div className="bg-white shadow-lg border-t border-gray-200">
      <div className="container mx-auto px-4 lg:px-8 py-4">
        <div className="flex items-center gap-6">
          {/* Play Button and Episode Info */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <button
              onClick={togglePlay}
              className="flex-shrink-0 w-14 h-14 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center text-white transition-colors"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" fill="currentColor" />
              ) : (
                <Play className="w-6 h-6 ml-1" fill="currentColor" />
              )}
            </button>

            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 truncate">
                {episode.title}
              </h4>
              <p className="text-sm text-primary">
                {episode.host} . Episode {episode.episodeNumber} . {episode.duration}
              </p>
            </div>
          </div>

          {/* Playback Controls */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={skipBackward}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Skip backward 5 seconds"
              title="-5s"
            >
              <SkipBack className="w-5 h-5 text-gray-700" />
            </button>
            <span className="text-sm text-gray-600 min-w-[45px]">
              {formatTime(currentTime)}
            </span>
            <button
              onClick={skipForward}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Skip forward 5 seconds"
              title="+5s"
            >
              <SkipForward className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="hidden lg:flex items-center flex-1 gap-3">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              style={{
                background: `linear-gradient(to right, #FF5722 0%, #FF5722 ${(currentTime / duration) * 100}%, #E5E7EB ${(currentTime / duration) * 100}%, #E5E7EB 100%)`,
              }}
            />
            <span className="text-sm text-gray-600 min-w-[45px]">
              {formatTime(duration)}
            </span>
          </div>

          {/* Volume */}
          <div className="hidden xl:flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-gray-700" />
          </div>
        </div>

        {/* Mobile Progress Bar */}
        <div className="lg:hidden mt-3">
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-600">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              style={{
                background: `linear-gradient(to right, #FF5722 0%, #FF5722 ${(currentTime / duration) * 100}%, #E5E7EB ${(currentTime / duration) * 100}%, #E5E7EB 100%)`,
              }}
            />
            <span className="text-xs text-gray-600">{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={episode.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
}
