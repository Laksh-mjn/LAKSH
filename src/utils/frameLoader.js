/**
 * High-Performance Shared Frame Loader & Memory Cache
 * Provides stutter-free 120fps scrubbing across all components with zero duplicate memory allocation.
 */

const TOTAL_FRAMES = 300;

// Resolve base URL safely for GitHub Pages sub-paths or local dev
const getBaseUrl = () => {
  const base = import.meta.env.BASE_URL || './';
  return base.endsWith('/') ? base : `${base}/`;
};

export const FRAME_COUNT = TOTAL_FRAMES;
export const BASE_FRAME_URL = `${getBaseUrl()}katana-frames/ezgif-frame-`;

// Singleton image cache
const frameCache = new Array(TOTAL_FRAMES);
let isPreloading = false;
const listeners = new Set();

/**
 * Returns the loaded Image object for the given frame index,
 * or the closest available loaded neighbor if the target is still loading.
 */
export function getCachedFrame(index) {
  const targetIdx = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(index)));
  
  // 1. Direct hit
  const direct = frameCache[targetIdx];
  if (direct && direct.complete && direct.naturalWidth > 0) {
    return direct;
  }

  // 2. Search nearest preceding frame
  for (let i = targetIdx - 1; i >= 0; i--) {
    const prev = frameCache[i];
    if (prev && prev.complete && prev.naturalWidth > 0) {
      return prev;
    }
  }

  // 3. Search nearest succeeding frame
  for (let i = targetIdx + 1; i < TOTAL_FRAMES; i++) {
    const next = frameCache[i];
    if (next && next.complete && next.naturalWidth > 0) {
      return next;
    }
  }

  return null;
}

/**
 * Preloads all sequential katana frames with priority batching.
 */
export function preloadKatanaFrames() {
  if (isPreloading) return;
  isPreloading = true;

  const loadFrame = (index) => {
    return new Promise((resolve) => {
      if (frameCache[index] && frameCache[index].complete) {
        resolve(frameCache[index]);
        return;
      }

      const img = new Image();
      const frameNum = String(index + 1).padStart(3, '0');
      img.src = `${BASE_FRAME_URL}${frameNum}.jpg`;

      img.onload = () => {
        frameCache[index] = img;
        if (img.decode) {
          img.decode().catch(() => {}).finally(() => {
            listeners.forEach((fn) => fn(index));
            resolve(img);
          });
        } else {
          listeners.forEach((fn) => fn(index));
          resolve(img);
        }
      };

      img.onerror = () => {
        resolve(null);
      };
    });
  };

  const executePreload = async () => {
    // 1. Critical first batch (Frames 0 to 30) for instant rendering
    const criticalBatch = [];
    for (let i = 0; i < 30; i++) {
      criticalBatch.push(loadFrame(i));
    }
    await Promise.all(criticalBatch);

    // 2. Stream remaining frames in fast concurrent chunks
    for (let i = 30; i < TOTAL_FRAMES; i += 25) {
      const chunk = [];
      for (let j = i; j < Math.min(i + 25, TOTAL_FRAMES); j++) {
        chunk.push(loadFrame(j));
      }
      await Promise.all(chunk);
    }
  };

  executePreload();
}

/**
 * Subscribe to frame load notifications
 */
export function onFrameLoaded(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}
