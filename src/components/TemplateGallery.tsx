import { memo, useMemo, useState } from 'react';
import { categoriesFor, templatesFor } from '../data/templates';
import { occasionText } from '../data/occasions';
import { t } from '../data/translations';
import { DEFAULT_TEXT_STYLE } from '../hooks/useCardGenerator';
import type { CardContent, CardMode, Language, Occasion, TemplateCategory, TemplateId } from '../types/card';
import { TemplateCard } from './TemplateCard';
import { wishesForOccasion } from '../data/wishes';

interface Props {
  selectedId: TemplateId;
  language: Language;
  mode: CardMode;
  occasion: Occasion;
  onSelect: (id: TemplateId) => void;
}

export const TemplateGallery = memo(({ selectedId, language, mode, occasion, onSelect }: Props) => {
  const [category, setCategory] = useState<TemplateCategory | 'All'>('All');

  const sample: CardContent = useMemo(() => {
    const s = t(language);
    const text = occasionText(occasion, 'primary', language);
    const pool = wishesForOccasion(occasion);
    const pick = (category: string) => (pool.find((w) => w.category === category) ?? pool[0])?.text[language] ?? '';
    const base = { heading: text.heading, subheading: text.subheading, senderIntro: text.senderIntro, language };
    if (mode === 'business') {
      return {
        ...base,
        message: pick('professional'),
        senderName: 'Sharma Sweets',
        business: {
          name: 'Sharma Sweets',
          tagline: 'Pure Ghee Mithai since 1985',
          contacts: [
            { kind: 'phone', text: '+91 98XXX XXXXX' },
            { kind: 'website', text: 'sharmasweets.in' },
          ],
        },
      };
    }
    if (occasion === 'bhaubij') return { ...base, message: pick('forBrother'), senderIntro: s.fromSister, senderName: 'Priya' };
    if (occasion === 'padwa') return { ...base, message: pick('spouse'), senderName: language === 'en' ? 'Rahul & Priya' : 'राहुल व प्रिया' };
    return {
      ...base,
      message: pick('prosperity'),
      senderName: language === 'en' ? 'The Sharma Family' : language === 'hi' ? 'शर्मा परिवार' : 'देशमुख परिवार',
    };
  }, [language, mode, occasion]);

  const modeTemplates = templatesFor(mode, occasion);
  const templates = category === 'All' ? modeTemplates : modeTemplates.filter((tpl) => tpl.category === category);

  return (
    <div>
      <div className="scrollbar-thin -mx-1 mb-4 flex gap-2 overflow-x-auto px-1 pb-2" role="tablist" aria-label="Design categories">
        {(['All', ...categoriesFor(mode, occasion)] as const).map((c) => (
          <button
            key={c}
            type="button"
            role="tab"
            aria-selected={category === c}
            onClick={() => setCategory(c)}
            className={`chip ${category === c ? 'chip-active' : 'chip-idle'}`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
        {templates.map((tpl) => (
          <TemplateCard
            key={tpl.id}
            template={tpl}
            selected={tpl.id === selectedId}
            sample={sample}
            sampleStyle={DEFAULT_TEXT_STYLE}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
});
TemplateGallery.displayName = 'TemplateGallery';
