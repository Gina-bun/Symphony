import { setUpUI } from "./ui.js";
import { startVisualizer, stopVisualizer } from "./visualizer.js";
import { startMic, loadFile, stopAudio } from "./audio.js";

//Instead of using circular imports, we pass the functions as 
// callbacks and tie everything together here in main.js
setUpUI({
    onMicStart: async () => {
        await startMic()
        startVisualizer()
    },
    onFileLoad: async (file) => {
        await loadFile(file)
        startVisualizer()
    },
    onStop: () => {
        stopAudio()
        stopVisualizer()
    }
})


