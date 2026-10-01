import type {ReactNode} from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {TransitionSeries, linearTiming, type TransitionPresentation} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {slide} from '@remotion/transitions/slide';

import {Background} from './components/Background';
import {ProgressBar} from './components/ProgressBar';
import {
  MUSIC_VOLUME,
  SCENES,
  SFX_CUES,
  TRANSITION_FRAMES,
  VOICE_CUES,
} from './utils/timeline';

import {Scene1Hook} from './scenes/Scene1Hook';
import {Scene2Intro} from './scenes/Scene2Intro';
import {Scene3Profile} from './scenes/Scene3Profile';
import {Scene4Username} from './scenes/Scene4Username';
import {Scene5AddAccount} from './scenes/Scene5AddAccount';
import {Scene6Form} from './scenes/Scene6Form';
import {Scene7Outro} from './scenes/Scene7Outro';

const timing = linearTiming({durationInFrames: TRANSITION_FRAMES});

const LAYERS: ReactNode[] = [
  <Scene1Hook key="s1" />,
  <Scene2Intro key="s2" />,
  <Scene3Profile key="s3" />,
  <Scene4Username key="s4" />,
  <Scene5AddAccount key="s5" />,
  <Scene6Form key="s6" />,
  <Scene7Outro key="s7" />,
];

/** One presentation per cut (6 cuts). */
const PRESENTATIONS: TransitionPresentation<Record<string, unknown>>[] = [
  slide({direction: 'from-bottom'}),
  fade(),
  slide({direction: 'from-right'}),
  fade(),
  slide({direction: 'from-right'}),
  fade(),
];

export const TRANSITION_PLAN = PRESENTATIONS;

const seriesChildren: ReactNode[] = [];
LAYERS.forEach((layer, i) => {
  seriesChildren.push(
    <TransitionSeries.Sequence key={`seq-${i}`} durationInFrames={SCENES[i].duration}>
      {layer}
    </TransitionSeries.Sequence>,
  );
  const presentation = PRESENTATIONS[i];
  if (presentation) {
    seriesChildren.push(
      <TransitionSeries.Transition key={`tr-${i}`} presentation={presentation} timing={timing} />,
    );
  }
});

/**
 * 30.00s vertical Reel.
 *
 * Scene durations (95 / 125 / 155 / 155 / 155 / 155 / 120 = 960 frames) minus
 * six 10-frame transitions = exactly 900 frames @ 30fps.
 * Visible cuts land on 0 / 3 / 7 / 12 / 17 / 22 / 27 seconds.
 */
export const Reel: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: '#0B0B10'}}>
      {/* persistent background so cross-fades never dip to black */}
      <Background />

      <TransitionSeries>{seriesChildren}</TransitionSeries>

      <ProgressBar top={34} />

      {/* music bed */}
      <Audio src={staticFile('audio/music.wav')} volume={MUSIC_VOLUME} />

      {/* Persian narration, synced to each scene */}
      {VOICE_CUES.map((cue) => (
        <Sequence key={cue.file} from={cue.frame} name={`VO ${cue.file}`}>
          <Audio src={staticFile(`audio/${cue.file}`)} volume={cue.volume} />
        </Sequence>
      ))}

      {/* UI / transition sound effects */}
      {SFX_CUES.map((cue, i) => (
        <Sequence
          key={`${cue.file}-${cue.frame}-${i}`}
          from={cue.frame}
          name={`SFX ${cue.file}`}
        >
          <Audio src={staticFile(`audio/${cue.file}`)} volume={cue.volume} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
