import { Shuffle } from 'lucide-react';
import { useState } from 'react';

export const RandomWishButton = ({ onClick }: { onClick: () => void }) => {
  const [spin, setSpin] = useState(0);
  return (
    <button
      type="button"
      onClick={() => {
        setSpin((s) => s + 1);
        onClick();
      }}
      className="inline-flex items-center gap-2 rounded-xl border border-saffron-400/50 bg-saffron-500/10 px-4 py-2.5 text-sm font-semibold text-saffron-400 transition hover:bg-saffron-500/20"
    >
      <Shuffle className="h-4 w-4 transition-transform duration-500" style={{ transform: `rotate(${spin * 180}deg)` }} />
      Generate Random Wish
    </button>
  );
};
