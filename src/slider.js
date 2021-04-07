import { boundaries, computeXRatio, computeYRatio, css, line } from './utils'
import { toCoords } from './utils/toCoords'

function noop() {
}

const HEIGHT = 40
const DPI_HEIGHT = HEIGHT * 2

export function sliderChart(root, data, DPI_WIDTH) {
  const WIDTH = DPI_WIDTH / 2
  const MIN_WIDTH = WIDTH * 0.05
  const canvas = root.querySelector('canvas')
  const ctx = canvas.getContext('2d')
  let nextFn = noop

  canvas.width = DPI_WIDTH
  canvas.height = DPI_HEIGHT

  css(canvas, { width: WIDTH + 'px', height: HEIGHT + 'px' })

  const $left = root.querySelector(`[data-el='left']`)
  const $window = root.querySelector(`[data-el='window']`)
  const $right = root.querySelector(`[data-el='right']`)

  function next() {
    nextFn(getPosition())
  }

  function mousedown(event) {
    const type = event.target.dataset.type
    const dimensions = {
      left: Number.parseInt($window.style.left),
      right: Number.parseInt($window.style.right),
      width: Number.parseInt($window.style.width)
    }

    if (type === 'window') {
      const startX = event.pageX
      document.onmousemove = e => {
        const delta = startX - e.pageX

        if (delta === 0) {
          return
        }

        const left = dimensions.left - delta
        const right = dimensions.right + delta

        if (left >= 0 && right >= 0) {
          setPosition(left, right)
          next()
        }
      }
    }

    if (type === 'left' || type === 'right') {
      const startX = event.pageX
      document.onmousemove = e => {
        const delta = startX - e.pageX

        if (delta === 0) {
          return
        }
        if (type === 'left') {
          const left = dimensions.left - delta
          setPosition(left, dimensions.right)
        }
        if (type === 'right') {
          const right = dimensions.right + delta
          setPosition(dimensions.left, right)
        }

        next()
      }
    }
  }

  function stopMove() {
    document.onmousemove = null
  }

  root.addEventListener('mousedown', mousedown)
  document.addEventListener('mouseup', stopMove)


  const defaultWidth = WIDTH * 0.3
  setPosition(0, WIDTH - defaultWidth)

  function setPosition(left, right) {
    const W = WIDTH - right - left

    if (W < MIN_WIDTH) {
      return css($window, { width: MIN_WIDTH + 'px' })
    }

    if (left < 0) {
      css($window, { left: 0 })
      css($left, { width: 0 })
      return
    }

    if (right < 0) {
      css($window, { left: 0 })
      css($right, { width: 0 })
      return
    }


    css($window, {
      width: W + 'px',
      left: left + 'px',
      right: right + 'px'
    })
    css($left, { width: left + 'px' })
    css($right, { width: right + 'px' })

  }

  function getPosition() {
    const left = parseInt($left.style.width)
    const right = WIDTH - parseInt($right.style.width)

    return [left * 100 / WIDTH, right * 100 / WIDTH]
  }

  const [yMin, yMax] = boundaries(data)
  const yRatio = computeYRatio(DPI_HEIGHT, yMax, yMin)
  const xRatio = computeXRatio(DPI_WIDTH, data.columns[0].length)

  const yData = data.columns.filter(col => data.types[col[0]] === 'line')

  yData.map(toCoords(xRatio, yRatio, DPI_HEIGHT, 0, yMin)).forEach((coords, i) => {
    const color = data.colors[yData[i][0]]
    line(ctx, coords, { color })
  })

  return {
    subscribe(fn) {
      nextFn = fn
      fn(getPosition())
    }
  }
}
