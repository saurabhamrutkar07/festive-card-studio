import { Heart } from 'lucide-react';
import { Diya } from './cards/decor/lamps';
import { OWNER_CONTACT } from '../data/contact';

export const Footer = () => (
  <footer className="border-t border-gold-400/10 bg-black/30">
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-cream-100/55 sm:flex-row sm:px-6">
      <div className="flex items-center gap-2">
        <Diya size={26} variant="gold" glow={0.4} />
        <span className="font-display text-cream-100/80">Deepotsav Cards</span>
      </div>
      <p className="text-center">
        Made with <Heart className="inline h-3.5 w-3.5 fill-saffron-500 text-saffron-500" /> for the festival of lights. Your cards are created
        entirely in your browser — nothing is uploaded.
      </p>
      <p>{OWNER_CONTACT.name ? `Designed & built by ${OWNER_CONTACT.name}` : 'शुभ दीपावली ✦'}</p>
    </div>
  </footer>
);
