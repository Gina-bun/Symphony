export const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
//for internal resolution(CSS takes care of how big it looks, JS takes care of this)
canvas.width = canvas.offsetWidth * devicePixelRatio
canvas.height = canvas.offsetHeight * devicePixelRatio
ctx.scale(devicePixelRatio, devicePixelRatio)

