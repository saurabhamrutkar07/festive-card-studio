import { Download, Palette, PenLine } from 'lucide-react';

const STEPS = [
  { Icon: Palette, title: 'Pick a design', text: 'Choose from 12 handcrafted festive designs and your favourite card size.' },
  { Icon: PenLine, title: 'Personalise it', text: 'Select a heartfelt wish in English, Hindi or Marathi — or write your own — and add your name.' },
  { Icon: Download, title: 'Download & share', text: 'Save a crisp HD PNG and send it to family, friends and colleagues on WhatsApp.' },
];

export const HowItWorks = () => (
  <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
    <div className="grid gap-4 sm:grid-cols-3">
      {STEPS.map(({ Icon, title, text }, i) => (
        <div key={title} className="flex gap-4 rounded-2xl border border-gold-400/10 bg-white/[0.02] p-5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-400/10 text-gold-300">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gold-400/80">Step {i + 1}</p>
            <h3 className="mt-0.5 font-display text-lg font-semibold text-cream-50">{title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-cream-100/60">{text}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);
