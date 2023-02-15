import React from 'react';

import ReactConfetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';

export const Confetti = () => {
  const { width, height } = useWindowSize();
  return (
    <ReactConfetti
      recycle={false}
      numberOfPieces={500}
      tweenDuration={10000}
      width={width}
      height={height}
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
    />
  );
};
