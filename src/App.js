import React from 'react'
import { useInterval } from './config/useInterval'
import { SNAKE_START, APPLE_START, CANVAS_SIZE } from './config/constants'

function App() {
  const canvasRef = React.useRef()
  const [gameOver, setGameOver] = React.useState()
  const [snake, setSnake] = React.useState(SNAKE_START)
  const [apple, setApple] = React.useState(APPLE_START)
  const [direction, setDirection] = React.useState([0, -1])
  const [speed, setSpeed] = React.useState(null)

  const startGame = () => {}

  const endGame = () => {}

  const moveSnake = () => {}

  const createApple = () => {}

  const checkCollision = () => {}

  const checkAppleCollision = () => {}

  const gameLoop = () => {}

  React.useEffect(() => {}, [snake, apple, gameOver])

  return (
    <div test-id="app" role="button" tabindex="0" onKeyDown={e => moveSnake(e)}>
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
