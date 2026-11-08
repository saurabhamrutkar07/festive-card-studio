import { CardRoot, FitText, Layer, OrnamentDivider, SenderBlock } from '../parts';
import { FONT_STACKS, resolveTypography } from '../typography';
import { Diya, Glow, LineDiya } from '../decor/lamps';
import { FloralCluster, Marigold, Toran } from '../decor/florals';
import { CornerFlourish, Mandala } from '../decor/patterns';
import type { TemplateProps } from './types';

/* ═════════════════════════════════════════════════════════════════════════
 * 1. DEEPMALA — Traditional Diwali
 *    Maroon velvet, marigold toran, row of diyas, double gold frame.
 * ═════════════════════════════════════════════════════════════════════════ */
export const DeepmalaCard = ({ content, format, style, dims }: TemplateProps) => {
  const { width: W } = dims;
  const L = format === 'landscape';
  const sq = format === 'square';
  const ty = resolveTypography(style, { font: 'garamond', color: '#fbe9c6', align: 'center' });
  const gold = '#e9b44c';
  const toranTop = 40;
  const toranH = L ? 180 : sq ? 200 : 255;
  const diyaSizes = L ? [86, 100, 112, 130, 112, 100, 86] : sq ? [86, 104, 128, 104, 86] : [100, 120, 150, 120, 100];
  const contentTop = toranTop + toranH + (sq ? 10 : 30);
  const contentBottom = 44 + Math.max(...diyaSizes) * 0.86 + (sq ? 20 : 34);

  return (
    <CardRoot dims={dims} background="radial-gradient(ellipse at 50% 45%, #8c1a2b 0%, #5a0b18 55%, #33050d 100%)">
      <Layer
        style={{
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(233,180,76,0.10) 1.6px, transparent 1.8px)',
          backgroundSize: '34px 34px',
        }}
      />
      <Layer style={{ inset: 24, border: `3px solid ${gold}` }} />
      <Layer style={{ inset: 38, border: `1px solid ${gold}88` }} />
      <Layer style={{ top: toranTop, left: 40, right: 40, height: toranH, overflow: 'hidden' }}>
        <Toran width={W - 80} strings={L ? 30 : 11} maxLength={L || sq ? 2 : 3} />
      </Layer>

      {/* diya ledge */}
      <Layer
        style={{
          left: 40,
          right: 40,
          bottom: 40,
          height: 150,
          background: 'radial-gradient(ellipse at 50% 100%, rgba(255,170,60,0.35), transparent 70%)',
        }}
      />
      <Layer style={{ left: 60, right: 60, bottom: 44, display: 'flex', justifyContent: 'space-evenly', alignItems: 'flex-end' }}>
        {diyaSizes.map((s, i) => (
          <Diya key={i} size={s} variant={i % 2 ? 'brass' : 'clay'} glow={0.7} />
        ))}
      </Layer>

      <div
        style={{
          position: 'absolute',
          top: contentTop,
          bottom: contentBottom,
          left: L ? 280 : 110,
          right: L ? 280 : 110,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: sq ? 10 : 16,
        }}
      >
        <div style={{ fontFamily: FONT_STACKS.decorative, color: gold, fontSize: 26, letterSpacing: 6, textTransform: 'uppercase', flexShrink: 0 }}>
          {content.subheading}
        </div>
        <FitText
          text={content.heading}
          max={L ? 96 : sq ? 104 : 120}
          min={48}
          lineHeight={1.2}
          boxStyle={{ flex: 'none', height: L ? 130 : sq ? 150 : 180 }}
          style={{
            fontFamily: FONT_STACKS.decorative,
            fontWeight: 700,
            color: '#f6cf6a',
            textShadow: '0 3px 0 #5a2a06, 0 0 36px rgba(246,207,106,0.35)',
          }}
        />
        <OrnamentDivider color={gold} width={240} />
        <FitText
          text={content.message}
          max={Math.round((sq ? 46 : 52) * ty.scale)}
          min={20}
          lineHeight={1.5}
          style={{ fontFamily: ty.font, color: ty.color, fontWeight: 500, fontStyle: 'italic' }}
        />
        <SenderBlock
          intro={content.senderIntro}
          name={content.senderName}
          align={ty.senderAlign}
          nameMax={Math.round(46 * ty.scale)}
          introStyle={{ fontFamily: FONT_STACKS.decorative, color: style.textColor === 'template' ? gold : ty.color, fontSize: 24, letterSpacing: 2 }}
          nameStyle={{ fontFamily: style.fontStyle === 'template' ? FONT_STACKS.serif : ty.font, color: ty.color, fontWeight: 600 }}
        />
      </div>
    </CardRoot>
  );
};

/* ═════════════════════════════════════════════════════════════════════════
 * 2. RAJWADA — Royal Gold
 *    Palace purple, gilded corner flourishes, central diya medallion.
 * ═════════════════════════════════════════════════════════════════════════ */
export const RajwadaCard = ({ content, format, style, dims }: TemplateProps) => {
  const { width: W, height: H } = dims;
  const L = format === 'landscape';
  const sq = format === 'square';
  const ty = resolveTypography(style, { font: 'serif', color: '#f7e7c1', align: 'center' });
  const gold = '#d4af37';
  const corner = L ? 230 : 200;
  const medallion = L ? 470 : sq ? 230 : 300;

  const Medallion = (
    <div style={{ position: 'relative', width: medallion, height: medallion, flexShrink: 0 }}>
      <Mandala size={medallion} color={gold} strokeWidth={L ? 1.4 : 1.8} style={{ position: 'absolute', inset: 0, opacity: 0.85 }} />
      <div
        style={{
          position: 'absolute',
          inset: medallion * 0.2,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #4a1a5e 0%, #2b0d3a 75%)',
          border: `3px solid ${gold}`,
          boxShadow: `0 0 0 6px #2b0d3a, 0 0 0 8px ${gold}66, 0 0 50px rgba(212,175,55,0.35)`,
        }}
      />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Diya size={medallion * 0.48} variant="gold" glow={0.75} style={{ marginTop: -medallion * 0.04 }} />
      </div>
    </div>
  );

  const Text = (
    <div
      style={{
        flex: 1,
        minHeight: 0,
        minWidth: 0,
        alignSelf: 'stretch',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: sq ? 8 : 14,
      }}
    >
      <FitText
        text={content.heading}
        max={L ? 124 : sq ? 92 : 112}
        min={44}
        lineHeight={1.18}
        boxStyle={{ flex: 'none', height: L ? 300 : sq ? 130 : 170 }}
        style={{
          fontFamily: FONT_STACKS.decorative,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: content.language === 'en' ? 6 : 0,
          color: '#f3d27a',
          textShadow: '0 2px 0 #7a5310, 0 0 30px rgba(243,210,122,0.35)',
        }}
      />
      <div style={{ fontFamily: FONT_STACKS.garamond, fontStyle: 'italic', color: '#e9cf8f', fontSize: 30, flexShrink: 0 }}>
        ~ {content.subheading} ~
      </div>
      <FitText
        text={content.message}
        max={Math.round((sq ? 40 : 48) * ty.scale)}
        min={19}
        lineHeight={1.55}
        style={{ fontFamily: ty.font, color: ty.color, fontStyle: style.fontStyle === 'template' ? 'italic' : 'normal' }}
      />
      <OrnamentDivider color={gold} width={200} />
      <SenderBlock
        intro={content.senderIntro}
        name={content.senderName}
        align={ty.senderAlign}
        nameMax={Math.round((sq ? 54 : 62) * ty.scale)}
        introStyle={{ fontFamily: FONT_STACKS.decorative, fontSize: 22, letterSpacing: 3, color: style.textColor === 'template' ? gold : ty.color, textTransform: 'uppercase' }}
        nameStyle={{ fontFamily: style.fontStyle === 'template' ? FONT_STACKS.script : ty.font, color: style.textColor === 'template' ? '#f3d27a' : ty.color }}
      />
    </div>
  );

  return (
    <CardRoot dims={dims} background="linear-gradient(160deg, #3d1652 0%, #24092f 55%, #13041c 100%)">
      <Mandala
        size={Math.max(W, H) * 1.05}
        color={gold}
        strokeWidth={1.2}
        style={{ position: 'absolute', left: W / 2 - (Math.max(W, H) * 1.05) / 2, top: H / 2 - (Math.max(W, H) * 1.05) / 2, opacity: 0.07 }}
      />
      <Layer style={{ inset: 28, border: `2px solid ${gold}` }} />
      <Layer style={{ inset: 42, border: `6px double ${gold}aa` }} />
      <CornerFlourish size={corner} color={gold} style={{ position: 'absolute', top: 16, left: 16 }} />
      <CornerFlourish size={corner} color={gold} style={{ position: 'absolute', top: 16, right: 16, transform: 'scaleX(-1)' }} />
      <CornerFlourish size={corner} color={gold} style={{ position: 'absolute', bottom: 16, left: 16, transform: 'scaleY(-1)' }} />
      <CornerFlourish size={corner} color={gold} style={{ position: 'absolute', bottom: 16, right: 16, transform: 'scale(-1,-1)' }} />

      <div
        style={{
          position: 'absolute',
          inset: L ? '120px 170px' : sq ? '80px 140px 90px' : '120px 130px 130px',
          display: 'flex',
          flexDirection: L ? 'row' : 'column',
          alignItems: 'center',
          gap: L ? 90 : sq ? 10 : 26,
        }}
      >
        {Medallion}
        {Text}
      </div>
    </CardRoot>
  );
};

/* ═════════════════════════════════════════════════════════════════════════
 * 3. SHUDDH — Modern Minimal
 *    Ivory paper, single line diya, generous whitespace, left alignment.
 * ═════════════════════════════════════════════════════════════════════════ */
export const ShuddhCard = ({ content, format, style, dims }: TemplateProps) => {
  const { width: W, height: H } = dims;
  const L = format === 'landscape';
  const sq = format === 'square';
  const ty = resolveTypography(style, { font: 'sans', color: '#3a2a20', align: 'left' });
  const accent = '#c8862a';
  const pad = L ? 140 : sq ? 100 : 120;
  const textWidth = L ? W * 0.56 : W - pad * 2;

  return (
    <CardRoot dims={dims} background="#faf6ee">
      <Glow size={L ? 1100 : 900} color="#f5c27a" opacity={0.35} style={{ right: L ? -160 : -380, top: L ? -60 : -320 }} />
      <Layer style={{ left: 0, top: 0, bottom: 0, width: 14, background: accent }} />
      {L ? (
        <>
          <Layer style={{ left: W * 0.66, top: 140, bottom: 140, width: 1.5, background: `${accent}55` }} />
          <div style={{ position: 'absolute', right: 150, top: H / 2 - 230, width: 460, height: 460 }}>
            <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `1.5px solid ${accent}66` }} />
            <div style={{ position: 'absolute', inset: 34, borderRadius: '50%', background: '#f3e7d1' }} />
            <LineDiya size={320} color="#3a2a20" flame="#e8942c" style={{ position: 'absolute', left: 70, top: 60 }} />
          </div>
        </>
      ) : (
        <LineDiya size={sq ? 120 : 150} color="#3a2a20" style={{ position: 'absolute', left: pad - 14, top: sq ? 80 : 110 }} />
      )}

      {/* abstract flame dots */}
      <svg width="180" height="60" viewBox="0 0 180 60" style={{ position: 'absolute', right: pad - 20, bottom: sq ? 70 : 90 }}>
        <path d="M10 50 Q 90 -10 170 50" stroke={accent} strokeWidth="2" fill="none" />
        {[40, 90, 140].map((x, i) => (
          <circle key={x} cx={x} cy={i === 1 ? 20 : 30} r={i === 1 ? 7 : 5} fill={accent} />
        ))}
      </svg>

      <div
        style={{
          position: 'absolute',
          left: pad,
          top: L ? 150 : sq ? 230 : 300,
          bottom: L ? 130 : sq ? 160 : 190,
          width: textWidth,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          textAlign: 'left',
          gap: sq ? 14 : 20,
        }}
      >
        <div style={{ fontFamily: FONT_STACKS.sans, fontSize: 22, letterSpacing: 7, color: accent, fontWeight: 500, textTransform: 'uppercase', flexShrink: 0 }}>
          {content.subheading}
        </div>
        <FitText
          text={content.heading}
          max={L ? 130 : sq ? 100 : 118}
          min={44}
          lineHeight={1.12}
          boxStyle={{ flex: 'none', height: L ? 300 : sq ? 140 : 170 }}
          valign="start"
          style={{ fontFamily: FONT_STACKS.serif, fontWeight: 600, color: '#2a1a12', textAlign: 'left' }}
        />
        <div style={{ width: 120, height: 3, background: accent, flexShrink: 0 }} />
        <FitText
          text={content.message}
          max={Math.round((sq ? 42 : 50) * ty.scale)}
          min={18}
          lineHeight={1.6}
          valign="start"
          style={{ fontFamily: ty.font, color: ty.color, fontWeight: 300, textAlign: 'left' }}
        />
        <SenderBlock
          intro={content.senderIntro}
          name={content.senderName}
          align={ty.senderAlign}
          nameMax={Math.round(44 * ty.scale)}
          introStyle={{ fontFamily: FONT_STACKS.sans, fontSize: 20, letterSpacing: 4, textTransform: 'uppercase', color: style.textColor === 'template' ? '#a0764a' : ty.color }}
          nameStyle={{ fontFamily: style.fontStyle === 'template' ? FONT_STACKS.serif : ty.font, fontWeight: 600, color: ty.color }}
        />
      </div>
    </CardRoot>
  );
};

/* ═════════════════════════════════════════════════════════════════════════
 * 4. GENDA PHOOL — Floral Diwali
 *    Cream canvas framed by marigold & jasmine clusters, script heading.
 * ═════════════════════════════════════════════════════════════════════════ */
export const GendaCard = ({ content, format, style, dims }: TemplateProps) => {
  const { width: W, height: H } = dims;
  const L = format === 'landscape';
  const sq = format === 'square';
  const ty = resolveTypography(style, { font: 'garamond', color: '#5a2a12', align: 'center' });
  const cluster = L ? 480 : sq ? 360 : 440;
  const accent = '#d9761f';

  return (
    <CardRoot dims={dims} background="radial-gradient(circle at 50% 42%, #fffbf2 0%, #fff0d4 58%, #fbdcae 100%)">
      <Layer style={{ inset: 46, borderRadius: 40, border: `2.5px solid ${accent}aa` }} />
      <Layer style={{ inset: 60, borderRadius: 30, border: `1.5px dashed ${accent}66` }} />
      <FloralCluster size={cluster} seed={4} style={{ position: 'absolute', left: -50, top: -50 }} />
      <FloralCluster size={cluster} seed={9} style={{ position: 'absolute', right: -50, bottom: -50, transform: 'rotate(180deg)' }} />
      {/* scattered petals */}
      {[
        [W - 190, 120, 46],
        [W - 120, 230, 30],
        [140, H - 160, 40],
        [240, H - 100, 26],
      ].map(([x, y, s], i) => (
        <Marigold key={i} size={s} tone={i % 2 ? 'yellow' : 'orange'} style={{ position: 'absolute', left: x, top: y }} />
      ))}

      <div
        style={{
          position: 'absolute',
          left: L ? 420 : sq ? 150 : 140,
          right: L ? 420 : sq ? 150 : 140,
          top: L ? 110 : sq ? 170 : 230,
          bottom: L ? 110 : sq ? 150 : 200,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: sq ? 8 : 14,
        }}
      >
        <FitText
          text={content.heading}
          max={L ? 170 : sq ? 130 : 160}
          min={50}
          lineHeight={1.15}
          boxStyle={{ flex: 'none', height: L ? 230 : sq ? 170 : 220 }}
          style={{ fontFamily: FONT_STACKS.script, color: '#b8421a', textShadow: '0 2px 0 rgba(255,255,255,0.7)' }}
        />
        <div style={{ fontFamily: FONT_STACKS.garamond, fontSize: 28, fontStyle: 'italic', color: '#8a4a1c', flexShrink: 0 }}>{content.subheading}</div>
        <svg width="220" height="30" viewBox="0 0 220 30" style={{ flexShrink: 0 }}>
          <path d="M0 15 H80 M140 15 H220" stroke={accent} strokeWidth="1.5" />
          <g transform="translate(110 15)">
            {[0, 60, 120, 180, 240, 300].map((a) => (
              <ellipse key={a} cx="0" cy="-8" rx="4" ry="8" fill={accent} transform={`rotate(${a})`} />
            ))}
            <circle r="4" fill="#ffc21a" />
          </g>
        </svg>
        <FitText
          text={content.message}
          max={Math.round((sq ? 42 : 50) * ty.scale)}
          min={19}
          lineHeight={1.5}
          style={{ fontFamily: ty.font, color: ty.color, fontWeight: 500 }}
        />
        <SenderBlock
          intro={content.senderIntro}
          name={content.senderName}
          align={ty.senderAlign}
          nameMax={Math.round(50 * ty.scale)}
          introStyle={{ fontFamily: FONT_STACKS.garamond, fontSize: 26, fontStyle: 'italic', color: style.textColor === 'template' ? '#8a4a1c' : ty.color }}
          nameStyle={{ fontFamily: style.fontStyle === 'template' ? FONT_STACKS.serif : ty.font, color: style.textColor === 'template' ? '#b8421a' : ty.color, fontWeight: 700 }}
        />
      </div>
    </CardRoot>
  );
};
