import { getFrequencyData } from "./audio";

let animationId //stores rAF id so we can cancel it

export function startVisualizer(canvas){
  canvas = document.getElementById("canvas")
  const ctx = canvas.getContext("2d")

  canvas.width = canvas.offsetWidth * devicePixelRatio
  canvas.height = canvas.offsetHeight * devicePixelRatio
  ctx.scale(devicePixelRatio, devicePixelRatio)

  function draw() {
    animationId = requestAnimationFrame(draw)//to schedule next frame

    const dataArray = getFrequencyData()
    const W = canvas.offsetWidth //use offset width after scaling
    const H = canvas.offsetHeight

    //clear the canvas 
    ctx.clearRect(0, 0, W, H)

    const barWidth = W/dataArray.length//bar width is always same

    for(let i = 0; i < dataArray.length; i++){
       //calculations for drawing each abr
       const barHeight = (dataArray[i]/255) * H
       const x = i * barWidth
       const y = H - barHeight

       //colouring each frequency by position
       const hue = (i / dataArray.length) * 280
       ctx.fillStyle = `hsl(${hue}, 80%, 55%)`

       //drawing
       ctx.fillRect(x, y, barWidth - 2, barHeight)
    }

  }

  draw()
}

export function stopVisualizer(){
    cancelAnimationFrame(animationId)
}
