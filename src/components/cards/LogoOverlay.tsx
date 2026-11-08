import type { CardDimensions, LogoOptions } from '../../types/card';
import { logoFrameRadius, logoImgStyle } from './logoShape';

/** Logo box height as a share of the card's shorter side. */
const SIZE_RATIO = { sm: 0.1, md: 0.14, lg: 0.19 } as const;
/** Keeps the logo clear of the frames most templates draw near the edge. */
const EDGE_INSET = 0.055;

/** Business logo drawn above any template, inside the exported node. */
export const LogoOverlay = ({ logo, dims }: { logo: LogoOptions; dims: CardDimensions }) => {
  if (!logo.src) return null;
  const short = Math.min(dims.width, dims.height);
  const boxH = Math.round(short * SIZE_RATIO[logo.size]);
  const inset = Math.round(short * EDGE_INSET);
  const pad = logo.backdrop ? Math.round(boxH * 0.14) : 0;
  const [v, h] = logo.position.split('-') as ['top' | 'bottom', 'left' | 'center' | 'right'];

  return (
    <div
      data-card-logo
      style={{
        position: 'absolute',
        [v]: inset,
        ...(h === 'center' ? { left: '50%', transform: 'translateX(-50%)' } : { [h]: inset }),
        zIndex: 20,
        padding: pad,
        borderRadius: logo.backdrop ? logoFrameRadius(logo.shape, Math.round(boxH * 0.18)) : 0,
        background: logo.backdrop ? 'rgba(255,255,255,0.92)' : 'transparent',
        boxShadow: logo.backdrop ? '0 6px 24px rgba(0,0,0,0.25)' : 'none',
        lineHeight: 0,
      }}
    >
      <img src={logo.src} alt="" style={logoImgStyle(logo.shape, boxH, Math.round(dims.width * 0.32))} />
    </div>
  );
};
