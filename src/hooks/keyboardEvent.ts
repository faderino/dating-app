import { useEffect } from 'react';

export const useKeyPress = (
  callback: (T?: unknown) => void,
  keys: KeyboardKey[],
): void => {
  const onKeyDown = (event: KeyboardEvent) => {
    console.log(event.key);

    const wasAnyKeyPressed = keys.some((key) => event.key === key);

    if (wasAnyKeyPressed) {
      event.preventDefault();
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);
};

export enum KeyboardKey {
  escape = 'Escape',
  enter = 'Enter',
  ArrowRight = 'ArrowRight',
  ArrowLeft = 'ArrowLeft',
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
}
