'use client';

import { useState, useEffect, useCallback } from 'react';
import { shuffleArray } from '@/lib/utils/array';

interface UseSyncedRotationOptions {
  imagesCount: number;
  wordsCount: number;
  intervalMs?: number;
  shuffleImages?: boolean;
}

interface UseSyncedRotationReturn {
  imageIndex: number;
  wordIndex: number;
  next: () => void;
  goToImage: (index: number) => void;
}

/**
 * Custom hook for synchronized rotation of images and words
 * Both rotate together at the same interval
 */
export function useSyncedRotation({
  imagesCount,
  wordsCount,
  intervalMs = 5000,
}: UseSyncedRotationOptions): UseSyncedRotationReturn {
  const [imageIndex, setImageIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  // Synchronized rotation - both change together
  useEffect(() => {
    const timer = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % imagesCount);
      setWordIndex((prev) => (prev + 1) % wordsCount);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [imagesCount, wordsCount, intervalMs]);

  const next = useCallback(() => {
    setImageIndex((prev) => (prev + 1) % imagesCount);
    setWordIndex((prev) => (prev + 1) % wordsCount);
  }, [imagesCount, wordsCount]);

  const goToImage = useCallback((index: number) => {
    if (index >= 0 && index < imagesCount) {
      setImageIndex(index);
      // Keep word in sync by mapping to corresponding word index
      setWordIndex(index % wordsCount);
    }
  }, [imagesCount, wordsCount]);

  return {
    imageIndex,
    wordIndex,
    next,
    goToImage,
  };
}

/**
 * Hook for shuffled images array
 */
export function useShuffledImages<T>(images: T[]): T[] {
  const [shuffledImages, setShuffledImages] = useState(images);

  useEffect(() => {
    setShuffledImages(shuffleArray(images));
  }, [images]);

  return shuffledImages;
}
