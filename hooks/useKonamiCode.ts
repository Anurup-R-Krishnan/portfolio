import { useEffect, useState } from 'react';

export const useKonamiCode = () => {
  const [triggered, setTriggered] = useState(false);
  
  // Up, Up, Down, Down, Left, Right, Left, Right, B, A
  const konamiCode = [
    "ArrowUp", "ArrowUp", 
    "ArrowDown", "ArrowDown", 
    "ArrowLeft", "ArrowRight", 
    "ArrowLeft", "ArrowRight", 
    "b", "a"
  ];

  useEffect(() => {
    let cursor = 0;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === konamiCode[cursor]) {
        cursor++;
        if (cursor === konamiCode.length) {
          setTriggered(true);
          cursor = 0;
        }
      } else {
        cursor = 0; // Reset if mistake
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return triggered;
};