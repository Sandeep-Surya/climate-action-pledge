'use client';

import { useState, useEffect } from 'react';

interface TypingEffectProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
}

export function TypingEffect({
  text,
  delay = 0,
  speed = 30,
  className = '',
}: TypingEffectProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(delayTimer);
  }, [delay]);

  useEffect(() => {
    if (!isVisible) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.substring(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [isVisible, text, speed]);

  return (
    <span className={className}>
      {displayedText}
      {isVisible && displayedText.length < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  );
}
