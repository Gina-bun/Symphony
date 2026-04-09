import { startMic, loadFile, stopAudio, getAudioCtx } from "./audio.js"

export function setUpUI(){

const modeSelector = document.getElementById("mode-selector")
const micModeToggle = document.getElementById("btn-mode-mic")
const fileModeToggle = document.getElementById("btn-mode-file")

const processMessage = document.getElementById("process-message")
const errorMessage = document.getElementById("error-message")

const fileMode = document.getElementById("source-file")
const micMode = document.getElementById("mic-option")

const micSwitch = document.getElementById("mic-switch")
const fileSwitch = document.getElementById("file-switch")

const micInputBtn = document.getElementById("btn-mic")
const fileInput = document.getElementById("audio-upload")

const playBtn = document.getElementById("btn-play")
const playbackControls = document.getElementById("playback-controls")
const pauseBtn = document.getElementById("btn-pause")
const stopBtn = document.getElementById("btn-stop")

//MODE SWITCHING
function toggleMode(triggerBtn, currentMode, targetMode){
    triggerBtn.addEventLpistener("click", () => {
        currentMode.classList.add("hidden")
        targetMode.classList.remove("hidden")
    })
}

//when in mic mode 
toggleMode(micModeToggle, modeSelector, micMode)

//when in file mode
toggleMode(fileModeToggle, modeSelector, fileMode)

//switch to mic mode
toggleMode(micSwitch, fileMode, micMode)

//switch to file mode
toggleMode(fileSwitch, micMode, fileMode)

//PLAYBACK CONTROLS LOGIC
//FILE input
playBtn.addEventListener("click", async () => {
    if(currentMode === "mic") return

    if(currentMode === "file"){
        if(fileInput.files[0]) {
            loadFile()
            playbackControls.classList.remove("hidden")
            playBtn.classList.add("hidden")
        }
    }
})

//MIC input
micInputBtn.addEventListener("click", async () => {
    if(currentMode === "mic") {
        try{
            await startMic()
            playbackControls.classList.remove("hidden")
        }
        catch(e){
            errorMessage.classList.remove("hidden")
            errorMessage.textContent = e + ""
        }
    }

    return
})

//PAUSE
pauseBtn.addEventListener("click", () => {
     if(pauseBtn.classList.contains("pause")) {
        audioCtx.suspend()
        pauseBtn.classList.remove("pause")
        pauseBtn.classList.add("resume")
        pauseBtn.textContent = "Resume"
    }

    if(pauseBtn.classList.contains("resume")){
        audioCtx.resume()
        pauseBtn.classList.remove("resume")
        pauseBtn.classList.add("pause")
        pauseBtn.textContent = "Pause"
    }

    return   
})

//STOP
stopBtn.addEventListener("click", () => {
  stopAudio()
  //reset UI back to initial
  modeSelector.classList.remove("hidden")
  playbackControls.classList.add("hidden")
  if(!playBtn.classList.contains("hidden")) playBtn.classList.add("hidden")

  //remove error message
  errorMessage.classList.add("hidden")
})


}