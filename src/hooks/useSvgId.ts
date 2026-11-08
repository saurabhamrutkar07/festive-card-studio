import { useId } from 'react';

/** SVG-safe unique id (React's useId contains colons, which break url(#id)). */
export const useSvgId = (prefix: string): string => `${prefix}${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
