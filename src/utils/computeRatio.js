/**
 *
 * @param {number}  width
 * @param {number} length
 * @return {number}
 */
export const computeXRatio = (width, length) => width / (length - 2)

/**
 *
 * @param {number} height
 * @param {number} max
 * @param {number} min
 * @return {number}
 */
export const computeYRatio = (height, max, min) => (max - min) / height
