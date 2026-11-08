import { memo } from 'react';
import { Check } from 'lucide-react';
import type { CardContent, CardTemplate, TextStyleOptions } from '../types/card';
import { CARD_DIMENSIONS } from '../data/templates';
import { CardRenderer } from './cards/CardRenderer';
import { ScaledCard } from './ScaledCard';

interface TemplateCardProps {
  template: CardTemplate;
  selected: boolean;
  sample: CardContent;
  sampleStyle: TextStyleOptions;
  onSelect: (id: CardTemplate['id']) => void;
}

export const TemplateCard = memo(({ template, selected, sample, sampleStyle, onSelect }: TemplateCardProps) => (
  <button
    type="button"
    onClick={() => onSelect(template.id)}
    aria-pressed={selected}
    aria-label={`${template.name} — ${template.category}`}
    className={`group relative flex flex-col overflow-hidden rounded-xl border text-left transition duration-200 ${
      selected
        ? 'border-gold-400 bg-gold-400/10 shadow-[0_0_0_3px_rgba(229,184,75,0.25)]'
        : 'border-gold-400/10 bg-black/20 hover:-translate-y-0.5 hover:border-gold-400/45'
    }`}
  >
    <div className="relative overflow-hidden">
      <ScaledCard dims={CARD_DIMENSIONS.portrait}>
        <CardRenderer templateId={template.id} format="portrait" content={sample} style={sampleStyle} />
      </ScaledCard>
      {selected && (
        <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-gold-400 text-maroon-900 shadow-lg">
          <Check className="h-4 w-4" strokeWidth={3} />
        </span>
      )}
    </div>
    <div className="flex flex-1 flex-col gap-0.5 px-2.5 py-2">
      <span className={`truncate text-sm font-semibold ${selected ? 'text-gold-200' : 'text-cream-50'}`}>{template.name}</span>
      <span className="truncate text-[11px] text-cream-100/50">{template.category}</span>
    </div>
  </button>
));
TemplateCard.displayName = 'TemplateCard';
