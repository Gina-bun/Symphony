# Symphony
A visualizer web application that turns sound into real-time frequency bar animations.

## Features
- Love microphone input visualizer
- Audio file upload & playback visualizer
- Frequency-mapped hsl colour spectrum
- Retina display support

## Tech stack
- Vanilla JavaScript (ES Modules)
- Web Audio API (AudioContext, AnalyserNode, FFT)
- Canvas API - requestAnimationFrame draw loop
- Vite - dev server + bundler
- Tailwind CSS - styling

## How it works
The web application has two modes(mic and file).  
Audio from the source is converted into frequency data and displayed as moving visuals.  

### The details:  
**Sound source:** this is your mic or your audio file.  
**AudioContext:** the browser's audio engine.  
**AnalyserNode:** runs FFT(Fast Fourier Transform) on the audio in real time.  

What is FFT?
- an algorithm that takes a signal in real time and converts it to frequency components.
- in this context, it takes the raw audio and splits it into individual frequencies and tells us how loud each frequency is
- the frequencies are bass, mid and treble
- the output is a plain JavaScript array of 256 numbers(0-255)
- **index** 0 equals bass and **index** 255 is treble

So it goes like this:  
**Raw audio --> Frequency chunks --> Plain JS array(256 numbers)**  

**Canvas:** JS array is read 60 times per second to draw the visuals, the numbers change every frame so the visuals move.  

## What I learned
**Canvas has two separate size systems**
**AudioContext must be created inside a user gesture**
**Analyzer runs FFT on the audio in real time**  
  Here, the analyzer takes raw audio waves and splits it into individual frequencies(bass, mid, treble). The output is a JavaScript array od 256 numbers(0-255), where **index** 0 is bass and **index** 255 is treble.  
**FileReader is callback-based, not Promised-based**
**The bar heights are calculated with highest starting from y = 0**  
**Setting hue in hsl() to colour each frequrncy by position**