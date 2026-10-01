import {Composition} from 'remotion';
import './styles/main.css';
import {blockUntilFontsReady} from './fonts';
import {Reel} from './Reel';
import {DURATION_IN_FRAMES, FPS, HEIGHT, WIDTH} from './utils/timeline';

// Block the first captured frame until Vazirmatn (Persian) is fully loaded.
blockUntilFontsReady();

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Reel"
      component={Reel}
      durationInFrames={DURATION_IN_FRAMES}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};
