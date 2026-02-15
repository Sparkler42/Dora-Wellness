/**
 * Singing bowl / meditation bell tone using Web Audio API.
 * Produces a warm, resonant tone that decays naturally.
 */

let audioCtx = null;

function getContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    console.log("[SingingBowl] AudioContext created, state:", audioCtx.state);
  }
  return audioCtx;
}

/**
 * Unlock the AudioContext — must be called from a user-gesture handler
 * (click/tap) so browsers allow audio playback.
 */
export async function unlockAudio() {
  const ctx = getContext();
  if (ctx.state === "suspended") {
    console.log("[SingingBowl] AudioContext suspended, resuming…");
    await ctx.resume();
    console.log("[SingingBowl] AudioContext resumed, state:", ctx.state);
  }
}

/**
 * Play a singing bowl tone.
 * @param {"step"|"complete"} type — "step" for a short bell between steps,
 *   "complete" for a richer, longer tone at exercise end.
 */
export function playSingingBowl(type = "step") {
  try {
    const ctx = getContext();
    console.log("[SingingBowl] playSingingBowl called, type:", type, "ctx.state:", ctx.state);

    // Resume if suspended (best-effort; may not work without prior user gesture)
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const now = ctx.currentTime;

    const isComplete = type === "complete";
    const volume = isComplete ? 0.18 : 0.14;
    const duration = isComplete ? 4.0 : 2.5;

    // Master gain
    const master = ctx.createGain();
    master.gain.setValueAtTime(volume, now);
    master.gain.exponentialRampToValueAtTime(0.001, now + duration);
    master.connect(ctx.destination);

    // Singing bowls produce a fundamental + several inharmonic partials
    const partials = isComplete
      ? [
          { freq: 220, gain: 1.0 },
          { freq: 440, gain: 0.5 },
          { freq: 660, gain: 0.25 },
          { freq: 880, gain: 0.12 },
          { freq: 1320, gain: 0.06 },
        ]
      : [
          { freq: 293.66, gain: 1.0 },   // D4
          { freq: 587.33, gain: 0.4 },   // D5
          { freq: 880, gain: 0.15 },     // A5
        ];

    partials.forEach(({ freq, gain: g }) => {
      const osc = ctx.createOscillator();
      const pGain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);
      // Slight pitch drift down — characteristic of a real singing bowl
      osc.frequency.exponentialRampToValueAtTime(freq * 0.998, now + duration);

      pGain.gain.setValueAtTime(g * volume, now);
      // Higher partials decay faster
      const partialDur = duration * (1 - (freq - partials[0].freq) / 2000 * 0.3);
      pGain.gain.exponentialRampToValueAtTime(0.001, now + Math.max(partialDur, 0.5));

      osc.connect(pGain);
      pGain.connect(master);

      osc.start(now);
      osc.stop(now + duration + 0.1);
    });

    // Soft "strike" transient — short burst of filtered noise
    const bufferSize = ctx.sampleRate * 0.06;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }

    const noiseSrc = ctx.createBufferSource();
    noiseSrc.buffer = noiseBuffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.value = isComplete ? 300 : 400;
    noiseFilter.Q.value = 2;

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(volume * 0.5, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    noiseSrc.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(master);

    noiseSrc.start(now);
    noiseSrc.stop(now + 0.1);
  } catch (err) {
    console.warn("[SingingBowl] playback failed:", err);
  }
}
