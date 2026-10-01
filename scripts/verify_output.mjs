#!/usr/bin/env node
/**
 * QC the rendered Reel.
 *
 *   node scripts/verify_output.mjs out/reel-second-account.mp4
 *
 * Asserts: exactly 30.00s, 1080x1920, 30fps, H.264 video, AAC audio,
 * yuv420p pixel format, and that both video and audio streams exist.
 */
import {execFileSync} from 'node:child_process';
import {existsSync, statSync} from 'node:fs';
import ffprobePath from 'ffprobe-static';

const file = process.argv[2] ?? 'out/reel-second-account.mp4';

if (!existsSync(file)) {
  console.error(`FAIL: ${file} does not exist`);
  process.exit(1);
}

const probe = JSON.parse(
  execFileSync(ffprobePath.path, [
    '-v',
    'error',
    '-show_format',
    '-show_streams',
    '-of',
    'json',
    file,
  ]).toString(),
);

const video = probe.streams.find((s) => s.codec_type === 'video');
const audio = probe.streams.find((s) => s.codec_type === 'audio');
const duration = parseFloat(probe.format.duration);
const [num, den] = (video.r_frame_rate ?? '0/1').split('/').map(Number);
const fps = den ? num / den : 0;

const size = statSync(file).size;

const checks = [
  ['video stream present', Boolean(video)],
  ['audio stream present', Boolean(audio)],
  ['duration == 30.00s', Math.abs(duration - 30) < 0.05, `${duration.toFixed(3)}s`],
  ['width == 1080', video?.width === 1080, String(video?.width)],
  ['height == 1920', video?.height === 1920, String(video?.height)],
  ['fps == 30', Math.abs(fps - 30) < 0.01, `${fps}`],
  ['video codec == h264', video?.codec_name === 'h264', String(video?.codec_name)],
  ['audio codec == aac', audio?.codec_name === 'aac', String(audio?.codec_name)],
  ['pixel format == yuv420p', video?.pix_fmt === 'yuv420p', String(video?.pix_fmt)],
  ['audio sample rate >= 44100', Number(audio?.sample_rate) >= 44100, String(audio?.sample_rate)],
  ['file < 100 MB', size < 100 * 1024 * 1024, `${(size / 1048576).toFixed(1)} MB`],
];

let ok = true;
console.log(`\nQC · ${file}\n${'-'.repeat(46)}`);
for (const [name, pass, detail] of checks) {
  if (!pass) ok = false;
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name.padEnd(30)} ${detail ?? ''}`);
}
console.log('-'.repeat(46));
console.log(
  `total frames = ${video?.nb_frames ?? Math.round(duration * fps)}` +
    `  ·  ${video?.width}x${video?.height}  ·  ${fps}fps  ·  ${duration.toFixed(2)}s`,
);
console.log(ok ? '\nRESULT: PASS\n' : '\nRESULT: FAIL\n');
process.exit(ok ? 0 : 1);
