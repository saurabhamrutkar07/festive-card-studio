import { memo, useMemo, useState } from 'react';
import { categoriesForMode, templatesForMode } from '../data/templates';
import { t } from '../data/translations';
import { DEFAULT_TEXT_STYLE } from '../hooks/useCardGenerator';
import type { CardContent, CardMode, Language, TemplateCategory, TemplateId } from '../types/card';
import { TemplateCard } from './TemplateCard';
import { getWishById } from '../data/wishes';

interface Props {
  selectedId: TemplateId;
  language: Language;
  mode: CardMode;
  onSelect: (id: TemplateId) => void;
}

export const TemplateGallery = memo(({ selectedId, language, mode, onSelect }: Props) => {
  const [category, setCategory] = useState<TemplateCategory | 'All'>('All');

  const sample: CardContent = useMemo(() => {
    const s = t(language);
    const base = { heading: s.heading, subheading: s.subheading, senderIntro: s.senderIntro, language };
    if (mode === 'business') {
      return {
        ...base,
        message: getWishById('professional-1')?.text[language] ?? '',
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
    return {
      ...base,
      message: getWishById('prosperity-1')?.text[language] ?? '',
      senderName: language === 'en' ? 'The Sharma Family' : language === 'hi' ? 'शर्मा परिवार' : 'देशमुख परिवार',
    };
  }, [language, mode]);

  const modeTemplates = templatesForMode(mode);
  const templates = category === 'All' ? modeTemplates : modeTemplates.filter((tpl) => tpl.category === category);

  return (
    <div>
      <div className="scrollbar-thin -mx-1 mb-4 flex gap-2 overflow-x-auto px-1 pb-2" role="tablist" aria-label="Design categories">
        {(['All', ...categoriesForMode(mode)] as const).map((c) => (
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
