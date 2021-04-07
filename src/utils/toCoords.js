export function toCoords(xRatio, yRatio, DPI_HEIGHT, PADDING, yMin) {
  return (col) => col
    .map((y, i) => [
      Math.round((i - 1) * xRatio),
      Math.round(DPI_HEIGHT - PADDING - ((y - yMin) / yRatio))
    ])
    .filter((_, i) => i !== 0)
}
