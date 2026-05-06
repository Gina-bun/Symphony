import { getAudioCtx } from "./audio.js"

export function setUpUI({onMicStart, onFileLoad, onStop}){

const modeSelector = document.getElementById("mode-selector")
const micModeToggle = document.getElementById("btn-mode-mic")
const fileModeToggle = document.getElementById("btn-mode-file")

const processMessage = document.getElementById("process-message")
const errorMessage = document.getElementById("error-message")

const fileMode = document.getElementById("source-file")
const micMode = document.getElementById("mic-option")

const micSwitch = document.getElementById("mic-switch")
const fileSwitch = document.getElementById("file-switch")

const fileInput = document.getElementById("audio-upload")

const playBtn = document.getElementById("btn-play")
const playbackControls = document.getElementById("playback-controls")
const pauseBtn = document.getElementById("btn-pause-resume")
const stopBtn = document.getElementById("btn-stop")


//MODE SWITCHING
function toggleMode(triggerBtn, currentMode, targetMode){

    triggerBtn.addEventListener("click", () => {
        currentMode.classList.add("hidden")
        targetMode.classList.remove("hidden")
    })



}

//To show which mode is active, mic or file
let activeMode = null
micModeToggle.addEventListener("click", () => { activeMode = "mic" })
fileModeToggle.addEventListener("click", () => { activeMode = "file" })

//when in mic mode 
toggleMode(micModeToggle, modeSelector, micMode)

//when in file mode
toggleMode(fileModeToggle, modeSelector, fileMode)

//switch to mic mode
toggleMode(micSwitch, fileMode, micMode)

//switch to file mode
toggleMode(fileSwitch, micMode, fileMode)

//switch to mode selector if stop button is clicked
toggleMode(stopBtn, micMode, modeSelector)


//PLAYBACK CONTROLS LOGIC
//FILE input
playBtn.addEventListener("click", async () => {

    console.log("activeMode:", activeMode)
    console.log("file:", fileInput.files[0])
    
    if(activeMode === "mic") return

    if(activeMode === "file"){
        if(fileInput.files[0]) {
            await onFileLoad(fileInput.files[0])
            playbackControls.classList.remove("hidden")
            playBtn.classList.add("hidden")
            processMessage.textContent = `Playing ${fileInput.files[0].name}....`
        }
    }
})

//MIC input
micModeToggle.addEventListener("click", async () => {
    if(activeMode === "mic") {
        try{
            await onMicStart()
            playbackControls.classList.remove("hidden")
        }
        catch(e){
            errorMessage.classList.remove("hidden")
            errorMessage.textContent = e + ""
        }
    }

    return
})

//file input
fileInput.addEventListener("change", () => {
    if(fileInput.files[0]) {
        playBtn.classList.remove("hidden")
        processMessage.textContent = "Audio file ready to play"
    }
})

//PAUSE
pauseBtn.addEventListener("click", () => {
    const audioCtx = getAudioCtx()
     if(pauseBtn.classList.contains("pause")) {
        audioCtx.suspend()
        pauseBtn.classList.remove("pause")
        pauseBtn.classList.add("resume")
        pauseBtn.textContent = "Resume"

        return
    }

    if(pauseBtn.classList.contains("resume")){
        audioCtx.resume()
        pauseBtn.classList.remove("resume")
        pauseBtn.classList.add("pause")
        pauseBtn.textContent = "Pause"

        return
    }

})

//STOP
stopBtn.addEventListener("click", () => {
  onStop()
  //reset UI back to initial
  modeSelector.classList.remove("hidden")
  playbackControls.classList.add("hidden")
  if(!playBtn.classList.contains("hidden")) playBtn.classList.add("hidden")

  //remove error message
  errorMessage.classList.add("hidden")
})


}