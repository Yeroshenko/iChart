/**
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {Array<Array<number>>} coords
 * @param {string} color
 */

export const line = (ctx, coords, { color }) => {
  ctx.beginPath()
  ctx.lineWidth = 4
  ctx.strokeStyle = color
  for (const [x, y] of coords) {
    ctx.lineTo(x, y)
  }
  ctx.stroke()
  ctx.closePath()
}
