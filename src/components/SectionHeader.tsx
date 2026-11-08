import type { ReactNode } from 'react';

export const SectionHeader = ({ step, title, subtitle, action }: { step: number; title: string; subtitle?: string; action?: ReactNode }) => (
  <div className="mb-5 flex items-start justify-between gap-3">
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold-400/50 bg-gold-400/10 text-sm font-semibold text-gold-300">
        {step}
      </span>
      <div>
        <h3 className="font-display text-xl font-semibold text-cream-50">{title}</h3>
        {subtitle && <p className="mt-0.5 text-sm text-cream-100/55">{subtitle}</p>}
      </div>
    </div>
    {action}
  </div>
);
