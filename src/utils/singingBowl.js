/**
 * Bell chime sound for exercise timers.
 * Plays a pre-recorded bell WAV file from public/sounds/bell.wav,
 * capped at 3 seconds. Uses Web Audio API for precise control.
 */

let audioCtx = null;
let bellBuffer = null;
let bufferLoading = false;

function getContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    console.log("[SingingBowl] AudioContext created, state:", audioCtx.state);
  }
  return audioCtx;
}

/**
 * Preload the bell sound into an AudioBuffer.
 */
async function loadBellBuffer() {
  if (bellBuffer || bufferLoading) return;
  bufferLoading = true;
  try {
    const ctx = getContext();
    const base = import.meta.env.BASE_URL || "/";
    const url = `${base}sounds/bell.wav`;
    console.log("[SingingBowl] Loading bell sound from:", url);
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    bellBuffer = await ctx.decodeAudioData(arrayBuffer);
    console.log("[SingingBowl] Bell sound loaded, duration:", bellBuffer.duration.toFixed(2), "s");
  } catch (err) {
    console.warn("[SingingBowl] Failed to load bell sound:", err);
    bufferLoading = false;
  }
}

/**
 * Unlock the AudioContext — must be called from a user-gesture handler
 * (click/tap) so browsers allow audio playback. Also preloads the bell sound.
 */
export async function unlockAudio() {
  const ctx = getContext();
  if (ctx.state === "suspended") {
    console.log("[SingingBowl] AudioContext suspended, resuming…");
    await ctx.resume();
    console.log("[SingingBowl] AudioContext resumed, state:", ctx.state);
  }
  loadBellBuffer();
}

/**
 * Play the bell chime sound.
 * @param {"step"|"complete"} type — "step" for between steps,
 *   "complete" for exercise end (played slightly louder).
 */
export function playSingingBowl(type = "step") {
  try {
    const ctx = getContext();
    const isComplete = type === "complete";
    const volume = isComplete ? 0.8 : 0.6;
    const maxDuration = 3.0;

    console.log("[SingingBowl] playSingingBowl called, type:", type, "ctx.state:", ctx.state, "bufferLoaded:", !!bellBuffer);

    if (ctx.state === "suspended") {
      ctx.resume();
    }

    if (bellBuffer) {
      // Play the pre-recorded bell, capped at 3 seconds
      const now = ctx.currentTime;
      const source = ctx.createBufferSource();
      source.buffer = bellBuffer;

      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(volume, now);
      // Fade out over the last 0.3s to avoid clicks
      const fadeStart = Math.min(maxDuration, bellBuffer.duration) - 0.3;
      if (fadeStart > 0) {
        gainNode.gain.setValueAtTime(volume, now + fadeStart);
        gainNode.gain.linearRampToValueAtTime(0, now + fadeStart + 0.3);
      }

      source.connect(gainNode);
      gainNode.connect(ctx.destination);

      source.start(now, 0, maxDuration);
      console.log("[SingingBowl] Playing bell sound, volume:", volume, "duration:", maxDuration + "s");
    } else {
      // Fallback: synthesized tone if file hasn't loaded yet
      console.log("[SingingBowl] Buffer not loaded, using synthesized fallback");
      playSynthesizedBell(ctx, volume, maxDuration);
    }
  } catch (err) {
    console.warn("[SingingBowl] playback failed:", err);
  }
}

/**
 * Fallback synthesized bell if the WAV hasn't loaded.
 */
function playSynthesizedBell(ctx, volume, duration) {
  const now = ctx.currentTime;

  const master = ctx.createGain();
  master.gain.setValueAtTime(volume, now);
  master.gain.exponentialRampToValueAtTime(0.001, now + duration);
  master.connect(ctx.destination);

  const partials = [
    { freq: 261.63, gain: 1.0 },
    { freq: 523.25, gain: 0.5 },
    { freq: 783.99, gain: 0.2 },
  ];

  partials.forEach(({ freq, gain: g }) => {
    const osc = ctx.createOscillator();
    const pGain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.998, now + duration);
    pGain.gain.setValueAtTime(g * volume, now);
    pGain.gain.exponentialRampToValueAtTime(0.001, now + duration * 0.8);
    osc.connect(pGain);
    pGain.connect(master);
    osc.start(now);
    osc.stop(now + duration + 0.1);
  });
}
