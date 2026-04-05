# Symphony
A visualizer web application that turns sound into real-time frequency bar animations.

## Features
- Love microphone input visualizer
- Audio file upload & playback visualizer
- Frequency-mapped hsl colour spectrum
- Retina display support

## How to install

## Tech stack
- Vanilla JavaScript (ES Modules)
- Web Audio API (AudioContext, AnalyserNode, FFT)
- Canvas API - requestAnimationFrame draw loop
- Vite - dev server + bundler
- Tailwind CSS - styling

## What I learned
**Canvas has two separate size systems**
**AudioContext must be created inside a user gesture**
**Analyzer turns dataArray into FFT**
**FileReader is callback-based, not Promised-based**