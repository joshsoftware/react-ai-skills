import { useState, useCallback } from 'react';
import { mask, type MaskerType } from '@/lib/pii';

interface PIIMaskedDisplayProps {
  value: string | null | undefined;
  type: MaskerType;
  revealDurationMs?: number;
  disabled?: boolean;
  className?: string;
}

export function PIIMaskedDisplay({
  value,
  type,
  revealDurationMs = 3000,
  disabled = false,
  className = '',
}: PIIMaskedDisplayProps) {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleReveal = useCallback(() => {
    if (disabled) return;
    setIsRevealed(true);
    if (revealDurationMs > 0) {
      setTimeout(() => setIsRevealed(false), revealDurationMs);
    }
  }, [disabled, revealDurationMs]);

  if (!value) {
    return <span className={className}>—</span>;
  }

  const displayValue = isRevealed ? value : mask(value, type);

  return (
    <span className={`inline-flex items-center gap-1 font-mono ${className}`}>
      <span>{displayValue}</span>
      {!disabled && (
        <button
          type="button"
          onClick={handleReveal}
          className="text-xs text-blue-600 hover:text-blue-800 underline"
          aria-label={isRevealed ? 'Value revealed' : 'Reveal value'}
        >
          {isRevealed ? 'hide' : 'show'}
        </button>
      )}
    </span>
  );
}
