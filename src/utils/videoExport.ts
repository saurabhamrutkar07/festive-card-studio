import { flushSync } from 'react-dom';
import { toCanvas } from 'html-to-image';
import { ArrayBufferTarget, Muxer } from 'mp4-muxer';
import { GIFEncoder, applyPalette, quantize } from 'gifenc';
import { getFontCss } from './imageExport';
import { FIREWORKS_LOOP_SECONDS, setFireworksFrameTime } from '../components/cards/decor/fireworksClock';
import type { CardDimensions } from '../types/card';

/* ══════════════════════════════════════════════════════════════════════════
 * Shared frame renderer — steps the fireworks clock through one seamless loop
 * and rasterises the card at each exact moment (not real time), so slow
 * devices still produce smooth output, they just take longer.
 * ══════════════════════════════════════════════════════════════════════════ */

const renderFrames = async (
  node: HTMLElement,
  dims: CardDimensions,
  { fps, outW, outH, times }: { fps: number; outW: number; outH: number; times?: number[] },
  onFrame: (canvas: HTMLCanvasElement, index: number) => void | Promise<void>,
  onProgress: (fraction: number) => void,
) => {
  if (document.fonts?.ready) await document.fonts.ready;
  const fontEmbedCSS = await getFontCss(node);
  const options = {
    width: dims.width,
    height: dims.height,
    canvasWidth: outW,
    canvasHeight: outH,
    pixelRatio: 1,
    fontEmbedCSS,
    cacheBust: false,
    style: { transform: 'none', margin: '0', left: '0', top: '0' },
  };
  const frameTimes = times ?? Array.from({ length: FIREWORKS_LOOP_SECONDS * fps }, (_, i) => i / fps);
  node.setAttribute('data-exporting', '');
  try {
    for (let i = 0; i < frameTimes.length; i++) {
      flushSync(() => setFireworksFrameTime(frameTimes[i]));
      await onFrame(await toCanvas(node, options), i);
      onProgress((i + 1) / frameTimes.length);
      // Yield so the progress bar repaints and the page stays responsive.
      await new Promise((r) => setTimeout(r, 0));
    }
  } finally {
    node.removeAttribute('data-exporting');
    setFireworksFrameTime(null);
  }
};

/* ══════════════════════════════════════════════════════════════════════════
 * GIF — the main animated format: autoplays and loops inline in chats,
 * galleries and email, so recipients see the card without opening anything.
 * ══════════════════════════════════════════════════════════════════════════ */

const GIF_FPS = 15;
/** Longest side of the GIF. Keeps files WhatsApp-friendly while text stays crisp. */
const GIF_MAX_SIDE = 900;
const TRANSPARENT = 255;

export const exportCardToGif = async (node: HTMLElement, dims: CardDimensions, onProgress: (fraction: number) => void): Promise<Blob> => {
  const scale = Math.min(1, GIF_MAX_SIDE / Math.max(dims.width, dims.height));
  const outW = Math.round(dims.width * scale);
  const outH = Math.round(dims.height * scale);

  const readPixels = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) throw new Error('Your browser could not process the animation.');
    return ctx.getImageData(0, 0, outW, outH).data;
  };

  // Pass 1: build one shared palette from 4 evenly spaced moments
  // (255 colours + 1 transparent slot). Avoids keeping every frame in memory.
  const L = FIREWORKS_LOOP_SECONDS;
  const sampleBuf = new Uint8ClampedArray(outW * outH * 4 * 4);
  await renderFrames(
    node,
    dims,
    { fps: GIF_FPS, outW, outH, times: [0, L * 0.25, L * 0.5, L * 0.75] },
    (canvas, i) => sampleBuf.set(readPixels(canvas), i * outW * outH * 4),
    (f) => onProgress(f * 0.08),
  );
  const palette = quantize(sampleBuf, 255);
  while (palette.length < 255) palette.push([0, 0, 0]);
  const opaque = palette.slice(); // match pixels only against real colours
  palette.push([0, 0, 0]); // index 255 = transparent

  // Pass 2: render and encode each frame as it is drawn.
  const gif = GIFEncoder();
  let prev: Uint8Array | null = null;
  const frameMs = 1000 / GIF_FPS;
  await renderFrames(
    node,
    dims,
    { fps: GIF_FPS, outW, outH },
    (canvas, i) => {
      const index = applyPalette(readPixels(canvas), opaque);
      // Only store pixels that changed; the static card art is written once.
      let diff = index;
      if (prev) {
        diff = new Uint8Array(index.length);
        for (let p = 0; p < index.length; p++) diff[p] = index[p] === prev[p] ? TRANSPARENT : index[p];
      }
      // GIF delays are in 1/100 s; spread rounding so the loop stays exactly 4 s.
      const delay = Math.round(((i + 1) * frameMs) / 10) * 10 - Math.round((i * frameMs) / 10) * 10;
      gif.writeFrame(diff, outW, outH, {
        palette: i === 0 ? palette : undefined,
        delay,
        repeat: 0,
        transparent: i > 0,
        transparentIndex: TRANSPARENT,
        dispose: 1,
      });
      prev = index;
    },
    (f) => onProgress(0.08 + f * 0.92),
  );
  gif.finish();
  return new Blob([gif.bytes()], { type: 'image/gif' });
};

/* ══════════════════════════════════════════════════════════════════════════
 * MP4 — optional HD video for Instagram / Facebook / Reels.
 * ══════════════════════════════════════════════════════════════════════════ */

const MP4_FPS = 20;
const BITRATE = 6_000_000;
/** H.264 High / Main / Baseline at level 4.0+ — all cover 1920×1080. */
const CODECS = ['avc1.640028', 'avc1.4d0028', 'avc1.42002a'];

/** WebCodecs is in Chrome, Edge, Safari 16.4+ and Firefox 130+. */
export const canExportVideo = () => typeof window !== 'undefined' && 'VideoEncoder' in window && 'VideoFrame' in window;

const pickCodec = async (width: number, height: number): Promise<string> => {
  for (const codec of CODECS) {
    try {
      const { supported } = await VideoEncoder.isConfigSupported({ codec, width, height, bitrate: BITRATE, framerate: MP4_FPS });
      if (supported) return codec;
    } catch {
      /* try next */
    }
  }
  throw new Error('This browser cannot create MP4 videos. Please try Chrome or Edge.');
};

export const exportCardToVideo = async (node: HTMLElement, dims: CardDimensions, onProgress: (fraction: number) => void): Promise<Blob> => {
  if (!canExportVideo()) throw new Error('This browser cannot create videos. Please try Chrome, Edge or Safari.');
  const { width, height } = dims;
  const codec = await pickCodec(width, height);

  const muxer = new Muxer({
    target: new ArrayBufferTarget(),
    video: { codec: 'avc', width, height, frameRate: MP4_FPS },
    fastStart: 'in-memory',
  });
  let encodeError: unknown = null;
  const encoder = new VideoEncoder({
    output: (chunk, meta) => muxer.addVideoChunk(chunk, meta),
    error: (e) => {
      encodeError = e;
    },
  });
  encoder.configure({ codec, width, height, bitrate: BITRATE, framerate: MP4_FPS });
  const frameUs = 1_000_000 / MP4_FPS;

  try {
    await renderFrames(
      node,
      dims,
      { fps: MP4_FPS, outW: width, outH: height },
      async (canvas, i) => {
        const frame = new VideoFrame(canvas, { timestamp: Math.round(i * frameUs), duration: Math.round(frameUs) });
        encoder.encode(frame, { keyFrame: i % (MP4_FPS * 2) === 0 });
        frame.close();
        if (encodeError) throw encodeError;
        while (encoder.encodeQueueSize > 3) await new Promise((r) => setTimeout(r, 10));
      },
      onProgress,
    );
    await encoder.flush();
    if (encodeError) throw encodeError;
    muxer.finalize();
    return new Blob([muxer.target.buffer], { type: 'video/mp4' });
  } finally {
    if (encoder.state !== 'closed') encoder.close();
  }
};
