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

## How it works
The web application has two modes(mic and file)

## What I learned
**Canvas has two separate size systems**
**AudioContext must be created inside a user gesture**
**Analyzer runs FFT on the audio in real time**  
  Here, the analyzer takes raw audio waves and splits it into individual frequencies(bass, mid, treble). The output is a JavaScript array od 256 numbers(0-255), where **index** 0 is bass and **index** 255 is treble.  
**FileReader is callback-based, not Promised-based**
**The bar heights are calculated with highest starting from y = 0**  
**Setting hue in hsl() to colour each frequrncy by position**