import { CardRoot, Layer } from '../parts';
import { FONT_STACKS, resolveTypography } from '../typography';
import { Diya } from '../decor/lamps';
import { FloralCluster, Toran } from '../decor/florals';
import { Firework, Mandala, Rangoli, Rays } from '../decor/patterns';
import { StringLights } from '../decor/scenes';
import { GiftBox, GoldCoin, Kalash } from '../decor/occasionDecor';
import { BahiKhata, CoinStack, LakshmiFeet, Phuljhadi, StarKandil, SweetsPlate, Tilak } from '../decor/festiveDecor';
import { seededRandom } from '../../../utils/seededRandom';
import { TextColumn, useScale } from './occasionTemplates';
import type { TemplateProps } from './types';

/* ═════════════════════════════════════════════════════════════════════════
 * Second set of occasion designs: 3 more each for Diwali, Padwa and Bhaubij.
 * Same structure as occasionTemplates.tsx — background + art around the
 * shared TextColumn; sizes authored for portrait and scaled by card height.
 * ═════════════════════════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────────────────────────────────────
 * DIWALI · AKASH KANDIL — star lanterns over an indigo night
 * ───────────────────────────────────────────────────────────────────────── */
export const KandilCard = (props: TemplateProps) => {
  const { content, style, dims } = props;
  const { px, L } = useScale(props);
  const { width: W } = dims;
  const ty = resolveTypography(style, { font: 'garamond', color: '#eef0ff', align: 'center' });
  const kandils = L
    ? [
        { x: 0.1, cord: 20, size: 150, body: '#ff6b35' },
        { x: 0.28, cord: 70, size: 130, body: '#e63970' },
        { x: 0.72, cord: 70, size: 130, body: '#2ec4b6' },
        { x: 0.9, cord: 20, size: 150, body: '#ffb703' },
      ]
    : [
        { x: 0.16, cord: 30, size: 170, body: '#ff6b35' },
        { x: 0.5, cord: 0, size: 150, body: '#e63970' },
        { x: 0.84, cord: 30, size: 170, body: '#2ec4b6' },
      ];
  return (
    <CardRoot dims={dims} background="radial-gradient(ellipse at 50% 30%, #23307a 0%, #141a4a 55%, #080b26 100%)">
      {Array.from({ length: 36 }, (_, i) => (
        <Layer
          key={i}
          style={{ left: `${((i * 61) % 100)}%`, top: `${((i * 37) % 90) + 5}%`, width: px(i % 4 ? 3 : 5), height: px(i % 4 ? 3 : 5), borderRadius: '50%', background: '#fff6d6', opacity: i % 2 ? 0.45 : 0.8 }}
        />
      ))}
      <Layer style={{ top: px(-10), left: 0 }}>
        <StringLights width={W} sag={px(70)} bulbs={L ? 34 : 20} />
      </Layer>
      {kandils.map((k, i) => (
        <Layer key={i} style={{ top: px(10), left: k.x * W - px(k.size) / 2 }}>
          <StarKandil size={px(k.size)} cord={k.cord} body={k.body} />
        </Layer>
      ))}
      <Layer style={{ left: 0, right: 0, bottom: px(40), display: 'flex', justifyContent: 'center', gap: px(L ? 90 : 50), alignItems: 'flex-end' }}>
        {[90, 120, 90].map((s, i) => (
          <Diya key={i} size={px(s)} variant="gold" glow={0.8} />
        ))}
      </Layer>
      <TextColumn
        content={content}
        style={style}
        ty={ty}
        px={px}
        box={{ top: L ? 330 : 380, bottom: 190, left: L ? 380 : 110, right: L ? 380 : 110 }}
        sub={{ font: FONT_STACKS.decorative, color: '#ffd166', size: 24, spacing: 6, upper: true }}
        heading={{ font: FONT_STACKS.decorative, color: '#ffd166', max: 104, height: 170, shadow: '0 0 30px rgba(255,209,102,0.4)' }}
        divider="#ffd166"
        messageMax={44}
        sender={{ introColor: '#ffd166', introFont: FONT_STACKS.decorative, introSize: 22, nameFont: FONT_STACKS.script, nameColor: '#ffe7a8', nameMax: 54 }}
      />
    </CardRoot>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
 * DIWALI · LAKSHMI PUJAN — ivory & gold, kalash and Lakshmi footprints
 * ───────────────────────────────────────────────────────────────────────── */
export const LakshmiPujanCard = (props: TemplateProps) => {
  const { content, style, dims } = props;
  const { px, L } = useScale(props);
  const { width: W } = dims;
  const gold = '#b8862e';
  const ty = resolveTypography(style, { font: 'garamond', color: '#4a2a14', align: 'center' });
  const kalashW = px(130);
  return (
    <CardRoot dims={dims} background="radial-gradient(ellipse at 50% 45%, #fffaf0 0%, #fbefd6 70%, #f2ddb0 100%)">
      <Layer style={{ inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Mandala size={px(1000)} color="rgba(184,134,46,0.10)" />
      </Layer>
      <Layer style={{ inset: px(26), border: `${Math.max(2, px(3))}px solid ${gold}` }} />
      <Layer style={{ inset: px(38), border: `1px solid ${gold}77` }} />
      <Layer style={{ top: px(56), left: (W - kalashW) / 2 }}>
        <Kalash width={kalashW} />
      </Layer>
      {/* footprints walking in from the bottom */}
      <Layer style={{ left: 0, right: 0, bottom: px(50), display: 'flex', flexDirection: 'column-reverse', alignItems: 'center', gap: px(6) }}>
        <LakshmiFeet size={px(110)} />
        <LakshmiFeet size={px(86)} style={{ opacity: 0.85 }} />
      </Layer>
      <Layer style={{ left: px(L ? 200 : 80), bottom: px(56) }}>
        <Diya size={px(120)} variant="brass" glow={0.7} />
      </Layer>
      <Layer style={{ right: px(L ? 200 : 80), bottom: px(56) }}>
        <Diya size={px(120)} variant="brass" glow={0.7} />
      </Layer>
      <TextColumn
        content={content}
        style={style}
        ty={ty}
        px={px}
        box={{ top: L ? 250 : 270, bottom: 290, left: L ? 380 : 110, right: L ? 380 : 110 }}
        sub={{ font: FONT_STACKS.decorative, color: gold, size: 24, spacing: 6, upper: true }}
        heading={{ font: FONT_STACKS.garamond, color: '#8a1c1c', max: 110, height: 160 }}
        divider={gold}
        messageMax={44}
        sender={{ introColor: gold, introFont: FONT_STACKS.decorative, introSize: 22, nameFont: FONT_STACKS.garamond, nameColor: '#8a1c1c', nameMax: 50 }}
      />
    </CardRoot>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
 * DIWALI · PHULJHADI — modern charcoal with sparklers and bursts
 * ───────────────────────────────────────────────────────────────────────── */
export const PhuljhadiCard = (props: TemplateProps) => {
  const { content, style, dims } = props;
  const { px, L } = useScale(props);
  const ty = resolveTypography(style, { font: 'sans', color: '#ece8f4', align: 'center' });
  return (
    <CardRoot dims={dims} background="linear-gradient(160deg, #1d1a26 0%, #121117 60%, #0b0a0f 100%)">
      <Layer style={{ top: px(-60), left: px(-60) }}>
        <Firework size={px(420)} colors={['#ffd166', '#ff8fab']} />
      </Layer>
      <Layer style={{ top: px(-40), right: px(-80) }}>
        <Firework size={px(360)} colors={['#7cf5ff', '#b28dff']} rays={18} />
      </Layer>
      <Layer style={{ left: 0, right: 0, bottom: px(30), display: 'flex', justifyContent: 'center', gap: px(L ? 160 : 40) }}>
        <Phuljhadi length={px(260)} angle={-22} />
        <Phuljhadi length={px(260)} angle={22} spark="#ff8fab" />
      </Layer>
      <TextColumn
        content={content}
        style={style}
        ty={ty}
        px={px}
        box={{ top: 300, bottom: 300, left: L ? 400 : 120, right: L ? 400 : 120 }}
        sub={{ font: FONT_STACKS.sans, color: '#ffd166', size: 22, spacing: 8, upper: true }}
        heading={{ font: FONT_STACKS.serif, color: '#ffffff', max: 108, height: 170 }}
        divider="#ffd16699"
        messageMax={40}
        sender={{ introColor: '#b9b3c8', introFont: FONT_STACKS.sans, introSize: 21, nameFont: FONT_STACKS.serif, nameColor: '#ffd166', nameMax: 48 }}
      />
    </CardRoot>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
 * PADWA · KANCHAN — champagne & gold, coin stacks for the gold-buying day
 * ───────────────────────────────────────────────────────────────────────── */
export const KanchanPadwaCard = (props: TemplateProps) => {
  const { content, style, dims } = props;
  const { px, L } = useScale(props);
  const gold = '#a8781e';
  const ty = resolveTypography(style, { font: 'serif', color: '#4a2a14', align: 'center' });
  return (
    <CardRoot dims={dims} background="linear-gradient(180deg, #fbf3e4 0%, #f3e2c2 100%)">
      <Layer style={{ inset: 0, backgroundImage: 'radial-gradient(rgba(168,120,30,0.10) 1.6px, transparent 1.8px)', backgroundSize: `${px(28)}px ${px(28)}px` }} />
      <Layer style={{ inset: px(28), border: `${Math.max(2, px(3))}px solid ${gold}`, borderRadius: px(6) }} />
      {[
        [110, 110, 74],
        [200, 70, 50],
      ].map(([x, y, s], i) => (
        <Layer key={i} style={{ left: px(x), top: px(y) }}>
          <GoldCoin size={px(s)} />
        </Layer>
      ))}
      {[
        [110, 110, 74],
        [200, 70, 50],
      ].map(([x, y, s], i) => (
        <Layer key={`r${i}`} style={{ right: px(x), top: px(y) }}>
          <GoldCoin size={px(s)} />
        </Layer>
      ))}
      <Layer style={{ left: px(L ? 220 : 80), bottom: px(60) }}>
        <CoinStack size={px(190)} coins={7} />
      </Layer>
      <Layer style={{ right: px(L ? 220 : 80), bottom: px(60) }}>
        <CoinStack size={px(150)} coins={5} />
      </Layer>
      <Layer style={{ left: 0, right: 0, bottom: px(64), display: 'flex', justifyContent: 'center' }}>
        <Diya size={px(130)} variant="gold" glow={0.75} />
      </Layer>
      <TextColumn
        content={content}
        style={style}
        ty={ty}
        px={px}
        box={{ top: 220, bottom: 300, left: L ? 380 : 110, right: L ? 380 : 110 }}
        sub={{ font: FONT_STACKS.decorative, color: gold, size: 24, spacing: 6, upper: true }}
        heading={{ font: FONT_STACKS.serif, color: '#7a1424', max: 104, height: 170 }}
        divider={gold}
        messageMax={42}
        sender={{ introColor: gold, introFont: FONT_STACKS.decorative, introSize: 22, nameFont: FONT_STACKS.script, nameColor: '#7a1424', nameMax: 54 }}
      />
    </CardRoot>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
 * PADWA · CHOPDA PUJAN — haldi yellow, toran and the new account book
 * ───────────────────────────────────────────────────────────────────────── */
export const ChopdaPadwaCard = (props: TemplateProps) => {
  const { content, style, dims } = props;
  const { px, L, sq } = useScale(props);
  const { width: W } = dims;
  const red = '#b5121b';
  const ty = resolveTypography(style, { font: 'garamond', color: '#4a1a0c', align: 'center' });
  const toranW = W - px(60);
  const bookW = px(L ? 260 : 300);
  return (
    <CardRoot dims={dims} background="radial-gradient(ellipse at 50% 45%, #fff6cf 0%, #ffe48a 70%, #f9c74f 100%)">
      <Layer style={{ inset: px(22), border: `${Math.max(2, px(4))}px solid ${red}`, borderRadius: px(10) }} />
      <Layer style={{ top: px(26), left: px(30), width: toranW, overflow: 'hidden' }}>
        <Toran width={toranW} strings={L ? 28 : 10} maxLength={L || sq ? 2 : 3} />
      </Layer>
      <Layer style={{ bottom: px(48), left: (W - bookW) / 2 }}>
        <BahiKhata width={bookW} />
      </Layer>
      <Layer style={{ left: px(L ? 240 : 70), bottom: px(56) }}>
        <Diya size={px(110)} variant="painted" glow={0.6} />
      </Layer>
      <Layer style={{ right: px(L ? 240 : 70), bottom: px(56) }}>
        <Diya size={px(110)} variant="painted" glow={0.6} />
      </Layer>
      <TextColumn
        content={content}
        style={style}
        ty={ty}
        px={px}
        box={{ top: L ? 300 : sq ? 290 : 310, bottom: L ? 300 : 320, left: L ? 380 : 110, right: L ? 380 : 110 }}
        sub={{ font: FONT_STACKS.decorative, color: red, size: 24, spacing: 6, upper: true }}
        heading={{ font: FONT_STACKS.yatra, color: red, max: 104, height: 170, weight: 400 }}
        divider={red}
        messageMax={42}
        sender={{ introColor: red, introFont: FONT_STACKS.decorative, introSize: 22, nameFont: FONT_STACKS.garamond, nameColor: red, nameMax: 50 }}
      />
    </CardRoot>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
 * PADWA · DIWALI PAHAT — dawn sky, rising sun and rangoli
 * ───────────────────────────────────────────────────────────────────────── */
export const PahatPadwaCard = (props: TemplateProps) => {
  const { content, style, dims } = props;
  const { px, L } = useScale(props);
  const { width: W } = dims;
  const ty = resolveTypography(style, { font: 'serif', color: '#4a2410', align: 'center' });
  const sunR = px(L ? 220 : 260);
  return (
    <CardRoot dims={dims} background="linear-gradient(180deg, #f6dbe6 0%, #ffd8b0 45%, #ffb36b 100%)">
      <Layer style={{ left: W / 2 - px(700), bottom: -px(700), opacity: 0.6 }}>
        <Rays size={px(1400)} color="#fff3c4" count={40} opacity={0.5} />
      </Layer>
      <Layer style={{ left: W / 2 - sunR, bottom: -sunR, width: sunR * 2, height: sunR * 2, borderRadius: '50%', background: 'radial-gradient(circle, #fff7d6 0%, #ffd166 55%, #ff9f1c 100%)' }} />
      <Layer style={{ left: -px(110), bottom: -px(110) }}>
        <Rangoli size={px(300)} />
      </Layer>
      <Layer style={{ right: -px(110), bottom: -px(110) }}>
        <Rangoli size={px(300)} palette={['#2ec4b6', '#ff4f81', '#ffb703', '#8338ec', '#fb5607', '#ffffff']} />
      </Layer>
      <TextColumn
        content={content}
        style={style}
        ty={ty}
        px={px}
        box={{ top: 130, bottom: L ? 280 : 320, left: L ? 380 : 110, right: L ? 380 : 110 }}
        sub={{ font: FONT_STACKS.serif, color: '#a33a12', size: 26, spacing: 4, upper: true }}
        heading={{ font: FONT_STACKS.serif, color: '#8a2a0c', max: 104, height: 170 }}
        divider="#a33a12aa"
        messageMax={42}
        sender={{ introColor: '#a33a12', introFont: FONT_STACKS.serif, introSize: 22, nameFont: FONT_STACKS.script, nameColor: '#8a2a0c', nameMax: 54 }}
      />
    </CardRoot>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
 * BHAUBIJ · TILAK — minimal ivory with a kumkum tilak and akshata
 * ───────────────────────────────────────────────────────────────────────── */
export const TilakBhaubijCard = (props: TemplateProps) => {
  const { content, style, dims } = props;
  const { px, L } = useScale(props);
  const { width: W } = dims;
  const red = '#b3121f';
  const ty = resolveTypography(style, { font: 'garamond', color: '#3a2420', align: 'center' });
  const tilakS = px(190);
  return (
    <CardRoot dims={dims} background="#fffaf2">
      <Layer style={{ inset: px(30), border: `2px solid ${red}` }} />
      <Layer style={{ inset: px(42), border: `1px solid ${red}55` }} />
      <Layer style={{ top: px(70), left: (W - tilakS) / 2 }}>
        <Tilak size={tilakS} />
      </Layer>
      <Layer style={{ left: px(L ? 360 : 140), right: px(L ? 360 : 140), bottom: px(110), height: 2, background: `${red}66` }} />
      <Layer style={{ left: 0, right: 0, bottom: px(64), display: 'flex', justifyContent: 'center' }}>
        <Diya size={px(110)} variant="painted" glow={0.55} />
      </Layer>
      <TextColumn
        content={content}
        style={style}
        ty={ty}
        px={px}
        box={{ top: 300, bottom: 200, left: L ? 400 : 130, right: L ? 400 : 130 }}
        sub={{ font: FONT_STACKS.serif, color: red, size: 22, spacing: 6, upper: true }}
        heading={{ font: FONT_STACKS.garamond, color: red, max: 112, height: 170, weight: 600 }}
        divider={`${red}aa`}
        messageMax={42}
        messageItalic
        sender={{ introColor: red, introFont: FONT_STACKS.serif, introSize: 22, nameFont: FONT_STACKS.garamond, nameColor: '#3a2420', nameMax: 50 }}
      />
    </CardRoot>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
 * BHAUBIJ · BHET — playful lavender with gift boxes and confetti
 * ───────────────────────────────────────────────────────────────────────── */
export const BhetBhaubijCard = (props: TemplateProps) => {
  const { content, style, dims } = props;
  const { px, L } = useScale(props);
  const { width: W, height: H } = dims;
  const purple = '#6b21a8';
  const ty = resolveTypography(style, { font: 'sans', color: '#3b1f52', align: 'center' });
  const rand = seededRandom(W + H * 3);
  const confetti = Array.from({ length: 46 }, () => ({
    x: rand(),
    y: rand(),
    c: ['#ff4f81', '#ffb703', '#2ec4b6', '#8338ec', '#fb5607'][Math.floor(rand() * 5)],
    s: 6 + rand() * 8,
    r: rand() * 90,
  }));
  return (
    <CardRoot dims={dims} background="linear-gradient(180deg, #f7efff 0%, #ead9fb 100%)">
      {confetti.map((p, i) => (
        <Layer key={i} style={{ left: `${p.x * 100}%`, top: `${p.y * 100}%`, width: px(p.s), height: px(p.s * (i % 3 ? 0.45 : 1)), background: p.c, borderRadius: i % 3 ? 2 : '50%', transform: `rotate(${p.r}deg)`, opacity: 0.7 }} />
      ))}
      <Layer style={{ inset: px(28), border: `${Math.max(2, px(3))}px solid ${purple}44`, borderRadius: px(40) }} />
      <Layer style={{ left: 0, right: 0, bottom: px(48), display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: px(L ? 60 : 24) }}>
        <GiftBox size={px(140)} box="#ec4899" ribbon="#fde047" />
        <GiftBox size={px(190)} box={purple} ribbon="#fbbf24" />
        <GiftBox size={px(130)} box="#0f766e" ribbon="#f9a8d4" />
      </Layer>
      <TextColumn
        content={content}
        style={style}
        ty={ty}
        px={px}
        box={{ top: 150, bottom: 290, left: L ? 380 : 120, right: L ? 380 : 120 }}
        sub={{ font: FONT_STACKS.sans, color: '#a21caf', size: 22, spacing: 5, upper: true }}
        heading={{ font: FONT_STACKS.yatra, color: purple, max: 108, height: 170, weight: 400 }}
        divider={`${purple}88`}
        messageMax={40}
        sender={{ introColor: '#a21caf', introFont: FONT_STACKS.sans, introSize: 21, nameFont: FONT_STACKS.yatra, nameColor: purple, nameMax: 50, nameWeight: 400 }}
      />
    </CardRoot>
  );
};

/* ─────────────────────────────────────────────────────────────────────────
 * BHAUBIJ · MITHAI THALI — warm cream with a plate of sweets
 * ───────────────────────────────────────────────────────────────────────── */
export const MithaiBhaubijCard = (props: TemplateProps) => {
  const { content, style, dims } = props;
  const { px, L } = useScale(props);
  const { width: W } = dims;
  const green = '#2f6b2f';
  const ty = resolveTypography(style, { font: 'garamond', color: '#3f2a10', align: 'center' });
  const plateW = px(L ? 340 : 400);
  return (
    <CardRoot dims={dims} background="radial-gradient(ellipse at 50% 40%, #fffbea 0%, #fff1c2 70%, #fde39a 100%)">
      <Layer style={{ inset: px(26), border: `${Math.max(2, px(3))}px solid ${green}`, borderRadius: px(16) }} />
      <Layer style={{ top: px(-50), left: px(-50) }}>
        <FloralCluster size={px(300)} seed={5} />
      </Layer>
      <Layer style={{ top: px(-50), right: px(-50), transform: 'scaleX(-1)' }}>
        <FloralCluster size={px(300)} seed={11} />
      </Layer>
      <Layer style={{ bottom: px(40), left: (W - plateW) / 2 }}>
        <SweetsPlate width={plateW} />
      </Layer>
      <TextColumn
        content={content}
        style={style}
        ty={ty}
        px={px}
        box={{ top: 190, bottom: L ? 270 : 300, left: L ? 380 : 120, right: L ? 380 : 120 }}
        sub={{ font: FONT_STACKS.decorative, color: green, size: 24, spacing: 5, upper: true }}
        heading={{ font: FONT_STACKS.yatra, color: '#b4410c', max: 104, height: 170, weight: 400 }}
        divider={`${green}aa`}
        messageMax={42}
        sender={{ introColor: green, introFont: FONT_STACKS.decorative, introSize: 22, nameFont: FONT_STACKS.script, nameColor: '#b4410c', nameMax: 54 }}
      />
    </CardRoot>
  );
};
