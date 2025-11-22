'use client';

import { useState, useEffect, useCallback } from 'react';
import { shuffleArray } from '@/lib/utils/array';

interface UseRotatingContentOptions<T> {
  items: T[];
  intervalMs?: number;
  shuffle?: boolean;
}

interface UseRotatingContentReturn<T> {
  currentItem: T;
  currentIndex: number;
  items: T[];
  next: () => void;
  goTo: (index: number) => void;
}

/**
 * Custom hook for rotating through content items with optional shuffling
 * Useful for carousels, rotating text, and image galleries
 */
export function useRotatingContent<T>({
  items: initialItems,
  intervalMs = 5000,
  shuffle = false,
}: UseRotatingContentOptions<T>): UseRotatingContentReturn<T> {
  const [items, setItems] = useState(initialItems);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Shuffle items after mount if requested (client-side only)
  useEffect(() => {
    if (shuffle) {
      setItems(shuffleArray(initialItems));
    }
  }, [shuffle, initialItems]);

  // Auto-rotate through items
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [items.length, intervalMs]);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const goTo = useCallback((index: number) => {
    if (index >= 0 && index < items.length) {
      setCurrentIndex(index);
    }
  }, [items.length]);

  return {
    currentItem: items[currentIndex],
    currentIndex,
    items,
    next,
    goTo,
  };
}
