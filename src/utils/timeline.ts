export const FPS = 30;
export const DURATION_SECONDS = 30;
export const DURATION_IN_FRAMES = FPS * DURATION_SECONDS; // 900
export const WIDTH = 1080;
export const HEIGHT = 1920;

export const TRANSITION_FRAMES = 10; // 0.33s — inside the 0.2–0.5s brief

/**
 * With <TransitionSeries> a sequence starts at
 *   start(i) = start(i-1) + duration(i-1) - TRANSITION_FRAMES
 * and the *visible* cut between two scenes happens at the middle of the
 * transition:  cut(i) = start(i) + TRANSITION_FRAMES / 2.
 *
 * Solving cut = [90, 210, 360, 510, 660, 810] (3 / 7 / 12 / 17 / 22 / 27 s)
 * gives the durations below, and the last scene is sized so the whole
 * composition is exactly 900 frames = 30.00 s.
 */
const DURATIONS = [95, 130, 160, 160, 160, 160, 95]; // sum 960 − 6·10 = 900

const META = [
  {id: 'hook', label: 'Hook', at: 0},
  {id: 'intro', label: 'Intro', at: 3},
  {id: 'profile', label: 'Step 1', at: 7},
  {id: 'username', label: 'Step 2', at: 12},
  {id: 'addAccount', label: 'Step 3', at: 17},
  {id: 'form', label: 'Step 4', at: 22},
  {id: 'outro', label: 'Outro', at: 27},
] as const;

let cursor = 0;
export const SCENES = META.map((m, i) => {
  const duration = DURATIONS[i];
  const start = cursor;
  cursor = start + duration - TRANSITION_FRAMES;
  // The scene is on screen from the previous cut to its own cut.
  const cutOut = start + duration - TRANSITION_FRAMES / 2;
  const visibleFrom = i === 0 ? 0 : start + TRANSITION_FRAMES / 2;
  return {...m, duration, start, cutOut, visibleFrom};
});

/** Sanity: computed total composition length (must equal 900). */
export const COMPUTED_LENGTH =
  SCENES[SCENES.length - 1].start + DURATIONS[DURATIONS.length - 1];

export type SceneId = (typeof META)[number]['id'];

/** Frame at which each scene becomes fully visible (its cut). */
export const CUTS = SCENES.map((s) => s.cutOut);

/** Sound-effect cues (absolute frame, file, volume). */
export const SFX_CUES: {frame: number; file: string; volume: number}[] = [
  {frame: 0, file: 'sfx-whoosh.wav', volume: 0.38},
  {frame: 14, file: 'sfx-pop.wav', volume: 0.30},

  {frame: 88, file: 'sfx-transition.wav', volume: 0.34},
  {frame: 126, file: 'sfx-swipe.wav', volume: 0.26},

  {frame: 206, file: 'sfx-transition.wav', volume: 0.34},
  {frame: 260, file: 'sfx-tap.wav', volume: 0.45},
  {frame: 295, file: 'sfx-pop.wav', volume: 0.26},

  {frame: 356, file: 'sfx-transition.wav', volume: 0.34},
  {frame: 397, file: 'sfx-tap.wav', volume: 0.45},
  {frame: 429, file: 'sfx-swipe.wav', volume: 0.34},

  {frame: 506, file: 'sfx-transition.wav', volume: 0.34},
  {frame: 557, file: 'sfx-tap.wav', volume: 0.49},
  {frame: 569, file: 'sfx-pop.wav', volume: 0.34},

  {frame: 656, file: 'sfx-transition.wav', volume: 0.34},
  {frame: 663, file: 'sfx-click.wav', volume: 0.30},
  {frame: 701, file: 'sfx-click.wav', volume: 0.30},
  {frame: 739, file: 'sfx-click.wav', volume: 0.30},

  {frame: 806, file: 'sfx-transition.wav', volume: 0.38},
  {frame: 818, file: 'sfx-success.wav', volume: 0.38},
];

/** Persian voice-over clips, synced to the scene they describe. */
export const VOICE_CUES: {file: string; frame: number; volume: number}[] = [
  {file: 'vo-1.wav', frame: 3, volume: 1}, // 0.1s  · hook
  {file: 'vo-2.wav', frame: 94, volume: 1}, // 3.15s · intro (cut at 3.0s)
  {file: 'vo-3.wav', frame: 216, volume: 1}, // 7.20s · step 1 (cut at 7.0s)
  {file: 'vo-5.wav', frame: 516, volume: 1}, // 17.2s · step 3 (cut at 17.0s)
  {file: 'vo-6.wav', frame: 666, volume: 1}, // 22.2s · step 4 (cut at 22.0s)
  {file: 'vo-7.wav', frame: 810, volume: 1}, // 27.0s · outro  (cut at 27.0s)
];

/**
 * The narration is levelled to RMS 4000 (~0.12 FS) while the raw music bed
 * measures ~6737, so 0.20 puts the voice ~9.5 dB above the bed.
 */
export const MUSIC_VOLUME = 0.2;
