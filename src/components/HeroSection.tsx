import { memo, useMemo } from 'react';
import { ArrowRight, Download, Languages, LayoutGrid, MessageCircle } from 'lucide-react';
import { CARD_DIMENSIONS } from '../data/templates';
import { t } from '../data/translations';
import { getWishById } from '../data/wishes';
import { DEFAULT_TEXT_STYLE } from '../hooks/useCardGenerator';
import { seededRandom } from '../utils/seededRandom';
import type { CardContent, Language, TemplateId } from '../types/card';
import { CardRenderer } from './cards/CardRenderer';
import { Diya, Lantern } from './cards/decor/lamps';
import { Rangoli } from './cards/decor/patterns';
import { ScaledCard } from './ScaledCard';

const Particles = () => {
  const dots = useMemo(() => {
    const rnd = seededRandom(42);
    return Array.from({ length: 22 }, () => ({
      left: rnd() * 100,
      size: 2 + rnd() * 4,
      delay: rnd() * -14,
      duration: 10 + rnd() * 10,
    }));
  }, []);
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d, i) => (
        <span
          key={i}
          className="absolute bottom-0 animate-float-up rounded-full bg-gold-300"
          style={{
            left: `${d.left}%`,
            width: d.size,
            height: d.size,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.duration}s`,
            boxShadow: '0 0 10px 2px rgba(240,207,119,0.6)',
          }}
        />
      ))}
    </div>
  );
};

const SHOWCASE: { id: TemplateId; className: string }[] = [
  { id: 'genda', className: 'left-0 top-10 w-[46%] -rotate-[9deg] opacity-90' },
  { id: 'amavasya', className: 'right-0 top-10 w-[46%] rotate-[9deg] opacity-90' },
  { id: 'rajwada', className: 'left-1/2 top-0 z-10 w-[54%] -translate-x-1/2' },
];

export const HeroSection = memo(({ language }: { language: Language }) => {
  const sample: CardContent = useMemo(() => {
    const s = t(language);
    return {
      heading: s.heading,
      subheading: s.subheading,
      message: getWishById('traditional-2')?.text[language] ?? '',
      senderIntro: s.senderIntro,
      senderName: language === 'en' ? 'John Doe & Family' : language === 'hi' ? 'जॉन डो एवं परिवार' : 'जॉन डो व परिवार',
      language,
    };
  }, [language]);

  return (
    <section id="top" className="relative overflow-hidden">
      {/* background */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 20% 0%, rgba(122,20,40,0.85), transparent 55%), radial-gradient(ellipse at 90% 30%, rgba(59,17,88,0.75), transparent 55%), radial-gradient(ellipse at 50% 110%, rgba(245,130,31,0.28), transparent 55%), #14050b',
        }}
      />
      <div aria-hidden className="absolute -left-40 top-1/2 hidden -translate-y-1/2 opacity-[0.07] lg:block">
        <Rangoli size={640} palette={['#f0cf77', '#d4a03a', '#f0cf77', '#b8862a', '#f0cf77', '#fff']} />
      </div>
      <Particles />
      <div aria-hidden className="pointer-events-none absolute left-10 top-0 hidden origin-top animate-sway md:block">
        <Lantern size={70} cord={70} colors={['#e63946', '#ffd166', '#ff9f1c']} />
      </div>
      <div aria-hidden className="pointer-events-none absolute right-6 top-0 hidden origin-top animate-sway [animation-delay:-3s] md:block">
        <Lantern size={58} cord={140} colors={['#7b2ff7', '#ffd6ff', '#f0cf77']} />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-24 pt-14 sm:px-6 md:pt-20 lg:grid-cols-[1.05fr_1fr] lg:pb-32">
        <div className="animate-fade-in text-center lg:text-left">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-1.5 text-xs font-medium tracking-wide text-gold-200 sm:text-sm">
            <Languages className="h-4 w-4" /> Free · No sign-up · English, हिन्दी, मराठी
          </p>
          <h1 className="font-display text-4xl font-semibold leading-[1.1] text-cream-50 sm:text-5xl lg:text-6xl">
            Create Your Own <span className="bg-gradient-to-r from-gold-200 via-gold-400 to-saffron-400 bg-clip-text text-transparent">Diwali</span> Greeting Card
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-cream-100/75 sm:text-lg lg:mx-0">
            Spread happiness, love, prosperity and positivity. Create beautiful personalised Diwali wishes for your loved ones.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <a href="#create" className="btn-gold text-base">
              Create Your Card <ArrowRight className="h-5 w-5" />
            </a>
            <a href="#designs" className="btn-ghost text-base">
              <LayoutGrid className="h-5 w-5" /> Explore Designs
            </a>
          </div>
          <ul className="mx-auto mt-10 grid max-w-lg grid-cols-3 gap-3 text-xs text-cream-100/60 sm:text-sm lg:mx-0">
            <li className="flex flex-col items-center gap-1.5 lg:items-start">
              <LayoutGrid className="h-5 w-5 text-gold-300" /> 12 unique designs
            </li>
            <li className="flex flex-col items-center gap-1.5 lg:items-start">
              <Download className="h-5 w-5 text-gold-300" /> HD PNG download
            </li>
            <li className="flex flex-col items-center gap-1.5 lg:items-start">
              <MessageCircle className="h-5 w-5 text-gold-300" /> Share on WhatsApp
            </li>
          </ul>
        </div>

        <div className="relative mx-auto aspect-[1/1] w-full max-w-[540px] animate-fade-in [animation-delay:150ms]" aria-hidden>
          <div className="absolute inset-x-10 bottom-6 top-16 rounded-full bg-gold-400/20 blur-3xl" />
          {SHOWCASE.map((s) => (
            <div key={s.id} className={`absolute overflow-hidden rounded-lg shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] ring-1 ring-gold-400/20 ${s.className}`}>
              <ScaledCard dims={CARD_DIMENSIONS.portrait}>
                <CardRenderer templateId={s.id} format="portrait" content={sample} style={DEFAULT_TEXT_STYLE} />
              </ScaledCard>
            </div>
          ))}
        </div>
      </div>

      {/* diya row */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-center gap-6 sm:gap-12">
        {[44, 54, 66, 54, 44].map((s, i) => (
          <div key={i} className={`${i === 0 || i === 4 ? 'hidden sm:block' : ''} animate-flicker`} style={{ animationDelay: `${i * -0.5}s`, transformOrigin: '50% 80%' }}>
            <Diya size={s} variant={i % 2 ? 'brass' : 'clay'} glow={0.8} />
          </div>
        ))}
      </div>
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />
    </section>
  );
});
HeroSection.displayName = 'HeroSection';
