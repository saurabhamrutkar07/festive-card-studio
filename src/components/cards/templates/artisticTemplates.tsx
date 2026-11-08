import { CardRoot, FitText, Layer, OrnamentDivider, SenderBlock } from '../parts';
import { FONT_STACKS, resolveTypography } from '../typography';
import { Diya, Glow } from '../decor/lamps';
import { Bokeh, FolkFish, MadhubaniFrame, Sparkles } from '../decor/patterns';
import { LitHouse, StringLights } from '../decor/scenes';
import type { TemplateProps } from './types';

/* ═════════════════════════════════════════════════════════════════════════
 * 9. MADHUBANI — Traditional Indian Art
 *    Folk-art border of fish & leaves; twin fish flanking a diya.
 * ═════════════════════════════════════════════════════════════════════════ */
export const MadhubaniCard = ({ content, format, style, dims }: TemplateProps) => {
  const { width: W, height: H } = dims;
  const L = format === 'landscape';
  const sq = format === 'square';
  const ty = resolveTypography(style, { font: 'folk', color: '#3b1a0c', align: 'center' });
  const band = L ? 104 : 96;
  const fish = L ? 220 : sq ? 170 : 210;
  const red = '#8a1c0c';

  return (
    <CardRoot dims={dims} background="radial-gradient(ellipse at 50% 45%, #fbefd0 0%, #f6e3b4 60%, #ecd096 100%)">
      <MadhubaniFrame width={W} height={H} band={band} />
      <div
        style={{
          position: 'absolute',
          inset: L ? `${band + 40}px ${band + 220}px ${band + 40}px` : `${band + (sq ? 30 : 46)}px ${band + 54}px ${band + (sq ? 30 : 50)}px`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: sq ? 6 : 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
          <FolkFish width={fish} />
          <Diya size={fish * 0.62} variant="painted" glow={0.5} />
          <FolkFish width={fish} flip />
        </div>
        <FitText
          text={content.heading}
          max={L ? 100 : sq ? 76 : 96}
          min={38}
          lineHeight={1.25}
          boxStyle={{ flex: 'none', height: L ? 130 : sq ? 100 : 136 }}
          style={{ fontFamily: FONT_STACKS.yatra, color: red, textShadow: '0 3px 0 rgba(246,196,83,0.7)' }}
        />
        <div style={{ fontFamily: FONT_STACKS.folk, fontWeight: 700, fontSize: 26, color: '#2f7d5b', flexShrink: 0 }}>{content.subheading}</div>
        <OrnamentDivider color={red} width={200} />
        <FitText
          text={content.message}
          max={Math.round((sq ? 40 : 50) * ty.scale)}
          min={18}
          lineHeight={1.55}
          style={{ fontFamily: ty.font, color: ty.color, fontWeight: 400 }}
        />
        <SenderBlock
          intro={content.senderIntro}
          name={content.senderName}
          align={ty.senderAlign}
          nameMax={Math.round((sq ? 38 : 44) * ty.scale)}
          introStyle={{ fontFamily: FONT_STACKS.folk, fontSize: 22, color: style.textColor === 'template' ? '#2f7d5b' : ty.color, fontWeight: 700 }}
          nameStyle={{ fontFamily: style.fontStyle === 'template' ? FONT_STACKS.yatra : ty.font, color: style.textColor === 'template' ? red : ty.color }}
        />
      </div>
    </CardRoot>
  );
};

/* ═════════════════════════════════════════════════════════════════════════
 * 10. AURORA GLOW — Contemporary Gradient
 *     Mesh gradient, giant outlined word and a frosted glass panel.
 * ═════════════════════════════════════════════════════════════════════════ */
export const AuroraCard = ({ content, format, style, dims }: TemplateProps) => {
  const { width: W, height: H } = dims;
  const L = format === 'landscape';
  const sq = format === 'square';
  const ty = resolveTypography(style, { font: 'sans', color: '#ffffff', align: 'left' });
  const ghost = content.language === 'en' ? 'DIWALI' : 'दीपावली';
  const panel = L
    ? { left: W * 0.42, right: 110, top: 110, bottom: 110 }
    : sq
      ? { left: 80, right: 80, top: 300, bottom: 80 }
      : { left: 80, right: 80, top: 420, bottom: 90 };

  return (
    <CardRoot
      dims={dims}
      background={[
        'radial-gradient(at 12% 18%, #ff7a3d 0px, transparent 52%)',
        'radial-gradient(at 88% 12%, #ff3d9a 0px, transparent 50%)',
        'radial-gradient(at 82% 88%, #7b2ff7 0px, transparent 55%)',
        'radial-gradient(at 8% 92%, #2a3dd1 0px, transparent 50%)',
        'radial-gradient(at 50% 50%, #c2338a 0px, transparent 60%)',
        '#2a0f4a',
      ].join(', ')}
    >
      <Glow size={420} color="#ffd166" opacity={0.45} style={{ left: L ? 240 : W - 360, top: L ? H - 420 : 120 }} />
      <Glow size={300} color="#ffffff" opacity={0.18} style={{ left: 60, top: L ? 60 : 260 }} />
      {L && <Diya size={300} variant="gold" glow={0.85} style={{ position: 'absolute', left: 250, bottom: 150 }} />}
      {/* outlined ghost word */}
      <div
        style={{
          position: 'absolute',
          left: L ? 70 : 50,
          top: L ? 110 : sq ? 40 : 80,
          width: L ? W * 0.42 - 40 : W - 100,
          fontFamily: content.language === 'en' ? FONT_STACKS.sans : "'Noto Sans Devanagari', sans-serif",
          fontWeight: 700,
          fontSize: L ? (content.language === 'en' ? 186 : 168) : content.language === 'en' ? (sq ? 220 : 250) : sq ? 200 : 230,
          lineHeight: 1.05,
          letterSpacing: content.language === 'en' ? -4 : 0,
          color: 'rgba(255,255,255,0.06)',
          WebkitTextStroke: '2.5px rgba(255,255,255,0.5)',
          wordBreak: 'break-all',
          whiteSpace: 'nowrap',
        }}
      >
        {ghost}
      </div>
      <div
        style={{
          position: 'absolute',
          ...panel,
          borderRadius: 48,
          background: 'linear-gradient(150deg, rgba(255,255,255,0.24), rgba(255,255,255,0.08))',
          border: '1.5px solid rgba(255,255,255,0.45)',
          boxShadow: '0 30px 80px -20px rgba(20,0,40,0.55), inset 0 1px 0 rgba(255,255,255,0.4)',
          padding: sq ? '44px 56px' : '60px 64px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          textAlign: 'left',
          gap: sq ? 10 : 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexShrink: 0 }}>
          <div style={{ width: 84, height: 84, borderRadius: 24, background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Diya size={70} variant="gold" glow={0.5} />
          </div>
          <div style={{ fontFamily: FONT_STACKS.sans, fontSize: 22, letterSpacing: 5, fontWeight: 500, textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)' }}>
            {content.subheading}
          </div>
        </div>
        <FitText
          text={content.heading}
          max={L ? 104 : sq ? 76 : 96}
          min={38}
          lineHeight={1.15}
          valign="start"
          boxStyle={{ flex: 'none', height: L ? 140 : sq ? 100 : 128 }}
          style={{ fontFamily: FONT_STACKS.sans, fontWeight: 600, color: '#ffffff', textAlign: 'left', letterSpacing: content.language === 'en' ? -1 : 0 }}
        />
        <FitText
          text={content.message}
          max={Math.round((sq ? 34 : 42) * ty.scale)}
          min={17}
          lineHeight={1.6}
          valign="start"
          style={{ fontFamily: ty.font, color: ty.color, fontWeight: 300, textAlign: 'left' }}
        />
        <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.35)', flexShrink: 0 }} />
        <SenderBlock
          intro={content.senderIntro}
          name={content.senderName}
          align={ty.senderAlign}
          nameMax={Math.round((sq ? 36 : 42) * ty.scale)}
          introStyle={{ fontFamily: FONT_STACKS.sans, fontSize: 20, color: style.textColor === 'template' ? 'rgba(255,255,255,0.75)' : ty.color }}
          nameStyle={{ fontFamily: style.fontStyle === 'template' ? FONT_STACKS.sans : ty.font, fontWeight: 600, color: ty.color }}
        />
      </div>
    </CardRoot>
  );
};

/* ═════════════════════════════════════════════════════════════════════════
 * 11. GHAR AANGAN — Family Celebration
 *     Dusk sky, string lights and a family home glowing with diyas.
 * ═════════════════════════════════════════════════════════════════════════ */
export const ParivarCard = ({ content, format, style, dims }: TemplateProps) => {
  const { width: W, height: H } = dims;
  const L = format === 'landscape';
  const sq = format === 'square';
  const ty = resolveTypography(style, { font: 'serif', color: '#fff4e0', align: 'center' });
  const houseW = L ? 1000 : sq ? 720 : 900;
  const houseH = houseW * 0.6;

  return (
    <CardRoot dims={dims} background="linear-gradient(180deg, #1d0b2e 0%, #3a1440 42%, #7e3048 74%, #d2703a 100%)">
      <Sparkles width={W} height={H} count={L ? 50 : 36} color="#fff6d8" seed={33} maxSize={9} area={[0.04, 0.2]} />
      <StringLights width={W / 2 + 20} sag={L ? 70 : 60} bulbs={L ? 12 : 8} style={{ position: 'absolute', left: -10, top: 0 }} />
      <StringLights width={W / 2 + 20} sag={L ? 70 : 60} bulbs={L ? 12 : 8} style={{ position: 'absolute', right: -10, top: 0 }} />
      <Glow size={houseW * 1.2} color="#ffb347" opacity={0.35} style={{ left: L ? W - houseW * 1.1 : W / 2 - houseW * 0.6, bottom: -houseW * 0.5 }} />
      <LitHouse width={houseW} style={{ position: 'absolute', bottom: 0, left: L ? W - houseW - 30 : W / 2 - houseW / 2 }} />

      <div
        style={{
          position: 'absolute',
          left: L ? 110 : sq ? 110 : 100,
          right: L ? houseW + 60 : sq ? 110 : 100,
          top: L ? 170 : sq ? 120 : 160,
          bottom: L ? 110 : houseH + (sq ? 10 : 30),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: sq ? 4 : 12,
        }}
      >
        <FitText
          text={content.heading}
          max={L ? 150 : sq ? 104 : 140}
          min={44}
          lineHeight={1.15}
          boxStyle={{ flex: 'none', height: L ? 200 : sq ? 128 : 180 }}
          style={{ fontFamily: FONT_STACKS.script, color: '#ffd27a', textShadow: '0 0 30px rgba(255,180,80,0.55)' }}
        />
        <div style={{ fontFamily: FONT_STACKS.sans, fontSize: sq ? 19 : 22, letterSpacing: 5, color: '#ffb8a0', fontWeight: 500, textTransform: 'uppercase', flexShrink: 0 }}>
          {content.subheading}
        </div>
        <FitText
          text={content.message}
          max={Math.round((sq ? 34 : 40) * ty.scale)}
          min={17}
          lineHeight={1.5}
          style={{ fontFamily: ty.font, color: ty.color }}
        />
        <SenderBlock
          intro={content.senderIntro}
          name={content.senderName}
          align={ty.senderAlign}
          nameMax={Math.round((sq ? 34 : 44) * ty.scale)}
          gap={sq ? 2 : 6}
          introStyle={{ fontFamily: FONT_STACKS.sans, fontSize: sq ? 18 : 20, color: style.textColor === 'template' ? '#ffcf9a' : ty.color }}
          nameStyle={{ fontFamily: style.fontStyle === 'template' ? FONT_STACKS.serif : ty.font, color: style.textColor === 'template' ? '#ffe2a8' : ty.color, fontWeight: 700 }}
        />
      </div>
    </CardRoot>
  );
};

/* ═════════════════════════════════════════════════════════════════════════
 * 12. AMAVASYA — Premium Dark Theme
 *     Moonless night, golden bokeh and one magnificent glowing diya.
 * ═════════════════════════════════════════════════════════════════════════ */
export const AmavasyaCard = ({ content, format, style, dims }: TemplateProps) => {
  const { width: W, height: H } = dims;
  const L = format === 'landscape';
  const sq = format === 'square';
  const ty = resolveTypography(style, { font: 'garamond', color: '#e9e2d0', align: 'center' });
  const gold = '#f5c451';
  const diya = L ? 470 : sq ? 270 : 370;
  const diyaLeft = L ? W - diya - 210 : W / 2 - diya / 2;
  const diyaBottom = L ? H / 2 - diya / 2 - 40 : sq ? 40 : 60;

  return (
    <CardRoot dims={dims} background="radial-gradient(ellipse at 50% 88%, #1d2858 0%, #0a1030 42%, #060a1a 75%, #03050d 100%)">
      <Bokeh width={W} height={H} count={L ? 26 : 20} colors={['#f5c451', '#ff9f43', '#fff1c1']} seed={8} />
      <Sparkles width={W} height={H} count={L ? 50 : 36} color="#ffffff" seed={14} maxSize={7} />
      <Layer style={{ inset: 36, borderRadius: 28, border: `1px solid ${gold}80` }} />
      <Glow size={diya * 2.6} color="#ffb84d" opacity={0.42} style={{ left: diyaLeft - diya * 0.8, bottom: diyaBottom - diya * 0.7 }} />
      <Diya size={diya} variant="gold" glow={0.9} style={{ position: 'absolute', left: diyaLeft, bottom: diyaBottom }} />
      {/* reflection */}
      <Layer
        style={{
          left: diyaLeft - diya * 0.2,
          width: diya * 1.4,
          bottom: diyaBottom - 8,
          height: 30,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(255,190,90,0.45), transparent 70%)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: L ? 150 : sq ? 120 : 110,
          right: L ? diya + 330 : sq ? 120 : 110,
          top: L ? 140 : sq ? 100 : 140,
          bottom: L ? 140 : diya * 0.86 + diyaBottom + (sq ? 10 : 30),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: sq ? 6 : 14,
        }}
      >
        <svg width="120" height="24" viewBox="0 0 120 24" style={{ flexShrink: 0 }}>
          <path d="M0 12 H44 M76 12 H120" stroke={gold} strokeWidth="1" />
          <path d="M60 0 Q60 12 72 12 Q60 12 60 24 Q60 12 48 12 Q60 12 60 0 Z" fill={gold} />
        </svg>
        <FitText
          text={content.heading}
          max={L ? 120 : sq ? 84 : 110}
          min={40}
          lineHeight={1.15}
          boxStyle={{ flex: 'none', height: L ? 290 : sq ? 110 : 150 }}
          style={{
            fontFamily: FONT_STACKS.garamond,
            fontWeight: 600,
            color: '#f5d78a',
            letterSpacing: content.language === 'en' ? 4 : 0,
            textTransform: 'uppercase',
            textShadow: '0 0 40px rgba(245,196,81,0.4)',
          }}
        />
        <div style={{ fontFamily: FONT_STACKS.sans, fontSize: 20, letterSpacing: 7, color: `${gold}cc`, fontWeight: 400, textTransform: 'uppercase', flexShrink: 0 }}>
          {content.subheading}
        </div>
        <FitText
          text={content.message}
          max={Math.round((sq ? 42 : 48) * ty.scale)}
          min={18}
          lineHeight={1.5}
          style={{ fontFamily: ty.font, color: ty.color, fontStyle: style.fontStyle === 'template' ? 'italic' : 'normal' }}
        />
        <SenderBlock
          intro={content.senderIntro}
          name={content.senderName}
          align={ty.senderAlign}
          nameMax={Math.round((sq ? 36 : 46) * ty.scale)}
          introStyle={{ fontFamily: FONT_STACKS.sans, fontSize: 18, letterSpacing: 4, textTransform: 'uppercase', color: style.textColor === 'template' ? `${gold}bb` : ty.color }}
          nameStyle={{ fontFamily: style.fontStyle === 'template' ? FONT_STACKS.garamond : ty.font, fontWeight: 600, color: style.textColor === 'template' ? '#f5d78a' : ty.color }}
        />
      </div>
    </CardRoot>
  );
};
