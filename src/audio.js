import { startVisualizer, stopVisualizer } from "./visualizer.js"

let audioCtx, analyzer, source, dataArray, currentMode, micStream

//WHEN USER CLICKS THE MIC
export async function startMic(){
currentMode = "mic"

micStream = await navigator.mediaDevices.getUserMedia({audio: true})//asking browser for stream

audioCtx = new AudioContext()//audio context created

analyzer = audioCtx.createAnalyser()//analyzer node created
analyzer.fftSize = 256//set fftSize

//creating source from stream
source = audioCtx.createMediaStreamSource(micStream)

//connect source to analyzer
source.connect(analyzer)

//create data array
dataArray = new Uint8Array(analyzer.frequencyBinCount)

startVisualizer()
}


//WHEN USER UPLOADS A FILE
export async function loadFile(file){
currentMode = "file"

//read the file as ArrayBuffer
const fileReader = new FileReader()
const arrayBuffer = await new Promise((resolve) => {
    fileReader.onload = (e) => resolve(e.target.result)
    fileReader.readAsArrayBuffer(file)
})

audioCtx = new AudioContext()

//decode audio data
const decodedAudio = await audioCtx.decodeAudioData(arrayBuffer)

//creating buffer source node
source = audioCtx.createBufferSource()
source.buffer = decodedAudio

analyzer = audioCtx.createAnalyser()//analyzer node created
analyzer.fftSize = 256//set fftSize
dataArray = new Uint8Array(analyzer.frequencyBinCount)

//connecting: source + analyzer + audioCtx.destination
source.connect(analyzer)
analyzer.connect(audioCtx.destination)

//start playing
source.start()

startVisualizer()
}

//CALLED EVERY ANIMATION FRAME BY visualizer.js
export function getFrequencyData(){
    analyzer.getByteFrequencyData(dataArray)
    return dataArray
}

//WHEN THE USER CLICKS STOP
export function stopAudio(){
  if(currentMode === "mic") micStream.getTracks().forEach(t => t.stop())
  if(currentMode === "file") source.stop()//stop the source
  audioCtx.close()
  source = undefined
  dataArray = undefined
  audioCtx = undefined
  analyzer = undefined

  stopVisualizer()
}

export function getAudioCtx() {
  return audioCtx
}