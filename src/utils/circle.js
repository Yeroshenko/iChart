/**
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} x
 * @param {number} y
 * @param {string} color
 * @param {number} radius
 */
export const circle = (ctx, { x, y, color, radius }) => {
  ctx.beginPath()
  ctx.strokeStyle = color
  ctx.fillStyle = '#FFF'
  ctx.fill()
  ctx.arc(x, y, radius, 0, Math.PI * 2)
  ctx.fill()
  ctx.stroke()
  ctx.closePath()
}
