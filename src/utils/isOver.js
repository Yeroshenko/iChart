/**
 *
 * @param  {{ x: number} | null} mouse
 * @param {number} x
 * @param {number} length
 * @param {number} dpiWidth
 * @return {boolean}
 */

export const isOver = (mouse, x, length, dpiWidth) => {
  if (!mouse) {
    return false
  }

  const width = dpiWidth / length

  return Math.abs(x - mouse.x) < width / 2
}
