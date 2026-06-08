"use client";

import { useCallback, useRef } from "react";

const SCROLL_THRESHOLD_PX = 10;

export function useTouchScrollGuard() {
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const isScrolling = useRef(false);

  const onTouchStart = useCallback((event: React.TouchEvent) => {
    const touch = event.touches[0];

    if (!touch) {
      return;
    }

    touchStart.current = { x: touch.clientX, y: touch.clientY };
    isScrolling.current = false;
  }, []);

  const onTouchMove = useCallback((event: React.TouchEvent) => {
    const touch = event.touches[0];

    if (!touch || !touchStart.current) {
      return;
    }

    const deltaX = Math.abs(touch.clientX - touchStart.current.x);
    const deltaY = Math.abs(touch.clientY - touchStart.current.y);

    if (deltaX > SCROLL_THRESHOLD_PX || deltaY > SCROLL_THRESHOLD_PX) {
      isScrolling.current = true;
    }
  }, []);

  const onTouchEnd = useCallback(() => {
    touchStart.current = null;

    window.setTimeout(() => {
      isScrolling.current = false;
    }, 120);
  }, []);

  const shouldBlockInteraction = useCallback(() => isScrolling.current, []);

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    shouldBlockInteraction,
  };
}
