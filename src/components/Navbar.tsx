import { Sparkles } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import type { Language } from '../types/card';
import { Diya } from './cards/decor/lamps';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Navbar = ({ language, onLanguageChange }: NavbarProps) => (
  <header className="sticky top-0 z-40 border-b border-gold-400/10 bg-maroon-950/75 backdrop-blur-md">
    <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
      <a href="#top" className="flex items-center gap-2.5" aria-label="Diwali Card Studio home">
        <Diya size={30} variant="gold" glow={0.5} />
        <span className="whitespace-nowrap font-display text-base font-semibold tracking-wide text-gold-200 sm:text-xl">
          Deepotsav <span className="hidden text-cream-100/80 min-[400px]:inline">Cards</span>
        </span>
      </a>
      <div className="flex items-center gap-2 sm:gap-6">
        <div className="hidden items-center gap-6 text-sm text-cream-100/70 md:flex">
          <a href="#designs" className="transition hover:text-gold-200">Designs</a>
          <a href="#wishes" className="transition hover:text-gold-200">Wishes</a>
          <a href="#create" className="transition hover:text-gold-200">Create</a>
        </div>
        <LanguageSelector value={language} onChange={onLanguageChange} compact />
        <a href="#create" className="hidden items-center gap-1.5 rounded-lg bg-gold-400/90 px-3.5 py-2 text-sm font-semibold text-maroon-900 transition hover:bg-gold-300 sm:inline-flex">
          <Sparkles className="h-4 w-4" /> Create
        </a>
      </div>
    </nav>
  </header>
);
