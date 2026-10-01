#!/usr/bin/env node
/**
 * Normalise the Remotion master into an Instagram-ready delivery file.
 *
 * Remotion's jpeg-image pipeline writes full-range video (`yuvj420p`). Social
 * platforms expect limited-range BT.709 `yuv420p`, so we re-encode once with
 * explicit colour tags and move the moov atom to the front for fast start.
 *
 *   node scripts/finalize.mjs <in.mp4> <out.mp4>
 */
import {execFileSync} from 'node:child_process';
import {existsSync, renameSync, rmSync} from 'node:fs';
import ffmpegPath from 'ffmpeg-static';

const input = process.argv[2] ?? 'out/.master.mp4';
const output = process.argv[3] ?? 'out/reel-second-account.mp4';

if (!existsSync(input)) {
  console.error(`FAIL: master ${input} not found`);
  process.exit(1);
}
if (!ffmpegPath) {
  console.error('FAIL: ffmpeg-static binary not available');
  process.exit(1);
}

const tmp = `${output}.tmp.mp4`;

console.log(`finalising ${input} -> ${output}`);
execFileSync(
  ffmpegPath,
  [
    '-y',
    '-loglevel', 'error',
    '-i', input,
    '-c:v', 'libx264',
    '-preset', 'medium',
    '-crf', '18',
    '-pix_fmt', 'yuv420p',
    '-color_range', 'tv',
    '-colorspace', 'bt709',
    '-color_primaries', 'bt709',
    '-color_trc', 'bt709',
    '-profile:v', 'high',
    '-level', '4.2',
    '-r', '30',
    '-c:a', 'aac',
    '-b:a', '192k',
    '-ar', '48000',
    '-movflags', '+faststart',
    '-shortest',
    tmp,
  ],
  {stdio: 'inherit'},
);

rmSync(output, {force: true});
renameSync(tmp, output);
console.log(`wrote ${output}`);
