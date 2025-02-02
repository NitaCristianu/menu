import { useEffect, useState } from 'react';
import { vec2D } from '../data/globals';

/*
HOOK THAT RE-RENDERS THE SCREEN WHEN THE WINDOW SIZE IS CHANGED

*/

export default function useResize() {
  const [size, setSize] = useState<vec2D>({
    x: typeof window !== 'undefined' ? window.innerWidth : 1920,
    y: typeof window !== 'undefined' ? window.innerHeight : 1080,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        x: window.innerWidth,
        y: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return size;
};