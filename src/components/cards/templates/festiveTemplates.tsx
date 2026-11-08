import { CardRoot, FitText, Layer, OrnamentDivider, SenderBlock } from '../parts';
import { FONT_STACKS, resolveTypography } from '../typography';
import { Diya, Glow, Lantern, LineDiya } from '../decor/lamps';
import { MarigoldString } from '../decor/florals';
import { DecoFan, DotBorder, Firework, Rangoli, Rays, Sparkles } from '../decor/patterns';
import { TempleArch } from '../decor/scenes';
import type { TemplateProps } from './types';

/* ═════════════════════════════════════════════════════════════════════════
 * 5. RANGOLI UTSAV — Rangoli Theme
 *    Deep teal night with a vibrant rangoli centrepiece and dotted border.
 * ═════════════════════════════════════════════════════════════════════════ */
export const RangoliCard = ({ content, format, style, dims }: TemplateProps) => {
  const { width: W, height: H } = dims;
  const L = format === 'landscape';
  const sq = format === 'square';
  const ty = resolveTypography(style, { font: 'sans', color: '#e9f6f2', align: 'center' });
  const rangoli = L ? 760 : sq ? 360 : 500;
  const accent = '#ffd166';

  const art = (
    <div style={{ position: 'relative', width: rangoli, height: rangoli, flexShrink: 0 }}>
      <Glow size={rangoli * 1.3} color="#2ec4b6" opacity={0.35} style={{ left: -rangoli * 0.15, top: -rangoli * 0.15 }} />
      <Rangoli size={rangoli} style={{ position: 'absolute', inset: 0 }} />
      {[
        [-0.06, 0.78],
        [0.86, 0.78],
      ].map(([x, y], i) => (
        <Diya key={i} size={rangoli * 0.22} glow={0.8} variant="painted" style={{ position: 'absolute', left: rangoli * x, top: rangoli * y }} />
      ))}
    </div>
  );

  return (
    <CardRoot dims={dims} background="radial-gradient(ellipse at 50% 35%, #16656b 0%, #0c3b40 55%, #06242a 100%)">
      <Sparkles width={W} height={H} count={L ? 70 : 50} color="#fff2c2" seed={21} maxSize={10} />
      <DotBorder width={W} height={H} inset={34} colors={['#ff4f81', '#ffb703', '#2ec4b6', '#ffffff']} />
      <Layer style={{ inset: 52, border: '1.5px solid rgba(255,255,255,0.25)', borderRadius: 18 }} />

      <div
        style={{
          position: 'absolute',
          inset: L ? '90px 130px 90px 110px' : sq ? '70px 110px 80px' : '90px 110px 100px',
          display: 'flex',
          flexDirection: L ? 'row' : 'column',
          alignItems: 'center',
          gap: L ? 80 : sq ? 14 : 30,
        }}
      >
        {art}
        <div style={{ flex: 1, minHeight: 0, minWidth: 0, alignSelf: 'stretch', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: sq ? 6 : 14 }}>
          <FitText
            text={content.heading}
            max={L ? 120 : sq ? 76 : 96}
            min={40}
            lineHeight={1.25}
            boxStyle={{ flex: 'none', height: L ? 290 : sq ? 100 : 140 }}
            style={{ fontFamily: FONT_STACKS.yatra, color: accent, textShadow: '0 4px 0 #b5179e, 0 0 26px rgba(255,209,102,0.4)' }}
          />
          <div style={{ fontFamily: FONT_STACKS.sans, fontSize: 22, letterSpacing: 6, textTransform: 'uppercase', color: '#ff8fab', fontWeight: 600, flexShrink: 0 }}>
            {content.subheading}
          </div>
          <FitText
            text={content.message}
            max={Math.round((sq ? 36 : 44) * ty.scale)}
            min={18}
            lineHeight={1.55}
            style={{ fontFamily: ty.font, color: ty.color, fontWeight: 400 }}
          />
          <SenderBlock
            intro={content.senderIntro}
            name={content.senderName}
            align={ty.senderAlign}
            nameMax={Math.round((sq ? 38 : 44) * ty.scale)}
            introStyle={{ fontFamily: FONT_STACKS.sans, fontSize: 21, color: style.textColor === 'template' ? '#9fe3d8' : ty.color }}
            nameStyle={{ fontFamily: style.fontStyle === 'template' ? FONT_STACKS.yatra : ty.font, color: style.textColor === 'template' ? accent : ty.color }}
          />
        </div>
      </div>
    </CardRoot>
  );
};

/* ═════════════════════════════════════════════════════════════════════════
 * 6. OMKAR — Spiritual Diwali
 *    Saffron dawn inside a temple arch, radiant Om and a single diya.
 * ═════════════════════════════════════════════════════════════════════════ */
export const OmkarCard = ({ content, format, style, dims }: TemplateProps) => {
  const { width: W, height: H } = dims;
  const L = format === 'landscape';
  const sq = format === 'square';
  const ty = resolveTypography(style, { font: 'devaSerif', color: '#4a1c06', align: 'center' });
  const inset = 46;
  const omSize = L ? 150 : sq ? 160 : 220;
  const rays = omSize * 2.6;
  const omTop = L ? 105 : sq ? 120 : 170;
  const brown = '#b5420f';

  return (
    <CardRoot dims={dims} background="linear-gradient(180deg, #fff3dc 0%, #ffd9a0 55%, #f6a55a 100%)">
      <TempleArch width={W} height={H} inset={inset} stroke={brown} fill="rgba(255,250,238,0.55)" />
      <Rays size={rays} color="#f08a24" count={40} opacity={0.35} style={{ position: 'absolute', left: W / 2 - rays / 2, top: omTop + omSize * 0.55 - rays / 2 }} />
      <Glow size={omSize * 2} color="#ffe7a8" opacity={0.9} style={{ left: W / 2 - omSize, top: omTop + omSize * 0.55 - omSize }} />
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: omTop,
          height: omSize * 1.1,
          textAlign: 'center',
          fontFamily: "'Noto Serif Devanagari', serif",
          fontWeight: 700,
          fontSize: omSize,
          lineHeight: 1.1,
          color: '#c2410c',
          textShadow: '0 0 30px rgba(255,190,90,0.9), 0 4px 0 #7a1d06',
        }}
      >
        ॐ
      </div>
      {!sq && (
        <>
          <MarigoldString height={L ? 280 : 360} flowers={L ? 4 : 5} style={{ position: 'absolute', left: inset + 34, top: L ? 240 : 380 }} />
          <MarigoldString height={L ? 280 : 360} flowers={L ? 4 : 5} style={{ position: 'absolute', right: inset + 34, top: L ? 240 : 380 }} />
        </>
      )}
      <Diya size={L ? 120 : sq ? 100 : 130} glow={0.8} style={{ position: 'absolute', left: W / 2 - (L ? 60 : sq ? 50 : 65), bottom: inset + 24 }} />

      <div
        style={{
          position: 'absolute',
          left: L ? 340 : sq ? 130 : 175,
          right: L ? 340 : sq ? 130 : 175,
          top: omTop + omSize * 1.15 + (sq ? 4 : 20),
          bottom: inset + (L ? 140 : sq ? 135 : 175),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: sq ? 8 : 14,
        }}
      >
        <FitText
          text={content.heading}
          max={L ? 92 : sq ? 74 : 90}
          min={38}
          lineHeight={1.25}
          boxStyle={{ flex: 'none', height: L ? 120 : sq ? 100 : 130 }}
          style={{ fontFamily: FONT_STACKS.devaSerif, fontWeight: 700, color: '#7a1d06' }}
        />
        <OrnamentDivider color={brown} width={220} />
        <FitText
          text={content.message}
          max={Math.round((sq ? 36 : 44) * ty.scale)}
          min={18}
          lineHeight={1.6}
          style={{ fontFamily: ty.font, color: ty.color, fontWeight: 500 }}
        />
        <SenderBlock
          intro={content.senderIntro}
          name={content.senderName}
          align={ty.senderAlign}
          nameMax={Math.round((sq ? 36 : 42) * ty.scale)}
          introStyle={{ fontFamily: FONT_STACKS.devaSerif, fontSize: 22, color: style.textColor === 'template' ? brown : ty.color }}
          nameStyle={{ fontFamily: style.fontStyle === 'template' ? FONT_STACKS.devaSerif : ty.font, color: style.textColor === 'template' ? '#7a1d06' : ty.color, fontWeight: 700 }}
        />
      </div>
    </CardRoot>
  );
};

/* ═════════════════════════════════════════════════════════════════════════
 * 7. SWARNA NOIR — Elegant Luxury
 *    Jet black, art-deco gold sunburst, left-aligned editorial type.
 * ═════════════════════════════════════════════════════════════════════════ */
export const NoirCard = ({ content, format, style, dims }: TemplateProps) => {
  const { width: W } = dims;
  const L = format === 'landscape';
  const sq = format === 'square';
  const ty = resolveTypography(style, { font: 'garamond', color: '#e8dcc0', align: 'left' });
  const gold = '#c9a227';
  const fan = L ? 760 : sq ? 520 : 600;
  const left = L ? 170 : 150;

  return (
    <CardRoot dims={dims} background="linear-gradient(140deg, #18181b 0%, #0b0b0d 50%, #040405 100%)">
      <Layer style={{ inset: 40, border: `1px solid ${gold}88` }} />
      <Layer style={{ inset: 52, border: `1px solid ${gold}33` }} />
      <DecoFan
        size={fan}
        color={gold}
        style={{ position: 'absolute', left: L ? W - fan - 120 : W / 2 - fan / 2, bottom: 53, opacity: 0.85 }}
      />
      {/* diagonal deco lines */}
      <svg width="260" height="260" viewBox="0 0 260 260" style={{ position: 'absolute', right: 53, top: 53 }}>
        {[0, 22, 44].map((o) => (
          <line key={o} x1={60 + o} y1="0" x2="260" y2={200 - o} stroke={gold} strokeWidth="1.5" opacity={0.8 - o / 100} />
        ))}
      </svg>
      <Layer style={{ left: left - 46, top: L ? 150 : 140, height: L ? 380 : sq ? 300 : 420, width: 4, background: `linear-gradient(${gold}, transparent)` }} />

      <div
        style={{
          position: 'absolute',
          left,
          top: L ? 140 : 130,
          width: L ? 1000 : W - left - 130,
          bottom: L ? 130 : fan / 2 + (sq ? 60 : 70),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          textAlign: 'left',
          gap: sq ? 8 : 14,
        }}
      >
        <LineDiya size={sq ? 70 : 90} color={gold} flame={gold} style={{ marginLeft: -10 }} />
        <div style={{ fontFamily: FONT_STACKS.sans, fontSize: 20, letterSpacing: 9, color: gold, fontWeight: 500, textTransform: 'uppercase', flexShrink: 0 }}>
          {content.subheading}
        </div>
        <FitText
          text={content.heading}
          max={L ? 136 : sq ? 100 : 124}
          min={44}
          lineHeight={1.08}
          valign="start"
          boxStyle={{ flex: 'none', height: L ? 170 : sq ? 130 : 160 }}
          style={{ fontFamily: FONT_STACKS.garamond, fontWeight: 600, color: '#f3e6c4', textAlign: 'left' }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <div style={{ width: 90, height: 1.5, background: gold }} />
          <div style={{ width: 9, height: 9, background: gold, transform: 'rotate(45deg)' }} />
        </div>
        <FitText
          text={content.message}
          max={Math.round((sq ? 44 : 54) * ty.scale)}
          min={19}
          lineHeight={1.5}
          valign="start"
          style={{ fontFamily: ty.font, color: ty.color, fontStyle: style.fontStyle === 'template' ? 'italic' : 'normal', textAlign: 'left' }}
        />
        <SenderBlock
          intro={content.senderIntro}
          name={content.senderName}
          align={ty.senderAlign}
          nameMax={Math.round(46 * ty.scale)}
          introStyle={{ fontFamily: FONT_STACKS.sans, fontSize: 18, letterSpacing: 5, textTransform: 'uppercase', color: style.textColor === 'template' ? gold : ty.color }}
          nameStyle={{ fontFamily: style.fontStyle === 'template' ? FONT_STACKS.garamond : ty.font, fontWeight: 600, color: ty.color }}
        />
      </div>
    </CardRoot>
  );
};

/* ═════════════════════════════════════════════════════════════════════════
 * 8. UTSAV NIGHT — Colourful Festive
 *    Fireworks over hanging lanterns, bold celebratory type.
 * ═════════════════════════════════════════════════════════════════════════ */
export const UtsavCard = ({ content, format, style, dims }: TemplateProps) => {
  const { width: W, height: H } = dims;
  const L = format === 'landscape';
  const sq = format === 'square';
  const ty = resolveTypography(style, { font: 'sans', color: '#ffffff', align: 'center' });

  const fireworks: { x: number; y: number; s: number; c: [string, string] }[] = L
    ? [
        { x: 0.3, y: 0.2, s: 300, c: ['#ff3d7f', '#ffd166'] },
        { x: 0.7, y: 0.17, s: 270, c: ['#4cc9f0', '#ffffff'] },
        { x: 0.5, y: 0.1, s: 180, c: ['#ff9f1c', '#fff3b0'] },
        { x: 0.88, y: 0.5, s: 200, c: ['#80ed99', '#ffffff'] },
        { x: 0.12, y: 0.55, s: 190, c: ['#c77dff', '#ffd166'] },
      ]
    : [
        { x: 0.22, y: sq ? 0.2 : 0.16, s: sq ? 260 : 320, c: ['#ff3d7f', '#ffd166'] },
        { x: 0.8, y: sq ? 0.16 : 0.13, s: sq ? 230 : 280, c: ['#4cc9f0', '#ffffff'] },
        { x: 0.52, y: sq ? 0.08 : 0.07, s: sq ? 150 : 190, c: ['#ff9f1c', '#fff3b0'] },
        { x: 0.86, y: sq ? 0.42 : 0.35, s: sq ? 150 : 190, c: ['#80ed99', '#ffffff'] },
      ];

  return (
    <CardRoot dims={dims} background="linear-gradient(180deg, #120a3a 0%, #2a0f5c 45%, #5c1050 82%, #7a1a3a 100%)">
      <Sparkles width={W} height={H} count={L ? 90 : 70} color="#ffffff" seed={5} maxSize={12} area={[0, 0.36]} />
      {fireworks.map((f, i) => (
        <Firework key={i} size={f.s} colors={f.c} style={{ position: 'absolute', left: f.x * W - f.s / 2, top: f.y * H - f.s / 2, opacity: 0.95 }} />
      ))}
      <Lantern size={L ? 150 : 130} cord={L ? 40 : 30} colors={['#e63946', '#ffd166', '#ff9f1c']} style={{ position: 'absolute', left: L ? 90 : 50, top: 0 }} />
      <Lantern size={L ? 120 : 100} cord={L ? 180 : 200} colors={['#7b2ff7', '#ffd6ff', '#4cc9f0']} style={{ position: 'absolute', left: L ? 260 : 175, top: 0 }} />
      <Lantern size={L ? 150 : 130} cord={L ? 100 : 80} colors={['#06d6a0', '#fff3b0', '#ffd166']} style={{ position: 'absolute', right: L ? 90 : 50, top: 0 }} />
      {L && <Lantern size={110} cord={220} colors={['#ff3d7f', '#ffe5ec', '#ffd166']} style={{ position: 'absolute', right: 270, top: 0 }} />}

      {/* ground glow & diyas */}
      <Layer style={{ left: 0, right: 0, bottom: 0, height: 220, background: 'radial-gradient(ellipse at 50% 100%, rgba(255,160,60,0.55), transparent 70%)' }} />
      <Layer style={{ left: 40, right: 40, bottom: 30, display: 'flex', justifyContent: 'space-evenly', alignItems: 'flex-end' }}>
        {Array.from({ length: L ? 9 : 6 }, (_, i) => (
          <Diya key={i} size={i % 2 ? 84 : 100} variant={i % 2 ? 'painted' : 'clay'} glow={0.8} />
        ))}
      </Layer>

      <div
        style={{
          position: 'absolute',
          left: L ? 420 : sq ? 120 : 110,
          right: L ? 420 : sq ? 120 : 110,
          top: L ? 320 : sq ? 360 : 500,
          bottom: sq ? 150 : 170,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: sq ? 6 : 12,
        }}
      >
        <FitText
          text={content.heading}
          max={L ? 104 : sq ? 84 : 104}
          min={40}
          lineHeight={1.2}
          boxStyle={{ flex: 'none', height: L ? 140 : sq ? 110 : 140 }}
          style={{
            fontFamily: FONT_STACKS.sans,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: content.language === 'en' ? 3 : 0,
            color: '#ffffff',
            textShadow: '0 5px 0 #ff3d7f, 0 0 36px rgba(255,61,127,0.7)',
          }}
        />
        <div style={{ fontFamily: FONT_STACKS.sans, fontSize: 24, letterSpacing: 5, color: '#ffd166', fontWeight: 600, textTransform: 'uppercase', flexShrink: 0 }}>
          ✦ {content.subheading} ✦
        </div>
        <FitText
          text={content.message}
          max={Math.round((sq ? 38 : 46) * ty.scale)}
          min={18}
          lineHeight={1.55}
          style={{ fontFamily: ty.font, color: ty.color, fontWeight: 400, textShadow: '0 2px 12px rgba(0,0,0,0.45)' }}
        />
        <SenderBlock
          intro={content.senderIntro}
          name={content.senderName}
          align={ty.senderAlign}
          nameMax={Math.round((sq ? 38 : 44) * ty.scale)}
          introStyle={{ fontFamily: FONT_STACKS.sans, fontSize: 20, color: style.textColor === 'template' ? '#ffd6e7' : ty.color }}
          nameStyle={{ fontFamily: style.fontStyle === 'template' ? FONT_STACKS.sans : ty.font, color: style.textColor === 'template' ? '#ffd166' : ty.color, fontWeight: 600 }}
        />
      </div>
    </CardRoot>
  );
};
