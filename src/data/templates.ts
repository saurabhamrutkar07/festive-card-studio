import type { CardDimensions, CardFormat, CardTemplate, TemplateCategory } from '../types/card';

export const CARD_TEMPLATES: CardTemplate[] = [
  {
    id: 'deepmala',
    name: 'Deepmala',
    category: 'Traditional Diwali',
    description: 'Marigold toran, a row of glowing diyas and a classic double gold frame.',
    defaultTextColor: '#fbe9c6',
    swatch: ['#6b0f1a', '#e9b44c'],
  },
  {
    id: 'rajwada',
    name: 'Rajwada',
    category: 'Royal Gold',
    description: 'Ornate palace-style frame with gilded corners and a royal mandala.',
    defaultTextColor: '#f7e7c1',
    swatch: ['#2b0d3a', '#d4af37'],
  },
  {
    id: 'shuddh',
    name: 'Shuddh',
    category: 'Modern Minimal',
    description: 'Calm ivory canvas, one line-art diya and confident left-aligned type.',
    defaultTextColor: '#3a2a20',
    swatch: ['#faf6ee', '#c8862a'],
  },
  {
    id: 'genda',
    name: 'Genda Phool',
    category: 'Floral Diwali',
    description: 'Lush marigold and jasmine clusters framing flowing script lettering.',
    defaultTextColor: '#5a2a12',
    swatch: ['#fff3dc', '#f08a1c'],
  },
  {
    id: 'rangoli',
    name: 'Rangoli Utsav',
    category: 'Rangoli Theme',
    description: 'A vibrant hand-drawn rangoli centrepiece on a deep teal night.',
    defaultTextColor: '#e9f6f2',
    swatch: ['#0c3b40', '#ff5c8a'],
  },
  {
    id: 'omkar',
    name: 'Omkar',
    category: 'Spiritual Diwali',
    description: 'Temple-arch frame, a radiant Om and the soft glow of a single diya.',
    defaultTextColor: '#4a1c06',
    swatch: ['#ffd9a0', '#c2410c'],
  },
  {
    id: 'noir',
    name: 'Swarna Noir',
    category: 'Elegant Luxury',
    description: 'Art-deco gold linework on jet black with refined serif typography.',
    defaultTextColor: '#e8dcc0',
    swatch: ['#0b0b0d', '#c9a227'],
  },
  {
    id: 'utsav',
    name: 'Utsav Night',
    category: 'Colourful Festive',
    description: 'Fireworks bursting over hanging lanterns in a joyful night sky.',
    defaultTextColor: '#ffffff',
    swatch: ['#1b1050', '#ff3d7f'],
  },
  {
    id: 'madhubani',
    name: 'Madhubani',
    category: 'Traditional Indian Art',
    description: 'Folk-art border of fish, peacocks and leaves around a terracotta panel.',
    defaultTextColor: '#3b1a0c',
    swatch: ['#b5452a', '#f6e3b4'],
  },
  {
    id: 'aurora',
    name: 'Aurora Glow',
    category: 'Contemporary Gradient',
    description: 'Sunset mesh gradient with a frosted-glass panel and bold outlined type.',
    defaultTextColor: '#ffffff',
    swatch: ['#ff7a3d', '#7b2ff7'],
  },
  {
    id: 'parivar',
    name: 'Ghar Aangan',
    category: 'Family Celebration',
    description: 'A warm home lit with diyas, string lights and lanterns for the whole family.',
    defaultTextColor: '#fff4e0',
    swatch: ['#3a1440', '#ffb347'],
  },
  {
    id: 'amavasya',
    name: 'Amavasya',
    category: 'Premium Dark Theme',
    description: 'Moonless midnight, golden bokeh and one magnificent glowing diya.',
    defaultTextColor: '#e9e2d0',
    swatch: ['#060a1a', '#f5c451'],
  },
];

export const TEMPLATE_CATEGORIES: TemplateCategory[] = CARD_TEMPLATES.map((t) => t.category);

export const CARD_DIMENSIONS: Record<CardFormat, CardDimensions> = {
  portrait: { width: 1080, height: 1350, label: 'Portrait · 1080 × 1350' },
  square: { width: 1080, height: 1080, label: 'Square · 1080 × 1080' },
  landscape: { width: 1920, height: 1080, label: 'Landscape · 1920 × 1080' },
};

export const getTemplateById = (id: string): CardTemplate =>
  CARD_TEMPLATES.find((t) => t.id === id) ?? CARD_TEMPLATES[0];
