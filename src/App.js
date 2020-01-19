import React from 'react'
import { useInterval } from './config/useInterval'
import {
  SNAKE_START,
  APPLE_START,
  CANVAS_SIZE,
  SCALE,
  DIRECTIONS,
  SPEED,
} from './config/constants'

function App() {
  const canvasRef = React.useRef()
  const [gameOver, setGameOver] = React.useState()
  const [snake, setSnake] = React.useState(SNAKE_START)
  const [apple, setApple] = React.useState(APPLE_START)
  const [direction, setDirection] = React.useState([0, -1])
  const [speed, setSpeed] = React.useState(SPEED)

  const startGame = () => {
    setSnake(SNAKE_START)
    setApple(APPLE_START)
    setDirection([0, -1])
    setSpeed(SPEED)
    setGameOver(false)
  }

  const endGame = () => {
    setSpeed(null)
    setGameOver(true)
  }

  const moveSnake = ({ keyCode }) =>
    keyCode >= 37 && keyCode <= 40 && setDirection(DIRECTIONS[keyCode])

  const createApple = () => {}

  const checkCollision = (head, snk = snake) => {
    if (
      head[0] * SCALE >= CANVAS_SIZE[0] ||
      head[0] < 0 ||
      head[1] * SCALE >= CANVAS_SIZE[1] ||
      head[1] < 0
    ) {
      return true
    }

    for (const segment of snk) {
      if (head[0] === segment[0] && head[1] === segment[1]) {
        return true
      }
    }
    return false
  }

  const checkAppleCollision = () => {}

  const gameLoop = () => {
    const snakeCopy = JSON.parse(JSON.stringify(snake))
    const newSnakeHead = [
      snakeCopy[0][0] + direction[0],
      snakeCopy[0][1] + direction[1],
    ]
    snakeCopy.unshift(newSnakeHead)
    if (checkCollision(newSnakeHead)) {
      endGame()
    }
    snakeCopy.pop()
    setSnake(snakeCopy)
  }

  useInterval(() => gameLoop(), speed)

  React.useEffect(() => {
    const context = canvasRef.current.getContext('2d')
    context.setTransform(SCALE, 0, 0, SCALE, 0, 0)
    context.clearRect(0, 0, window.innerWidth, window.innerHeight)
    context.fillStyle = 'pink'
    snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1))
    context.fillStyle = 'lightblue'
  }, [snake, apple, gameOver])

  return (
    <div test-id="app" role="button" tabIndex="0" onKeyDown={e => moveSnake(e)}>
      <canvas
        style={{ border: '1px solid black' }}
        ref={canvasRef}
        width={`${CANVAS_SIZE[0]}px`}
        height={`${CANVAS_SIZE[1]}px`}
      />
      {gameOver && <div>Game Over!!!!</div>}
      <button onClick={startGame}>Start Button</button>
    </div>
  )
}

export default App
