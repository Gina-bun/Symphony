import { getAudioCtx } from "./audio.js"

export function setUpUI({onMicStart, onFileLoad, onStop}){

const modeSelector = document.getElementById("mode-selector")
const micModeToggle = document.getElementById("btn-mode-mic")
const fileModeToggle = document.getElementById("btn-mode-file")

const processMessage = document.getElementById("process-message")
const errorMessage = document.getElementById("error-message")

const fileMode = document.getElementById("source-file")
const micMode = document.getElementById("mic-option")

//switch buttons
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
// if (activeMode === "mic"){
//     toggleMode(stopBtn, micMode, modeSelector)
//     return

// }else if(activeMode === "file"){ 
//     toggleMode(stopBtn, fileMode, modeSelector)
//     return
// }


//MIC input
micModeToggle.addEventListener("click", async () => {
    if(activeMode === "mic") {
        try{
            await onMicStart()
            playbackControls.classList.remove("hidden")
            processMessage.textContent = "Using microphone to see sound visuals"
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
        console.log(`${fileInput.files[0].name} is ready to play`) 
        playbackControls.classList.remove("hidden")
        pauseBtn.textContent = "Play"
        pauseBtn.classList.remove("pause")
        pauseBtn.classList.add("play")
        processMessage.textContent = "Click play to see sound visuals"
    }
})

//PAUSE
pauseBtn.addEventListener("click", async () => {
    const audioCtx = getAudioCtx()

     if(pauseBtn.classList.contains("play") && activeMode === "file"){
            pauseBtn.classList.remove("play")
            pauseBtn.classList.add("pause")
            pauseBtn.textContent = "Pause"
        
           if(fileInput.files[0]) {
                processMessage.textContent = `loading...`
                await onFileLoad(fileInput.files[0])
                playbackControls.classList.remove("hidden")
                processMessage.textContent = `Playing ${fileInput.files[0].name}....`
                
            }


        return            
     }
    
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
  if(errorMessage) errorMessage.classList.add("hidden")
  if(!playBtn.classList.contains("hidden")) playBtn.classList.add("hidden")
  modeSelector.classList.remove("hidden")  
  playbackControls.classList.add("hidden")
  processMessage.textContent = "Upload an audio file or use mic"

  console.log("activeMode:", activeMode)

  if(activeMode === "mic"){
    toggleMode(stopBtn, micMode, modeSelector)
    micMode.classList.add("hidden")
    return
  }
  else if(activeMode === "file"){
    toggleMode(stopBtn, fileMode, modeSelector)
    fileMode.classList.add("hidden")
    return
  }
 
  
})

//SWITCHING MODE LOGIC
micSwitch.addEventListener("click", async () => {
    activeMode = "mic" 
    toggleMode(micSwitch, fileMode, micMode)
    playbackControls.classList.add("hidden")
    onStop()
    processMessage.textContent = "Using microphone to see sound visuals"

    try{
        await onMicStart()
        playbackControls.classList.remove("hidden")
    }
    catch(e){
        errorMessage.classList.remove("hidden")
        errorMessage.textContent = e + ""
    }
})


fileSwitch.addEventListener("click", () => {
    activeMode = "file"
    toggleMode(fileSwitch, micMode, fileMode)
    playbackControls.classList.add("hidden")
    onStop()
    processMessage.textContent = "Upload an audio file to see sound visuals"

})


}