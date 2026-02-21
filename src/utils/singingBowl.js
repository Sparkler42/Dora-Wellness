/**
 * Low resonant gong sound for exercise timers.
 * Uses Web Audio API synthesis — no external audio file needed.
 */

let audioCtx = null;

function getContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
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
    await ctx.resume();
  }
}

/**
 * Play a low resonant gong sound.
 * @param {"step"|"complete"} type — "step" for between steps,
 *   "complete" for exercise end (played slightly louder/longer).
 */
export function playSingingBowl(type = "step") {
  try {
    const ctx = getContext();
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const isComplete = type === "complete";
    const volume = isComplete ? 0.7 : 0.5;
    const duration = isComplete ? 5.0 : 3.5;
    const now = ctx.currentTime;

    const master = ctx.createGain();
    master.gain.setValueAtTime(volume, now);
    master.gain.setValueAtTime(volume, now + 0.01);
    master.gain.exponentialRampToValueAtTime(0.001, now + duration);
    master.connect(ctx.destination);

    // Gong partials — low fundamental with rich inharmonic overtones
    const partials = [
      { freq: 65,    gain: 1.0,  decay: 1.0  },  // deep fundamental (C2)
      { freq: 98,    gain: 0.7,  decay: 0.9  },  // low fifth
      { freq: 130.8, gain: 0.5,  decay: 0.85 },  // octave
      { freq: 164,   gain: 0.3,  decay: 0.7  },  // inharmonic overtone
      { freq: 196,   gain: 0.25, decay: 0.65 },  // G3
      { freq: 261.6, gain: 0.15, decay: 0.5  },  // C4 shimmer
      { freq: 330,   gain: 0.08, decay: 0.4  },  // high shimmer
    ];

    partials.forEach(({ freq, gain: g, decay }) => {
      const osc = ctx.createOscillator();
      const pGain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);
      // Slight pitch drift for organic feel
      osc.frequency.exponentialRampToValueAtTime(freq * 0.997, now + duration);

      // Attack: quick fade in to avoid click
      pGain.gain.setValueAtTime(0, now);
      pGain.gain.linearRampToValueAtTime(g * volume, now + 0.008);
      // Decay: each partial fades at its own rate
      pGain.gain.exponentialRampToValueAtTime(0.001, now + duration * decay);

      osc.connect(pGain);
      pGain.connect(master);
      osc.start(now);
      osc.stop(now + duration + 0.1);
    });

    // Add subtle noise burst at attack for the "strike" transient
    const noiseLen = 0.06;
    const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * noiseLen, ctx.sampleRate);
    const noiseData = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseData.length; i++) {
      noiseData[i] = (Math.random() * 2 - 1) * 0.3;
    }
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    // Bandpass filter the noise to sound like a mallet hit
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.value = 200;
    noiseFilter.Q.value = 1.5;

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(volume * 0.6, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + noiseLen);

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(master);
    noiseSource.start(now);

  } catch (err) {
    console.warn("[SingingBowl] playback failed:", err);
  }
}
